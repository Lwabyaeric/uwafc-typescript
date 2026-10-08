import React from 'react';
import { AiOutlineFileText } from "react-icons/ai";

interface NewProps {
  content_title: string;
  content_summary: string;
  date: string;
  image_url: string;
  onReadClick: () => void;
}
export default function New({ content_title, content_summary, date, image_url, onReadClick }: NewProps) {
  return (
    <div 
      onClick={onReadClick}
      className="flex flex-col w-full h-full bg-[#041A0E]/55 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/5 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#052614]/70 box-border relative items-stretch cursor-pointer group"
    >
      <div className="w-full h-36 sm:h-40 overflow-hidden relative bg-neutral-950 flex-none border-b border-white/5">
        <img 
          src={image_url} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
          alt="UWA FC Bulletin Cover" 
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = "https://unsplash.com";
          }}
        />

        <div className="absolute top-2 left-2 bg-red-700 border border-red-500/40 text-white font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-lg select-none">
          Breaking Dispatch
        </div>
      </div>
      <div className="p-3 sm:p-3.5 flex flex-col justify-between text-left flex-grow min-w-0 box-border gap-y-2">
        <div className="space-y-1">
          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider block" style={{ color: '#D4AF37' }}>
            {date}
          </span>
          
          <h4 className="text-white font-black text-[11px] sm:text-xs leading-snug group-hover:text-[#D4AF37] transition-colors duration-150 line-clamp-2 block tracking-tight">
            {content_title}
          </h4>
          
          <p className="text-neutral-400 text-[10px] sm:text-[11px] font-normal leading-normal line-clamp-2">
            {content_summary}
          </p>
        </div>

        <div className="flex items-center justify-between text-[8px] uppercase font-bold tracking-widest mt-1 pt-1 border-t border-white/5 w-full">
          <button 
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation(); 
              if (onReadClick) onReadClick();
            }}
            className="hover:text-white transition-colors flex items-center gap-0.5 font-mono font-black bg-transparent border-0 p-0 cursor-pointer text-[8px]" 
            style={{ color: '#D4AF37' }}
          >
            <AiOutlineFileText className="text-[9px]" /> READ MORE
          </button>
          <span style={{ color: '#D4AF37' }} className="font-mono text-[7px] sm:text-[8px] opacity-90">UWA Media</span>
        </div>
      </div>

    </div>
  );
}
