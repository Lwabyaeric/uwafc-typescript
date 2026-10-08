import React from 'react';

interface TeamProps {
  teamImg: string;
  teamName?: string | null;
  small?: boolean;
}

export default function Team({ teamImg, teamName, small }: TeamProps) {
    return (
        <div className='w-full flex flex-col items-center justify-center mx-auto min-w-0 box-border'>
          <div className='flex justify-center items-center overflow-hidden flex-shrink-0'>
            <img 
                src={teamImg} 
                className={`object-contain transition-all duration-300 ${
                    small 
                        ? 'w-10 sm:w-12 h-10 sm:h-12' 
                        : 'w-11 sm:w-20 h-11 sm:h-20' 
                }`}
                alt={teamName || "Club Crest"}
            />
          </div>
          
          {teamName && (
            <h3 className='text-gray-100 text-center font-black text-[10px] sm:text-xs uppercase tracking-tight truncate w-full mt-1.5 leading-none block'>
                {teamName}
            </h3>
          )}
        </div>       
    );
}
