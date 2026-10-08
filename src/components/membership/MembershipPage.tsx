import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { 
  IoPeopleOutline, 
  IoCardOutline, 
  IoCheckmarkCircleOutline 
} from 'react-icons/io5';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface MembershipTierItem {
  id: string;
  name: string;
  price: string;
  period: string;
  perks: string[];
  image_url: string;
}

interface MembershipFormData {
  fullName: string;
  dob: string;
  globalLocation: string;
  email: string;
  phoneNumber: string;
  selectedTier: string;
  paymentApi: string;
  councilVolunteer: boolean;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho",
  authDomain: "://firebaseapp.com",
  projectId: "uwa-fc",
  storageBucket: "uwa-fc.firebasestorage.app",
  messagingSenderId: "387684494889",
  appId: "1:387684494889:web:373435029bd43bfbbe3638",
  measurementId: "G-DF4GNF6N28"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);
export default function MembershipPage() {
  const [activeTab, setActiveTab] = React.useState<string>('join');
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [paymentStatusText, setPaymentStatusText] = React.useState<string>('Initiating network payment prompt...');

  const { register, handleSubmit, watch, setValue } = useForm<MembershipFormData>({
    defaultValues: {
      fullName: '',
      dob: '',
      globalLocation: '',
      email: '',
      phoneNumber: '',
      selectedTier: 'Bronze Supporter — UGX 50,000 / Yr',
      paymentApi: 'MTN Mobile Money Wallet',
      councilVolunteer: false
    }
  });

  const selectedTier = watch('selectedTier');
  const paymentApi = watch('paymentApi');
  const councilVolunteer = watch('councilVolunteer');

  useEffect(() => {
    const sheetId = 'uwa-membership-breath';
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement('style');
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaTierBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02); }
          50% { transform: scale(1.015); box-shadow: 0 15px 25px -5px rgba(212, 175, 55, 0.08); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .membership-breath-card { animation: uwaTierBreath 6s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .membership-breath-card:nth-child(2) { animation-delay: 1.5s; }
        .membership-breath-card:nth-child(3) { animation-delay: 3s; }
        .membership-breath-card:hover { transform: scale(1.03) translateY(-4px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  useEffect(() => {
    const scriptId = 'flutterwave-v3-inline-sdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://flutterwave.com';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const registrationMutation = useMutation({
    mutationFn: async (payload: { trackingId: string; responseId: string; formData: MembershipFormData }) => {
      return await addDoc(collection(db, "registrations"), {
        transactionId: payload.trackingId,
        gatewayTransactionId: payload.responseId,
        fullName: payload.formData.fullName,
        dateOfBirth: payload.formData.dob,
        globalLocation: payload.formData.globalLocation,
        emailRegistry: payload.formData.email,
        mobileNumber: payload.formData.phoneNumber,
        tierChoice: payload.formData.selectedTier,
        paymentGateway: payload.formData.paymentApi,
        councilVolunteerInterest: payload.formData.councilVolunteer,
        paymentStatus: "SUCCESSFUL_AND_VERIFIED",
        membershipIdNumber: "UWA-FC-" + Math.floor(100000 + Math.random() * 900000),
        syncedAt: serverTimestamp()
      });
    },
    onSuccess: () => {
      setPaymentStatusText("VERIFIED");
    },
    onError: (err) => {
      console.error("Firebase Sync Error: ", err);
      setPaymentStatusText("Payment successful, but database cluster link timed out.");
    }
  });
  const membershipTiers: MembershipTierItem[] = [
    {
      id: "m1",
      name: "Bronze Supporter",
      price: "50,000",
      period: "Annual Fee",
      perks: ["Digital QR Card", "10% Shop Discount", "Fan Council Access"],
      image_url: "../../assets/home/bronze.jpg"
    },
    {
      id: "m1.5",
      name: "Silver Ranger",
      price: "120,000",
      period: "Annual Fee",
      perks: ["Season Ticket Pass", "12% Shop Discount", "Priority Booking"],
      image_url: "../../assets/home/silver.jpg",
    },
    {
      id: "m2",
      name: "Gold Conservationist",
      price: "250,000",
      period: "Annual Fee",
      perks: ["VIP Terrace Pass", "15% Shop Discount", "Committee Voting"],
      image_url: "../../assets/home/gold.jpg"
    }
  ];

  const handlePaymentAndRegistration = (data: MembershipFormData) => {
    if (!data.fullName || !data.email || !data.phoneNumber) {
      alert("Please populate all required identification fields before authorizing payment.");
      return;
    }
    setIsSubmitting(true);
    
    const trackingTransactionId: string = "UWA-" + Date.now();
    let billableAmount: number = 50000; 
    if (data.selectedTier.includes('Silver')) billableAmount = 120000;
    if (data.selectedTier.includes('Gold')) billableAmount = 250000;

    if (typeof (window as any).FlutterwaveCheckout !== 'function') {
      alert("Payment engine link is initializing. Please wait 2 seconds and tap authorize again.");
      setIsSubmitting(false);
      return;
    }

    (window as any).FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-96d78819d2551e0d89dc4ec665b718e1-X",
      tx_ref: trackingTransactionId,
      amount: billableAmount,
      currency: "UGX", 
      payment_options: "card, mobilemoney",
      customer: {
        email: data.email,
        phone_number: data.phoneNumber,
        name: data.fullName,
      },
      customizations: {
        title: "UWA FC Wildlife Stars Membership",
        description: `Payment confirmation clearance for ${data.selectedTier}`,
        logo: "https://unsplash.com",
      },
      callback: (response: any) => {
        setFormSubmitted(true);
        if (response.status === "successful" || response.status === "completed") {
          setPaymentStatusText("Payment authorized successfully! Pushing profile payload into cloud ledgers...");
          registrationMutation.mutate({
            trackingId: trackingTransactionId,
            responseId: response.transaction_id || response.id,
            formData: data
          });
        } else {
          alert("Transaction declined by bank networks.");
          setFormSubmitted(false);
        }
        setIsSubmitting(false);
      },
      onclose: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-tight mb-4 text-gray-500">
          <span>Home</span> / <span style={{ color: '#D4AF37' }}>Membership</span> / <span className="text-gray-300 capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Official Supporter Registries</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">Fan Membership Desks</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none w-full box-border">
          <button type="button" onClick={() => setActiveTab('join')} className={`px-3 sm:px-4 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all border flex items-center gap-1.5 flex-none cursor-pointer ${activeTab === 'join' ? 'bg-[#0B4622] text-[#D4AF37]' : 'bg-transparent text-gray-400 hover:bg-white/5'}`} style={{ borderColor: activeTab === 'join' ? '#D4AF37' : 'transparent' }}>
            <IoPeopleOutline size={12} /> Tiers & Benefits
          </button>
          <button type="button" onClick={() => setActiveTab('form')} className={`px-3 sm:px-4 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all border flex items-center gap-1.5 flex-none cursor-pointer ${activeTab === 'form' ? 'bg-[#0B4622] text-[#D4AF37]' : 'bg-transparent text-gray-400 hover:bg-white/5'}`} style={{ borderColor: activeTab === 'form' ? '#D4AF37' : 'transparent' }}>
            <IoCardOutline size={12} /> Intake Form
          </button>
        </div>
        <div className="w-full box-border">
          {activeTab === 'join' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full box-border items-stretch">
              {membershipTiers.map((tier: MembershipTierItem) => (
                <div 
                  key={tier.id} 
                  className="membership-breath-card p-4 sm:p-6 rounded-2xl border bg-[#041A0E]/20 text-left flex flex-col justify-between min-h-[400px] sm:min-h-[380px] box-border relative transition-all duration-300" 
                  style={{ borderColor: tier.name.includes('Gold') ? '#D4AF37' : tier.name.includes('Silver') ? '#A0A0A0' : 'rgba(212, 175, 55, 0.15)' }}
                >
                  <div className="w-full">
                    <div className="flex w-full h-24 sm:h-36 bg-black/40 rounded-xl overflow-hidden relative border border-white/5 items-center justify-center p-0.5 mb-3">
                      <img 
                        src={tier.image_url} 
                        className="w-full h-full object-cover rounded-lg filter saturate-50 brightness-90" 
                        alt={tier.name} 
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    
                    <h4 className="text-white font-black text-sm sm:text-base uppercase tracking-wide truncate">
                      {tier.name}
                    </h4>
                    <div className="mt-2.5 pt-2.5 border-t border-white/5 space-y-1">
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 block">
                        Perks:
                      </span>
                      <ul className="space-y-1">
                        {tier.perks.map((perk: string, i: number) => (
                          <li key={i} className="text-[11px] sm:text-xs text-gray-300 flex items-start gap-1.5">
                            <span style={{ color: '#D4AF37' }} className="font-bold flex-none text-[9px] sm:text-[10px]">✔</span>
                            <span className="line-clamp-2 leading-tight">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                    <div className="shrink-0">
                      <span className="text-[8px] font-sans font-bold text-gray-500 block uppercase tracking-tighter">
                        INVESTMENT
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-black text-white whitespace-nowrap">
                        UGX {tier.price} <span className="text-[9px] font-sans font-normal text-gray-400">/{tier.period}</span>
                      </span>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => {
                        if (tier.name.includes('Bronze')) setValue('selectedTier', 'Bronze Supporter — UGX 50,000 / Yr');
                        else if (tier.name.includes('Silver')) setValue('selectedTier', 'Silver Ranger Team — UGX 120,000 / Yr');
                        else setValue('selectedTier', 'Gold Conservationist Tier — UGX 250,000 / Yr');
                        setActiveTab('form');
                      }} 
                      className="w-full sm:w-auto px-4 py-1.5 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider cursor-pointer text-center transition-all duration-150 transform active:scale-95 shadow-md"
                    >
                      Select Tier
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
          {activeTab === 'form' && (
            <div className="w-full max-w-2xl mx-auto rounded-2xl border p-4 sm:p-6 text-left box-border shadow-2xl" style={{ background: 'rgba(4, 20, 10, 0.4)', borderColor: 'rgba(212, 175, 55, 0.15)' }}>
              {formSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="flex justify-center text-[#D4AF37]">
                    {paymentStatusText === "VERIFIED" ? (
                      <IoCheckmarkCircleOutline size={48} className="text-emerald-400 animate-bounce" />
                    ) : (
                      <div className="h-9 w-7 border-2 border-t-transparent border-[#D4AF37] rounded-full animate-spin" />
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
                    {paymentStatusText === "VERIFIED" ? "Ledger Verified & Synced" : "Security Gateway Intercept"}
                  </h3>
                  <p className="text-gray-400 text-xs leading-normal max-w-md mx-auto font-sans">
                    {paymentStatusText === "VERIFIED" 
                      ? "Your transaction cleared successfully. Fan record variables are now synchronized with your live uwa-fc Firestore backend ledger." 
                      : paymentStatusText}
                  </p>
                  {paymentStatusText === "VERIFIED" && (
                    <button type="button" onClick={() => { setFormSubmitted(false); setPaymentStatusText('Initiating network payment prompt...'); }} className="px-4 py-2 bg-[#0B4622] hover:bg-[#073016] text-white font-bold rounded-lg text-[10px] sm:text-xs uppercase tracking-wider border border-[#D4AF37]/30 transition-all cursor-pointer shadow-md">
                      Register Another Account
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit(handlePaymentAndRegistration)} className="space-y-4 font-sans">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight">Supporter Registration Queue</h3>
                    <p className="text-gray-500 text-[9px] sm:text-xs mt-0.5">Completing mobile payment PIN inputs authorizes instant cloud record injection tasks.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Full Legal Name</label>
                      <input required type="text" {...register("fullName")} placeholder="e.g., Lwabya Eric" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Date of Birth</label>
                        <input required type="date" {...register("dob")} className="w-full py-2 px-2 bg-black/40 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono select-none" />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">City / Country</label>
                        <input required type="text" placeholder="e.g., Kampala, UG" {...register("globalLocation")} className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Primary Email Registry</label>
                      <input required type="email" {...register("email")} placeholder="name@domain.com" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Contact Number (With Area Code)</label>
                      <input required type="tel" {...register("phoneNumber")} placeholder="e.g., +256775862291" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Membership Tier</label>
                      <select {...register("selectedTier")} className="w-full py-2 px-3 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono cursor-pointer">
                        <option className="bg-neutral-900 text-white">Bronze Supporter — UGX 50,000 / Yr</option>
                        <option className="bg-neutral-900 text-white">Silver Ranger Team — UGX 120,000 / Yr</option>
                        <option className="bg-neutral-900 text-white">Gold Conservationist Tier — UGX 250,000 / Yr</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Payment API Gateway</label>
                      <select {...register("paymentApi")} className="w-full py-2 px-3 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono cursor-pointer">
                        <option className="bg-neutral-900 text-white">MTN Mobile Money Wallet</option>
                        <option className="bg-neutral-900 text-white">Airtel Money Secure Link</option>
                        <option className="bg-neutral-900 text-white">International Card Checkout</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border flex items-start gap-2.5 bg-black/10 border-white/5">
                    <input type="checkbox" id="councilInterestBox" {...register("councilVolunteer")} className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 accent-[#0B4622] cursor-pointer" />
                    <div className="text-[10px] sm:text-xs">
                      <label htmlFor="councilInterestBox" className="font-extrabold text-white block cursor-pointer select-none uppercase tracking-tight">Register chapter council voting interest</label>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono text-gray-500">
                    <p className="text-center md:text-left leading-tight">* Secured Merchant Ports: MTN (0775862291) / Airtel (0706560262).</p>
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#020B05] rounded-xl font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 cursor-pointer text-center flex-none disabled:opacity-40 select-none">
                      {isSubmitting ? "Verifying PIN..." : "Authorize Payment"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
