import React from 'react';

export interface ScorerItem {
  player: string;
  min: string;
  goals?: number;
}

export interface MatchStatIndicator {
  label: string;
  home: number;
  away: number;
  suffix?: string;
}

export interface MatchDataStructure {
  id: string;
  opponent?: string;
  score: string | null;
  isHome?: boolean;
  scorers?: {
    home: ScorerItem[];
    away: ScorerItem[];
  };
  stats?: MatchStatIndicator[];
}

export interface MatchStatsProps {
  matchData: MatchDataStructure | null | undefined;
}

export default function MatchStats({ matchData }: MatchStatsProps) {
  const opponentName = matchData?.opponent || "Buwambo UTD";
  const scoreText = matchData?.score !== null ? `${matchData?.score}` : "VS";
  const isHome = matchData?.isHome !== false;

  const homeScorers = isHome ? (matchData?.scorers?.home || []) : (matchData?.scorers?.away || []);
  const awayScorers = isHome ? (matchData?.scorers?.away || []) : (matchData?.scorers?.home || []);
  const stats = matchData?.stats || [];

  return (
    <div className="bg-neutral-900/40 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800/40 shadow-xl max-w-xl mx-auto my-2 box-border text-left animate-fadeIn">
      
      <div className="text-center mb-3 border-b border-neutral-800/60 pb-3">
        <span className="text-[#f2a900] text-[8px] sm:text-[10px] font-black tracking-widest uppercase block mb-1">
          {matchData?.id === "upcoming" ? "Pre-Match Intelligence Index" : "Matchday Performance Analytics"}
        </span>
        <h3 className="text-white font-black text-sm sm:text-lg uppercase tracking-tight flex justify-center items-center gap-2 sm:gap-4 leading-none">
          <span className={isHome ? "text-emerald-400 font-black" : "text-gray-400 font-bold"}>
            {isHome ? "UWA FC" : opponentName}
          </span> 
          <span className="text-[#f2a900] font-mono text-sm bg-black/40 px-2 py-0.5 rounded border border-neutral-800">
            {scoreText}
          </span> 
          <span className={!isHome ? "text-emerald-400 font-black" : "text-gray-400 font-bold"}>
            {!isHome ? "UWA FC" : opponentName}
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-black/20 p-2 rounded-lg border border-neutral-800/50 mb-4 text-[10px] sm:text-xs">
        <div className="border-r border-neutral-800/60 pr-2 text-left space-y-1 text-gray-300 min-w-0">
          {homeScorers.length > 0 ? homeScorers.map((s, i) => {
            const goalCount = s.goals || 1; 
            const ballIcons = Array.from({ length: goalCount }, () => "⚽").join(" ");

            return (
              <div key={i} className="flex items-center gap-1.5 truncate w-full">
                <span className="text-emerald-500 font-bold flex-shrink-0">{ballIcons}</span>
                <span className="font-bold truncate">{s.player}</span>
                <span className="text-gray-500 font-mono text-[9px] bg-neutral-950/60 px-1 py-0.5 rounded flex-none">{s.min}</span>
              </div>
            );
          }) : <span className="text-neutral-600 block italic text-[9px]">{matchData?.id === "upcoming" ? "Lineups Pending" : "No goals scored"}</span>}
        </div>

        <div className="pl-2 text-right space-y-1 text-gray-300 min-w-0">
          {awayScorers.length > 0 ? awayScorers.map((s, i) => {
            const goalCount = s.goals || 1;
            const ballIcons = Array.from({ length: goalCount }, () => "⚽").join(" ");

            return (
              <div key={i} className="flex items-center justify-end gap-1.5 truncate w-full">
                <span className="text-gray-500 font-mono text-[9px] bg-neutral-950/60 px-1 py-0.5 rounded flex-none">{s.min}</span>
                <span className="font-bold truncate">{s.player}</span>
                <span className="text-emerald-500 font-bold flex-shrink-0">{ballIcons}</span>
              </div>
            );
          }) : <span className="text-neutral-600 block italic text-[9px]">{matchData?.id === "upcoming" ? "Lineups Pending" : "No goals scored"}</span>}
        </div>
      </div>

      <div className="space-y-3.5 w-full box-border">
        {stats.map((stat, idx) => {
          const total = stat.home + stat.away;
          const homePercent = total > 0 ? (stat.home / total) * 100 : 0;
          const awayPercent = total > 0 ? (stat.away / total) * 100 : 0;

          return (
            <div key={idx} className="text-xs w-full box-border">
              
              <div className="flex justify-between items-center text-white font-bold mb-1 px-0.5">
                <span className="text-emerald-400 font-mono text-[11px] sm:text-xs min-w-[30px] text-left">
                  {stat.home}{stat.suffix || ''}
                </span>
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] sm:text-[11px] text-center px-1 truncate">
                  {stat.label}
                </span>
                <span className="text-gray-400 font-mono text-[11px] sm:text-xs min-w-[30px] text-right">
                  {stat.away}{stat.suffix || ''}
                </span>
              </div>

              <div className="flex items-center gap-1 w-full box-border">
                <div className="flex-1 h-1.5 bg-neutral-950 rounded-full overflow-hidden flex justify-end border border-neutral-800/40">
                  <div 
                    className="bg-gradient-to-l from-[#0d522c] to-[#147a42] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${homePercent}%` }}
                  ></div>
                </div>

                <div className="flex-1 h-1.5 bg-neutral-950 rounded-full overflow-hidden flex justify-start border border-neutral-800/40">
                  <div 
                    className="bg-neutral-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${awayPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
