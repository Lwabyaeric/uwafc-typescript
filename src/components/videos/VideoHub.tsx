// src/components/video/VideoHub.tsx
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoVideocamOutline, 
  IoSearchOutline, 
  IoPlayCircleOutline, 
  IoTimeOutline, 
  IoEyeOutline, 
  IoMicOutline,
  IoFitnessOutline,
  IoRibbonOutline,
  IoFilmOutline
} from 'react-icons/io5'; 

export interface FilterCategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ClubVideoMetadata {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  date: string;
  summary: string;
  thumbnail: string;
  embed_url: string;
}
// src/components/video/VideoHub.tsx (Continued)
export default function VideoHub() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories: FilterCategoryItem[] = [
    { id: 'all', label: 'All', icon: <IoVideocamOutline /> },
    { id: 'highlights', label: 'Highlights', icon: <IoFilmOutline /> },
    { id: 'interviews', label: 'Interviews', icon: <IoMicOutline /> },
    { id: 'press', label: 'Press', icon: <IoMicOutline /> },
    { id: 'training', label: 'Training', icon: <IoFitnessOutline /> },
    { id: 'academy', label: 'Academy', icon: <IoRibbonOutline /> }
  ];

  const clubVideos: ClubVideoMetadata[] = [
    {
      id: "v1",
      title: "Match Highlights: UWA FC vs Vipers SC [Extended Cut]",
      category: "highlights",
      duration: "10:15",
      views: "12,400",
      date: "June 14, 2026",
      summary: "Catch the complete extended match coverage of the Wildlife Stars Of Uganda tactical showing on the pitch, highlighting crucial defensive blocks and clinical transition finishes.",
      thumbnail: "../../assets/home/v1.jpg", 
      embed_url: "https://youtube.com" 
    },
    {
      id: "v2",
      title: "Exclusive Interview: Skipper Outlines Defensive Focus",
      category: "interviews",
      duration: "04:20",
      views: "3,150",
      date: "June 12, 2026",
      summary: "First team captain joins UWA Media desks to break down team chemistry, squad moral levels, and defensive layout adjustments ahead of matchday runs.",
      thumbnail: "../../assets/home/v2.jpg", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v3",
      title: "Pre-Match Press Conference: Head Coach Statement Logs",
      category: "press",
      duration: "12:45",
      views: "1,820",
      date: "June 11, 2026",
      summary: "Official technical briefing from the pavilion media room outlining fixture rosters, training injury logs, and match parameters for the IT Directorate review.",
      thumbnail: "../../assets/home/v3.jpg", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v4",
      title: "Behind The Scenes: The Wildlife Stars Of Uganda Endurance & S&C Workouts",
      category: "training",
      duration: "06:45",
      views: "5,890",
      date: "June 10, 2026",
      summary: "Exclusive raw footage capturing the squad inside the performance fitness gym, running structured speed training sets and recovery drills.",
      thumbnail: "../../assets/home/v4.jpg", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v5",
      title: "Next Gen: Academy U-16 Local Championship Highlights",
      category: "academy",
      duration: "08:10",
      views: "2,400",
      date: "June 05, 2026",
      summary: "Nurturing the future: Watch the outstanding team goals and technical skill sets showcased by our youth academy division stars during tournament fixtures.",
      thumbnail: "../../assets/home/v5.jpg",
      embed_url: "https://youtube.com"
    }
  ];

  const filteredVideos = clubVideos.filter(video => {
    const matchesFilter = activeFilter === 'all' || video.category === activeFilter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
// src/components/video/VideoHub.tsx (Continued)
  return (
    <div 
      className="w-full min-h-screen px-2 sm:px-4 py-4 sm:py-12 text-white text-left box-border"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>Media Hub</span>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-[80px] sm:max-w-none">{activeFilter}</span>
        </div>
        <div className="border-b border-white/10 pb-3 mb-4 text-center sm:text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
              Official Broadcasting Center
            </span>
            <h2 className="text-xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">
              The Wildlife Stars Of Uganda Media Hub
            </h2>
          </div>

          <div className="relative w-full md:w-64 box-border">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search club broadcasts..."
              className="w-full py-1.5 pl-8 pr-3 bg-black/40 border border-white/10 rounded-lg text-[11px] text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/30 font-medium box-border"
            />
            <IoSearchOutline className="absolute left-2.5 top-2.5 text-neutral-500 text-xs" />
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none w-full box-border">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 flex-none whitespace-nowrap ${
                activeFilter === cat.id 
                  ? 'bg-[#0B4622] text-[#D4AF37] shadow-lg' 
                  : 'bg-transparent text-gray-400'
              }`}
              style={{ borderColor: activeFilter === cat.id ? '#D4AF37' : 'transparent' }}
            >
              <span className="text-xs sm:text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 w-full box-border content-center items-stretch group">
            {filteredVideos.map((video) => (
              <div 
                key={video.id} 
                onClick={() => navigate({ to: `/videos/$videoId`, params: { videoId: video.id } as any })}
                className="flex flex-col bg-black/20 rounded-xl overflow-hidden shadow-xl border hover:scale-[1.02] transition-all duration-300 w-full box-border cursor-pointer justify-between group/card"
                style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <div className="w-full aspect-video bg-neutral-950 relative overflow-hidden flex-none">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-80 group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IoPlayCircleOutline className="text-2xl sm:text-3xl text-[#D4AF37] drop-shadow-md group-hover/card:scale-110 transition-transform" />
                  </div>

                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[7px] sm:text-[8px] font-mono font-bold text-gray-400 tracking-tight flex items-center gap-0.5">
                    <IoTimeOutline size={7} /> {video.duration}
                  </span>
                </div>

                <div className="p-2 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[7px] sm:text-[8px] font-mono font-black uppercase text-[#D4AF37] tracking-wider bg-[#0B4622]/40 border border-[#D4AF37]/10 px-1.5 py-0.5 rounded inline-block mb-1">
                      {video.category}
                    </span>
                    <h3 className="text-[9px] sm:text-xs font-black text-neutral-200 line-clamp-2 uppercase tracking-tight leading-tight group-hover/card:text-[#D4AF37] transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[7px] sm:text-[9px] text-neutral-500 font-mono font-bold uppercase tracking-tight">
                    <span className="flex items-center gap-0.5">
                      <IoEyeOutline size={8} /> {video.views}
                    </span>
                    <span className="truncate max-w-[45px] sm:max-w-none text-right">{video.date}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-12 text-gray-500 text-[11px] sm:text-sm font-bold border border-dashed border-white/10 rounded-xl bg-black/10 px-4 box-border">
            No official club broadcasts discovered matching this media track category.
          </div>
        )}

      </div>
    </div>
  );
}
