import React, { useState } from 'react';

interface PlayerMetrics {
  age?: number | string;
  totalGoals?: number | string;
  [key: string]: any;
}

interface SquadCardPlayerProps {
  firstName: string;
  lastName: string;
  shirtNumber?: string | number;
  img_url?: string;
  role?: string;
  position: string;
  metrics?: PlayerMetrics;
  isCaptain?: boolean | string;
  id?: string | number;
  code?: string;
  subCategory?: string;
}

export default function SquadCardPlayer({ 
  firstName, 
  lastName, 
  shirtNumber, 
  img_url, 
  role, 
  position, 
  metrics, 
  isCaptain, 
  id, 
  code, 
  subCategory 
}: SquadCardPlayerProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const cleanPosition: string = String(position || "").toLowerCase().trim();
  const cleanRole: string = String(role || "").toLowerCase().trim();
  const cleanCaptainStatus: string = String(isCaptain || "").toLowerCase().trim();

  const isStaff: boolean = 
    cleanPosition.includes("staff") || 
    cleanPosition.includes("technical") || 
    cleanPosition.includes("medical") || 
    cleanPosition.includes("scouting") || 
    cleanRole.includes("coach") || 
    cleanRole.includes("manager") || 
    cleanRole.includes("director");

  const badgeText: string = isStaff ? (role || "Staff") : position;

  const getLeftShorthandBadge = (): string | null => {
    if (cleanCaptainStatus === "main captain" || cleanCaptainStatus === "cp" || isCaptain === true) return "CP";
    if (cleanCaptainStatus === "second captain" || cleanCaptainStatus === "vc") return "VC";
    if (cleanCaptainStatus === "third captain" || cleanCaptainStatus === "c3") return "C3";
    
    if (isStaff && code) return String(code).toUpperCase().trim();
    if (cleanRole.includes("head coach")) return "HC";
    if (cleanRole.includes("assistant coach")) return "AC";
    if (cleanRole.includes("video analyst")) return "VA";
    if (cleanRole.includes("team doctor") || cleanRole.includes("medical")) return "MD";
    if (cleanRole.includes("nutritionist")) return "NT";
    if (cleanRole.includes("scouting")) return "SH";

    if (isStaff) {
      return role ? role.substring(0, 2).toUpperCase() : "ST";
    }
    return null; 
  };

  const getLeftBadgeStyle = (): string => {
    if (cleanCaptainStatus === "main captain" || cleanCaptainStatus === "cp" || cleanCaptainStatus === "second captain" || cleanCaptainStatus === "vc" || cleanCaptainStatus === "third captain" || cleanCaptainStatus === "c3" || isCaptain === true) {
      return "bg-[#004B23] text-white border-emerald-500 font-black";
    }
    if (cleanRole.includes("head coach") || cleanRole === "hc") {
      return "bg-[#004B23] text-white border-emerald-500 font-bold";
    }
    if (isStaff) {
      return "bg-[#0B3C5D] text-white border-[#328CC1] font-bold";
    }
    return "bg-[#f2a900] text-neutral-950 border-yellow-300";
  };

  const parseStatValue = (val: any): number | null => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string' && val.includes('/')) return parseInt(val.split('/')[0], 10) || 0;
    if (typeof val === 'string' && val.includes('%')) return parseInt(val.replace('%', ''), 10) || 0;
    return null;
  };

  const leftBadge: string | null = getLeftShorthandBadge();

  return (
    <div 
      className="mb-0.5 group relative overflow-visible mx-auto w-full max-w-[145px] sm:max-w-[190px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div 
        className="w-full bg-gradient-to-t from-neutral-950 via-neutral-900 to-[#0d522c]/40 border border-[#f2a900]/40 rounded-lg p-1 shadow-xl flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300 transform active:scale-95"
        style={{
          animation: 'uwaRosterBreath 4.8s ease-in-out infinite',
          boxShadow: isHovered ? '0 10px 25px -5px rgba(212, 175, 55, 0.25)' : 'none'
        }}
      >
        <div className="w-full relative bg-neutral-950 rounded-md overflow-hidden flex items-center justify-center border border-neutral-800/50">
          <img 
            src={img_url || '/images/player-placeholder.jpg'} 
            className="w-full h-28 md:h-36 object-cover object-top transition-transform duration-500 group-hover:scale-110" 
            alt={`${firstName} ${lastName}`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/images/player-placeholder.jpg";
            }}
          />

          {leftBadge && (
            <div className={`absolute top-0 left-0 px-1.5 py-0.5 font-mono text-[9px] md:text-xs rounded-br-md shadow-md border-r border-b ${getLeftBadgeStyle()}`}>
              {leftBadge}
            </div>
          )}

          {!isStaff && shirtNumber && (
            <div className="absolute top-0 right-0 px-1.5 py-0.5 font-mono font-black text-[9px] md:text-xs rounded-bl-md shadow-md border-l border-b bg-[#f2a900] text-neutral-950 border-yellow-300">
              {shirtNumber}
            </div>
          )}
        </div>

        <div className="w-full text-center mt-1 pb-0.5 px-0.5">
          <span className="font-mono font-bold opacity-80 block uppercase text-[7px] md:text-[9px] text-[#f2a900] tracking-wider truncate leading-none mb-0.5">
            {badgeText}
          </span>
          <div className="flex flex-col items-center leading-none w-full">
            <span className="text-[9px] md:text-xs text-gray-400 capitalize truncate w-full block">
              {firstName?.toLowerCase()}
            </span>
            <span className="font-black text-white text-[11px] md:text-sm uppercase truncate w-full block tracking-tight">
              {lastName}
            </span>
          </div>
        </div>
      </div>

      {isHovered && metrics && (
        <div className="absolute z-50 left-1/2 bottom-[104%] mb-1 -translate-x-1/2 w-44 sm:w-52 bg-neutral-950 border border-[#f2a900]/60 rounded-lg p-2 shadow-2xl backdrop-blur-xl text-[10px] text-left animate-fadeIn">
          <div className="border-b border-neutral-800 pb-1 mb-1.5 flex justify-between items-center">
            <span className="font-bold text-[#f2a900] uppercase font-mono tracking-wider text-[8px]">
              UWA FC Registry Data
            </span>
            <span className="text-[8px] font-mono text-neutral-500">
              Age: {metrics.age || "N/A"}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] border-b border-neutral-900 pb-0.5">
              <span className="text-emerald-400 font-bold font-mono">Club Goals:</span>
              <span className="font-mono font-black text-[#f2a900] bg-emerald-950/60 px-1 rounded text-[9px]">
                {metrics.totalGoals !== undefined ? metrics.totalGoals : (isStaff ? "Staff" : "0")}
              </span>
            </div>
          </div>

          <div className="space-y-1 mt-1.5">
            {Object.entries(metrics).map(([key, value]) => {
              if (["age", "totalgoals"].includes(key.toLowerCase())) return null;
              const score = parseStatValue(value);

              return (
                <div key={key} className="flex flex-col gap-0.5 text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 capitalize text-[9px] truncate max-w-[65px]">{key}:</span>
                    <span className="font-mono font-bold text-white text-[9px]">{String(value)}</span>
                  </div>
                  {score !== null && (
                    <div className="w-full bg-neutral-800 h-0.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${score >= 85 ? 'bg-emerald-500' : score >= 75 ? 'bg-yellow-500' : 'bg-orange-500'}`} 
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-950" />
        </div>
      )}
    </div>
  );
}
