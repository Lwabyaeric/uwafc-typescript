import React from 'react';

// Explicit TypeScript interfaces matching your dataset arrays
export interface GoalScorer {
  player: string;
  min: string;
  goals?: number;
}

export interface MatchStatRow {
  label: string;
  home: number;
  away: number;
  suffix: string;
}

export interface MatchDataPayload {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: string | null;
  scorers?: {
    home: GoalScorer[];
    away: GoalScorer[];
  };
  stats?: MatchStatRow[];
}

interface MatchStatsProps {
  matchData: MatchDataPayload | MatchDataPayload[] | null | undefined;
}

export default function MatchStats({ matchData }: MatchStatsProps) {
  // 🛡️ CRITICAL GUARDRAIL: Safely extract single object if array bleeds through on load
  const resolvedMatch = Array.isArray(matchData) ? matchData[0] : matchData;

  if (!resolvedMatch) {
    return (
      <div className="text-center py-6 text-neutral-500 font-sans text-xs italic">
        Select a match profile card above to load structural metrics.
      </div>
    );
  }

  // ⚡ DYNAMIC PROPERTY ENGINE: Extracts direct variables from current selected payload
  const homeTeamName = resolvedMatch.homeTeam || "Home Team";
  const awayTeamName = resolvedMatch.awayTeam || "Away Team";
  const scoreText = resolvedMatch.score !== null && resolvedMatch.score !== undefined ? `${resolvedMatch.score}` : "VS";

  const homeScorers = resolvedMatch.scorers?.home || [];
  const awayScorers = resolvedMatch.scorers?.away || [];
  const stats = resolvedMatch.stats || [];

  return (
    <div className="bg-neutral-900/40 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800/40 shadow-xl max-w-xl mx-auto my-2 box-border text-left">
      
      {/* Executive Team Identity Banner */}
      <div className="text-center mb-3 border-b border-neutral-800/60 pb-3">
        <span className="text-[#f2a900] text-[8px] sm:text-[10px] font-black tracking-widest uppercase block mb-1">
          {resolvedMatch.score === null ? "Pre-Match Intelligence Index" : "Matchday Performance Analytics"}
        </span>
        <h3 className="text-white font-black text-sm sm:text-lg uppercase tracking-tight flex justify-center items-center gap-2 sm:gap-4 leading-none">
          <span className="text-white font-black truncate max-w-[40%] text-right">
            {homeTeamName}
          </span> 
          <span className="text-[#f2a900] font-mono text-sm bg-black/40 px-2 py-0.5 rounded border border-neutral-800 shrink-0">
            {scoreText}
          </span> 
          <span className="text-white font-black truncate max-w-[40%] text-left">
            {awayTeamName}
          </span>
        </h3>
      </div>
      {/* Dynamic Scorer Timeline Panels */}
      <div className="grid grid-cols-2 gap-2 bg-black/20 p-2 rounded-lg border border-neutral-800/50 mb-4 text-[10px] sm:text-xs">
        {/* Left Side (Home Scorers) */}
        <div className="border-r border-neutral-800/60 pr-2 text-left space-y-1 text-gray-300 min-w-0">
          {homeScorers.length > 0 ? homeScorers.map((s, i) => {
            const goalCount = s.goals || 1; 
            const ballIcons = Array.from({ length: goalCount }, () => "⚽").join(" ");
            return (
              <div key={i} className="flex items-center gap-1.5 truncate w-full">
                <span className="text-[#0d522c] font-bold flex-shrink-0">{ballIcons}</span>
                <span className="font-bold truncate text-white">{s.player}</span>
                <span className="text-gray-500 font-mono text-[9px] bg-neutral-950/60 px-1 rounded flex-none">{s.min}</span>
              </div>
            );
          }) : (
            <span className="text-neutral-600 block italic text-[9px]">
              {resolvedMatch.score === null ? "Lineups Pending" : "No goals scored"}
            </span>
          )}
        </div>

        {/* Right Side (Away Scorers) */}
        <div className="pl-2 text-right space-y-1 text-gray-300 min-w-0">
          {awayScorers.length > 0 ? awayScorers.map((s, i) => {
            const goalCount = s.goals || 1;
            const ballIcons = Array.from({ length: goalCount }, () => "⚽").join(" ");
            return (
              <div key={i} className="flex items-center justify-end gap-1.5 truncate w-full">
                <span className="text-gray-500 font-mono text-[9px] bg-neutral-950/60 px-1 rounded flex-none">{s.min}</span>
                <span className="font-bold truncate text-white">{s.player}</span>
                <span className="text-neutral-500 font-bold flex-shrink-0">{ballIcons}</span>
              </div>
            );
          }) : (
            <span className="text-neutral-600 block italic text-[9px]">
              {resolvedMatch.score === null ? "Lineups Pending" : "No goals scored"}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Statistical Metrics Progress Bars */}
      <div className="space-y-3.5 w-full box-border">
        {stats.map((stat, idx) => {
          const total = stat.home + stat.away;
          const homePercent = total > 0 ? (stat.home / total) * 100 : 0;
          const awayPercent = total > 0 ? (stat.away / total) * 100 : 0;
          return (
            <div key={idx} className="text-xs w-full box-border">
              <div className="flex justify-between items-center text-white font-bold mb-1 px-0.5">
                <span className="text-[#f2a900] font-mono text-[11px] sm:text-xs min-w-[30px] text-left">
                  {stat.home}{stat.suffix}
                </span>
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] sm:text-[11px] text-center px-1 truncate">
                  {stat.label}
                </span>
                <span className="text-gray-400 font-mono text-[11px] sm:text-xs min-w-[30px] text-right">
                  {stat.away}{stat.suffix}
                </span>
              </div>
              <div className="flex items-center gap-1 w-full box-border">
                {/* Home Team Green Bar */}
                <div className="flex-1 h-1.5 bg-neutral-950 rounded-full overflow-hidden flex justify-end border border-neutral-800/40">
                  <div 
                    className="bg-gradient-to-l from-[#0d522c] to-[#147a42] h-full transition-all duration-300 rounded-full" 
                    style={{ width: `${homePercent}%` }}
                  />
                </div>
                {/* Away Team Neutral Bar */}
                <div className="flex-1 h-1.5 bg-neutral-950 rounded-full overflow-hidden flex justify-start border border-neutral-800/40">
                  <div 
                    className="bg-neutral-600 h-full transition-all duration-300 rounded-full" 
                    style={{ width: `${awayPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
