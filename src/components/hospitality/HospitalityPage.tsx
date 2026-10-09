import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { 
  IoWineOutline, 
  IoCalendarOutline, 
  IoReceiptOutline, 
  IoCheckmarkCircleOutline, 
  IoSparklesOutline,
  IoCardOutline,
  IoWalletOutline,
  IoChevronDown,
  IoAlertCircleOutline,
  IoQrCodeOutline,
  IoBusinessOutline,
  IoLocationOutline
} from 'react-icons/io5';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

interface HospitalityPackageItem {
  name: string;
  price: number;
  description: string;
  inclusions: string[];
}

interface HospitalityPageProps {
  currentUserProfile: UserProfile | null;
}

interface HospitalityFormData {
  corporateName: string;
  corporateEmail: string;
  billingPhone: string;
  momoProvider: 'mtn' | 'airtel' | 'invoice';
  dietaryRequirements: string;
  targetMatch: string;
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
export default function HospitalityPage({ currentUserProfile }: HospitalityPageProps) {
  const [activeTab, setActiveTab] = React.useState<string>('packages');
  const [bookingStep, setBookingStep] = React.useState<string>('form'); 
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [checkoutStatusText, setCheckoutStatusText] = React.useState<string>('Verifying corporate financial processing lines...');

  const [selectedTier, setSelectedTier] = React.useState<string>('Bronze Tier');
  const [selectedPrice, setSelectedTicketPrice] = React.useState<number>(150000);
  const [suiteQuantity, setSuiteQuantity] = React.useState<number>(1);

  const [generatedSuiteId, setGeneratedSuiteId] = React.useState<string>('');
  const [verifiedPaymentToken, setVerifiedPaymentToken] = React.useState<string>('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<HospitalityFormData>({
    defaultValues: {
      corporateName: currentUserProfile?.displayName || 'Lwabya Eric',
      corporateEmail: currentUserProfile?.email || '',
      billingPhone: '',
      momoProvider: 'mtn',
      dietaryRequirements: '',
      targetMatch: 'vs Vipers SC'
    }
  });

  const momoProvider = watch('momoProvider');
  const corporateName = watch('corporateName');
  const corporateEmail = watch('corporateEmail');
  const billingPhone = watch('billingPhone');
  const targetMatchValue = watch('targetMatch');

