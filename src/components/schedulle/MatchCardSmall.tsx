import React from 'react';
import DateMatch from './DateMatch';
import Team from "./Team";
import team1 from "/src/assets/team1.png"; 
import team2 from "/src/assets/team2.png"; 
import { AiOutlineArrowRight } from "react-icons/ai";
import buwamboLogo from "/src/assets/buwambo-fc.png";
import kiyindaLogo from "/src/assets/kiyinda-boys-fc.png";
import kajjansiLogo from "/src/assets/Kajjansi-united-fc.png";
import lukayaLogo from "/src/assets/Lukaya-Town-council-fc.png"; 
import kibogaLogo from "/src/assets/kiboga-united-sc.png";
import masakaLogo from "/src/assets/masaka-city.png";

const logoMap: Record<string, string> = {
  "./buwambo-fc.png": buwamboLogo,
  "./kiyinda-boys-fc.png": kiyindaLogo,
  "./kajjansi-united-fc.png": kajjansiLogo,
  "./Lukaya-Town.png": lukayaLogo,          
  "./Lukaya-Town-council.png": lukayaLogo,  
  "./kiboga-united-sc.png": kibogaLogo,
  "masaka-city.png": masakaLogo,
  "./masaka-city.png": masakaLogo
};



export interface MatchCardSmallProps {
  title?: string | null;
  competition?: string | null;
  date: string;
  hour?: string | null;
  location?: string | null;
  score?: string | null;
  dynamicOpponent?: string;
  isHomeTeam?: boolean;
  opponentLogo?: string;
  homeTeam?: string;
  awayTeam?: string;
  homeLogo?: string;
  awayLogo?: string;
}
export default function MatchCardSmall({ 
  title, competition, date, hour, location, score, 
  dynamicOpponent, isHomeTeam, opponentLogo,
  homeTeam, awayTeam, homeLogo, awayLogo
}: MatchCardSmallProps) {
  
  const displayTitle = title || "Matchday Fixture";
  const displayCompetition = competition || "Buganda Regional League";
  const displayLocation = location || "UWA Grounds, Kampala";

  const isTournamentSourced = typeof homeTeam === 'string' && typeof awayTeam === 'string';

  const homeTeamName = isTournamentSourced ? homeTeam : (isHomeTeam ? "UWA FC" : (dynamicOpponent || "Opponent"));
  const awayTeamName = isTournamentSourced ? awayTeam : (isHomeTeam ? (dynamicOpponent || "Opponent") : "UWA FC");
  
  const resolvedOpponentLogo = opponentLogo ? (logoMap[opponentLogo] || team2) : team2;

  let finalHomeLogo = team1;
  let finalAwayLogo = team2;

  if (isTournamentSourced && homeLogo && awayLogo) {
    finalHomeLogo = homeLogo.startsWith('.') || homeLogo.startsWith('/') ? (logoMap[homeLogo] || homeLogo) : homeLogo;
    finalAwayLogo = awayLogo.startsWith('.') || awayLogo.startsWith('/') ? (logoMap[awayLogo] || awayLogo) : awayLogo;
  } else {
    finalHomeLogo = isHomeTeam ? team1 : resolvedOpponentLogo;
    finalAwayLogo = isHomeTeam ? resolvedOpponentLogo : team1;
  }
  return (
    <div 
      className="p-3 text-gray-100 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] w-full h-full box-border flex flex-col justify-between overflow-hidden"
      style={{
        background: 'rgba(6, 38, 19, 0.45)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="text-center mb-2">
        <p className="font-black text-[9px] sm:text-[10px] uppercase tracking-wider leading-none text-[#D4AF37] truncate">
          {displayCompetition}
        </p>
        <p className="font-bold text-gray-400 text-[9px] sm:text-[10px] mt-1 leading-none uppercase">{displayTitle}</p>
      </div>
      
      <div className="flex items-center justify-between gap-1 my-2 bg-black/20 py-2 px-1 rounded-lg w-full box-border">
        
        <div className="flex-1 flex flex-col items-center justify-center text-center overflow-hidden min-w-0">
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
            <Team teamImg={finalHomeLogo} small={true}/>
          </div>
          <h3 className={`text-center font-black text-[9px] sm:text-[10px] mt-1 leading-tight truncate w-full uppercase ${!isTournamentSourced && isHomeTeam ? 'text-[#147a42]' : 'text-gray-400'}`}>
            {homeTeamName}
          </h3>
        </div>
      
        <div className="flex-none flex justify-center items-center min-w-[40px] px-0.5">
          {score ? (
            <h3 
              className="text-center font-mono font-black text-[10px] sm:text-xs px-1.5 py-0.5 rounded border leading-none block"
              style={{ color: '#D4AF37', backgroundColor: 'rgba(3, 17, 9, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}
            >
              {score}
            </h3>
          ) : (
            <span className="text-[8px] sm:text-[9px] font-black border px-1 py-0.5 rounded tracking-wider bg-white/5 border-white/10 text-gray-400 leading-none block">
              VS
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center overflow-hidden min-w-0">
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
            <Team teamImg={finalAwayLogo} small={true}/>
          </div>
          <h3 className={`text-center font-black text-[9px] sm:text-[10px] mt-1 leading-tight truncate w-full uppercase ${!isTournamentSourced && !isHomeTeam ? 'text-[#147a42]' : 'text-gray-400'}`}>
            {awayTeamName}
          </h3>
        </div> 

      </div>

      <div className="w-full mt-1 opacity-90 text-[9px] sm:text-[10px] box-border truncate">
        <DateMatch date={date} hour={hour} location={displayLocation} />
      </div>

      <div className="w-full mt-2 pt-1.5 border-t border-white/5 text-center">
        <span className="flex justify-center items-center gap-1 uppercase text-[8px] sm:text-[9px] font-black text-[#D4AF37] leading-none">
          Analyze Match <AiOutlineArrowRight/>
        </span>
      </div>
    </div>
  );
}
