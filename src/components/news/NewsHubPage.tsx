import React, { useEffect, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import New from './New';
import { 
  IoNewspaperOutline, 
  IoGridOutline, 
  IoFlameOutline, 
  IoSchoolOutline, 
  IoShieldCheckmarkOutline,
  IoArrowBackOutline,
  IoTimeOutline,
  IoBookmarkOutline
} from 'react-icons/io5';

interface NewsCategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ArticleItem {
  id: number;
  title: string;
  summary: string;
  content: string[];
  date: string;
  category: string;
  image_url: string;
  gallery: string[];
}

export default function NewsHubPage() {
    const navigate = useNavigate();
  const routerState = useRouterState();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);


  const newsCategories: NewsCategoryItem[] = [
    { id: 'all', label: 'All', icon: <IoGridOutline /> }, 
    { id: 'match-reports', label: 'Reports', icon: <IoNewspaperOutline /> },
    { id: 'transfers', label: 'Squad', icon: <IoFlameOutline /> },
    { id: 'academy', label: 'Academy', icon: <IoSchoolOutline /> },
    { id: 'community', label: 'Conservation', icon: <IoShieldCheckmarkOutline /> }
  ];

  const officialPresentationNews: ArticleItem[] = [
    {
      id: 1,
      title: "The Wildlife Stars Of Uganda Secure Vital Away Point Ahead of Big Vipers Clash",
      summary: "UWA FC solidifies its league positioning after an intensive tactical showing on the road, shifting full squad focus to the upcoming home fixture.",
      content: [
        "UWA FC (The Wildlife Stars Of Uganda) put up a defensive masterclass over the weekend to secure a priceless away point. Facing an aggressive crowd on the road, the technical bench deployed a disciplined 4-3-3 low block that effectively neutralized the opposition's wingers throughout the ninety minutes of play.",
        "The standout performer of the match was our starting goalkeeper, whose crucial double-save in the 74th minute kept our clean sheet entirely intact. This tactical robustness provides a massive moral boost as the squad returns to our home training camp.",
        "All eyes are now locked onto the upcoming high-stakes fixture against Vipers SC. The Head Coach emphasized during the post-match press brief that the team must refine their final-third transitions if they want to claim all maximum points at home in front of the visiting UWA management delegation."
      ],
      date: "June 08, 2026",
      category: "match-reports",
      image_url: "../../assets/home/id1.jpg",
      gallery: ["../../assets/home/gallery1.jpg"]
    },
    {
      id: 2,
      title: "The Wildlife Stars Of UgandaComplete Blockbuster Signing of Midfielder Sekitoleko Musa",
      summary: "UWA FC management secures tactical midfield linchpin Musa Sekitoleko on a free transfer, signaling clear structural ambitions for top flight dominance.",
      content: [
        "Uganda Wildlife Authority FC has sent a clear message of intent to league rivals by securing the signature of highly-rated midfielder Sekitoleko Musa on a free transfer. The versatile maestro completed his executive medical tracking exams at the head office before putting pen to paper on a multi-year structural contract.",
        "Musa brings much-needed top-flight experience, physical presence, and tactical vision to the Wildlife Stars Of Uganda' engine room. The technical committee noted that his leadership on the pitch perfectly mirrors the disciplined operational standards of the Uganda Wildlife Authority.",
        "Speaking to the media bureau center, Musa stated: 'Joining UWA FC is an incredible honor. The club has a unique mission that combines professional sports excellence with national wildlife conservation advocacy, and I am certified to help the Wildlife Stars Of Uganda conquer the league this season.'"
      ],
      date: "June 07, 2026",
      category: "transfers",
      image_url: "../../assets/home/id2.jpg",
      gallery: ["../../assets/home/gallery2.jpg"]
    },
    {
      id: 3,
      title: "UWA FC Players Launch New Wildlife Awareness Outreach Campaign",
      summary: "The Wildlife Stars Of Ugandasquad members travel to local schools near Murchison Falls to promote conservation education, merging the influence of sports with community advocacy.",
      content: [
        "In direct alignment with the core corporate mandate of the Uganda Wildlife Authority, UWA FC players took an official break from their pitch training routines to spearhead an impactful wildlife conservation drive across local schools.",
        "The team traveled directly to communities bordering the Murchison Falls conservation area, distributing sports gear alongside educational materials. These items highlighted the critical importance of protecting endangered local species and safeguarding regional reserves.",
        "The Commissioner General commended the players' active participation, stating that UWA FC serves as a powerful bridge connecting community youth directly to national tourism and environmental preservation initiatives."
      ],
      date: "June 05, 2026",
      category: "community",
      image_url: "../../assets/home/id3.jpg",
      gallery: ["https://unsplash.com"]
    },
    {
      id: 4,
      title: "Defensive Rock Ssenyonjo Isaac Pens Two-Year Renewal Deal",
      summary: "Club captain and central defender commits future to the Wildlife Stars Of Uganda, signing a comprehensive structural contract extension after an outstanding defensive cycle.",
      content: [
        "Stability remains at the heart of UWA FC's executive planning. Club Captain Ssenyonjo Isaac has officially extended his tenure with the Wildlife Stars Of Uganda by signing a new two-year structural contract renewal following lengthy discussions with the board secretariat.",
        "Isaac has been a pillar of consistency in our defensive backline, directing structural play and maintaining the lowest goals-against average in regional match logs. His tactical discipline has drawn widespread praise from both club patrons and federation scouts.",
        "The Club Patron noted that maintaining core senior leaders like Isaac ensures organizational continuity, providing a solid foundation for younger prospects coming up through our development academy routes."
      ],
      date: "June 03, 2026",
      category: "transfers",
      image_url: "../../assets/home/id4.jpg",
      gallery: []
    },
    {
      id: 5,
      title: "Secretariat Outlines New Digital Ticket Integration & Portal Upgrades",
      summary: "In coordination with the IT Directorate, the club announces upcoming biometric gate access modules and live-streaming infrastructure deployment plans.",
      content: [
        "The UWA FC Secretariat has officially finalized structural plans to upgrade match-day venue logistics. Moving into the upcoming tournament phase, fans and agency staff will enjoy fully digital ticketing frameworks built to eliminate gate bottlenecks.",
        "Working hand-in-hand with our internal IT Directorate, the online portal will also feature a secure live streaming module. This allows institutional staff stationed across all national park outposts to watch matches live from their remote duties.",
        "Testing for the new biometric turnstiles begins at the stadium gates this week. The executive board highlights this operational step forward as a major milestone in professionalizing the commercial operations of the club."
      ],
      date: "June 01, 2026",
      category: "transfers",
      image_url: "../../assets/home/id5.jpg",
      gallery: ["https://unsplash.com"]
    },
    {
      id: 6,
      title: "The Wildlife Stars Of Uganda Wrap Up Deadline Day Deal For Winger Okello Peter",
      summary: "Lightning-fast explosive winger joins UWA FC from regional leagues to reinforce offensive line transition tracking mechanics.",
      content: [
        "UWA FC has successfully finalized the registration of lightning-fast forward Okello Peter as the technical committee wraps up its offensive squad reconstruction phase. Peter arrives with a reputation for raw pace and devastating precision in 1v1 situations.",
        "The head scout confirmed that Peter's performance tracking data ranked in the top percentile for high-intensity sprints. This gives the coaching staff a dangerous weapon for lethal fast-break transitions against high-pressing opponents.",
        "Peter will wear the iconic number 11 jersey and has been cleared by the league secretariat to join full first-team training sessions effective immediately."
      ],
      date: "May 30, 2026",
      category: "transfers",
      image_url: "../../assets/home/id6.jpg",
      gallery: []
    },
    {
      id: 7,
      title: "UWA Junior Academy Unveils Elite Scouting Program Across Regional Zones",
      summary: "The technical committee launches a talent identification framework designed to discover young prospects in communities bordering protected wildlife territories.",
      content: [
        "The UWA Junior Academy is officially expanding its football development umbrella. A team of certified youth coaches will embark on a regional talent tour targeting high schools, sub-county football leagues, and community games.",
        "This program is designed to provide high-level athletic opportunities to talented youngsters residing in regions close to our national game reserves, creating a clear pathway into professional sports.",
        "Selected prospects will receive full sporting scholarships, dedicated accommodation, and structural mentorship under the UWA footballing development philosophy, keeping them engaged in positive community growth."
      ],
      date: "May 28, 2026",
      category: "academy",
      image_url: "../../assets/home/id7.jpg",
      gallery: ["https://unsplash.com"]
    },
    {
      id: 8,
      title: "The Wildlife Stars Of UgandaStrengthen Backline with Experienced Left-Back Atuhairwe Ronald",
      summary: "UWA FC completes the transfer of defensive specialist Ronald Atuhairwe to add structural depth and stability to  the Wildlife Stars Of Uganda' left flank.",
      content: [
        "UWA FC has completed the signing of veteran left-back Atuhairwe Ronald on a free transfer. The experienced defender brings tactical awareness and crossing accuracy to the team's defensive and offensive setups.",
        "Having played at the highest levels of regional club football, Atuhairwe's arrival resolves structural vulnerabilities identified on our left flank during previous match reviews. His strict professionalism makes him an ideal role model for academy players.",
        "The technical team has confirmed that Atuhairwe passed his baseline physical performance metrics with flying colors and will report directly to first-team camp layout preparations."
      ],
      date: "May 27, 2026",
      category: "transfers",
      image_url: "../../assets/home/id8.jpg",
      gallery: []
    },
    {
      id: 9,
      title: "Tactical Performance Analysis Logs Submitted for Executive Desk Review",
      summary: "UWA FC coaching staff finalizes comprehensive physical testing datasets and sports science nutrition logs ahead of upcoming closed tournament runs.",
      content: [
        "The technical and coaching staff have successfully compiled the mid-year player performance audit. The dataset details oxygen optimization thresholds, individual sprint speeds, and strict dietary logs.",
        "This data ensures every single player on the squad meets the strenuous physical standards expected of a professional institutional club representing a law enforcement agency.",
        "The final physical profiles have been forwarded directly to the Executive Desk to demonstrate tactical readiness ahead of structural tournament fixtures."
      ],
      date: "May 25, 2026",
      category: "match-reports",
      image_url: "../../assets/home/id9.jpg",
      gallery: []
    },
    {
      id: 10,
      title: "The Wildlife Stars Of Uganda Announce Strategic Acquisition of Promising Goalkeeper Opio Denis",
      summary: "UWA FC signs young shot-stopper Opio Denis on a free transfer to bolster long-term goalkeeping depth and squad competition profiles.",
      content: [
        "The UWA FC Secretariat is delighted to announce the arrival of highly prospective goalkeeper Opio Denis on a free transfer. The towering 21-year-old shot-stopper signed a long-term developmental contract after his contract expired with his former club.",
        "Opio is recognized for his commanding box presence, fast reflex saves, and excellent ball-distribution mechanics, which align perfectly with our modern playstyle requirements.",
        "Goalkeeping coaches indicated that Opio will train alongside senior keepers to speed up his integration into top-tier tournament rotations."
      ],
      date: "May 22, 2026",
      category: "transfers",
      image_url: "../../assets/home/id10.jpg",
      gallery: []
    },
    {
      id: 11,
      title: "UWA Junior Squad Triumphs in Regional Conservation Derby Match Run",
      summary: "The Under-17 academy team claims a resounding victory, celebrating on-pitch excellence while promoting community anti-poaching awareness.",
      content: [
        "Our UWA Junior Academy team showcased stellar footballing technique over the weekend, securing a dominant 3-0 victory in the regional developmental derby. Beyond the scoreline, the match day served as a major advocacy platform.",
        "Young academy players proudly displayed banners and distributed flyers detailing environmental protection tips to fans. This initiative perfectly highlighted how sports can drive community-led wildlife conservation campaigns.",
        "The Academy Director noted that teaching young athletes to be conservation ambassadors alongside their football training is central to UWA FC's unique operational philosophy."
      ],
      date: "May 20, 2026",
      category: "academy",
      image_url: "../../assets/home/id11.jpg",
      gallery: []
    },
    {
      id: 12,
      title: "UWA FC Secures Corporate Sponsorship Extension with Tourism Partners",
      summary: "Executive board signs financial and logistical support renewals to boost first-team club travel operations near protected national parks.",
      content: [
        "UWA FC's commercial sustainability received a massive boost today. The Executive Board officially signed a corporate renewal contract with leading national tourism partners, ensuring long-term financial backing.",
        "This strategic partnership guarantees elite transport logistics, training equipment, and premium travel support when the Wildlife Stars Of Uganda travel for promotional matches near major national parks and game reserves.",
        "The Board Chairman announced that these funds will also go toward enhancing community fan clubs, expanding match day broadcast access, and upgrading our core athletic training facilities."
      ],
      date: "May 15, 2026",
      category: "community",
      image_url: "../../assets/home/id12.jpg",
      gallery: []
    }
  ];

   useEffect(() => {
    const routerLocationState = routerState.location.state as any;
    if (routerLocationState && routerLocationState.directArticle) {
      const targetArticle = routerLocationState.directArticle;
      const matched = officialPresentationNews.find(n => n.id === targetArticle.id);
      setSelectedArticle(matched || targetArticle);
      if (matched) setActiveCategory(matched.category);
    }
  }, [routerState.location.state]);

  const filteredNews: ArticleItem[] = activeCategory === 'all'
    ? officialPresentationNews
    : officialPresentationNews.filter((item: ArticleItem) => item.category === activeCategory);

    
  return (
    <div 
      className="w-full min-h-screen px-2 sm:px-4 py-4 sm:py-12 text-white text-left box-border"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="cursor-pointer hover:text-[#D4AF37] block" onClick={() => { setSelectedArticle(null); navigate({ to: '/' }); }}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => setSelectedArticle(null)}>News Hub</span>
          <span>/</span>
          {selectedArticle ? (
            <>
              <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => setSelectedArticle(null)}>{activeCategory}</span>
              <span>/</span>
              <span style={{ color: '#D4AF37' }} className="truncate max-w-[80px] sm:max-w-none">{selectedArticle.title}</span>
            </>
          ) : (
            <span style={{ color: '#D4AF37' }}>{activeCategory}</span>
          )}
        </div>

        {selectedArticle ? (
          
          <div className="max-w-4xl mx-auto transition-all duration-300">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 px-3 py-1.5 mb-5 border border-emerald-800/40 bg-[#041a0e] hover:bg-[#072a16] hover:border-[#D4AF37] text-gray-300 hover:text-white rounded-lg transition-all text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer"
            >
              <IoArrowBackOutline className="text-sm text-[#D4AF37]" /> Back to Archive
            </button>

            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wide">
              <span className="bg-[#0B4622]/40 px-2 py-0.5 rounded border border-emerald-800/30 font-bold text-[#D4AF37]">
                {selectedArticle.category ? selectedArticle.category.replace('-', ' ') : 'Official Dispatch'}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <IoTimeOutline /> {selectedArticle.date}
              </span>
            </div>

            <h1 className="text-sm sm:text-3xl font-black uppercase tracking-tight text-white mb-4 sm:mb-6 leading-snug border-b border-white/10 pb-3">
              {selectedArticle.title}
            </h1>

            <div className="w-full h-[180px] sm:h-[380px] rounded-xl overflow-hidden mb-4 sm:mb-6 border border-white/5 shadow-2xl relative bg-[#010804] flex items-center justify-center">
              
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 blur-lg scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${selectedArticle.image_url})` }}
              />
              
              <img 
                src={selectedArticle.image_url} 
                alt="UWA FC Story Banner Full View"
                className="max-w-full max-h-full object-contain relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2 space-y-3 sm:space-y-4">
                {selectedArticle.content ? (
                  selectedArticle.content.map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-300 text-[11px] sm:text-sm leading-relaxed tracking-wide text-justify">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300 text-[11px] sm:text-sm leading-relaxed text-justify">{selectedArticle.summary}</p>
                )}
                <div className="mt-6 p-2.5 bg-black/20 border-l-2 border-[#D4AF37] rounded-r-md text-[9px] sm:text-[10px] font-mono text-gray-400 leading-normal">
                  Official Communication Register • Corporate Registry of Uganda Wildlife Authority Football Club.
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-black/10 border border-white/5 p-2.5 rounded-xl">
                  <h3 className="text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold mb-2 flex items-center gap-1">
                    <IoBookmarkOutline /> Media Registry
                  </h3>
                  {selectedArticle.gallery && selectedArticle.gallery.length > 0 ? (
                    <div className="grid grid-cols-1 gap-1.5">
                      {selectedArticle.gallery.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="h-20 rounded-lg overflow-hidden border border-white/5 bg-[#041A0E]">
                          <img 
                            src={imgUrl} 
                            alt="Media item" 
                            className="w-full h-full object-cover object-center" 
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-20 rounded-lg overflow-hidden border border-dashed border-white/5 bg-[#020B05] flex items-center justify-center p-2 text-center">
                      <span className="text-[8px] font-mono text-neutral-600 font-bold uppercase tracking-tight">No Additional Assets</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 pb-2 mb-3 text-center sm:text-left">
              <span className="font-mono font-bold text-[8px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
                Media & Press Bureau Center
              </span>
              <h2 className="text-base sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">
                Official Club Bulletins
              </h2>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1.5 mb-3 scrollbar-none w-full box-border">
              {newsCategories.map((cat: NewsCategoryItem) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2 py-1 rounded-md text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1 flex-none whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-[#0B4622] text-[#D4AF37] shadow-lg' 
                      : 'bg-transparent text-gray-400'
                  }`}
                  style={{ borderColor: activeCategory === cat.id ? '#D4AF37' : 'transparent' }}
                >
                  <span className="text-xs sm:text-sm">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full box-border content-center items-stretch group">
              {filteredNews.length > 0 ? (
                filteredNews.map((bulletin: ArticleItem) => (
                  <div 
                    key={bulletin.id} 
                    className="flex flex-col bg-black/40 rounded-xl overflow-hidden shadow-2xl border hover:scale-[1.01] transition-all duration-300 w-full box-border relative [&_img]:!w-full [&_img]:!h-28 sm:[&_img]:!h-40 [&_img]:!object-cover [&_img]:!object-center [&_img]:!p-0 [&_img]:!margin-0 [&_img]:!rounded-none"
                    style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}
                  >
                    <New 
                      content_title={bulletin.title}
                      content_summary={bulletin.summary}
                      date={bulletin.date}
                      image_url={bulletin.image_url}
                      onReadClick={() => setSelectedArticle(bulletin)} 
                    />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-500 text-[10px] sm:text-sm font-bold border border-dashed border-white/10 rounded-xl bg-black/10 px-3 box-border col-span-full">
                  No official bulletins discovered matching this media track category.
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
