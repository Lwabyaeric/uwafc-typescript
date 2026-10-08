import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoRibbonOutline, 
  IoGridOutline, 
  IoCalendarOutline, 
  IoStarOutline, 
  IoMedalOutline,
  IoCameraOutline
} from 'react-icons/io5';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TrophyItem {
  id: string;
  name: string;
  tier: 'league' | 'cup' | 'individual';
  season: string;
  desc: string;
  img: string;
}

export default function HonoursPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const imgDir: string = "/assets/images/about/";

  const categories: CategoryItem[] = [
    { id: 'all', label: 'Trophy Cabinet', icon: <IoGridOutline /> },
    { id: 'league', label: 'League Titles', icon: <IoRibbonOutline /> },
    { id: 'cup', label: 'Cup Victories', icon: <IoMedalOutline /> },
    { id: 'individual', label: 'Individual Awards', icon: <IoStarOutline /> }
  ];

  const trophies: TrophyItem[] = [
    { 
      id: "t1", 
      name: "FUFA Fourth Division Championship", 
      tier: "league", 
      season: "2024/2025", 
      desc: "District League Champions. Finished top of the table to secure promotion to the regional competitive brackets.", 
      img: "../../assets/home/trophy1.jpg" 
    },
    { 
      id: "t2", 
      name: "FUFA Fifth Division League Title", 
      tier: "league", 
      season: "2021/2022", 
      desc: "Sub-County Champions. Undefeated home record throughout the entire promotional tournament tier.", 
      img: "../../assets/home/trophy2.jpg"
    },
    { 
      id: "t3", 
      name: "DFA District Promotional Cup Shield", 
      tier: "cup", 
      season: "2023/2024", 
      desc: "Knockout Shield Champions. Clinched the trophy with a dramatic clean-sheet performance in the final match.", 
      img: "../../assets/home/trophy3.jpg"
    },
    { 
      id: "t4", 
      name: "Buganda Regional League Fair Play Award", 
      tier: "individual", 
      season: "2025/2026", 
      desc: "Recognized nationally by FUFA for exemplary athletic discipline, zero red card logs, and conservation promotion.", 
      img: "../../assets/home/trophy4.jpg" 
    }
  ];

  const targetTrophies = activeCategory === 'all' 
    ? trophies 
    : trophies.filter((t: TrophyItem) => t.tier === activeCategory);

  return (
    <div 
      className="w-full min-h-screen px-3 py-6 sm:px-4 sm:py-12 text-white text-left box-border select-none font-sans"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-5 text-gray-500 w-full">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>Honours & Trophies</span>
        </div>

        <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
              Historical Milestones & Cabinet
            </span>
            <h2 className="text-xl sm:text-4xl font-black uppercase tracking-wide mt-1 leading-tight">
              Honours & Achievements
            </h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none w-full box-border touch-pan-x">
          {categories.map((cat: CategoryItem) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 flex-none whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-[#0B4622] text-[#D4AF37]' : 'bg-transparent text-gray-400'
              }`}
              style={{ borderColor: activeCategory === cat.id ? '#D4AF37' : 'transparent' }}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full box-border items-stretch mb-10">
          {targetTrophies.map((trophy: TrophyItem) => (
            <div 
              key={trophy.id}
              className="bg-[#041A0E]/30 backdrop-blur-md rounded-2xl border border-white/5 p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center box-border w-full transition-all duration-200 hover:border-[#D4AF37]/20"
              style={{ borderColor: 'rgba(212, 175, 55, 0.08)' }}
            >
              
              <div className="w-full h-64 sm:w-28 lg:w-44 sm:h-28 lg:h-44 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto sm:mx-0 shadow-md">
                <div 
                  className="absolute inset-0 w-16 h-16 rounded-full blur-xl mx-auto my-auto opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                />
                
                <img 
                  src={trophy.img} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 rounded-lg filter drop-shadow-md relative z-10" 
                  alt={trophy.name} 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={22} className="opacity-40 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex flex-col justify-between flex-grow w-full space-y-1.5 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
                    🏆 Campaign: {trophy.season}
                  </span>
                  <h4 className="text-white font-black text-sm uppercase tracking-wide mt-0.5 leading-snug line-clamp-2">
                    {trophy.name}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium line-clamp-4 sm:line-clamp-3 md:line-clamp-none">
                    {trophy.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest flex justify-between items-center w-full">
                  <span>Category Classification</span>
                  <span style={{ color: '#D4AF37' }}>{trophy.tier}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
        <div className="w-full box-border pt-6 border-t border-white/10 mt-8">
          <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-4 flex items-center gap-2 text-left">
            <span className="h-4 w-1 bg-[#D4AF37] rounded-full"></span> All-Time Club Records
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full box-border items-stretch">
            
            <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center box-border w-full transition-colors hover:border-[#D4AF37]/10" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
              <div className="w-full h-72 sm:w-28 lg:w-28 sm:h-28 lg:h-28 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto shadow-md">
                <img 
                  src={new URL(`../../assets/home/appearances.jpg`, import.meta.url).href} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>)=>{e.currentTarget.style.display='none';}}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={20} className="opacity-40 text-[#D4AF37]" />
                </div>
              </div>
              <div className="space-y-1 w-full min-w-0 text-left flex flex-col justify-center">
                <span className="text-[9px] font-mono font-bold uppercase text-gray-500 block tracking-wider leading-none">Most Matches Played</span>
                <h4 className="text-white font-black text-sm uppercase tracking-tight mt-1 truncate">Kisekka Ronald</h4>
                <p className="text-xs text-gray-400 font-medium font-sans leading-tight">142 Official Match Logs</p>
                <div className="mt-2 text-[9px] font-mono font-bold uppercase tracking-wide text-[#D4AF37]">Defender • 2019 - Present</div>
              </div>
            </div>

            <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center box-border w-full transition-colors hover:border-[#D4AF37]/10" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
              <div className="w-full h-72 sm:w-28 lg:w-28 sm:h-28 lg:h-28 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto shadow-md">
                <img 
                  src={new URL(`../../assets/home/record-scorer.jpg`, import.meta.url).href} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>)=>{e.currentTarget.style.display='none';}}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={20} className="opacity-40 text-[#D4AF37]" />
                </div>
              </div>
              <div className="space-y-1 w-full min-w-0 text-left flex flex-col justify-center">
                <span className="text-[9px] font-mono font-bold uppercase text-gray-500 block tracking-wider leading-none">All-Time Top Scorer</span>
                <h4 className="text-white font-black text-sm uppercase tracking-tight mt-1 truncate">Ssekasanvu Charles</h4>
                <p className="text-xs text-gray-400 font-medium font-sans leading-tight">58 Competitive Goals</p>
                <div className="mt-2 text-[9px] font-mono font-bold uppercase tracking-wide text-[#D4AF37]">Striker • 2021 - Present</div>
              </div>
            </div>

            <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center box-border w-full transition-colors hover:border-[#D4AF37]/10" style={{ borderColor: 'rgba(212,175,55,0.08)' }}>
              <div className="w-full h-72 sm:w-28 lg:w-28 sm:h-28 lg:h-28 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto shadow-md">
                <img 
                  src={new URL(`../../assets/home/clean-sheet.jpg`, import.meta.url).href} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>)=>{e.currentTarget.style.display='none';}}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={20} className="opacity-40 text-[#D4AF37]" />
                </div>
              </div>
              <div className="space-y-1 w-full min-w-0 text-left flex flex-col justify-center">
                <span className="text-[9px] font-mono font-bold uppercase text-gray-500 block tracking-wider leading-none">Most Clean Sheets</span>
                <h4 className="text-white font-black text-sm uppercase tracking-tight mt-1 truncate">Oloya Emmanuel</h4>
                <p className="text-xs text-gray-400 font-medium font-sans leading-tight">34 Matches Unbeaten</p>
                <div className="mt-2 text-[9px] font-mono font-bold uppercase tracking-wide text-[#D4AF37]">Goalkeeper • 2022 - Present</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
