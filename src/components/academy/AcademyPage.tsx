import React, { useState } from 'react';
import { Route } from '../../routes/academy/$subSection';
import { 
  IoSchoolOutline, 
  IoCardOutline, 
  IoBookOutline, 
  IoRibbonOutline, 
  IoCloudDownloadOutline, 
  IoCalendarOutline,
  IoLocationOutline,
  IoBusinessOutline,
  IoStarOutline,
  IoCameraOutline
} from 'react-icons/io5';

interface AgeGroupItem {
  range: string;
  focus: string;
  schedule: string;
  fee: string;
}

export default function AcademyPage() {
  const { subSection } = Route.useParams();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const ageGroups: AgeGroupItem[] = [
    { 
      range: "U-8 (Ages 5–7)", 
      focus: "Fun & Football Fundamentals", 
      schedule: "Saturdays | 9:00 AM - 11:00 AM", 
      fee: "UGX 250,000 / Term" 
    },
    { 
      range: "U-10 & U-12 (Ages 8–11)", 
      focus: "Technical Skill Acquisition", 
      schedule: "Saturdays & Sundays | 10:00 AM", 
      fee: "UGX 350,000 / Term" 
    },
    { 
      range: "U-14 & U-16 (Ages 12–15)", 
      focus: "Tactical Awareness & High Performance", 
      schedule: "Holiday Camps | Mon to Fri 9:00 AM", 
      fee: "UGX 450,000 / Term" 
    },
    { 
      range: "U-18 (Ages 16–17)", 
      focus: "Elite Pathway to Senior First Team", 
      schedule: "Daily Intensive Training | 4:00 PM", 
      fee: "Senior Club Promotion Track" 
    }
  ];
  return (
    <div className="w-full min-h-screen px-2.5 sm:px-6 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden relative pt-20 md:pt-24 font-sans">
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-tight mb-4 text-neutral-500 w-full whitespace-nowrap overflow-x-auto scrollbar-none">
          <span className="text-neutral-400">Home</span> 
          <span>/</span> 
          <span style={{ color: '#D4AF37' }}>Academy Portal</span> 
          <span>/</span> 
          <span className="text-neutral-300 capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-left">
          <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest block text-[#D4AF37]">Youth Talent Development Core</span>
          <h2 className="text-lg sm:text-3xl font-black uppercase tracking-tight mt-1 leading-none">UWA FC Youth Academy</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none w-full box-border touch-pan-x select-none">
          <button 
            type="button" 
            onClick={() => setActiveTab('overview')} 
            className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'bg-transparent text-neutral-400 border-white/5'}`}
          >
            <IoSchoolOutline size={12} /> Academy Profile
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('register')} 
            className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeTab === 'register' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30 shadow-lg' : 'bg-transparent text-neutral-400 border-white/5'}`}
          >
            <IoCardOutline size={12} /> Registration & Forms
          </button>
        </div>

        <div className="w-full box-border">
          {activeTab === 'overview' && (
            <div className="space-y-6 w-full box-border animate-fadeIn">
              
              <div className="w-full h-64 sm:h-72 lg:h-96 rounded-xl bg-neutral-950 overflow-hidden relative border border-white/5 shadow-2xl flex items-center justify-center select-none group">
                <img 
                  src={new URL(`../../assets/home/academy.jpg`, import.meta.url).href} 
                  alt="UWA Ranger Academy Cadet Training Camp Primary" 
                  className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05] transition-transform duration-500 group-hover:scale-105 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={26} className="opacity-40 text-[#D4AF37]" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-[#020B05] via-transparent to-transparent text-left z-20">
                  <span className="font-mono font-black text-[9px] sm:text-xs uppercase tracking-wider text-[#D4AF37] block">Nurturing Tomorrow's Wildlife Stars of Uganda</span>
                  <h3 className="text-xs sm:text-xl font-black uppercase text-white mt-0.5 tracking-tight leading-tight">Where Football Excellence Meets Conservation</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full box-border mt-5">
                <div className="p-3.5 rounded-xl border bg-[#041A0E]/30 text-left border-white/5 transition-all duration-300 hover:border-white/10">
                  <IoBookOutline size={16} style={{ color: '#D4AF37' }} className="mb-1.5" />
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-tight text-white leading-tight">Nurturing Philosophy</h4>
                  <p className="text-neutral-400 text-[11px] sm:text-xs font-sans mt-1 leading-relaxed">
                    Engineering modern technical soccer training models while embedding civic values, academic discipline, and wildlife preservation awareness natively.
                  </p>
                </div>
                
                <div className="p-3.5 rounded-xl border bg-[#041A0E]/30 text-left border-white/5 transition-all duration-300 hover:border-white/10">
                  <IoCalendarOutline size={16} style={{ color: '#D4AF37' }} className="mb-1.5" />
                  <h4 className="font-black text-xs sm:text-sm uppercase tracking-tight text-white leading-tight">Official Term & Holiday Dates</h4>
                  <p className="text-neutral-400 text-[11px] sm:text-xs font-sans mt-1 leading-relaxed">
                    Runs active weekend training programs during school academic terms, alongside intensive **1-Month Bootcamps** inside secondary school holidays: **May, August, and December**.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border bg-gradient-to-tr from-[#0B4622]/20 to-amber-950/20 text-left border-[#D4AF37]/20 transition-all duration-300 hover:border-[#D4AF37]/40 shadow-inner">
                  <IoStarOutline size={16} style={{ color: '#D4AF37' }} className="mb-1.5" />
                  <h4 className="text-[#D4AF37] font-black text-xs sm:text-sm uppercase tracking-tight leading-tight">Senior Club Promotion Track</h4>
                  <p className="text-neutral-300 text-[11px] sm:text-xs font-sans mt-1 leading-relaxed">
                    We offer an explicit first-team promotion structure: The highest-performing cadet talent will have an **immediate direct pathway** to secure professional contract slots with the **UWA FC Senior Men's Football Club**.
                  </p>
                </div>
              </div>
              <div className="w-full h-64 sm:h-72 lg:h-96 rounded-xl bg-neutral-950 overflow-hidden relative border border-white/5 shadow-2xl flex items-center justify-center select-none group mt-6">
                <img 
                  src={new URL(`../../assets/home/Academy2.jpg`, import.meta.url).href} 
                  alt="UWA Ranger Academy Cadet Training Camp Auxiliary" 
                  className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05] transition-transform duration-500 group-hover:scale-105 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={26} className="opacity-40 text-[#D4AF37]" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-[#020B05] via-transparent to-transparent text-left z-20">
                  <span className="font-mono font-black text-[9px] sm:text-xs uppercase tracking-wider text-[#D4AF37] block">Elite Track Development</span>
                  <h3 className="text-xs sm:text-xl font-black uppercase text-white mt-0.5 tracking-tight leading-tight">Advanced Tactical Technical Camp Systems</h3>
                </div>
              </div>

              <div className="w-full pt-4 mt-2">
                <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight mb-3 pl-0.5 flex items-center gap-1.5 text-left">
                  <span className="h-4 w-1 bg-[#D4AF37] rounded-full"></span> Cadet Age Cohorts Overview
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full box-border items-stretch">
                  {ageGroups.map((group: AgeGroupItem, index: number) => {
                    const isEliteTrack: boolean = group.range === "U-18 (Ages 16–17)";
                    return (
                      <div key={index} className={`p-3.5 rounded-xl border text-left flex flex-col justify-between min-h-[150px] sm:min-h-[170px] box-border relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isEliteTrack ? 'bg-[#0B4622]/15 border-[#D4AF37]/40 shadow-lg' : 'bg-[#041A0E]/20 border-white/5'}`}>
                        <div>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold tracking-tight inline-block ${isEliteTrack ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-neutral-900 text-neutral-400 border-white/5'}`}>{group.range}</span>
                          <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight mt-2 leading-tight line-clamp-2">{group.focus}</h4>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/5 w-full">
                          <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px] uppercase font-bold block leading-none">Schedule Details:</span>
                          <p className="text-neutral-300 font-sans text-[10px] sm:text-xs leading-tight mt-1 min-h-[28px]">{group.schedule}</p>
                          <span className={`font-mono text-xs sm:text-sm font-black block mt-2 ${isEliteTrack ? 'text-[#D4AF37]' : 'text-emerald-400'}`}>{group.fee}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border bg-[#041A0E]/30 text-left border-white/5 w-full box-border transition-all duration-300 hover:border-white/10 mt-4">
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight flex items-center gap-1.5"><span className="text-[#D4AF37]">✔</span> Tuition & Uniform Policies</h4>
                <p className="text-neutral-400 text-[11px] sm:text-xs font-sans mt-1.5 leading-relaxed">
                  • <strong>Admission Fee (One-time):</strong> UGX 50,000 (Covers 1 complete official branded uniform training kit set). <br />
                  • <strong>Sibling Waiver Benefit:</strong> A 15% discount is automatically deducted from the termly tuition balance of a second child registered from the same household.
                </p>
              </div>

            </div>
          )}

          {activeTab === 'register' && (
            <div className="w-full max-w-3xl mx-auto space-y-4 box-border animate-fadeIn">
              
              <div className="p-4 rounded-xl border bg-gradient-to-br from-[#041A0E] via-black/40 to-amber-950/20 border-[#D4AF37]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] text-neutral-300 text-left box-border">
                <div className="space-y-1">
                  <span className="text-[#D4AF37] font-black uppercase tracking-wider block text-[9px] sm:text-[10px]">Google Drive Cloud Storage Locker</span>
                  <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight mt-0.5">Download Cadet Enrollment Form</h3>
                  <p className="text-neutral-400 font-sans text-[10px] sm:text-xs leading-relaxed mt-1">
                    Click the official download link below to access the hardcopy registration file packet stored on our Drive disk. Print it out, append parent authorizations, and fill in emergency medical indicators.
                  </p>
                </div>
                
                <a 
                 href="https://drive.google.com/uc?export=download&id=1yEhP-8CglEHBcLYvHgpwOGjvjGdXRXkO" 
                    download
                     rel="noreferrer" 
                 className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#0B4622] text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#073016] transition-all flex-none cursor-pointer text-center"
                  >
                 Download Registration Form 📥
                     </a>

              </div>
              <div className="w-full p-4 rounded-xl border bg-black/30 border-white/5 text-left box-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl transition-all duration-300 hover:border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider">
                    <IoBusinessOutline size={14} /> Institutional Office Delivery Port
                  </div>
                  <h4 className="text-white font-black text-sm sm:text-base uppercase tracking-tight mt-0.5">Physical Hardcopy Submission</h4>
                  <p className="text-neutral-400 text-[10px] sm:text-xs font-sans leading-relaxed max-w-xl">
                    To maintain strict accounting compliance and familiarize all academy families with the Uganda Wildlife Authority's corporate structure, printed forms along with termly uniform/kit fees must be submitted physically by parents at our main office registry counter.
                  </p>
                </div>
                
                <div className="flex-none bg-black/40 border border-white/5 p-3 rounded-xl font-mono text-[9px] sm:text-[10px] text-neutral-300 space-y-1 w-full sm:w-auto sm:min-w-[210px] text-left">
                  <div className="flex gap-1 items-start">
                    <IoLocationOutline size={12} className="text-[#D4AF37] flex-none mt-0.5" /> 
                    <span><strong>UWA Main Headquarters Desk:</strong><br />Plot 7 Kira Road, Kamwokya, Kampala</span>
                  </div>
                  <div className="pt-1 border-t border-white/5 text-neutral-500">🕒 Mon - Fri | 8:00 AM - 5:00 PM</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-dashed border-amber-500/20 bg-amber-950/10 text-left text-[10px] sm:text-xs text-amber-400/90 leading-relaxed font-sans w-full box-border">
                <strong>Ranger Registry Notice:</strong> Drop-off rosters fill up fast before school holiday cycles. Parents are requested to finalize desk submissions at least two weeks before training bootcamps kick off in May, August, or December to secure official branded kit apparel sizing.
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
