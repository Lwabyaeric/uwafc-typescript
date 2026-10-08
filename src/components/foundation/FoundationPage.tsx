import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { 
  IoHeartOutline, 
  IoLeafOutline, 
  IoMedalOutline, 
  IoCheckmarkCircleOutline,
  IoCardOutline,
  IoWalletOutline,
  IoChevronDown,
  IoAlertCircleOutline,
  IoQrCodeOutline,
  IoPlayCircleOutline,
  IoConstructOutline
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

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

interface StructuralObjectiveItem {
  id: string;
  title: string;
  metric: string;
  youtubeUrl: string;
  desc: string;
  image_url: string;
}

interface FoundationPageProps {
  currentUserProfile: UserProfile | null;
}

interface DonationFormData {
  selectedObjective: string;
  customAmount: string;
  donatorName: string;
  donatorEmail: string;
  donatorPhone: string;
  momoProvider: 'mtn' | 'airtel';
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
export default function FoundationPage({ currentUserProfile }: FoundationPageProps) {
  const { subSection } = useParams({ from: '/foundation/\$subSection' }) as any;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<string>('projects');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);

  const [generatedDonationId, setGeneratedDonationId] = React.useState<string>('');
  const [verifiedPaymentToken, setVerifiedPaymentToken] = React.useState<string>('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DonationFormData>({
    defaultValues: {
      donatorName: currentUserProfile?.displayName || 'Lwabya Eric',
      donatorEmail: currentUserProfile?.email || '',
      donatorPhone: '',
      customAmount: '20000',
      momoProvider: 'mtn',
      selectedObjective: 'Land Purchase and Construction of UWA FC Stadium'
    }
  });

  const customAmount = watch('customAmount');
  const selectedObjective = watch('selectedObjective');
  const donatorName = watch('donatorName');
  const donatorEmail = watch('donatorEmail');
  const donatorPhone = watch('donatorPhone');
  const momoProvider = watch('momoProvider');

  useEffect(() => {
    const sheetId = 'uwa-foundation-breath';
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement('style');
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaProjectBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
          50% { transform: scale(1.015); box-shadow: 0 16px 24px -6px rgba(212, 175, 55, 0.06); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .project-breath-card { animation: uwaProjectBreath 6s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .project-breath-card:nth-child(2n) { animation-delay: 1.5s; }
        .project-breath-card:nth-child(3n) { animation-delay: 3s; }
        .project-breath-card:hover { transform: scale(1.025) translateY(-3px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
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
      setValue('donatorName', currentUserProfile.displayName || 'Lwabya Eric');
      setValue('donatorEmail', currentUserProfile.email || '');
    }
  }, [currentUserProfile, setValue]);
  const donationFirebaseMutation = useMutation({
    mutationFn: async (payload: { foundationDonationId: string; responseId: string; finalContributionSum: number }) => {
      return await addDoc(collection(db, "club_donations"), {
        donationId: payload.foundationDonationId,
        gatewayTransactionToken: payload.responseId,
        donorName: donatorName,
        donorEmail: donatorEmail || "donor@uwa-fc.com",
        donorPhone: donatorPhone,
        allocatedObjective: selectedObjective,
        endowmentSum: payload.finalContributionSum,
        settlementChannel: momoProvider === 'mtn' ? "FLUTTERWAVE_MTN_MOMO" : "FLUTTERWAVE_AIRTEL_MONEY",
        orderStatus: "FUNDS_RECEIVED_MANAGEMENT_DISPATCH",
        userUid: currentUserProfile ? currentUserProfile.uid : "GUEST_SUPPORTER",
        timestamp: serverTimestamp()
      });
    },
    onSuccess: (data, variables) => {
      setGeneratedDonationId(variables.foundationDonationId);
      setVerifiedPaymentToken(variables.responseId);
      setFormSubmitted(true);
      setIsSubmitting(false);
    },
    onError: (cloudWriteErr) => {
      console.error("Firestore database registry error: ", cloudWriteErr);
      alert("Contribution processed via gateway, but cloud tracking timed out. Please save your reference number.");
      setIsSubmitting(false);
    }
  });

  const structuralObjectives: StructuralObjectiveItem[] = [
    {
      id: "obj1",
      title: "Land Purchase and UWA FC Stadium Construction",
      metric: "Objective: Procurement & Civil Groundbreak",
      youtubeUrl: "https://youtube.com", 
      desc: "Direct funding to acquire land titles and fund major construction works for the permanent home stadium of UWA FC, including pavilions, modern pitches, and official team training campuses.",
      image_url: "../../assets/home/landpurchase.jpg"
    },
    {
      id: "obj2",
      title: "Senior Squad Training Kits & Gear Procurement",
      metric: "Objective: Elite Gym & GPS Tracking",
      youtubeUrl: "https://youtube.com",
      desc: "Sourcing premium technical training kits, heavyweight gym equipment, balls, training cones, and player performance analytic sensors for the senior team roster.",
      image_url: "../../assets/home/traininggear.jpg"
    },
    {
      id: "obj3",
      title: "First-Team Squad Logistics & Welfare Management",
      metric: "Objective: Full Squad Sports Welfare",
      youtubeUrl: "https://youtube.com",
      desc: "Providing stable nutritional assets, team transport buses, and a robust medical care support index managed directly by the club secretariat to support our players.",
      image_url: "../../assets/home/logistics.jpg"
    },
    {
      id: "obj4",
      title: "Namulonge Market Cleaning & Sanitation Exercise",
      metric: "Relationship: Local Market Sanitation",
      youtubeUrl: "https://youtube.com",
      desc: "UWA FC senior first-team players, coaching staff, and fans mobilize monthly to de-clog trenches, clear src spaces, and install club-branded waste collection bins across local trading markets.",
      image_url: "../../assets/home/cleaning.jpg"
    },
    {
      id: "obj5",
      title: "Sanyu Babies Home Food & Clothing Donation",
      metric: "Welfare: Supporting the Underprivileged",
      youtubeUrl: "https://youtube.com",
      desc: "Our squad frequently visits the home to deliver vital food items, milk, clothing, and beddings, leveraging the club's corporate influence to support and care for less-privileged toddlers.",
      image_url: "../../assets/home/donation.jpg"
    },
    {
      id: "obj6",
      title: "Grassroots Football Youth Coaching & Kit Clinics",
      metric: "Talent: Nurturing Local Cadet Football",
      youtubeUrl: "https://youtube.com",
      desc: "Deploying team coaches and stars to host free soccer clinics for underprivileged boys and girls, distributing jerseys and football equipment to schools to create positive long-term fan relationships.",
      image_url: "../../assets/home/grassroot.jpg"
    }
  ];
  const handleHospitalityPurchaseExecution = (data: DonationFormData) => {
    if (!data.donatorName || !data.donatorPhone || !data.customAmount) {
      alert("Validation Error: Please fill in mandatory contributor parameters.");
      return;
    }
    setIsSubmitting(true);

    const foundationDonationId = "SIMBA-BUILD-" + Date.now();
    const finalContributionSum = parseInt(data.customAmount);

    if (typeof (window as any).FlutterwaveCheckout !== 'function') {
      alert("Payment gateways are initializing connections. Please wait 3 seconds and re-tap Process.");
      setIsSubmitting(false);
      return;
    }

    (window as any).FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-96d78819d2551e0d89dc4ec665b718e1-X",
      tx_ref: foundationDonationId,
      amount: finalContributionSum,
      currency: "UGX",
      payment_options: "mobilemoney, card",
      customer: {
        email: data.donatorEmail || "capital.supporter@uwa-fc.com",
        phone_number: data.donatorPhone,
        name: data.donatorName,
      },
      customizations: {
        title: "UWA FC Simbas Development Fund",
        description: `UWA FC Stadium Land Purchase & Construction Fund`,
        logo: "https://unsplash.com",
      },
      callback: (response: any) => {
        if (response.status === "successful" || response.status === "completed") {
          donationFirebaseMutation.mutate({
            foundationDonationId,
            responseId: String(response.transaction_id || response.id),
            finalContributionSum
          });
        } else {
          alert("Gateway authentication fault. Please check mobile money wallet account balances.");
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
          <span className="text-neutral-400">Home</span> / <span style={{ color: '#D4AF37' }}>Club Capital Fund</span> / <span className="text-neutral-300 capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Capital Infrastructure & Community Welfare</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">UWA FC Development Fund</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full box-border touch-pan-x">
          <button type="button" onClick={() => setActiveTab('projects')} className={`px-3.5 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'projects' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-md' : 'bg-transparent text-neutral-400 border-white/5 hover:bg-white/5'}`}><IoConstructOutline size={12} /> Active Club Objectives</button>
          <button type="button" onClick={() => setActiveTab('donate')} className={`px-3.5 py-2 rounded-md text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'donate' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-md' : 'bg-transparent text-neutral-400 border-white/5 hover:bg-white/5'}`}><IoHeartOutline size={12} /> Brick by Brick Portal</button>
        </div>
        <div className="w-full box-border">
          {activeTab === 'projects' && (
            <div className="space-y-6 w-full box-border">
              
              <div className="p-4 sm:p-6 rounded-2xl border bg-[#041A0E]/20 text-left border-white/5 max-w-4xl box-border shadow-xl">
                <h3 className="text-white font-black text-sm sm:text-lg uppercase tracking-tight mb-1.5 flex items-center gap-2">
                  <IoMedalOutline style={{ color: '#D4AF37' }} /> Building the Pride of our Supporters
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                  The UWA FC Development Fund coordinates financial and resource backing managed exclusively by the UWA FC Club Management and the elected fan's Executive Commitee. Every contribution goes directly into land purchase, UWA FC Stadium construction, high-performance training kits, and player welfare logistics, ensuring the club deepens its roots across our home communities.
                </p>
              </div>

              {/* 📱 2-Column Responsive Layout Fix Matrix for Mobile Viewports */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 w-full box-border items-stretch">
                {structuralObjectives.map((project: StructuralObjectiveItem) => (
                  <div key={project.id} className="project-breath-card p-3 sm:p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[300px] sm:min-h-[410px] box-border transition-all duration-300 border-white/5 relative group">
                    <div className="w-full">
                      <a href={project.youtubeUrl} rel="noreferrer" className="w-full h-24 sm:h-36 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center mb-2.5 relative cursor-pointer block">
                        <img src={project.image_url} className="w-full h-full object-cover filter saturate-50 brightness-70 rounded-lg group-hover:brightness-50 transition-all duration-200" alt={project.title} />
                        <div className="absolute inset-0 flex items-center justify-center text-white/40 group-hover:text-red-500 transition-colors"><IoPlayCircleOutline size={32} /></div>
                      </a>
                      
                      <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight leading-tight line-clamp-2 min-h-[32px] sm:min-h-[40px]">{project.title}</h4>
                      <p className="text-neutral-400 text-[10px] sm:text-xs font-sans mt-1 leading-tight line-clamp-3 min-h-[40px] sm:min-h-[48px]">{project.desc}</p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/5 flex flex-col gap-2 w-full font-mono text-[9px] sm:text-xs">
                      <div className="flex justify-between items-center text-neutral-500 uppercase tracking-tight gap-1"><span>Project Focus</span><span style={{ color: '#D4AF37' }} className="truncate font-black text-right">{project.metric.replace('Objective: ', '').replace('Relationship: ', '').replace('Welfare: ', '').replace('Talent: ', '')}</span></div>
                      <a href={project.youtubeUrl} rel="noreferrer" className="w-full mt-1.5 py-1.5 bg-[#041A0E] text-[#D4AF37] border border-[#D4AF37]/20 rounded-xl font-black font-mono uppercase tracking-wider text-[9px] sm:text-[10px] text-center flex items-center justify-center gap-1 shadow-sm transform active:scale-95 transition-all cursor-pointer">Watch Blueprint 🎬</a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
          {activeTab === 'donate' && (
            <div className="w-full max-w-xl mx-auto rounded-2xl border p-4 sm:p-8 text-left box-border shadow-2xl" style={{ background: 'rgba(4, 20, 10, 0.4)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
              <div className="border-b border-white/5 pb-2 mb-4 text-left">
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight flex items-center gap-2"><IoHeartOutline style={{ color: '#D4AF37' }} /> "Brick by Brick" Club Construction Desk</h3>
                <p className="text-neutral-400 text-xs mt-1 leading-normal font-sans">Direct fan contributions fund stadium land purchase, building construction, technical kits, and player welfare logs. All resources flow straight to UWA FC Club Management for transparent execution.</p>
              </div>

              {formSubmitted ? (
                <div className="py-2 text-center space-y-4 animate-fadeIn font-sans text-left">
                  <div className="text-center border-b border-white/5 pb-3">
                    <div className="flex justify-center text-emerald-400 mb-1"><IoCheckmarkCircleOutline size={48} className="animate-bounce" /></div>
                    <h4 className="text-white font-black uppercase text-sm sm:text-base tracking-tight leading-none">Capital Tally Ingested</h4>
                    <p className="text-neutral-400 text-[9px] sm:text-xs mt-1.5">Club Registry Reference Serial:</p>
                    <span className="font-mono text-[#D4AF37] text-xs font-bold uppercase bg-black/40 border border-white/5 px-2.5 py-1 rounded shadow-inner inline-block mt-1">{generatedDonationId || "UWA-BUILD-PENDING"}</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl flex flex-col items-center justify-center max-w-[140px] mx-auto border-2 border-[#D4AF37] shadow-xl">
                    <IoQrCodeOutline size={110} className="text-[#0B4622]" />
                    <span className="text-[7px] text-neutral-500 font-mono font-black uppercase tracking-wider mt-1.5 text-center leading-none">VERIFIED BACKEND REGISTRY</span>
                  </div>
                  <div className="space-y-1 bg-black/30 p-3 sm:p-5 rounded-xl border border-white/5 font-mono text-xs">
                    <p className="text-[#D4AF37] font-bold uppercase tracking-wider text-[9px] sm:text-[11px] mb-2 border-b border-white/5 pb-1">Verified Audit Fields</p>
                    <div className="flex justify-between py-0.5"><span>Supporter Contributor:</span><span className="text-white font-bold">{donatorName}</span></div>
                    <div className="flex justify-between py-0.5"><span>Allocated Objective:</span><span className="text-white font-bold font-sans text-[10px] truncate max-w-[150px]">{selectedObjective}</span></div>
                    <div className="flex justify-between py-0.5"><span>Billing Contact Line:</span><span className="text-white font-mono">{donatorPhone}</span></div>
                    <div className="flex justify-between border-t border-white/5 pt-2 font-sans font-black text-emerald-400 text-sm sm:text-lg"><span>Invoiced Contribution:</span><span>UGX {parseInt(customAmount || "0").toLocaleString()}</span></div>
                    <div className="text-[8px] sm:text-[10px] text-neutral-500 pt-1.5 leading-none truncate border-t border-white/5 mt-2"><strong className="text-neutral-400 font-sans">Club Verification Token:</strong> {verifiedPaymentToken || "SANDBOX_VERIFIED"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-dashed border-emerald-500/30 text-xs text-neutral-400 leading-normal">Stadium Fund 🏟️ <strong>Club Management Transparency Note:</strong> In compliance with internal sports blueprints, development fund allocations are tied straight to club stadium asset lines. Thank you for your support!</div>
                  <div className="flex justify-end pt-1 w-full"><button type="button" onClick={() => { setFormSubmitted(false); setValue('customAmount', '20000'); setGeneratedDonationId(''); setVerifiedPaymentToken(''); }} className="w-full sm:w-auto px-5 py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] font-mono font-black border border-[#D4AF37]/20 rounded-xl text-xs uppercase tracking-wider cursor-pointer text-center transition-all shadow-md transform active:scale-95 duration-150">Make Another Contribution</button></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleHospitalityPurchaseExecution)} className="space-y-4 font-sans text-left">
                  <div>
                    <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Target Development Objective *</label>
                    <select {...register("selectedObjective")} className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer font-mono"><option value="Land Purchase and Construction of UWA FC Stadium" className="bg-[#041A0E]">Land Purchase and Construction of UWA FC Stadium</option><option value="Senior Squad Kit, Training Apparel & Balls Procurement" className="bg-[#041A0E]">Senior Squad Kit, Training Apparel & Balls Procurement</option><option value="First-Team Squad Transport Bus & Medical Welfare Logistics" className="bg-[#041A0E]">First-Team Squad Transport Bus & Medical Welfare Logistics</option></select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1.5">Select Capital Allocation Amount (UGX) *</label>
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">{['20000', '50000', '100000'].map((amt) => (<div key={amt} onClick={() => setValue('customAmount', amt)} className={`p-2.5 rounded-lg border font-black cursor-pointer transition-all duration-150 shadow-md transform active:scale-95 select-none ${customAmount === amt ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]' : 'bg-black/40 border-white/5 text-neutral-400 hover:bg-white/5'}`}>{parseInt(amt).toLocaleString()}</div>))}</div>
                    <input type="number" required {...register("customAmount")} placeholder="Enter custom amount..." className="w-full mt-3 py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full box-border">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Supporter Full Name *</label>
                      <input required type="text" {...register("donatorName")} placeholder="e.g. Lwabya Eric" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono transition-all" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Email Coordinates</label>
                      <input type="email" {...register("donatorEmail")} placeholder="name@domain.com" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full box-border">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Billing Mobile Wallet Line *</label>
                      <input required type="tel" {...register("donatorPhone")} placeholder="e.g., 077XXXXXXX" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Select Operator Node</label>
                      <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setValue('momoProvider', 'mtn')} className={`p-2 rounded-lg border font-mono text-[10px] font-black text-center transition-all cursor-pointer ${momoProvider === 'mtn' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>🟡 MTN MoMo</button><button type="button" onClick={() => setValue('momoProvider', 'airtel')} className={`p-2 rounded-lg border font-mono text-[10px] font-black text-center transition-all cursor-pointer ${momoProvider === 'airtel' ? 'bg-red-600/10 border-red-600 text-red-400 shadow-lg' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>🔴 Airtel Money</button></div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono font-bold text-neutral-400 w-full">
                    <p className="text-[8px] sm:text-[10px] text-neutral-500 text-center md:text-left leading-tight">* Finalize parameters to run prompt sequences. All funds flow directly to UWA FC Club Management.</p>
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#020B05] rounded-xl font-mono font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 cursor-pointer text-center flex-none disabled:opacity-40 select-none">{isSubmitting ? "Processing Prompt..." : `Contribute UGX ${parseInt(customAmount || "0").toLocaleString()} 🚀`}</button>
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
