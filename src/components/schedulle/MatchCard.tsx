import React from 'react';
import DateMatch from './DateMatch';
import Team from "./Team";
import team1 from "../../assets/team1.png"; 
import team2 from "../../assets/team2.png"; 

interface MatchCardProps {
  title?: string | null;
  competition?: string | null;
  date: string;
  hour?: string | null;
  location?: string | null;
  score?: string | null;
}

export default function MatchCard({ 
  title, 
  competition, 
  date, 
  hour, 
  location, 
  score 
}: MatchCardProps) {
  
  const displayTitle = title || "Matchday Fixture";
  const displayCompetition = competition || "Buganda Regional League";
  const displayLocation = location || "Kira Road Ground, Kampala";
  
  const homeTeamName = "UWA FC";
  const awayTeamName = "Vipers SC"; 

  return (
    <div 
      className='text-gray-100 rounded-xl p-3 sm:p-5 w-full h-full box-border transition-all duration-300 transform hover:scale-[1.01] shadow-lg flex flex-col justify-between overflow-hidden'
      style={{
        background: 'rgba(6, 38, 19, 0.55)',
        border: '1px solid rgba(212, 175, 55, 0.22)',
        boxShadow: '0 10px 25px -5px rgba(2, 11, 5, 0.4)'
      }}
    >
      <div className="border-b border-white/5 pb-1.5 mb-2 sm:mb-4 text-center">
        <p className='font-black text-[10px] sm:text-xs uppercase tracking-widest leading-none' style={{ color: '#D4AF37' }}>
          {displayCompetition}
        </p>
        <p className='font-bold text-gray-300 text-xs sm:text-sm mt-1 leading-none'>
          {displayTitle}
        </p>
      </div>
      
      <div className='flex items-center justify-between gap-1 sm:gap-2 my-2 sm:my-4 w-full box-border'>
        
        <div className='flex-1 flex flex-col items-center justify-center text-center overflow-hidden min-w-0'>
          <div className="p-1 sm:p-2 rounded-xl bg-white/5 border border-white/10 mb-1 sm:mb-2 flex items-center justify-center h-14 w-14 sm:h-24 sm:w-24 flex-shrink-0">
            <Team teamImg={team1} />
          </div>
          <span className="font-black text-[10px] sm:text-sm tracking-tight text-white block mt-1 truncate w-full max-w-[75px] sm:max-w-none uppercase">
            {homeTeamName}
          </span>
        </div>
      
        <div className='flex-none flex flex-col items-center justify-center min-w-[55px] sm:min-w-[75px] px-1'>
          {score ? (
            <div 
              className='px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-mono font-black text-sm sm:text-lg tracking-wider shadow-inner text-center border leading-none'
              style={{ 
                background: 'rgba(3, 17, 9, 0.8)',
                borderColor: 'rgba(212, 175, 55, 0.4)',
                color: '#D4AF37'
              }}
            >
              {score}
            </div>
          ) : (
            <span 
              className='font-black text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border tracking-widest leading-none block'
              style={{ 
                background: 'rgba(212, 175, 55, 0.08)',
                borderColor: 'rgba(212, 175, 55, 0.2)',
                color: '#D4AF37'
              }}
            >
              VS
            </span>
          )}
        </div>

        <div className='flex-1 flex flex-col items-center justify-center text-center overflow-hidden min-w-0'>
          <div className="p-1 sm:p-2 rounded-xl bg-white/5 border border-white/10 mb-1 sm:mb-2 flex items-center justify-center h-14 w-14 sm:h-24 sm:w-24 flex-shrink-0">
            <Team teamImg={team2} />
          </div>
          <span className="font-bold text-[10px] sm:text-sm tracking-tight text-gray-200 block mt-1 truncate w-full max-w-[75px] sm:max-w-none uppercase">
            {awayTeamName}
          </span>
        </div>

      </div>

      <div 
        className='mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5 rounded-lg overflow-hidden w-full box-border'
        style={{ background: 'rgba(3, 17, 9, 0.3)' }}
      >
        <DateMatch date={date} hour={hour} location={displayLocation} />
      </div>
    </div>
  );
}
