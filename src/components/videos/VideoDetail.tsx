// src/components/video/VideoDetail.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { 
  IoVideocamOutline, 
  IoSearchOutline, 
  IoPlayCircleOutline, 
  IoTimeOutline, 
  IoEyeOutline, 
  IoMicOutline,
  IoFitnessOutline,
  IoRibbonOutline,
  IoFilmOutline,
  IoArrowBackOutline,
  IoChatboxEllipsesOutline,
  IoCheckmarkCircleOutline
} from 'react-icons/io5'; 
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

interface VideoCommentFormData {
  viewerName: string;
  commentText: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho",
  authDomain: "://firebaseapp.com",
  projectId: "uwa-fc",
  storageBucket: "uwa-fc.firebasestorage.app",
  messagingSenderId: "387684494889",
  appId: "1:387684494889:web:373435029bd43bfbbe3638",
  measurementId: "G-DF4GNF6N28"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);
// src/components/video/VideoDetail.tsx (Continued)
export default function VideoHub() {
  const { videoId } = useParams({ from: '/videos/$videoId' as any }) as any;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [commentPosted, setCommentSubmitted] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VideoCommentFormData>({
    defaultValues: { viewerName: '', commentText: '' }
  });

  const commentMutation = useMutation({
    mutationFn: async (data: VideoCommentFormData) => {
      return await addDoc(collection(db, "video_interactions"), {
        targetVideoId: videoId || "v1",
        author: data.viewerName,
        message: data.commentText,
        sourcePlatform: "WEB_PORTAL",
        timestamp: serverTimestamp()
      });
    },
    onSuccess: () => {
      setCommentSubmitted(true);
      reset();
      setTimeout(() => setCommentSubmitted(false), 4000);
    }
  });

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
      views: "12.4K",
      date: "June 14, 2026",
      summary: "Catch the complete extended match coverage of Wildlife Stars of Uganda tactical showing on the pitch, highlighting crucial defensive blocks and clinical transition finishes.",
      thumbnail: "https://unsplash.com", 
      embed_url: "https://youtube.com" 
    },
    {
      id: "v2",
      title: "Exclusive Interview: Skipper Outlines Defensive Focus",
      category: "interviews",
      duration: "04:20",
      views: "3.1K",
      date: "June 12, 2026",
      summary: "First team captain joins UWA Media desks to break down team chemistry, squad moral levels, and defensive layout adjustments ahead of matchday runs.",
      thumbnail: "https://unsplash.com", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v3",
      title: "Pre-Match Press Conference: Head Coach Statement Logs",
      category: "press",
      duration: "12:45",
      views: "1.8K",
      date: "June 11, 2026",
      summary: "Official technical briefing from the pavilion media room outlining fixture rosters, training injury logs, and match parameters for the IT Directorate review.",
      thumbnail: "https://unsplash.com", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v4",
      title: "Behind The Scenes: The Wildlife Stars Of Uganda Endurance & S&C Workouts",
      category: "training",
      duration: "06:45",
      views: "5.8K",
      date: "June 10, 2026",
      summary: "Exclusive raw footage capturing the squad inside the performance fitness gym, running structured speed training sets and recovery drills.",
      thumbnail: "https://unsplash.com", 
      embed_url: "https://youtube.com"
    },
    {
      id: "v5",
      title: "Next Gen: Academy U-16 Local Championship Highlights",
      category: "academy",
      duration: "08:10",
      views: "2.4K",
      date: "June 05, 2026",
      summary: "Nurturing the future: Watch the outstanding team goals and technical skill sets showcased by our youth academy division stars during tournament fixtures.",
      thumbnail: "https://unsplash.com", 
      embed_url: "https://youtube.com"
    }
  ];

  const onCommentSubmit = (data: VideoCommentFormData) => {
    commentMutation.mutate(data);
  };

  const activeVideo = clubVideos.find(v => v.id === videoId) || clubVideos[0];

  const filteredVideos = clubVideos.filter(video => {
    const matchesFilter = activeFilter === 'all' || video.category === activeFilter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch && video.id !== activeVideo.id;
  });
