import React, { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Context } from '../../context/Context';
import RosterSection from './RosterSection';
import { IoLocationOutline } from 'react-icons/io5';

interface SquadMember {
  id: string | number;
  firstName: string;
  lastName: string;
  shirtNumber?: string | number;
  position: string;
  subCategory?: string;
  role?: string;
  img_url?: string;
  img?: string;
  metrics?: any;
  isCaptain?: boolean | string;
}

export default function SquadPage() {
  const navigate = useNavigate();
  const contextValue = useContext(Context) as any;
  const squad: SquadMember[] = contextValue?.squad || [];

  const activeSquad: SquadMember[] | null = Array.isArray(squad) && squad.length > 0 ? squad : null;
  const counterParsingDataset: SquadMember[] = Array.isArray(squad) ? squad : [];

  const players: SquadMember[] = counterParsingDataset.filter((p: SquadMember) => {
    const pos = String(p.position || "").toLowerCase();
    return !pos.includes("staff") && !["technical", "medical", "scouting"].includes(pos);
  });
  
  const technicalStaff: SquadMember[] = counterParsingDataset.filter((p: SquadMember) => String(p.subCategory || "").toLowerCase() === "technical");
  const medicalStaff: SquadMember[] = counterParsingDataset.filter((p: SquadMember) => String(p.subCategory || "").toLowerCase() === "medical");
  const scoutingStaff: SquadMember[] = counterParsingDataset.filter((p: SquadMember) => String(p.subCategory || "").toLowerCase() === "scouting");
  const totalStaffCount: number = technicalStaff.length + medicalStaff.length + scoutingStaff.length;

  return (
    <div 
      className="w-full min-h-screen px-3 py-6 sm:px-4 sm:py-12 text-white text-left box-border select-none font-sans"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-5 text-gray-500 w-full text-left">
          <span className="cursor-pointer hover:text-[#D4AF37] block" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>The Rangers Squad</span>
        </div>

        <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="text-left">
            <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
              Official Buganda Regional League Registry
            </span>
            <h2 className="text-xl sm:text-4xl font-black uppercase tracking-wide mt-1 leading-tight text-white">
              First Team Roster
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono bg-[#0B4622]/40 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg w-fit text-[#D4AF37]">
            <IoLocationOutline className="text-xs" />
            <span>Training Base: Gayaza Town, Uganda</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 w-full box-border">
          <div className="bg-[#041A0E]/30 backdrop-blur-md p-3.5 rounded-xl border border-white/5 shadow-md text-left">
            <span className="block text-2xl font-black text-[#D4AF37] leading-none font-mono">
              {players.length > 0 ? players.length : 22}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">Active Registered Players</span>
          </div>
          <div className="bg-[#041A0E]/30 backdrop-blur-md p-3.5 rounded-xl border border-white/5 shadow-md text-left">
            <span className="block text-2xl font-black text-[#D4AF37] leading-none font-mono">
              {totalStaffCount > 0 ? totalStaffCount : 5}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">Technical Officials</span>
          </div>
          <div className="bg-[#041A0E]/30 backdrop-blur-md p-3.5 rounded-xl border border-white/5 shadow-md text-left col-span-2 md:col-span-1">
            <span className="block text-2xl font-black text-emerald-400 leading-none font-mono">FUFA</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">League Affiliate Sanction</span>
          </div>
        </div>

        <div className="w-full box-border space-y-4">
          <RosterSection title="Technical Leadership Bureau" type="technical" squad={(activeSquad || []) as any} />
          <RosterSection title="Medical & Health Science Desk" type="medical" squad={(activeSquad || []) as any} />
          <RosterSection title="Scouting & Recruitment Intelligence" type="scouting" squad={(activeSquad || []) as any} />

          <RosterSection title="Goalkeepers" type="goalkeeper" squad={(activeSquad || []) as any} />
          <RosterSection title="Defenders" type="defender" squad={(activeSquad || []) as any} />
          <RosterSection title="Midfielders" type="midfielder" squad={(activeSquad || []) as any} />
          <RosterSection title="Forwards & Strikers" type="forward" squad={(activeSquad || []) as any} />
        </div>

      </div>
    </div>
  );
}
