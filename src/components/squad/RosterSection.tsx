import React from 'react';
import SquadCardPlayer from './SquadCardPlayer';

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
  isCaptain?: boolean;
}

interface RosterSectionProps {
  title: string;
  type: string;
  squad: SquadMember[];
}

export default function RosterSection({ title, type, squad }: RosterSectionProps) {
  const incomingSquadArray = Array.isArray(squad) ? squad : [];
  const activeSquad = incomingSquadArray.length > 0 ? incomingSquadArray : [];

  if (activeSquad.length === 0) return null;

  const filteredSquad = activeSquad.filter((member) => {
    if (!member) return false;
    
    const filterTargetType = String(type).toLowerCase().trim();
    const memberPosition = String(member.position || "").toLowerCase().trim();
    const memberSubCategory = String(member.subCategory || "").toLowerCase().trim();
    const memberRole = String(member.role || "").toLowerCase().trim();

    if (filterTargetType === "technical") {
      const matchesTechnicalType = memberSubCategory === "technical" || memberPosition.includes("technical");
      const hasTechnicalRole = memberRole.includes("coach") || memberRole.includes("manager") || memberRole.includes("gaffer") || memberRole.includes("tactician");
      const isMedicalOrScouting = memberSubCategory === "medical" || memberSubCategory === "scouting" || memberRole.includes("doctor") || memberRole.includes("physio") || memberRole.includes("scout");

      return (matchesTechnicalType || hasTechnicalRole) && !isMedicalOrScouting;
    }

    if (filterTargetType === "medical") {
      return (
        memberSubCategory === "medical" || 
        memberPosition.includes("medical") ||
        memberRole.includes("doctor") || 
        memberRole.includes("physio") || 
        memberRole.includes("trainer") ||
        memberRole.includes("therapist")
      );
    }

    if (filterTargetType === "scouting") {
      return (
        memberSubCategory === "scouting" || 
        memberPosition.includes("scout") ||
        memberRole.includes("scout") || 
        memberRole.includes("recruitment") || 
        memberRole.includes("analyst")
      );
    }

    return (
      memberPosition === filterTargetType ||
      (filterTargetType === "goalkeeper" && (memberPosition === "gk" || memberPosition === "goalkeeper")) ||
      (filterTargetType === "defender" && (memberPosition === "def" || memberPosition === "defender")) ||
      (filterTargetType === "midfielder" && (memberPosition === "mid" || memberPosition === "midfielder")) ||
      (filterTargetType === "forward" && (memberPosition === "fwd" || memberPosition === "forward" || memberPosition === "striker"))
    );
  });

  if (filteredSquad.length === 0) return null;

  return (
    <div className="w-full mb-6 box-border clear-both overflow-visible text-left px-1 sm:px-0">
      <h3 className="text-xs sm:text-base font-bold font-mono tracking-wider text-[#f2a900] border-l-4 border-[#0d522c] pl-2.5 mb-3 uppercase">
        {title} ({filteredSquad.length})
      </h3>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full box-border items-stretch">
        {filteredSquad.map((member) => (
          <SquadCardPlayer
            key={member.id}
            id={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            shirtNumber={member.shirtNumber}
            img_url={member.img_url || member.img}
            role={member.role || member.position}
            position={member.position}
            metrics={member.metrics}
            isCaptain={member.isCaptain}
          />
        ))}
      </div>
    </div>
  );
}