  useEffect(() => {
    const sheetId = 'uwa-hospitality-breath';
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement('style');
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaVipBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
          50% { transform: scale(1.012); box-shadow: 0 16px 24px -6px rgba(212, 175, 55, 0.08); border-color: rgba(212, 175, 55, 0.3) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .vip-breath-card { animation: uwaVipBreath 5.8s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .vip-breath-card:nth-child(2) { animation-delay: 1.2s; }
        .vip-breath-card:nth-child(3) { animation-delay: 2.4s; }
        .vip-breath-card:nth-child(4) { animation-delay: 3.6s; }
        .vip-breath-card:hover { transform: scale(1.025) translateY(-3px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.18) !important; animation-play-state: paused !important; }
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

  useEffect(() => {
    if (currentUserProfile) {
      setValue('corporateName', currentUserProfile.displayName || 'Lwabya Eric');
      setValue('corporateEmail', currentUserProfile.email || '');
    }
  }, [currentUserProfile, setValue]);

  const bookingMutation = useMutation({
    mutationFn: async (payload: { trackingId: string; token: string; status: string; method: string }) => {
      return await addDoc(collection(db, "hospitality_bookings"), {
        bookingId: payload.trackingId,
        gatewayTransactionToken: payload.token,
        corporateName,
        corporateEmail: corporateEmail || "vip-guest@uwa-fc.com",
        corporatePhone: billingPhone,
        selectedPackage: selectedTier,
        purchasedQuantity: suiteQuantity,
        totalCostAmount: selectedPrice * suiteQuantity,
        paymentMethod: payload.method,
        bookingStatus: payload.status,
        timestamp: serverTimestamp()
      });
    },
    onSuccess: (data, variables) => {
      setGeneratedSuiteId(variables.trackingId);
      setVerifiedPaymentToken(variables.token);
      setBookingStep('success');
      setIsSubmitting(false);
    },
    onError: (err) => {
      console.error("Firestore operation failure: ", err);
      alert("Ledger synchronization encountered an issue. Review parameters.");
      setIsSubmitting(false);
    }
  });
  const packages: HospitalityPackageItem[] = [
    {
      name: "Bronze Tier",
      price: 150000,
      description: "Ideal for club loyalists seeking a standard hospitality upgrade.",
      inclusions: ["Match Entry Pass", "Main Royal Pavilion Access", "1 Complimentary Drink Voucher"]
    },
    {
      name: "Silver Tier",
      price: 350000,
      description: "Premium seating with dedicated dining access.",
      inclusions: ["VIP Covered Stand Pass", "Pre-Match Buffet Meal", "2 Drink Vouchers", "Official Matchday Program Booklet"]
    },
    {
      name: "Gold Tier",
      price: 750000,
      description: "Executive lounge entertainment for distinguished guests.",
      inclusions: ["VVIP Executive Seating", "3-Course Catered Meal", "Premium Open Bar", "Reserved Parking Pass", "Complimentary Club Souvenir", "Dedicated Host Attendant"]
    },
    {
      name: "Platinum Tier",
      price: 2500000,
      description: "The absolute peak corporate hosting experience (Private suite for 10-20 corporate guests).",
      inclusions: ["Private Luxury Suite Rental", "Full Premium Catering", "VIP Valet Parking", "Exclusive Post-Match Player Meet & Greet", "Official Gift Bag", "Match Trophy Photo Opportunity"]
    }
  ];

  const handleHospitalityPurchaseExecution = (data: HospitalityFormData) => {
    if (!data.corporateName || !data.billingPhone) {
      alert("Fulfillment Halt: Please populate mandatory contact fields before clearing VIP access cards.");
      return;
    }
    setIsSubmitting(true);

    const hospitalityTrackingId: string = "WILDLIFE STARS-VIP-" + Date.now();
    const subTotalVolumeCost: number = selectedPrice * suiteQuantity;

    if (data.momoProvider === 'invoice') {
      setCheckoutStatusText("Logging pro-forma balances... Transferring data to Firestore registers...");
      bookingMutation.mutate({
        trackingId: hospitalityTrackingId,
        token: "BANK_INVOICE_ISSUED",
        status: "INVOICED_AWAITING_WIRE_TRANSFER",
        method: "CORPORATE_BANK_INVOICE"
      });
      return;
    }

    if (typeof (window as any).FlutterwaveCheckout !== 'function') {
      alert("Payment gateways are initializing background connections. Please wait 3 seconds and re-tap.");
      setIsSubmitting(false);
      return;
    }

    (window as any).FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-96d78819d2551e0d89dc4ec665b718e1-X",
      tx_ref: hospitalityTrackingId,
      amount: subTotalVolumeCost,
      currency: "UGX",
      payment_options: "mobilemoney, card",
      customer: {
        email: data.corporateEmail || "liaison@uwa-fc.com",
        phone_number: data.billingPhone,
        name: data.corporateName,
      },
      customizations: {
        title: `UWA FC VIP Lounge Clearance Desk`,
        description: `Procurement Order: ${selectedTier} x ${suiteQuantity}`,
        logo: "https://unsplash.com",
      },
      callback: (response: any) => {
        setCheckoutStatusText("Verifying token parameters... Transferring records to Firestore...");
        if (response.status === "successful" || response.status === "completed") {
          bookingMutation.mutate({
            trackingId: hospitalityTrackingId,
            token: String(response.transaction_id || response.id),
            status: "PAID_SUITE_ACCESS_GRANTED",
            method: data.momoProvider === 'mtn' ? "MTN_MOMO_API" : "AIRTEL_MONEY_API"
          });
        } else {
          alert("Gateway authentication failure. Please check mobile money wallet account balances.");
          setIsSubmitting(false);
        }
      },
      onclose: () => {
        setIsSubmitting(false);
      }
    });
  };
  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden relative" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-tight mb-4 text-neutral-500">
          <span className="text-neutral-400">Home</span> / <span style={{ color: '#D4AF37' }}>Hospitality Portal</span> / <span className="text-neutral-300 capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>B2B Entertainment & VIP Lounges</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">Corporate Hospitality</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full box-border touch-pan-x">
          <button type="button" onClick={() => setActiveTab('packages')} className={`px-3.5 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'packages' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-md' : 'bg-transparent text-neutral-400 border-white/5 hover:bg-white/5'}`}><IoWineOutline size={12} /> VIP Packages & Tiers</button>
          <button type="button" onClick={() => setActiveTab('book')} className={`px-3.5 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'book' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-md' : 'bg-transparent text-neutral-400 border-white/5 hover:bg-white/5'}`}><IoCalendarOutline size={12} /> Book Hospitality Suite</button>
        </div>

        <div className="w-full box-border">
          {activeTab === 'packages' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 w-full box-border items-stretch">
              {packages.map((pkg: HospitalityPackageItem, idx: number) => (
                <div key={idx} className="vip-breath-card p-3 sm:p-5 rounded-xl border bg-[#041A0E]/20 text-left flex flex-col justify-between min-h-[350px] sm:min-h-[410px] box-border relative transition-all duration-300 border-white/5" style={{ borderColor: pkg.name === 'Platinum Tier' ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)' }}>
                  {pkg.name === 'Platinum Tier' && (
                    <span className="absolute top-2 right-2 text-[7px] sm:text-[9px] font-mono font-bold uppercase bg-[#D4AF37] text-[#031109] px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm"><IoSparklesOutline /> Elite B2B</span>
                  )}
                  
                  <div>
                    <h4 className="text-white font-black text-xs sm:text-lg uppercase tracking-tight">{pkg.name}</h4>
                    <p className="text-neutral-400 text-[9px] sm:text-xs mt-1.5 leading-tight min-h-[40px] sm:min-h-[48px] line-clamp-3">{pkg.description}</p>
                    
                    <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1">
                      <span className="text-[8px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">Package Inclusions:</span>
                      <ul className="space-y-1">
                        {pkg.inclusions.map((inc: string, i: number) => (
                          <li key={i} className="text-[10px] sm:text-sm text-neutral-300 flex items-start gap-1.5 leading-tight">
                            <span style={{ color: '#D4AF37' }} className="font-bold flex-none text-[8px] sm:text-[10px]">✔</span>
                            <span className="line-clamp-2">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2.5">
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-sans font-bold text-neutral-500 block uppercase tracking-tight">Investment Rate</span>
                      <span className="font-mono text-xs sm:text-lg font-black text-white whitespace-nowrap">
                        UGX {pkg.price.toLocaleString()} <span className="text-[9px] sm:text-[11px] font-sans font-normal text-neutral-400">{pkg.name === 'Platinum Tier' ? '/ Suite' : '/ Guest'}</span>
                      </span>
                    </div>
                    <Button type="button" variant="outline" onClick={() => { setSelectedTier(pkg.name); setSelectedTicketPrice(pkg.price); setActiveTab('book'); }} className="w-full py-2 bg-[#0B4622] text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#073016] rounded-xl text-[9px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all duration-150 transform active:scale-95 cursor-pointer text-center shadow-md">Select Package</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'book' && (
            <div className="w-full max-w-2xl mx-auto rounded-2xl border p-4 sm:p-8 text-left box-border shadow-2xl" style={{ background: 'rgba(4, 20, 10, 0.4)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
              {bookingStep === 'form' && (
                <form onSubmit={handleSubmit(handleHospitalityPurchaseExecution)} className="space-y-4 font-sans text-left">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight flex items-center gap-2"><IoReceiptOutline style={{ color: '#D4AF37' }} /> B2B Reservation Ledger</h3>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-tight">Configure attendance parameters. Active Selection: <span className="font-bold uppercase tracking-tight" style={{ color: '#D4AF37' }}>{selectedTier}</span></p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full box-border">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Company / Corporate Name *</label>
                      <Input required type="text" {...register("corporateName")} placeholder="e.g. Lwabya Eric" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <div>
                        <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Pass Quantity *</label>
                        <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 justify-between h-10">
                          <button type="button" onClick={() => setSuiteQuantity(prev => Math.max(1, prev - 1))} className="text-neutral-400 font-bold px-2.5 py-0.5 text-sm outline-none cursor-pointer select-none">-</button>
                          <span className="font-mono text-xs font-bold text-white px-1 select-none">{suiteQuantity}</span>
                          <button type="button" onClick={() => setSuiteQuantity(prev => Math.min(25, prev + 1))} className="text-neutral-400 font-bold px-2.5 py-0.5 text-sm outline-none cursor-pointer select-none">+</button>
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Target Match</label>
                        <Select value={targetMatchValue} onValueChange={(val) => setValue('targetMatch', val as any)}>
                          <SelectTrigger className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono h-10">
                            <SelectValue placeholder="Select Match" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#031109] border border-white/10 text-white font-mono text-xs">
                            <SelectItem value="vs Vipers SC">vs Vipers SC</SelectItem>
                            <SelectItem value="vs KCCA FC">vs KCCA FC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full box-border">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Primary Liaison Email Address *</label>
                      <Input required type="email" {...register("corporateEmail")} placeholder="corporate@domain.com" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Authorized Mobile Number *</label>
                      <Input required type="tel" {...register("billingPhone")} placeholder="e.g. 077XXXXXXX" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Dietary Requirements & Special Requests</label>
                    <textarea rows={2} {...register("dietaryRequirements")} placeholder="Specify corporate requirements (Halal catering, VVIP parking placements, etc.)..." className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] resize-none font-sans"></textarea>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Select Settlement Node</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button type="button" onClick={() => setValue('momoProvider', 'mtn')} className={`py-2 rounded-lg border font-mono text-[10px] font-black text-center transition-all cursor-pointer ${momoProvider === 'mtn' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>MTN MoMo</button>
                      <button type="button" onClick={() => setValue('momoProvider', 'airtel')} className={`py-2 rounded-lg border font-mono text-[10px] font-black text-center transition-all cursor-pointer ${momoProvider === 'airtel' ? 'bg-red-600/10 border-red-600 text-red-400 shadow-lg' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>Airtel Money</button>
                      <button type="button" onClick={() => setValue('momoProvider', 'invoice')} className={`py-2 rounded-lg border font-mono text-[10px] font-black text-center transition-all cursor-pointer ${momoProvider === 'invoice' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400 shadow-lg' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>Bank Invoice</button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-col items-center justify-center gap-3 w-full">
                    <p className="text-[8px] sm:text-[10px] text-neutral-500 text-center leading-tight">* Finalize booking parameters to run payment prompts or issue pro-forma documentation.</p>
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#020B05] rounded-xl font-mono font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 text-center flex-none disabled:opacity-40 select-none cursor-pointer">
                      {isSubmitting ? "Processing Enclave..." : "Authorize Booking 🚀"}
                    </Button>
                  </div>
                </form>
              )}
              {bookingStep === 'success' && (
                <div className="py-1 space-y-4 animate-fadeIn font-sans text-left">
                  <div className="text-center border-b border-white/5 pb-3">
                    <div className="flex justify-center text-emerald-400 mb-1"><IoCheckmarkCircleOutline size={48} className="animate-bounce" /></div>
                    <h4 className="text-white font-black uppercase text-sm sm:text-base tracking-tight">Hospitality Pass Unlocked</h4>
                    <p className="text-neutral-400 text-[9px] sm:text-xs mt-0.5">Corporate Registry Reference Token:</p>
                    <span className="font-mono text-[#D4AF37] text-xs font-bold uppercase bg-black/40 border border-white/5 px-2.5 py-1 rounded shadow-inner inline-block mt-1.5">{generatedSuiteId || "UWA-HOSP-PENDING"}</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl flex flex-col items-center justify-center max-w-[160px] mx-auto border-2 border-[#D4AF37] shadow-xl">
                    <IoQrCodeOutline size={120} className="text-[#0B4622]" />
                    <span className="text-[8px] text-neutral-500 font-mono font-black uppercase tracking-wider mt-1.5">GATERANGER VERIFIED</span>
                  </div>

                  <div className="space-y-1 bg-black/30 p-3 sm:p-5 rounded-xl border border-white/5 font-mono text-xs">
                    <p className="text-[#D4AF37] font-bold uppercase tracking-wider text-[9px] sm:text-[11px] mb-2 border-b border-white/5 pb-1">Verified Invoiced Metrics</p>
                    <div className="flex justify-between py-0.5"><span>Holder Organization:</span><span className="text-white font-bold max-w-[150px] truncate">{corporateName}</span></div>
                    <div className="flex justify-between py-0.5"><span>Selected Tier:</span><span className="text-white font-bold">{selectedTier}</span></div>
                    <div className="flex justify-between py-0.5"><span>Procured Volume:</span><span className="text-white font-bold">x{suiteQuantity} Passes</span></div>
                    <div className="flex justify-between py-0.5"><span>Assigned Venue:</span><span className="text-white">Main Royal Pavilion Lounges</span></div>
                    <div className="flex justify-between border-t border-white/5 pt-2 font-sans font-black text-emerald-400 text-sm sm:text-lg"><span>Total Volume Cost:</span><span>UGX {(selectedPrice * suiteQuantity).toLocaleString()}</span></div>
                    <div className="text-[8px] sm:text-[10px] text-neutral-500 pt-1.5 leading-none truncate border-t border-white/5 mt-2"><strong className="text-neutral-400 font-sans">Payment Token ID:</strong> {verifiedPaymentToken || "SANDBOX_VERIFIED"}</div>
                  </div>

                  <div className="p-3 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-950/20 text-xs text-neutral-400 leading-normal">🌲 <strong>Official Access Clearance Note:</strong> Your corporate ledger entry has been securely registered on-chain. Please present this dynamic on-screen QR gate passport upon arrival at the Main Royal Pavilion Hospitality desk on matchday.</div>
                  <div className="flex justify-end pt-1 w-full"><Button type="button" variant="outline" onClick={() => { setBookingStep('form'); setActiveTab('packages'); setGeneratedSuiteId(''); setVerifiedPaymentToken(''); }} className="w-full sm:w-auto px-5 py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] font-mono font-black border border-[#D4AF37]/20 rounded-xl text-xs uppercase tracking-wider cursor-pointer text-center transition-all shadow-md transform active:scale-95">Return to Packages</Button></div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
