import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import bannerImg from "../../assets/players2.jpg";

interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export default function Banner() {
  const navigate = useNavigate();

  const matchYear: number = 2026;
  const matchMonthIndex: number = 9; 
  const matchDay: number = 30;
  const matchHour: number = 17;      
  const matchMinute: number = 30;

  const matchDateFormattedString: string = "Sunday, July 30, 2026";
  const matchTimeFormattedString: string = "5:00 PM EAT";

  const calculateTimeLeft = (): CountdownTimeLeft => {
    const targetMatchDate: number = new Date(matchYear, matchMonthIndex, matchDay, matchHour, matchMinute, 0).getTime(); 
    const now: number = new Date().getTime();
    const difference: number = targetMatchDate - now;

    let timeLeft: CountdownTimeLeft = { days: 10, hours: 400, minutes: 30, seconds: 0, isLive: false };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isLive: false
      };
    } else if (difference <= 0 && difference > -10800000) {
      timeLeft.isLive = true;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer: any = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const padZero = (num: number): string => String(num).padStart(2, '0');

  return (
    <div 
      className='relative min-h-[90vh] lg:min-h-0 lg:h-[85vh] flex items-center overflow-hidden w-full select-none'
      style={{ 
        background: 'linear-gradient(135deg, #020B05 0%, #062613 50%, #031109 100%)',
        borderBottom: '4px solid #D4AF37'
      }}
    >
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center mix-blend-overlay pointer-events-none opacity-10"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(212, 175, 55, 0.08)' }}></div>

        <div className='relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 pt-20 pb-8 lg:py-0 z-10 gap-8 lg:gap-12 box-border'>
            <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 box-border">
                <div className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 border font-mono whitespace-nowrap" style={{ background: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)', color: '#D4AF37' }}>
                    Uganda Wildlife Authority Official Portal
                </div>
                <h1 className='font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none uppercase'>
                    UWA FC
                    <span className="block uppercase tracking-wider mt-2 font-black text-xs sm:text-sm md:text-base font-mono" style={{ color: '#D4AF37' }}>
                        The Wildlife Stars of Uganda
                    </span>
                </h1>
                <p className='font-medium text-xs sm:text-sm md:text-base text-gray-300 my-4 max-w-md leading-relaxed font-sans'>
                    Leveraging athletic discipline and youth sports development to anchor national conservation advocacy campaigns across Uganda and the whole of East Africa.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto font-mono">
                    <button 
                      onClick={() => navigate({ to: '/about/facilities' })}
                      type='button' 
                      className='w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl border-none outline-none shadow-xl transform active:scale-95 transition-all duration-150 cursor-pointer hover:brightness-110 text-center text-[#020B05]' 
                      style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)' }}
                    >
                        View Club Profile
                    </button>
                    <button 
                      onClick={() => navigate({ to: '/fixtures' })}
                      type='button'
                      className='w-full sm:w-auto text-center font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl border text-white hover:bg-white/5 transition-all duration-150 cursor-pointer bg-black/20' 
                      style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                        Match Center
                    </button>
                </div>
                <div className="w-full mt-6 sm:mt-10 box-border">
                    <div className="backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border text-left box-border w-full" style={{ background: 'rgba(4, 20, 10, 0.75)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                        <div className="flex justify-between items-center mb-3.5 border-b border-white/5 pb-2 font-mono">
                            <span className='font-bold uppercase tracking-widest text-[10px] sm:text-[11px]' style={{ color: '#D4AF37' }}>Next Fixture Match</span>
                            <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${timeLeft.isLive ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/20 animate-pulse' : 'bg-amber-600/20 text-amber-400 border-amber-500/20'}`}>
                                {timeLeft.isLive ? '• Match Live' : 'System Ready'}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 w-full box-border">
                            <div className="text-center sm:text-left font-sans">
                                <h5 className="text-white font-black text-sm sm:text-base uppercase tracking-tight">vs Vipers SC</h5>
                                <p className="text-gray-400 text-[11px] sm:text-xs font-semibold mt-1">{matchDateFormattedString}</p>
                                <p className="text-gray-500 text-[11px] sm:text-xs font-mono mt-0.5">Kickoff: {matchTimeFormattedString}</p>
                            </div>
                            
                            {timeLeft.isLive ? (
                              <div className="text-emerald-400 font-mono font-bold tracking-widest text-xs animate-pulse bg-emerald-950/40 px-4 py-2.5 rounded border border-emerald-500/30 text-center w-full sm:w-auto">
                                MATCH NOW IN PROGRESS
                              </div>
                            ) : (
                              <div className='flex items-center gap-x-1 sm:gap-x-1.5 font-mono font-bold text-xs sm:text-base select-none mx-auto sm:mx-0'>
                                  <div className='px-1.5 py-1 sm:px-2 sm:py-1.5 bg-white/5 rounded border border-white/10 text-white flex flex-col items-center min-w-[38px] sm:min-w-[40px]'><span className="text-[8px] sm:text-[10px] text-gray-500 font-sans mb-0.5">DAYS</span>{padZero(timeLeft.days)}</div>
                                  <div className='text-white/20 font-sans text-xs pb-4'>:</div>
                                  <div className='px-1.5 py-1 sm:px-2 sm:py-1.5 bg-white/5 rounded border border-white/10 text-white flex flex-col items-center min-w-[38px] sm:min-w-[40px]'><span className="text-[8px] sm:text-[10px] text-gray-500 font-sans mb-0.5">HRS</span>{padZero(timeLeft.hours)}</div>
                                  <div className='text-white/20 font-sans text-xs pb-4'>:</div>
                                  <div className='px-1.5 py-1 sm:px-2 sm:py-1.5 bg-white/5 rounded border border-white/10 text-white flex flex-col items-center min-w-[38px] sm:min-w-[40px]'><span className="text-[8px] sm:text-[10px] text-gray-500 font-sans mb-0.5">MINS</span>{padZero(timeLeft.minutes)}</div>
                                  <div className='text-white/20 font-sans text-xs pb-4'>:</div>
                                  <div className='px-1.5 py-1 sm:px-2 sm:py-1.5 bg-[#0B4622]/30 rounded border border-[#D4AF37]/30 flex flex-col items-center min-w-[38px] sm:min-w-[40px]' style={{ color: '#D4AF37' }}><span className="text-[8px] sm:text-[10px] text-gray-400 font-sans mb-0.5">SECS</span>{padZero(timeLeft.seconds)}</div>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-7/12 flex items-end justify-center order-1 lg:order-2 self-end lg:h-full pt-4 lg:pt-16 box-border overflow-hidden">
                <div className="relative w-full max-w-lg lg:max-w-none flex items-end justify-center box-border">
                    <div className="absolute bottom-0 w-[80%] h-[60%] rounded-full blur-[60px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 70%)' }}></div>
                    <img 
                      src={bannerImg} 
                      className="relative object-cover w-3/4 sm:w-1/2 lg:w-full max-h-[35vh] sm:max-h-[40vh] lg:max-h-[85vh] filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] z-10 transition-transform duration-300 hover:scale-[1.01]" 
                      alt="UWA FC First Team Squad" 
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentNode as HTMLElement | null;
                        if (parent) {
                          parent.innerHTML = `<div class="h-40 flex items-center justify-center font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-widest border border-dashed border-white/5 rounded-xl bg-black/10 px-4">The Wildlife Stars Of Uganda Roster Vector Template Map</div>`;
                        }
                      }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
