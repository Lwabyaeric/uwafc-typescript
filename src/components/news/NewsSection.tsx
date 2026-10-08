import React, { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Context } from '../../context/Context';
import New from '../news/New'; 

interface InstitutionalNewsItem {
  id: number;
  title: string;
  summary: string;
  content: string[];
  date: string;
  category: string;
  image_url: string;
  gallery: string[];
}
export default function NewsSection() {
  const contextValue = useContext(Context) as any;
  const news = contextValue?.news;
  const navigate = useNavigate(); 

  const institutionalNews: InstitutionalNewsItem[] = (news && news.length > 0) ? news : [
    {
      id: 1,
      title: "The  Wildlife Stars Of Uganda Secure Vital Away Point Ahead of Big Vipers Clash",
      summary: "UWA FC solidifies its league positioning after an intensive tactical showing on the road, shifting full squad focus to the upcoming home fixture.",
      content: [
        "UWA FC (The  Wildlife Stars Of Uganda) put up a masterclass defensive display over the weekend to secure a priceless away point. Facing a hostile crowd, the technical bench deployed a disciplined 4-3-3 low block that frustrated the opposition's wingers throughout the ninety minutes.",
        "The standout performer of the match was our goalkeeper, whose crucial double-save in the 74th minute kept the clean sheet intact. This tactical robustness provides a massive moral boost as the squad returns to training camp at our home grounds.",
        "All eyes are now locked onto the upcoming high-stakes fixture against Vipers SC. The Head Coach emphasized that the team must refine their final-third transitions if they want to claim maximum points at home in front of the UWA management delegation."
      ],
      date: "June 08, 2026",
      category: "match-reports",
      image_url: "https://unsplash.com",
      gallery: []
    },
    {
      id: 2,
      title: "The Wildlife Stars Of UgandaComplete Blockbuster Signing of Midfielder Sekitoleko Musa",
      summary: "UWA FC management secures tactical midfield linchpin Musa Sekitoleko on a free transfer, signaling clear structural ambitions for top flight dominance.",
      content: [
        "Uganda Wildlife Authority FC has sent a clear message of intent to league rivals by securing the signature of highly-rated midfielder Sekitoleko Musa on a free transfer. The versatile maestro completed his executive medical tracking exams at the head office before putting pen to paper on a multi-year structural contract.",
        "Musa brings much-needed top-flight experience, physical presence, and tactical vision to the Wildlife Stars Of Uganda' engine room. The technical committee noted that his leadership on the pitch perfectly mirrors the disciplined operational standards of the Uganda Wildlife Authority.",
        "Speaking to the media bureau center, Musa stated: 'Joining UWA FC is an incredible honor. The club has a unique mission that combines professional sports excellence with national wildlife conservation advocacy, and I am determined to help the Wildlife Stars Of Uganda conquer the league this season.'"
      ],
      date: "June 07, 2026",
      category: "transfers",
      image_url: "https://unsplash.com",
      gallery: []
    },
    {
      id: 3,
      title: "UWA FC Players Launch New Wildlife Awareness Outreach Campaign",
      summary: "The Wildlife Stars Of Uganda squad members travel to local schools near Murchison Falls to promote conservation education, merging the influence of sports with community advocacy.",
      content: [
        "In alignment with the core corporate mandate of the Uganda Wildlife Authority, UWA FC players took a break from the pitch to spearhead an impactful wildlife conservation drive in schools bordering the Murchison Falls conservation area.",
        "The team distributed sports gear alongside educational materials highlighting the critical importance of protecting endangered local species and combating illegal poaching frameworks.",
        "The Commissioner General commended the players, stating that UWA FC serves as a powerful bridge connecting community youth to national tourism and environmental preservation initiatives."
      ],
      date: "June 05, 2026",
      category: "community",
      image_url: "https://unsplash.com",
      gallery: []
    }
  ];

  const handleArticleRedirect = (article: InstitutionalNewsItem): void => {
    navigate({ to: '/news', state: { directArticle: article } as any });
  };
  return (
    <section 
      id="news"
      style={{ 
        background: 'linear-gradient(to bottom, #031109 0%, #062613 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
      }}
    >
      <div className='container mx-auto px-2 sm:px-6 pt-4 pb-8 sm:py-16 text-center max-w-7xl box-border w-full'>

        <div className='mb-4 sm:mb-12'>
          <span className="font-black text-[9px] sm:text-xs uppercase tracking-widest block mb-0.5" style={{ color: '#D4AF37' }}>
            Media & Press Center
          </span>
          <h2 className='font-black text-xl sm:text-3xl text-white uppercase tracking-tight leading-none'>
            Latest Club Bulletins
          </h2>
          <hr 
            className='mx-auto h-[2.5px] sm:h-[3.5px] w-10 sm:w-14 border-none mt-2 rounded-full' 
            style={{ backgroundColor: '#D4AF37' }}
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 content-center items-stretch w-full box-border'>
          {institutionalNews.slice(0, 3).map((my_new: InstitutionalNewsItem) => (
            <div 
              key={my_new.id} 
              className="flex flex-col bg-black/25 rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 w-full box-border"
              style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <New 
                content_title={my_new.title}
                content_summary={my_new.summary}
                date={my_new.date}
                image_url={my_new.image_url}
                onReadClick={() => handleArticleRedirect(my_new)} 
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-10">
          <button 
            onClick={() => navigate({ to: '/news' })}
            className="transition-all duration-200 font-bold tracking-wider inline-block text-xs sm:text-sm hover:brightness-110 bg-transparent border-0 p-0 cursor-pointer"
            style={{ color: '#D4AF37' }}
          >
            <span className="flex justify-center items-center gap-1 sm:gap-2 uppercase text-[10px] sm:text-[11px] font-black leading-none">
              Access Full Press Archives
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
