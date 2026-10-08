import React from 'react';

interface DateMatchProps {
  date: string;
  hour?: string | null;
  location?: string | null;
}

export default function DateMatch({ date, hour, location }: DateMatchProps) {
  return (
    <div className='w-full flex flex-col items-center justify-center text-center p-1.5 gap-0.5 box-border min-w-0 overflow-hidden'>
        
        <p className='text-[9px] sm:text-xs text-gray-300 font-mono tracking-wide leading-none truncate w-full block uppercase font-bold'>
            {date} {hour && `• ${hour}`}
        </p>
        
        <p 
          className='text-[9px] sm:text-xs text-gray-400 font-medium tracking-tight leading-none truncate w-full block mt-0.5 max-w-[130px] sm:max-w-none' 
          title={location || "UWA Stadium, Kampala"}
        >
            {location || "UWA Stadium, Kampala"}
        </p>

    </div>
  );
}
