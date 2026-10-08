import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '../../routes/about/$subSection';
import { 
  IoShieldCheckmarkOutline, IoBusinessOutline, IoPeopleOutline, IoTimeOutline, 
  IoCameraOutline, IoLocationOutline, IoCarOutline, IoCartOutline, 
  IoBriefcaseOutline, IoCalendarOutline, IoMegaphoneOutline, IoHammerOutline,
  IoSparklesOutline, IoCheckmarkCircleOutline, IoCashOutline, IoMapOutline,
  IoFootballOutline, IoAnalyticsOutline
} from 'react-icons/io5';

interface SectionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FacilityCategoryItem {
  id: string;
  label: string;
}

interface InfrastructureAssetItem {
  id: string;
  cat: 'stadium' | 'hq' | 'sport';
  title: string;
  desc: string;
  status: string;
  img: string;
  icon: React.ReactNode;
}

interface PhilosophyItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface BoardMemberItem {
  id: string;
  title: string;
  role: string;
  desc: string;
  status: string;
  img: string;
  icon: React.ReactNode;
}
export default function AboutUsPage() {
  const { subSection } = Route.useParams();
  const navigate = useNavigate();
  
  let activeTab: string = subSection || 'history';
  if (activeTab === 'overview' || activeTab === 'sponsors') {
    activeTab = 'history';
  }

  const [activeFacilityFilter, setActiveFacilityFilter] = useState<string>('all');

  const sections: SectionItem[] = [
    { id: 'history', label: 'Club Profile & History', icon: <IoTimeOutline /> },
    { id: 'management', label: 'Management & Board', icon: <IoPeopleOutline /> },
    { id: 'facilities', label: 'Facilities', icon: <IoBusinessOutline /> },
    { id: 'values', label: 'Club Values', icon: <IoShieldCheckmarkOutline /> }
  ];

  const facilityCategories: FacilityCategoryItem[] = [
    { id: 'all', label: 'All Assets' },
    { id: 'stadium', label: 'Arena & Projects' },
    { id: 'hq', label: 'HQ & Business' },
    { id: 'sport', label: 'Performance' }
  ];

  useEffect(() => {
    const aboutInteractivityId = "uwa-about-breathing-styles";
    if (!document.getElementById(aboutInteractivityId)) {
      const styleNode = document.createElement("style");
      styleNode.id = aboutInteractivityId;
      styleNode.innerHTML = `
        @keyframes uwaAboutCardBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02); }
          50% { transform: scale(1.015); box-shadow: 0 15px 25px -5px rgba(212, 175, 55, 0.12); border-color: rgba(212, 175, 55, 0.3) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .about-breathing-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; animation: uwaAboutCardBreath 5.4s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .about-breathing-card:nth-child(2n) { animation-delay: 0.9s; }
        .about-breathing-card:nth-child(3n) { animation-delay: 1.8s; }
        .about-breathing-card:hover { transform: scale(1.04) translateY(-5px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(4, 26, 14, 0.6) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.22) !important; animation-play-state: paused !important; }
        .about-breathing-card:active { transform: scale(0.96) !important; }
        .about-img-wrap img { transition: transform 0.5s ease !important; }
        .about-breathing-card:hover .about-img-wrap img { transform: scale(1.05) !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);
  const infrastructureAssets: InfrastructureAssetItem[] = [
    {
      id: 'namulonge-rental', cat: 'stadium', title: 'Namulonge Rented Pitch (Current Match Arena)',
      desc: 'Our active home ground facility utilized for seasonal league fixtures. Programmatically managed via an institutional tenancy framework to secure regular matchday operations while our independent long-term projects compile structural stages.',
      status: 'Operational', img: 'facility-namulonge-rental-stadium.jpg', icon: <IoLocationOutline />
    },
    {
      id: 'zirobwe-land', cat: 'stadium', title: 'Proposed Land Purchase (12 Acres in Zirobwe)',
      desc: 'Strategic acquisition project consisting of 12 acres of land in Zirobwe earmarked for upcoming infrastructure. Total acquisition capital is estimated at 400 Million UGX to secure permanent institutional land tenure.',
      status: 'Proposed Purchase (400M UGX)', img: 'facility-zirobwe-land.jpg', icon: <IoMapOutline />
    },
    {
      id: 'uwa-stadium-plan', cat: 'stadium', title: 'Proposed UWA Stadium Construction Plan',
      desc: 'Comprehensive engineering blueprint for our flagship stadium complex. Total project capital expenditure is estimated at 29 Billion UGX, incorporating solar systems, executive dressing rooms, and a modern high-capacity pavilion layout.',
      status: 'Proposed Plan (29B UGX)', img: 'facility-stadium-plan.jpg', icon: <IoCashOutline />
    },
    {
      id: 'parking', cat: 'stadium', title: 'Namulonge Transit Parking Grid',
      desc: 'High-capacity parking networks adjacent to the arena layout. Includes isolated bays allocated for team buses, ambulance emergency access, and official administrative vehicles.',
      status: 'Operational', img: 'facility-parking.jpg', icon: <IoCarOutline />
    },
    {
      id: 'shop', cat: 'hq', title: 'Official UWA FC Club Shop',
      desc: 'The official brick-and-mortar retail center for fans safely housed at the UWA Headquarters in Kamwokya. Fully stocked for fans to purchase physical club kits, corporate badges, and matchday accessories directly.',
      status: 'Operational', img: 'facility-shop.jpg', icon: <IoCartOutline />
    },
    {
      id: 'offices', cat: 'hq', title: 'Club Administrative Offices',
      desc: 'Our central management operations workspace safely housed inside the Uganda Wildlife Authority Headquarters at Plot 7 Kira Road, Kamwokya, Kampala. Houses our technical board desks and finance registry ledger systems.',
      status: 'Operational', img: 'facility-offices.jpg', icon: <IoBriefcaseOutline />
    },
    {
      id: 'conference', cat: 'hq', title: 'Executive Conference Hall',
      desc: 'The premium, climate-controlled meeting boardroom situated at the main UWA Headquarters in Kamwokya. Used for high-profile executive panel councils, official player signing reviews, and strategic board presentations.',
      status: 'Operational', img: 'facility-conference.jpg', icon: <IoCalendarOutline />
    },
    {
      id: 'press', cat: 'stadium', title: 'Media Center & Press Room',
      desc: 'Equipped with heavy broadband internet drops, digital post-match interview presentation backdrops, and private acoustic layouts for regional sports journalists.',
      status: 'Operational', img: 'facility-press.jpg', icon: <IoMegaphoneOutline />
    },
    {
      id: 'training', cat: 'sport', title: 'First-Team Training Grounds',
      desc: 'Elite natural grass fields formatted strictly to match national dimensions, managed daily to accommodate senior flight technical camps and tactical match preparation drills.',
      status: 'Operational', img: 'facility-training.jpg', icon: <IoHammerOutline />
    },
    {
      id: 'academy', cat: 'sport', title: 'Ranger Academy Pitches',
      desc: 'Dedicated technical turf fields secured exclusively to foster grassroots local youth soccer development rosters spanning from U-8 up to U-18 squads.',
      status: 'Operational', img: 'facility-academy.jpg', icon: <IoPeopleOutline />
    },
    {
      id: 'gym', cat: 'sport', title: 'Strength & Conditioning Gym',
      desc: 'A modern physical fitness hub packed with weighted athletic instrumentation, biometric measurement metrics, and sports science muscle loading frameworks.',
      status: 'Operational', img: 'facility-gym.jpg', icon: <IoSparklesOutline />
    },
    {
      id: 'medical', cat: 'sport', title: 'Medical & Treatment Room',
      desc: 'An isolated clinical workspace managed by our team doctors and physiotherapists to coordinate immediate injury diagnostics and player recovery therapy.',
      status: 'Operational', img: 'facility-medical.jpg', icon: <IoCheckmarkCircleOutline />
    }
  ];

  const footballPhilosophy: PhilosophyItem[] = [
    { title: 'Tactical System (The Ranger Way)', desc: 'An assertive, fluid 4-3-3 formation prioritizing compact defensive lines, high-intensity transition press metrics, and disciplined pace adjustments mimicking tactical hunting movements.', icon: <IoFootballOutline /> },
    { title: 'Athletic Conditioning & Endurance', desc: 'Elite high-altitude respiratory loading models combined with sports science resistance training grids to maintain optimal physical intensity through 90+ minute fixture blocks.', icon: <IoAnalyticsOutline /> },
    { title: 'Grassroots Academy Integration', desc: 'A programmatic pathway connecting our U-8 to U-18 technical squads, ensuring standard tactical guidelines flow directly into senior team flight promotion rosters.', icon: <IoPeopleOutline /> }
  ];
  const managementBoard: BoardMemberItem[] = [
    { id: 'pres', title: 'Club President', role: 'Executive Board Desk', desc: 'Directs the overarching corporate governance models, src agency relationships, and multi-year funding assets from the parent authority.', status: 'Active Registry', img: 'board-president.jpg', icon: <IoPeopleOutline /> },
    { id: 'vp', title: 'Vice President', role: 'Executive Board Desk', desc: 'Manages departmental operations, commercial asset development pathways, and corporate social responsibility outreach campaigns.', status: 'Active Registry', img: 'board-vp.jpg', icon: <IoPeopleOutline /> },
    { id: 'coach', title: 'Head Coach', role: 'Technical Bench Director', desc: 'Coordinates first-team squad match selections, technical training camp templates, game tactics, and grassroots development scouting pipelines.', status: 'Active Registry', img: 'board-manager.jpg', icon: <IoHammerOutline /> },
    { id: 'sec', title: 'General Secretary', role: 'Secretariat Bureau', desc: 'Oversees day-to-day regulatory compliance, league relations tracking, data registries, and official press and media communications.', status: 'Active Registry', img: 'board-secretary.jpg', icon: <IoBriefcaseOutline /> },
    { id: 'treas', title: 'Chief Treasurer', role: 'Finance Bureau Desk', desc: 'Manages all corporate accounting pipelines, audit trails, and multi-season infrastructure budgets for the club.', status: 'Active Registry', img: 'board-treasurer.jpg', icon: <IoBriefcaseOutline /> }
  ];

  const filteredFacilities = activeFacilityFilter === 'all' 
    ? infrastructureAssets 
    : infrastructureAssets.filter((item: InfrastructureAssetItem) => item.cat === activeFacilityFilter);
  return (
    <div 
      className="w-full min-h-screen px-2 py-4 sm:px-4 sm:py-12 text-white text-left box-border select-none overflow-x-hidden"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="w-full max-w-7xl mx-auto box-border px-1 sm:px-0">
        
        <div className="flex flex-wrap items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500 w-full whitespace-nowrap overflow-x-auto scrollbar-none">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span className="text-gray-400">About Us</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }} className="capitalize">{activeTab}</span>
        </div>

        <div className="border-b border-white/10 pb-3 mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5">
          <div className="min-w-0 w-full">
            <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
              Institutional Portal
            </span>
            <h2 className="text-lg sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-tight truncate">
              Uganda Wildlife Authority Official Portal
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[9px] sm:text-mono font-mono bg-[#0B4622]/40 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md w-fit text-[#D4AF37] whitespace-nowrap">
            <IoLocationOutline className="text-2xs" />
            <span>UWA HQ: Plot 7 Kira Road, Kamwokya</span>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none w-full box-border touch-pan-x -mx-3 px-3">
          {sections.map((tab: SectionItem) => (
            <button
              key={tab.id}
              onClick={() => navigate({ to: '/about/\$subSection', params: { subSection: tab.id } })}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 flex-none whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#0B4622] text-[#D4AF37]' : 'bg-transparent text-gray-400'
              }`}
              style={{ borderColor: activeTab === tab.id ? '#D4AF37' : 'transparent' }}
            >
              <span className="text-xs flex-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="w-full bg-[#041A0E]/30 backdrop-blur-md rounded-2xl border p-3.5 sm:p-8 box-border" style={{ borderColor: 'rgba(212,175,55,0.12)' }}>
          {activeTab === 'history' && (
            <div className="space-y-5 sm:space-y-8 w-full box-border animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center w-full box-border">
                <div className="space-y-2 leading-relaxed text-gray-300 text-[11px] sm:text-base min-w-0">
                  <h3 className="text-white font-black text-sm sm:text-xl uppercase tracking-wide" style={{ color: '#D4AF37' }}>Founding & Conservation Mission</h3>
                  <p>Established in <strong>2010</strong>, UWA FC serves as the official athletic ambassadors of the Uganda Wildlife Authority. Headquartered inside the central UWA base in <strong>Kamwokya, Kampala</strong>, the club leverages national competitive football platforms to mobilize local communities, run educational campaigns against illegal poaching, and inspire ecosystem preservation throughout Uganda.</p>
                </div>
                <div className="about-breathing-card about-img-wrap w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 relative group flex-none">
                  <img src={new URL('../../assets/home/history_squad.jpg', import.meta.url).href} alt="UWA FC Squad" className="w-full h-full object-cover relative z-10" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 bg-black/10 z-0 text-center p-4"><IoCameraOutline size={24} className="text-[#D4AF37]/40 mb-0.5" /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 border-t border-white/5 pt-4 w-full box-border">
                <div className="about-breathing-card bg-[#0B4622]/10 p-3.5 rounded-xl border border-[#D4AF37]/15 flex flex-col justify-between"><div><h4 className="text-white font-black text-[10px] sm:text-sm uppercase tracking-wider mb-1.5" style={{ color: '#D4AF37' }}>Our Vision</h4><p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed font-medium">To be the leading eco-sports institution, recognized globally for excellence on the pitch and transformational community impact in wildlife conservation in Uganda.</p></div></div>
                <div className="about-breathing-card bg-[#0B4622]/10 p-3.5 rounded-xl border border-[#D4AF37]/15 flex flex-col justify-between"><div><h4 className="text-white font-black text-[10px] sm:text-sm uppercase tracking-wider mb-1.5" style={{ color: '#D4AF37' }}>Our Mission</h4><p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed font-medium">To optimize athletic performance into an active force for conservation. We utilize football to protect protected resources, stop illegal poaching, and turn sports fans into wildlife protectors.</p></div></div>
                <div className="about-breathing-card bg-[#0B4622]/10 p-3.5 rounded-xl border border-[#D4AF37]/15 flex flex-col justify-between"><div><h4 className="text-white font-black text-[10px] sm:text-sm uppercase tracking-wider mb-1.5" style={{ color: '#D4AF37' }}>Club Objectives</h4><ul className="text-gray-300 text-[10px] sm:text-xs leading-relaxed space-y-1 list-disc pl-3.5 font-medium"><li>Secure promotion into elite top-tier national divisions through structural technical camps.</li><li>Utilize home games to broadcast wildlife safety messages to regional sports fans.</li><li>Construct a modern eco-friendly sports complex to foster grassroots youth development.</li></ul></div></div>
              </div>
              <div className="border-t border-white/5 pt-5 space-y-3.5 w-full box-border">
                <h4 className="text-white font-black text-[11px] sm:text-base uppercase tracking-tight flex items-center gap-1"><IoFootballOutline style={{ color: '#D4AF37' }} /> Technical Football Philosophy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full box-border">
                  {footballPhilosophy.map((philosophy: PhilosophyItem, index: number) => (
                    <div key={index} className="about-breathing-card p-3 bg-black/20 border border-white/5 rounded-xl flex items-start gap-2 text-left">
                      <span style={{ color: '#D4AF37' }} className="text-xs pt-0.5 flex-none"><IoFootballOutline /></span>
                      <div className="min-w-0"><h5 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-wide leading-none">{philosophy.title}</h5><p className="text-gray-400 text-[9px] sm:text-xs leading-normal mt-1 font-medium">{philosophy.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'management' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-sm sm:text-xl uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Executive Committee Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full box-border">
                {managementBoard.map((member: BoardMemberItem) => (
                  <div key={member.id} className="about-breathing-card p-4 bg-black/20 rounded-xl border flex flex-col sm:flex-row gap-4 items-stretch sm:items-center box-border w-full" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
                    <div className="about-img-wrap w-full h-64 sm:w-28 lg:w-44 sm:h-28 lg:h-44 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto sm:mx-0">
                      <img src={new URL(`../../assets/home/${member.img}`, import.meta.url).href} alt={member.title} className="w-full h-full object-cover relative z-10" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>)=>{e.currentTarget.style.display='none';}} />
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0"><IoCameraOutline size={22} className="opacity-40 text-[#D4AF37]" /></div>
                    </div>
                    <div className="space-y-1.5 w-full min-w-0 text-left flex flex-col justify-center">
                      <div><span className="inline-block text-[8px] font-mono px-1.5 py-0.5 rounded font-black uppercase border bg-emerald-950/40 border-emerald-500/20 text-emerald-400">Active Registry</span></div>
                      <h5 className="font-extrabold text-white text-xs sm:text-sm flex items-center gap-1.5 mt-0.5 truncate"><span className="text-[#D4AF37] text-sm flex-none">{member.icon}</span><span className="truncate block flex-grow">{member.title}</span></h5>
                      <span className="text-[10px] font-bold font-mono text-[#D4AF37]/80 tracking-wide block uppercase leading-none">{member.role}</span>
                      <p className="text-gray-400 text-xs leading-relaxed font-medium">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'facilities' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none w-full box-border touch-pan-x border-b border-white/5 -mx-3 px-3">
                {facilityCategories.map((fCat: FacilityCategoryItem) => (
                  <button key={fCat.id} onClick={() => setActiveFacilityFilter(fCat.id)} className="px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer flex-none whitespace-nowrap" style={{ backgroundColor: activeFacilityFilter === fCat.id ? '#0B4622' : 'rgba(212,175,55,0.05)', color: activeFacilityFilter === fCat.id ? '#D4AF37' : '#9ca3af', border: activeFacilityFilter === fCat.id ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent' }}>{fCat.label}</button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full box-border">
                {filteredFacilities.map((asset: InfrastructureAssetItem) => (
                  <div key={asset.id} className="about-breathing-card p-4 bg-black/20 rounded-xl border flex flex-col sm:flex-row md:flex-col md:h-full gap-4 items-stretch box-border w-full" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
                    <div className="about-img-wrap w-full h-72 sm:w-52 sm:h-52 md:w-full md:h-80 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto sm:mx-0">
                      <img src={new URL(`../../assets/home/${asset.img}`, import.meta.url).href} alt={asset.title} className="w-full h-full object-cover relative z-10" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>)=>{e.currentTarget.style.display='none';}} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-[8px] font-mono text-center p-1 z-0"><IoCameraOutline size={28}/><span className="mt-0.5 leading-none truncate max-w-full">{asset.img}</span></div>
                    </div>
                    <div className="space-y-2 w-full min-w-0 text-left flex flex-col justify-start md:flex-1">
                      <div><span className={`inline-block text-[7px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded font-black uppercase border ${asset.status === 'Operational' ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' : asset.status.includes('Proposed') ? 'bg-blue-950/50 text-blue-400 border-blue-500/30' : 'bg-amber-950/40 border-[#D4AF37]/20 text-[#D4AF37] animate-pulse'}`}>{asset.status === 'Under Construction' ? 'Future Project • ' : ''}{asset.status}</span></div>
                      <h5 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5 mt-0.5 leading-tight truncate"><span style={{ color: '#D4AF37' }} className="text-sm flex-none">{asset.icon}</span><span className="truncate block flex-grow">{asset.title}</span></h5>
                      <p className="text-gray-400 text-xs leading-relaxed font-medium md:flex-grow">{asset.desc}</p>
                      <span className="text-[8px] font-mono text-gray-500 block pt-1 border-t border-white/5 truncate w-full mt-auto"></span>
                    </div>
                  </div>
                ))}
              </div>
              {filteredFacilities.length === 0 && <div className="w-full text-center py-10 border border-dashed border-white/10 rounded-xl bg-[#041A0E]/10 px-2 animate-fadeIn"><p className="text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest leading-normal">No specific architectural logs found matching this filter tier.</p></div>}
            </div>
          )}
          {activeTab === 'values' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-base sm:text-xl uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Official Institutional Charter</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 w-full box-border">
                <div className="about-breathing-card p-4 rounded-xl bg-black/10 border border-white/5 text-left flex flex-col justify-between"><div><h4 className="font-black text-xs sm:text-sm uppercase text-white mb-1.5" style={{ color: '#D4AF37' }}>Professionalism</h4><p className="text-gray-400 text-xs leading-relaxed font-medium">Maintaining tactical training discipline and strict player code ethics on the pitch to model the elite ranger operations of our parent authority agency.</p></div></div>
                <div className="about-breathing-card p-4 rounded-xl bg-black/10 border border-white/5 text-left flex flex-col justify-between"><div><h4 className="font-black text-xs sm:text-sm uppercase text-white mb-1.5" style={{ color: '#D4AF37' }}>Integrity</h4><p className="text-gray-400 text-xs leading-relaxed font-medium">Ensuring total match transparency and fair play rules while acting as trusted src ambassadors for national anti-poaching initiatives.</p></div></div>
                <div className="about-breathing-card p-4 rounded-xl bg-black/10 border border-white/5 text-left flex flex-col justify-between"><div><h4 className="font-black text-xs sm:text-sm uppercase text-white mb-1.5" style={{ color: '#D4AF37' }}>Teamwork</h4><p className="text-gray-400 text-xs leading-relaxed font-medium">Unifying players, administrative desks, and eco-driven fans to collectively protect our league points and defend Uganda's natural reserves.</p></div></div>
                <div className="about-breathing-card p-4 rounded-xl bg-black/10 border border-white/5 text-left flex flex-col justify-between"><div><h4 className="font-black text-xs sm:text-sm uppercase text-white mb-1.5" style={{ color: '#D4AF37' }}>Excellence</h4><p className="text-gray-400 text-xs leading-relaxed font-medium">Challenging for elite trophies and cup promotions while running high-impact ecosystem and wildlife protection awareness drives.</p></div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