// src/components/video/VideoDetail.tsx (Continued)
  return (
    <div className="w-full min-h-screen px-3 py-4 sm:p-8 box-border text-white text-left" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border space-y-6">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/videos' as any })}>Media Hub</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }} className="truncate max-w-[140px]">{activeVideo.title}</span>
        </div>

        {/* Main Screening Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full box-border">
          
          {/* Main Stage Video Content Block */}
          <div className="lg:col-span-2 space-y-4 w-full box-border">
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/5 shadow-2xl relative">
              <iframe 
                src={activeVideo.embed_url}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-4 rounded-xl border bg-[#041A0E]/20 border-white/5 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[9px] text-[#D4AF37] uppercase tracking-wide">
                <span className="bg-[#0B4622]/60 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-black">{activeVideo.category}</span>
                <span className="flex items-center gap-0.5 text-neutral-400"><IoTimeOutline /> {activeVideo.duration}</span>
                <span className="flex items-center gap-0.5 text-neutral-400"><IoEyeOutline /> {activeVideo.views} Views</span>
              </div>
              <h1 className="text-sm sm:text-2xl font-black uppercase text-white tracking-tight leading-snug">{activeVideo.title}</h1>
              <p className="text-neutral-400 text-xs font-sans leading-relaxed font-medium">{activeVideo.summary}</p>
            </div>

            {/* Interactive Comment Form Box */}
            <div className="p-4 rounded-xl border bg-black/40 border-white/5 space-y-3">
              <h3 className="text-xs uppercase font-mono font-black text-[#D4AF37] tracking-wider flex items-center gap-1"><IoChatboxEllipsesOutline /> Fan Discussion Room</h3>
              {commentPosted ? (
                <div className="py-4 text-center text-emerald-400 font-mono text-xs flex items-center justify-center gap-1.5"><IoCheckmarkCircleOutline size={16} /> Broadcast comment submitted for approval!</div>
              ) : (
                <form onSubmit={handleSubmit(onCommentSubmit)} className="space-y-3 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input required type="text" {...register("viewerName")} placeholder="Supporter Name (e.g. Eric Lwabya)" className="w-full py-1.5 px-3 bg-black/40 border border-white/10 rounded-md text-xs text-white focus:outline-none focus:border-[#D4AF37]/30" />
                  </div>
                  <textarea required rows={2} {...register("commentText")} placeholder="Type your match feedback or message to the Wildlife Stars here..." className="w-full py-1.5 px-3 bg-black/40 border border-white/10 rounded-md text-xs text-white focus:outline-none focus:border-[#D4AF37]/30 resize-none"></textarea>
                  <div className="flex justify-end"><button type="submit" disabled={commentMutation.isPending} className="py-1.5 px-4 rounded font-mono font-black text-[9px] uppercase tracking-widest text-black shadow-md cursor-pointer disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)' }}>Post Feedback</button></div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Recommendation Archive Pipeline */}
          <div className="space-y-4 w-full box-border">
            <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-3 w-full box-border">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-1"><IoVideocamOutline /> Recommended Clips</h3>
                <div className="relative max-w-[130px]"><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search feed..." className="w-full py-1 pl-5 pr-1.5 bg-black/40 border border-white/10 rounded text-[8px] text-white focus:outline-none font-mono" /><IoSearchOutline className="absolute left-1.5 top-2 text-neutral-600 text-[8px]" /></div>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-0.5 scrollbar-none">
                {filteredVideos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => navigate({ to: `/videos/$videoId`, params: { videoId: video.id } as any })}
                    className="flex gap-2 p-1.5 rounded-lg bg-black/40 border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer group text-left min-w-0"
                  >
                    <div className="w-24 aspect-video rounded bg-neutral-900 overflow-hidden shrink-0 relative border border-white/5 flex items-center justify-center">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]"><IoPlayCircleOutline size={16} /></div>
                    </div>
                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h4 className="text-[10px] font-black text-neutral-200 line-clamp-2 uppercase leading-tight group-hover:text-[#D4AF37] transition-colors tracking-tight">{video.title}</h4>
                      <div className="flex items-center gap-2 font-mono text-[7px] text-neutral-500 font-bold uppercase tracking-tighter mt-1">
                        <span className="flex items-center gap-0.5"><IoEyeOutline /> {video.views}</span>
                        <span>{video.date.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredVideos.length === 0 && (
                  <p className="text-center text-neutral-600 font-mono text-[8px] uppercase tracking-wider py-4">No matching clips archived.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
