import React, { useContext } from "react";
import { Context } from "../../context/Context";
import SquadCardPlayer from "./SquadCardPlayer";

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

export default function Squad() {
  const contextValue = useContext(Context) as any;
  const squad: SquadMember[] = contextValue?.squad || [];
     
  return (
    <div 
      className="w-full min-h-screen relative overflow-hidden" 
      id="players"
      style={{ 
        background: 'linear-gradient(to bottom right, #020a05, #041a0e, #020a05)',
        backgroundColor: '#041a0e',
        maxWidth: '100vw'
      }}
    >
      <div className="container mx-auto text-center py-16 px-4 md:px-0 md:w-3/4">
        <div className='mb-16'>
          <span className="text-[#f2a900] font-black text-xs uppercase tracking-widest block mb-1">
            Buganda Regional League Squad Matrix
          </span>
          <h2 className='font-black text-3xl text-white uppercase tracking-tight'>
            Official First Team Roster
          </h2>
          <hr className='mx-auto h-[4px] w-16 bg-[#0d522c] border-none my-3 rounded-full' />
        </div>

        <div>
          <div className="relative mb-10 pb-4 border-b border-neutral-800 text-left">
            <p className="absolute left-0 -top-8 text-5xl font-black text-white opacity-5 uppercase tracking-wider">
              Management
            </p>
            <p className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-white rounded-full"></span> Technical Management
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 my-6">
            {squad && squad
              .filter((member: SquadMember) => member.position === "Technical Bench")
              .map((coach: SquadMember) => (
                <SquadCardPlayer
                  key={coach.id}
                  firstName={coach.firstName}
                  lastName={coach.lastName}
                  img_url={coach.img_url}
                  shirtNumber={coach.shirtNumber}
                  position={coach.position}
                />
              ))}
          </div>

          <div className="relative mb-10 pb-4 border-b border-neutral-800 text-left mt-14">
            <p className="absolute left-0 -top-8 text-5xl font-black text-[#f2a900] opacity-5 uppercase tracking-wider">
              Goalkeepers
            </p>
            <p className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-[#f2a900] rounded-full"></span> Goalkeepers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 my-6">
            {squad && squad
              .filter((player: SquadMember) => player.position === "Goalkeeper")
              .map((goalkeeper: SquadMember) => (
                <SquadCardPlayer
                  key={goalkeeper.id}
                  firstName={goalkeeper.firstName}
                  lastName={goalkeeper.lastName}
                  img_url={goalkeeper.img_url}
                  shirtNumber={goalkeeper.shirtNumber}
                  position={goalkeeper.position}
                />
              ))}
          </div>

          <div className="relative mb-10 pb-4 border-b border-neutral-800 text-left mt-14">
            <p className="absolute left-0 -top-8 text-5xl font-black text-[#f2a900] opacity-5 uppercase tracking-wider">
              Defenders
            </p>
            <p className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-[#f2a900] rounded-full"></span> Defenders
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 my-6">
            {squad && squad
              .filter((player: SquadMember) => player.position === "Defence" || player.position === "Defender")
              .map((defender: SquadMember) => (
                <SquadCardPlayer
                  key={defender.id}
                  firstName={defender.firstName}
                  lastName={defender.lastName}
                  img_url={defender.img_url}
                  shirtNumber={defender.shirtNumber}
                  position={defender.position}
                />
              ))}
          </div>

          <div className="relative mb-10 pb-4 border-b border-neutral-800 text-left mt-14">
            <p className="absolute left-0 -top-8 text-5xl font-black text-[#f2a900] opacity-5 uppercase tracking-wider">
              Midfielders
            </p>
            <p className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-[#f2a900] rounded-full"></span> Midfielders
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 my-6">
            {squad && squad
              .filter((player: SquadMember) => player.position === "Midfield" || player.position === "Midfielder")
              .map((midfielder: SquadMember) => (
                <SquadCardPlayer
                  key={midfielder.id}
                  firstName={midfielder.firstName}
                  lastName={midfielder.lastName}
                  img_url={midfielder.img_url}
                  shirtNumber={midfielder.shirtNumber}
                  position={midfielder.position}
                />
              ))}
          </div>

          <div className="relative mb-10 pb-4 border-b border-neutral-800 text-left mt-14">
            <p className="absolute left-0 -top-8 text-5xl font-black text-[#f2a900] opacity-5 uppercase tracking-wider">
              Forwards
            </p>
            <p className="text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-[#f2a900] rounded-full"></span> Forwards
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 my-6">
            {squad && squad
              .filter((player: SquadMember) => player.position === "Offence" || player.position === "Forward" || player.position === "Striker")
              .map((striker: SquadMember) => (
                <SquadCardPlayer
                  key={striker.id}
                  firstName={striker.firstName}
                  lastName={striker.lastName}
                  img_url={striker.img_url}
                  shirtNumber={striker.shirtNumber}
                  position={striker.position}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
