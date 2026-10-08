import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { 
  IoPeopleOutline, 
  IoFlameOutline, 
  IoShieldCheckmarkOutline, 
  IoChatboxEllipsesOutline,
  IoCheckmarkCircleOutline,
  IoCallOutline,
  IoLogoWhatsapp,
  IoCameraOutline,
  IoMapOutline,
  IoLocationOutline
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

interface CommitteeMemberItem {
  role: string;
  name: string;
  bio: string;
  img: string;
}

interface FanChapterItem {
  chapter: string;
  leader: string;
  base: string;
  activeMembers: string;
  phone: string;
  wa: string;
}

interface GrievanceFormData {
  senderName: string;
  senderContact: string;
  associatedChapter: string;
  grievanceTopic: string;
  grievanceMessage: string;
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
export default function FansLeadershipPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<string>('council');
  const [grievanceSubmitted, setGrievanceSubmitted] = React.useState<boolean>(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<GrievanceFormData>({
    defaultValues: {
      associatedChapter: 'Murchison Falls NP Chapter',
      grievanceTopic: 'Matchday Facility Feedback'
    }
  });

  useEffect(() => {
    const sheetId = 'uwa-leadership-breath';
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement('style');
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaEcosystemBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
          50% { transform: scale(1.015); box-shadow: 0 16px 24px -6px rgba(212, 175, 55, 0.06); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .ecosystem-breath-card { animation: uwaEcosystemBreath 6.2s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .ecosystem-breath-card:nth-child(2n) { animation-delay: 1.5s; }
        .ecosystem-breath-card:nth-child(3n) { animation-delay: 3s; }
        .ecosystem-breath-card:hover { transform: scale(1.025) translateY(-3px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  const grievanceMutation = useMutation({
    mutationFn: async (data: GrievanceFormData) => {
      return await addDoc(collection(db, "grievances"), {
        fullName: data.senderName,
        contactNode: data.senderContact,
        originChapter: data.associatedChapter,
        category: data.grievanceTopic,
        narrativeMessage: data.grievanceMessage,
        ticketReference: "UWA-TKT-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: serverTimestamp()
      });
    },
    onSuccess: () => {
      setGrievanceSubmitted(true);
      reset();
    },
    onError: (err) => {
      console.error("Firebase Sync Blockage: ", err);
      alert("Submission timed out. Please check your internet connection.");
    }
  });

  const committeeMembers: CommitteeMemberItem[] = [
    { role: "Chairperson", name: "Hon. Mukasa Godfrey", bio: "Veteran wildlife advocate leading mobilization strategies across Central Uganda.", img: "chair-person.jpg" },
    { role: "Vice Chairperson", name: "Namatovu Florence", bio: "Coordinating youth inclusion and sports tourism outreach portfolios.", img: "vp-chairperson.jpg" },
    { role: "Matchday Coordinator", name: "Ondoga Patrick", bio: "Managing stadium choreography, tifos, away transport, and fan safety.", img: "cordinator.jpg" }
  ];

  const fanChapters: FanChapterItem[] = [
    { chapter: "Murchison Falls NP Chapter", leader: "Warden Okello Richard", base: "Paraa Hub Sector", activeMembers: "850 Fans", phone: "+256772000101", wa: "256772000101" },
    { chapter: "Queen Elizabeth NP Chapter", leader: "Asiimwe Harriet", base: "Mweya Logistics Desk", activeMembers: "790 Fans", phone: "+256772000102", wa: "256772000102" },
    { chapter: "Bwindi Impenetrable NP Chapter", leader: "Mwesigwa Emmanuel", base: "Buhoma Community Node", activeMembers: "620 Fans", phone: "+256772000103", wa: "256772000103" },
    { chapter: "Kidepo Valley NP Chapter", leader: "Lokiru John Bosco", base: "Apoka Northern Outpost", activeMembers: "410 Fans", phone: "+256772000104", wa: "256772000104" },
    { chapter: "Kibale National Park Chapter", leader: "Kanyunyuzi Joan", base: "Fort Portal Fan Core", activeMembers: "530 Fans", phone: "+256772000105", wa: "256772000105" },
    { chapter: "Lake Mburo National Park Chapter", leader: "Rukundo Arthur", base: "Kiruhura Transit Point", activeMembers: "480 Fans", phone: "+256772000106", wa: "256772000106" },
    { chapter: "Mgahinga Gorilla NP Chapter", leader: "Nsubuga Innocent", base: "Kisoro Frontier Base", activeMembers: "310 Fans", phone: "+256772000107", wa: "256772000107" },
    { chapter: "Mount Elgon National Park Chapter", leader: "Cheptegei Silas", base: "Mbale Mobilization Desk", activeMembers: "590 Fans", phone: "+256772000108", wa: "256772000108" },
    { chapter: "Rwenzori Mountains NP Chapter", leader: "Baluku Juma", base: "Kasese Foothill Enclave", activeMembers: "440 Fans", phone: "+256772000109", wa: "256772000109" },
    { chapter: "Semuliki National Park Chapter", leader: "Kabahenda Beatrice", base: "Bundibugyo Fan Outpost", activeMembers: "280 Fans", phone: "+256772000110", wa: "256772000110" },
    { chapter: "Central Region Chapter", leader: "Lwanga Ssempijja Eric", base: "Kampala HQ Main Hub", activeMembers: "2,450 Fans", phone: "+256701000111", wa: "256701000111" },
    { chapter: "International Diaspora Chapter", leader: "Dr. Nabakooza Sarah", base: "Global Wildlife Stars Of Uganda Registry", activeMembers: "390 Fans", phone: "+256701000112", wa: "256701000112" }
  ];

  const onSubmit = (data: GrievanceFormData) => {
    grievanceMutation.mutate(data);
  };
  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden relative" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex flex-wrap items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-tight mb-4 text-neutral-500 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-auto whitespace-nowrap">
          <span className="text-neutral-400">Home</span> / <span style={{ color: '#D4AF37' }}>Fans Portal</span> / <span className="text-neutral-300 capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Institutional Supporter Networks</span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">Fans Council Ecosystem</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full box-border touch-pan-x">
          <button type="button" onClick={() => setActiveTab('council')} className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all border flex items-center gap-1.5 flex-none whitespace-nowrap cursor-pointer ${activeTab === 'council' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'bg-transparent text-neutral-400 border-transparent hover:bg-white/5'}`}>
            <IoPeopleOutline size={12} /> Committee & Branches
          </button>
          <button type="button" onClick={() => setActiveTab('guidelines')} className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all border flex items-center gap-1.5 flex-none whitespace-nowrap cursor-pointer ${activeTab === 'guidelines' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'bg-transparent text-neutral-400 border-transparent hover:bg-white/5'}`}>
            <IoShieldCheckmarkOutline size={12} /> Supporter Code
          </button>
          <button type="button" onClick={() => setActiveTab('grievance')} className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs uppercase font-black font-mono tracking-wider transition-all border flex items-center gap-1.5 flex-none whitespace-nowrap cursor-pointer ${activeTab === 'grievance' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'text-gray-400 border-transparent hover:bg-white/5'}`}>
            <IoChatboxEllipsesOutline size={12} /> Grievances Desk
          </button>
        </div>

        <div className="w-full box-border">
          {activeTab === 'council' && (
            <div className="space-y-8 w-full box-border animate-fadeIn">
              
              <div>
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-3.5 w-1.5 bg-[#D4AF37] rounded-full"></span> Executive Committee
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full box-border">
                  {committeeMembers.map((member: CommitteeMemberItem, idx: number) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl border bg-[#041A0E]/20 flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-stretch text-center gap-4 box-border w-full border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300 shadow-md"
                    >
                      <div className="w-full h-44 sm:w-28 sm:h-28 md:w-full md:h-44 rounded-xl overflow-hidden bg-neutral-900 border border-white/5 flex-none relative group mx-auto sm:mx-0 shadow-inner">
                        <img 
                          src={new URL(`../../assets/home/${member.img}`, import.meta.url).href} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 relative z-10 filter saturate-70" 
                          alt={member.name} 
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                          <IoCameraOutline size={24} className="opacity-40 text-[#D4AF37]" />
                        </div>
                      </div>

                      <div className="text-left sm:text-left md:text-center min-w-0 flex flex-col justify-center space-y-0.5 flex-1">
                        <span className="text-[9px] font-mono font-black uppercase tracking-wider block" style={{ color: '#D4AF37' }}>{member.role}</span>
                        <h4 className="text-white font-black text-sm uppercase tracking-tight leading-tight truncate">{member.name}</h4>
                        <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed font-sans line-clamp-4 sm:line-clamp-3 font-medium">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-3.5 w-1.5 bg-[#D4AF37] rounded-full"></span> National Chapters Matrix
                </h3>
                
                {/* 📱 Mobile Grid Columns Adjusted to Side-by-Side 2 Layout Fix Matrix */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 w-full box-border items-stretch">
                  {fanChapters.map((ch: FanChapterItem, idx: number) => (
                    <div 
                      key={idx} 
                      className="p-3 sm:p-5 rounded-2xl border bg-[#031109]/40 flex flex-col justify-between gap-3 min-h-[160px] sm:min-h-[180px] box-border w-full border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300"
                    >
                      <div className="space-y-1 w-full text-left min-w-0">
                        <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] font-mono font-black text-[#D4AF37] uppercase tracking-wider">
                          <IoMapOutline size={12} className="shrink-0" />
                          <span className="truncate block">{ch.chapter.replace(' National Park', '').replace(' Mountains', '')}</span>
                        </div>
                        <h5 className="text-white font-black text-xs sm:text-base uppercase tracking-tight mt-0.5 leading-tight truncate">{ch.leader}</h5>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 truncate font-medium">
                          <IoLocationOutline size={10} className="text-emerald-500 shrink-0" />
                          <span className="truncate block">{ch.base}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 space-y-2 w-full">
                        <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                          <span>REGISTRY</span>
                          <span className="text-emerald-400">{ch.activeMembers}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1.5 w-full box-border">
                          <a 
                            href={`tel:${ch.phone}`} 
                            className="p-1.5 rounded-lg bg-[#0B4622]/40 hover:bg-[#0B4622] text-white border border-[#D4AF37]/20 flex items-center justify-center gap-1 text-[9px] font-mono font-black uppercase transition-all tracking-wider text-center cursor-pointer transform active:scale-95 shadow-sm"
                          >
                            <IoCallOutline size={11} className="text-[#D4AF37]" /> Call
                          </a>
                          <a 
                            href={`https://wa.me{ch.wa}`} 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900 text-white border border-emerald-500/20 flex items-center justify-center gap-1 text-[9px] font-mono font-black uppercase transition-all tracking-wider text-center cursor-pointer transform active:scale-95 shadow-sm"
                          >
                            <IoLogoWhatsapp size={11} className="text-emerald-400" /> Chat
                          </a>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'guidelines' && (
            <div className="max-w-xl mx-auto rounded-2xl border p-4 sm:p-6 text-left box-border space-y-4 bg-[#041A0E]/30 animate-fadeIn shadow-2xl" style={{ borderColor: 'rgba(212, 175, 55, 0.15)' }}>
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight">The Wildlife Stars of Uganda Fans Code of Conduct</h3>
                <p className="text-gray-500 text-[9px] sm:text-xs mt-0.5">Official guidelines regulating authorized mobilization tasks at UWA FC installations.</p>
              </div>
              <div className="space-y-3.5 text-xs text-neutral-300 font-sans leading-relaxed">
                <div className="flex gap-2 items-start">
                  <span className="text-[#D4AF37] font-mono font-bold">01.</span>
                  <p><strong className="text-white uppercase tracking-tight text-[10px] sm:text-xs block">Wildlife Conservation Branding:</strong> Promote environmental stewardship alongside sports matches. Avoid materials compromising Uganda Wildlife Authority identity parameters.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#D4AF37] font-mono font-bold">02.</span>
                  <p><strong className="text-white uppercase tracking-tight text-[10px] sm:text-xs block">Stadium Discipline:</strong> Matchday chants, tifo choreography, and mobilization procedures must maintain maximum administrative order. Violence or unsporting flags results in instant registry termination.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#D4AF37] font-mono font-bold">03.</span>
                  <p><strong className="text-white uppercase tracking-tight text-[10px] sm:text-xs block">Chapter Alignment:</strong> All local operations inside park borders (Murchison Falls, Queen Elizabeth, etc.) must remain coordinated with designated park sector wardens.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grievance' && (
            <div className="w-full max-w-xl mx-auto rounded-2xl border p-4 sm:p-6 text-left box-border animate-fadeIn shadow-2xl" style={{ background: 'rgba(4, 20, 10, 0.4)', borderColor: 'rgba(212, 175, 55, 0.15)' }}>
              {grievanceSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <IoCheckmarkCircleOutline size={48} className="text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">Grievance Ticket Generated</h3>
                  <p className="text-neutral-400 text-xs max-w-sm mx-auto font-sans leading-normal">
                    Your dispatch payload has been safely submitted. Technical steering desks will review the record variables and cross-check matching logs with your local park branch management layers.
                  </p>
                  <button type="button" onClick={() => setGrievanceSubmitted(false)} className="px-4 py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] border border-[#D4AF37]/20 font-mono font-black rounded-xl text-[10px] sm:text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all duration-150 transform active:scale-95">
                    File Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="text-white font-black text-sm uppercase tracking-tight">Feedback & Grievances Desk</h3>
                    <p className="text-gray-500 text-[9px] sm:text-xs mt-0.5">Submit feedback or operational requests straight to the club secretariat.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Your Identity Name</label>
                      <input required type="text" {...register("senderName")} placeholder="e.g., Kato Hussein" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Contact Node (Mobile/Email)</label>
                      <input required type="text" {...register("senderContact")} placeholder="e.g., +256701XXXXXX" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Associated Fan Chapter</label>
                      <select {...register("associatedChapter")} className="w-full py-2 px-3 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer font-mono">
                        {fanChapters.map((ch: FanChapterItem, i: number) => (
                          <option key={i} className="bg-neutral-900 text-white" value={ch.chapter}>{ch.chapter.replace(' National Park', '')}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Topic Classification</label>
                      <select {...register("grievanceTopic")} className="w-full py-2 px-3 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer font-mono">
                        <option className="bg-neutral-900 text-white" value="Matchday Facility Feedback">Matchday Facility Feedback</option>
                        <option className="bg-neutral-900 text-white" value="Transport Logistics Delay">Transport Logistics Delay</option>
                        <option className="bg-neutral-900 text-white" value="Registry Card Issuance Issue">Registry Card Issuance Issue</option>
                        <option className="bg-neutral-900 text-white" value="General Institutional Inquiry">General Institutional Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-mono font-black tracking-wider text-neutral-400 block mb-1">Narrative Description</label>
                    <textarea required rows={3} {...register("grievanceMessage")} placeholder="Type details regarding matchday logs or chapter operational requests here..." className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans resize-none" />
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono font-bold text-neutral-400 w-full">
                    <p className="text-center sm:text-left leading-tight">* Your ticket registry triggers verified administrative notifications immediately upon upload.</p>
                    <button type="submit" disabled={grievanceMutation.isPending} className="w-full sm:w-auto py-2.5 px-5 bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#020B05] rounded-xl font-mono font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 cursor-pointer text-center flex-none disabled:opacity-40 select-none">
                      {grievanceMutation.isPending ? "Uploading Payload..." : "Submit Dispatch"}
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
