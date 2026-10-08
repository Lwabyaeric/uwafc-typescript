import React from 'react';
import { IoPersonOutline } from 'react-icons/io5';

export interface PlayerCardMetrics {
  pace?: number | string;
  shooting?: number | string;
  passing?: number | string;
  dribbling?: number | string;
  defending?: number | string;
  physical?: number | string;
}

export interface SquadCardPlayerProps {
  id: string | number;
  firstName: string;
  lastName: string;
  shirtNumber?: string | number;
  img_url?: string;
  role?: string;
  position?: string;
  code?: string;
  subCategory?: string;
  isCaptain?: boolean;
  metrics?: PlayerCardMetrics;
}

export default function SquadCardPlayer({
  id,
  firstName,
  lastName,
  shirtNumber,
  img_url,
  role,
  position,
  code,
  subCategory,
  isCaptain,
  metrics
}: SquadCardPlayerProps) {
  return (
    <div className="w-full bg-[#041A0E]/40 border border-white/5 rounded-2xl p-3 flex flex-col justify-between items-center text-center relative overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/30 select-none box-border">
      
      {isCaptain && (
        <div className="absolute top-2 left-2 bg-[#D4AF37] text-black font-mono font-black text-[7px] px-1.5 py-0.5 rounded uppercase tracking-wider shadow z-20">
          Captain
        </div>
      )}

      {code && (
        <div className="absolute top-2 right-2 bg-neutral-900/90 text-[#D4AF37] font-mono font-bold text-[7px] px-1.5 py-0.5 rounded border border-white/5 uppercase z-20">
          {code}
        </div>
      )}

      <div className="w-full flex flex-col items-center">
        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-neutral-950 border border-white/5 flex items-center justify-center relative p-1 mb-3 shadow-inner">
          {img_url ? (
            <img 
              src={new URL(`../../assets/squad/${img_url}`, import.meta.url).href} 
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover rounded-full filter drop-shadow transition-transform duration-300 hover:scale-105"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-neutral-800 z-0">
            <IoPersonOutline size={36} className="opacity-20 text-[#D4AF37]" />
          </div>
        </div>

        <div className="w-full px-1">
          <span className="text-[10px] font-mono font-black text-neutral-400 block tracking-wider uppercase leading-none truncate">
            {role || position || "Squad Member"}
          </span>
          <h4 className="text-white font-black text-sm uppercase tracking-tight mt-1 leading-tight truncate">
            {lastName}
          </h4>
          <p className="text-[#D4AF37] font-sans font-medium text-[11px] mt-0.5 opacity-90 truncate">
            {firstName}
          </p>
        </div>
      </div>

      {shirtNumber && (
        <div className="mt-3 pt-2 border-t border-white/5 w-full flex justify-center items-center font-mono">
          <span className="text-[10px] text-neutral-500 font-bold uppercase mr-1">No.</span>
          <span className="text-base font-black text-emerald-400 leading-none">
            {shirtNumber}
          </span>
        </div>
      )}

      {metrics && Object.keys(metrics).length > 0 && (
        <div className="w-full mt-3 pt-2 border-t border-white/5 grid grid-cols-3 gap-1 text-left font-mono text-[8px] text-neutral-400">
          {metrics.pace && <div><span className="font-bold text-neutral-500">PAC:</span> <span className="text-white font-black">{metrics.pace}</span></div>}
          {metrics.shooting && <div><span className="font-bold text-neutral-500">SHO:</span> <span className="text-white font-black">{metrics.shooting}</span></div>}
          {metrics.passing && <div><span className="font-bold text-neutral-500">PAS:</span> <span className="text-white font-black">{metrics.passing}</span></div>}
          {metrics.dribbling && <div><span className="font-bold text-neutral-500">DRI:</span> <span className="text-white font-black">{metrics.dribbling}</span></div>}
          {metrics.defending && <div><span className="font-bold text-neutral-500">DEF:</span> <span className="text-white font-black">{metrics.defending}</span></div>}
          {metrics.physical && <div><span className="font-bold text-neutral-500">PHY:</span> <span className="text-white font-black">{metrics.physical}</span></div>}
        </div>
      )}

    </div>
  );
}
