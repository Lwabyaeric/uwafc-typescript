import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoShieldCheckmarkOutline, 
  IoBriefcaseOutline, 
  IoCheckmarkCircleOutline,
  IoCameraOutline
} from 'react-icons/io5';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export interface CorporatePartnerItem {
  tier: string;
  name: string;
  scope: string;
  file: string;
}

interface SponsorsFormData {
  brandName: string;
  liaisonName: string;
  corporateEmail: string;
  authorizedPhone: string;
  customSponsorshipItem: string;
  intentOverview: string;
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export default function SponsorsPage() {
  const navigate = useNavigate();
  const [proposalSubmitted, setProposalSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const sheetId = "uwa-sponsors-breathing-styles";
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement("style");
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaSpartnerBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02); }
          50% { transform: scale(1.015); box-shadow: 0 15px 25px -5px rgba(212, 175, 55, 0.1); border-color: rgba(212, 175, 55, 0.25) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .sponsor-breathing-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; animation: uwaSpartnerBreath 5.6s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .sponsor-breathing-card:nth-child(2n) { animation-delay: 0.9s; }
        .sponsor-breathing-card:hover { transform: scale(1.03) translateY(-4px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(4, 26, 14, 0.6) !important; box-shadow: 0 20px 30px -5px rgba(212, 175, 55, 0.22) !important; animation-play-state: paused !important; }
        .sponsor-breathing-card:active { transform: scale(0.98) !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<SponsorsFormData>({
    defaultValues: { brandName: "", liaisonName: "", corporateEmail: "", authorizedPhone: "", customSponsorshipItem: "", intentOverview: "" }
  });

  const proposalMutation = useMutation({
    mutationFn: async (data: SponsorsFormData) => {
      return await addDoc(collection(db, "partnerships"), {
        brandName: data.brandName, liaisonName: data.liaisonName, corporateEmail: data.corporateEmail,
        authorizedPhone: data.authorizedPhone, customSponsorshipItem: data.customSponsorshipItem,
        intentOverview: data.intentOverview, submittedAt: serverTimestamp()
      });
    },
    onSuccess: () => { setProposalSubmitted(true); reset(); },
    onError: (error) => {
      console.error("Firestore Transaction Aborted:", error);
      alert("Database connection timed out. Please verify connectivity settings.");
    }
  });

  const corporatePartners: CorporatePartnerItem[] = [
    { tier: "Principal Institutional Sponsor", name: "UGANDA WILDLIFE AUTHORITY", scope: "Direct funding backing, operational infrastructure alignment, and anti-poaching community advocacy integration.", file: "uwa_logo.png" },
    { tier: "Official Tourism Partner", name: "MINISTRY OF TOURISM", scope: "National wildlife destination visibility, ecosystem tracking campaign parameters, and eco-tourism match vouchers.", file: "ministry_tourism.png" },
    { tier: "Governing Football Body", name: "FEDERATION OF UGANDAN FOOTBALL ASSOCIATION", scope: "Regulatory compliance coordination, national league indexing, and professional referee provisioning grids.", file: "fufa_logo.png" },
    { tier: "Fintech Settlement Carrier", name: "MTN MOMO", scope: "Secure automated API core wallet provisioning, real-time ticket checkout clearing, and retail billing layers.", file: "mtn_logo.png" },
    { tier: "Mobile Communications Network", name: "AIRTEL MONEY UG", scope: "Secondary token secure authorization gateways, fan dashboard connectivity packets, and community development financing.", file: "airtel_logo.png" }
  ];

  const onSubmit = (data: SponsorsFormData) => { proposalMutation.mutate(data); };
  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden select-none" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500 w-full whitespace-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="cursor-pointer hover:text-[#D4AF37] block" onClick={() => navigate({ to: '/' })}>Home</span> / <span style={{ color: '#D4AF37' }}>Official Sponsors</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}> Commercial Affiliations & Endorsements</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">Sponsors & Partners</h2>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#041A0E]/20 border max-w-4xl box-border mb-6 sm:mb-8 text-gray-300 text-xs sm:text-sm leading-relaxed border-white/5 shadow-xl">
          <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wide mb-1 flex items-center gap-2">
            <IoShieldCheckmarkOutline style={{ color: '#D4AF37' }} className="flex-shrink-0 text-base" /> Strategic Conservation Alliances
          </h3>
          <p className="font-sans leading-normal text-[11px] sm:text-xs font-medium">UWA FC works in partnership with prominent government bodies and telecommunications providers. Together, we use football's popularity to advance wildlife conservation, support grassroots communities, and maintain standard digital transaction portals across Uganda.</p>
        </div>

        <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="h-4 w-1.5 bg-[#D4AF37] rounded-full"></span> Institutional Partner Register
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 w-full box-border items-stretch mb-8 sm:mb-10">
          {corporatePartners.map((partner, idx) => (
            <div key={idx} className="sponsor-breathing-card p-3 sm:p-5 rounded-2xl border bg-black/20 text-left lg:text-center flex flex-col justify-between gap-3 box-border w-full border-white/5">
              <div className="w-full">
                <div className="h-36 w-36 sm:h-32 sm:w-32 bg-[#041A0E]/60 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 p-3.5 relative group mx-auto lg:mx-auto shadow-inner overflow-hidden">
                  <img src={new URL(`../../assets/sponsors/${partner.file}`, import.meta.url).href} alt={`${partner.name} Logo`} className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 filter saturate-70" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-800 bg-transparent z-0"><IoCameraOutline size={24} className="opacity-30 text-[#D4AF37]" /></div>
                </div>
                <div className="mt-2.5 w-full text-left lg:text-center">
                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-wider block text-[#D4AF37] truncate">{partner.tier}</span>
                  <h4 className="text-white font-black text-xs sm:text-base uppercase tracking-tight leading-tight mt-0.5 truncate">{partner.name}</h4>
                </div>
              </div>
              <p className="text-neutral-400 text-[10px] sm:text-xs leading-normal font-sans font-medium border-t border-white/5 pt-2 line-clamp-3 min-h-[40px] sm:min-h-[48px] text-left lg:text-center">{partner.scope}</p>
            </div>
          ))}
        </div>
        <div className="w-full max-w-2xl mx-auto rounded-2xl border p-4 sm:p-8 text-left box-border sponsor-breathing-card" style={{ background: 'rgba(4, 20, 10, 0.4)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
          {proposalSubmitted ? (
            <div className="py-4 sm:py-6 text-center space-y-4 animate-fadeIn">
              <div className="flex justify-center text-emerald-400"><IoCheckmarkCircleOutline size={48} className="animate-bounce" /></div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">Proposal Logged</h3>
              <p className="text-neutral-400 text-xs leading-normal max-w-md mx-auto font-sans font-medium">Your corporate partnership parameters have been securely committed to the secretariat database logs. The commercial marketing directorate will contact your liaison node within 3 business days.</p>
              <Button type="button" variant="outline" onClick={() => setProposalSubmitted(false)} className="w-full sm:w-auto px-4 py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] border border-[#D4AF37]/20 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 shadow-md cursor-pointer mx-auto block">Submit Another Request</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
              <div className="border-b border-white/5 pb-2 mb-1">
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wide flex items-center gap-2"><IoBriefcaseOutline style={{ color: '#D4AF37' }} className="flex-shrink-0" /> Partnership Proposal Desk</h3>
                <p className="text-neutral-400 text-[10px] sm:text-xs mt-1 leading-normal">Partner with the Wildlife Stars of Uganda to align your brand identity with premier sporting talent and regional eco-conservation advocacy.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Corporate Entity / Brand Name</label>
                  <Input required type="text" {...register("brandName")} placeholder="e.g., National Bank Ltd" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Liaison Officer Full Name</label>
                  <Input required type="text" {...register("liaisonName")} placeholder="Contact Person" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Official Corporate Email</label>
                  <Input required type="email" {...register("corporateEmail")} placeholder="corporate@domain.com" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Authorized Telephone Line</label>
                  <Input required type="tel" {...register("authorizedPhone")} placeholder="e.g., +256 772 000000" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">What would you like to sponsor / provide?</label>
                <Input required type="text" {...register("customSponsorshipItem")} placeholder="e.g., Team Jerseys, Match Balls, Tree Seedlings, Transport Van" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans" />
              </div>
              <div>
                <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Brief Overview of Partnership Intent</label>
                <textarea required { ...register("intentOverview") } rows={3} placeholder="Outline your corporate marketing or CSR objectives..." className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] resize-none font-sans"></textarea>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-col items-center justify-center gap-3 text-xs font-mono font-bold text-gray-400 w-full">
                <p className="text-[8px] sm:text-[10px] text-gray-500 text-center font-sans leading-tight">* Dispatches directly to the Commercial Marketing directorate.</p>
                <Button 
                  disabled={proposalMutation.isPending || isSubmitting}
                  type="submit" 
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-mono font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 text-center flex-none disabled:opacity-40 select-none cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)', color: '#020B05' }}
                >
                  {proposalMutation.isPending || isSubmitting ? "Logging Document..." : "Submit Proposal"}
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
