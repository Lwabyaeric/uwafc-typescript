import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoBusinessOutline, IoHammerOutline, IoSparklesOutline, IoCarOutline,
  IoBriefcaseOutline, IoCartOutline, IoMegaphoneOutline, IoPeopleOutline,
  IoCalendarOutline, IoLocationOutline, IoCameraOutline, IoCheckmarkCircleOutline,
  IoCashOutline, IoMapOutline
} from 'react-icons/io5';

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

export default function FacilitiesPage() {
  const navigate = useNavigate();
  const [activeFacilityFilter, setActiveFacilityFilter] = useState<string>('all');

  const facilityCategories: FacilityCategoryItem[] = [
    { id: 'all', label: 'All Assets' },
    { id: 'stadium', label: 'Arena & Projects' },
    { id: 'hq', label: 'HQ & Business' },
    { id: 'sport', label: 'Performance & Training' }
  ];
  const infrastructureAssets: InfrastructureAssetItem[] = [
    {
      id: 'namulonge-rental',
      cat: 'stadium',
      title: 'Namulonge Rented Pitch (Current Match Arena)',
      desc: 'Our active home ground facility utilized for seasonal league fixtures. Programmatically managed via an institutional tenancy framework to secure regular matchday operations while our independent long-term projects compile structural stages.',
      status: 'Operational',
      img: 'facility-namulonge-rental-stadium.jpg',
      icon: <IoLocationOutline />
    },
    {
      id: 'zirobwe-land',
      cat: 'stadium',
      title: 'Proposed Land Purchase (12 Acres in Zirobwe)',
      desc: 'Strategic acquisition project consisting of 12 acres of land in Zirobwe earmarked for upcoming infrastructure. Total acquisition capital is estimated at 400 Million UGX to secure permanent institutional land tenure.',
      status: 'Proposed Purchase (400M UGX)',
      img: 'facility-zirobwe-land.jpg',
      icon: <IoMapOutline />
    },
    {
      id: 'uwa-stadium-plan',
      cat: 'stadium',
      title: 'Proposed UWA Stadium Construction Plan',
      desc: 'Comprehensive engineering blueprint for our flagship stadium complex. Total project capital expenditure is estimated at 29 Billion UGX, incorporating solar systems, executive dressing rooms, and a modern high-capacity pavilion layout.',
      status: 'Proposed Plan (29B UGX)',
      img: 'facility-stadium-plan.jpg',
      icon: <IoCashOutline />
    },
    {
      id: 'parking',
      cat: 'stadium',
      title: 'Namulonge Transit Parking Grid',
      desc: 'High-capacity parking networks adjacent to the arena layout. Includes isolated bays allocated for team buses, ambulance emergency access, and official administrative vehicles.',
      status: 'Operational',
      img: 'facility-parking.jpg',
      icon: <IoCarOutline />
    },
    {
      id: 'shop',
      cat: 'hq',
      title: 'Official UWA FC Club Shop',
      desc: 'The official brick-and-mortar retail center for fans safely housed at the UWA Headquarters in Kamwokya. Fully stocked for fans to purchase physical club kits, corporate badges, and matchday accessories directly.',
      status: 'Operational',
      img: 'facility-shop.jpg',
      icon: <IoCartOutline />
    },
    {
      id: 'offices',
      cat: 'hq',
      title: 'Club Administrative Offices',
      desc: 'Our central management operations workspace safely housed inside the Uganda Wildlife Authority (UWA) Headquarters at Plot 7 Kira Road, Kamwokya, Kampala. Houses our technical board desks and finance registry ledger systems.',
      status: 'Operational',
      img: 'facility-offices.jpg',
      icon: <IoBriefcaseOutline />
    },
    {
      id: 'conference',
      cat: 'hq',
      title: 'Executive Conference Hall',
      desc: 'The premium, climate-controlled meeting boardroom situated at the main UWA Headquarters in Kamwokya. Used for high-profile executive panel councils, official player signing reviews, and strategic board presentations.',
      status: 'Operational',
      img: 'facility-conference.jpg',
      icon: <IoCalendarOutline />
    },
    {
      id: 'press',
      cat: 'stadium',
      title: 'Media Center & Press Room',
      desc: 'Equipped with heavy broadband internet drops, digital post-match interview presentation backdrops, and private acoustic layouts for regional sports journalists.',
      status: 'Operational',
      img: 'facility-press.jpg',
      icon: <IoMegaphoneOutline />
    },
    {
      id: 'training',
      cat: 'sport',
      title: 'First-Team Training Grounds',
      desc: 'Elite natural grass fields formatted strictly to match national dimensions, managed daily to accommodate senior flight technical camps and tactical match preparation drills.',
      status: 'Operational',
      img: 'facility-training.jpg',
      icon: <IoHammerOutline />
    },
    {
      id: 'academy',
      cat: 'sport',
      title: 'Ranger Academy Pitches',
      desc: 'Dedicated technical turf fields secured exclusively to foster grassroots local youth soccer development rosters spanning from U-8 up to U-18 squads.',
      status: 'Operational',
      img: 'facility-academy.jpg',
      icon: <IoPeopleOutline />
    },
    {
      id: 'gym',
      cat: 'sport',
      title: 'Strength & Conditioning Gym',
      desc: 'A modern physical fitness hub packed with weighted athletic instrumentation, biometric measurement metrics, and sports science muscle loading frameworks.',
      status: 'Operational',
      img: 'facility-gym.jpg',
      icon: <IoSparklesOutline />
    },
    {
      id: 'medical',
      cat: 'sport',
      title: 'Medical & Treatment Room',
      desc: 'An isolated clinical workspace managed by our team doctors and physiotherapists to coordinate immediate injury diagnostics and player recovery therapy.',
      status: 'Operational',
      img: 'facility-medical.jpg',
      icon: <IoCheckmarkCircleOutline />
    }
  ];
  const filteredFacilities = activeFacilityFilter === 'all' 
    ? infrastructureAssets 
    : infrastructureAssets.filter((item: InfrastructureAssetItem) => item.cat === activeFacilityFilter);

  return (
    <div 
      className="w-full min-h-screen px-2 py-4 sm:px-4 sm:py-12 text-white text-left box-border select-none font-sans overflow-x-hidden"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="w-full max-w-7xl mx-auto box-border px-1 sm:px-0">
        
        <div className="flex flex-wrap items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500 w-full whitespace-nowrap overflow-x-auto scrollbar-none">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span className="text-gray-400">About Us</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>Facilities Profile</span>
        </div>

        <div className="border-b border-white/10 pb-3 mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5">
          <div className="min-w-0 w-full">
            <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
              Institutional Infrastructure Assets
            </span>
            <h2 className="text-lg sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-tight truncate">
              Club Facilities Profile
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[9px] sm:text-mono font-mono bg-[#0B4622]/40 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md w-fit text-[#D4AF37] whitespace-nowrap">
            <IoLocationOutline className="text-2xs" />
            <span>UWA HQ: Plot 7 Kira Road, Kamwokya</span>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none w-full box-border touch-pan-x -mx-3 px-3">
          {facilityCategories.map((item: FacilityCategoryItem) => (
            <button
              key={item.id}
              onClick={() => setActiveFacilityFilter(item.id)}
              className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex-none whitespace-nowrap"
              style={{ 
                backgroundColor: activeFacilityFilter === item.id ? '#0B4622' : 'rgba(212,175,55,0.05)',
                color: activeFacilityFilter === item.id ? '#D4AF37' : '#9ca3af',
                borderColor: activeFacilityFilter === item.id ? 'rgba(212,175,55,0.3)' : 'transparent'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full box-border">
          {filteredFacilities.map((asset: InfrastructureAssetItem) => (
            <div 
              key={asset.id} 
              className="p-4 bg-black/20 rounded-xl border flex flex-col sm:flex-row md:flex-col md:h-full gap-4 items-stretch box-border w-full transition-colors hover:border-[#D4AF37]/20" 
              style={{ borderColor: 'rgba(212,175,55,0.08)' }}
            >
              
              <div className="w-full h-72 sm:w-52 sm:h-52 md:w-full md:h-80 bg-neutral-900 rounded-lg overflow-hidden border border-white/5 flex-none relative group mx-auto sm:mx-0">
                <img 
                  src={new URL(`../../assets/home/${asset.img}`, import.meta.url).href} 
                  alt={asset.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 relative z-10" 
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0">
                  <IoCameraOutline size={28} className="opacity-40 text-[#D4AF37]" />
                </div>
              </div>

              <div className="space-y-2 w-full min-w-0 text-left flex flex-col justify-start md:flex-1">
                <div>
                  <span className={`inline-block text-[7px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded font-black uppercase border ${
                    asset.status === 'Operational' 
                      ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' 
                      : asset.status.includes('Proposed')
                      ? 'bg-blue-950/50 text-blue-400 border-blue-500/30'
                      : 'bg-amber-950/40 border-[#D4AF37]/20 text-[#D4AF37] animate-pulse'
                  }`}>{asset.status === 'Under Construction' ? 'Future Project • ' : ''}{asset.status}</span>
                </div>
                <h5 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5 mt-0.5 leading-tight truncate">
                  <span style={{ color: '#D4AF37' }} className="text-sm flex-none">{asset.icon}</span>
                  <span className="truncate block flex-grow">{asset.title}</span>
                </h5>
                
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4 sm:line-clamp-3 md:line-clamp-none font-medium md:flex-grow">{asset.desc}</p>
                
                <span className="text-[8px] font-mono text-gray-500 block pt-1 border-t border-white/5 truncate w-full mt-auto"></span>
              </div>

            </div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="w-full text-center py-10 border border-dashed border-white/10 rounded-xl bg-[#041A0E]/10 px-2 animate-fadeIn">
            <p className="text-[10px] font-bold text-gray-500 font-mono uppercase tracking-widest leading-normal">
              No specific architectural logs found matching this filter tier.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
