import React, { useState } from 'react';

export interface FixtureItem {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  type: 'league-home' | 'league-away' | 'uganda-cup' | 'friendly';
  status: string;
}

export interface BadgeStyle {
  label: string;
  color: string;
}
export default function FixturesDashboard() {
  const initialFixtures: FixtureItem[] = [
    { id: "m1", opponent: "Masaka City SC", date: "2026-07-12", time: "16:00", venue: "UWA Grounds (Home)", type: "league-home", status: "upcoming" },
    { id: "m2", opponent: "Buwambo United FC", date: "2026-07-19", time: "15:30", venue: "Buwambo Ground (Away)", type: "league-away", status: "upcoming" },
    { id: "c1", opponent: "Vipers SC", date: "2026-07-22", time: "15:00", venue: "St. Mary's Stadium (Away)", type: "uganda-cup", status: "upcoming" },
    { id: "f1", opponent: "Kampala Select XI", date: "2026-07-26", time: "16:00", venue: "UWA Grounds (Home)", type: "friendly", status: "upcoming" },
    { id: "m3", opponent: "UWA FC", date: "2026-08-02", time: "16:00", venue: "UWA Grounds (Home)", type: "league-home", status: "upcoming" },
    { id: "m4", opponent: "Young Simba FC", date: "2026-08-09", time: "15:30", venue: "Bombo Barracks (Away)", type: "league-away", status: "upcoming" },
    { id: "c2", opponent: "Express FC", date: "2026-08-12", time: "16:00", venue: "UWA Grounds (Home)", type: "uganda-cup", status: "upcoming" },
    { id: "f2", opponent: "Entebbe FC", date: "2026-08-16", time: "16:15", venue: "Entebbe Stadium (Away)", type: "friendly", status: "upcoming" }
  ];

  const [filterType, setFilterType] = useState<string>('all');

  const filteredFixtures = initialFixtures.filter((match: FixtureItem) => {
    if (filterType === 'all') return true;
    return match.type === filterType;
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getBadgeStyle = (type: FixtureItem['type']): BadgeStyle => {
    switch (type) {
      case 'league-home': return { label: 'League (Home)', color: 'bg-emerald-600' };
      case 'league-away': return { label: 'League (Away)', color: 'bg-teal-600' };
      case 'uganda-cup': return { label: 'Uganda Cup', color: 'bg-purple-600' };
      case 'friendly': return { label: 'Friendly', color: 'bg-blue-600' };
      default: return { label: 'Match', color: 'bg-neutral-600' };
    }
  };
  return (
    <div className="bg-neutral-900/40 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800/40 shadow-xl max-w-xl mx-auto my-4 sm:my-10 text-left box-border">
      
      <div className="mb-4 flex justify-between items-end">
        <div>
          <span className="text-[#f2a900] text-[8px] sm:text-[10px] font-black tracking-widest uppercase block mb-0.5">
            Seasonal Roadmap
          </span>
          <h3 className="text-white font-black text-base sm:text-xl uppercase tracking-tight leading-none">
            Fixtures Pipeline
          </h3>
        </div>
        <span className="text-[9px] font-mono text-neutral-500 bg-neutral-950 px-2 py-1 rounded border border-neutral-800/40">
          {filteredFixtures.length} Games
        </span>
      </div>

      <div className="flex gap-1 mb-4 bg-neutral-950 p-1 rounded-lg border border-neutral-800/60 w-full overflow-x-auto scrollbar-none box-border">
        {[
          { id: 'all', name: 'All' },
          { id: 'league-home', name: 'Home' },
          { id: 'league-away', name: 'Away' },
          { id: 'uganda-cup', name: 'Cup' },
          { id: 'friendly', name: 'Friendlies' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`text-center px-3 py-2 rounded font-mono text-[9px] sm:text-xs uppercase font-bold tracking-wider transition-all duration-200 whitespace-nowrap min-w-[65px] cursor-pointer ${
              filterType === tab.id 
                ? 'bg-[#0d522c] text-[#f2a900] shadow-md border border-[#f2a900]/20' 
                : 'text-gray-400 hover:text-white bg-transparent'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="space-y-1.5 w-full box-border">
        {filteredFixtures.map((match: FixtureItem) => {
          const badge = getBadgeStyle(match.type);
          return (
            <div 
              key={match.id} 
              className="uwa-card bg-neutral-950/80 border border-neutral-800/60 hover:border-neutral-700/60 rounded-lg p-2 flex items-center justify-between relative overflow-hidden transition-all duration-200"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${badge.color}`} />
              
              <div className="pl-2.5 pr-1 max-w-[65%] flex flex-col justify-center">
                <span className="text-[7px] sm:text-[9px] font-mono tracking-wider text-neutral-500 uppercase truncate">
                  {badge.label} • {match.venue}
                </span>
                <span className="text-[11px] sm:text-sm font-black text-white uppercase tracking-tight truncate mt-0.5">
                  vs {match.opponent}
                </span>
              </div>

              <div className="text-right flex flex-col justify-center items-end min-w-[30%] border-l border-neutral-900 pl-2">
                <span className="text-[11px] sm:text-xs font-mono font-black text-[#f2a900] leading-none">
                  {match.time}
                </span>
                <span className="text-[8px] sm:text-[10px] text-neutral-400 font-mono font-bold mt-1 uppercase tracking-tight">
                  {formatDate(match.date)}
                </span>
              </div>
            </div>
          );
        })}

        {filteredFixtures.length === 0 && (
          <div className="text-center text-neutral-500 font-mono text-[9px] py-8 border border-dashed border-neutral-800 rounded-lg">
            No matches scheduled under this filter category.
          </div>
        )}
      </div>
    </div>
  );
}
