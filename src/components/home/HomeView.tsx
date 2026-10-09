import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Banner from '../banner/Banner';
import ScheduleDashboard from '../schedulle/ScheduleDashboard';
import RosterSection from '../squad/RosterSection'; 
import New from '../news/New'; 
import { Context } from '../../context/Context';

import { 
  IoShieldCheckmarkOutline, IoArrowForwardOutline, IoTrophyOutline,
  IoCartOutline, IoPeopleOutline, IoCameraOutline, IoMapOutline,
  IoCashOutline, IoShirtOutline, IoMegaphoneOutline, IoTicketOutline
} from 'react-icons/io5';

import * as SquadDataFile from '../../data/squad';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  delivery: string;
  img: string;
  description: string;
}

export interface CartItem {
  id: string | number;
  rawId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  img?: string;
  chosenSize?: string;
  sizes?: string[];
  delivery?: string;
  category?: string;
  description?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

export interface HomeViewProps {
  cart?: CartItem[];
  onCartChange: (freshCartArray: CartItem[]) => void;
  currentUserProfile: UserProfile | null;
  setCheckoutStep?: (step: 'browse' | 'checkout') => void;
  setActivePage?: (page: string) => void;
}
const homeFeaturedProducts: ProductItem[] = [
  { 
    id: "p1", 
    name: "Official Home Jersey 2026/27", 
    category: "kits",
    price: 20000, 
    originalPrice: 50000,
    sizes: ["S", "M", "L", "XL"],
    delivery: "1-3 Days Local",
    img: "home_jersey.jpg", 
    description: "Official home kit featuring dynamic Forest Green with Savannah Gold linings."
  },
  { 
    id: "p4", 
    name: "Official Away Jersey 2026/27", 
    category: "kits",
    price: 20000, 
    originalPrice: 50000,
    sizes: ["S", "M", "L", "XL"],
    delivery: "1-3 Days Local",
    img: "away_jersey.jpg", 
    description: "Classic institutional Gold primary kit with subtle dark moss accent details."
  },
  { 
    id: "p7", 
    name: "Official Third Jersey 2026/27", 
    category: "kits",
    price: 20000, 
    originalPrice: 50000,
    sizes: ["S", "M", "L", "XL"],
    delivery: "1-3 Days Local",
    img: "third_jersey.jpg", 
    description: "Classic institutional alternative Blue kit with dynamic structural linings." 
  },
  { 
    id: "p16", 
    name: "Wildlife Stars Premium Tracksuit Jacket", 
    category: "kits",
    price: 50000, 
    originalPrice: 90000,
    sizes: ["S", "M", "L", "XL"],
    delivery: "1-3 Days Local",
    img: "tracksuit_jacket.jpg", 
    description: "Heavyweight full-zip athletic track jacket complete with woven gold club crest profiles."
  },
  { 
    id: "p18", 
    name: "Savannah Ranger Wind Breakers", 
    category: "kits",
    price: 30000, 
    originalPrice: 50000, 
    sizes: ["S", "M", "L", "XL"],
    delivery: "1-3 Days Local",
    img: "wind_breaker.jpg", 
    description: "Premium institutional wind breakers designed for rainy field weather."
  },
  { 
    id: "p28", 
    name: "The Wildlife stars Thermal Thermos Flask", 
    category: "accessories",
    price: 35000, 
    originalPrice: 45000, 
    sizes: ["500ml Flask"],
    delivery: "1-3 Days Local",
    img: "thermo_flask.jpg", 
    description: "Double-walled vacuum insulated steel thermos supporting sustainable safari conservation."
  }
];
const officialPresentationNews: any[] = [

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
    image_url: "id1.jpg", 
    gallery: ["gallery1.jpg"]
  },
  {
    id: 2,
    title: "The Wildlife Stars Of Uganda Complete Blockbuster Signing of Midfielder Sekitoleko Musa",
    summary: "UWA FC management secures tactical midfield linchpin Musa Sekitoleko on a free transfer, signaling clear structural ambitions for top flight dominance.",
    content: [
      "Uganda Wildlife Authority FC has sent a clear message of intent to league rivals by securing the signature of highly-rated midfielder Sekitoleko Musa on a free transfer. The versatile maestro completed his executive medical tracking exams at the head office before putting pen to paper on a multi-year structural contract.",
      "Musa brings much-needed top-flight experience, physical presence, and tactical vision to the Wildlife Stars Of Uganda' engine room. The technical committee noted that his leadership on the pitch perfectly mirrors the disciplined operational standards of the Uganda Wildlife Authority.",
      "Speaking to the media bureau center, Musa stated: 'Joining UWA FC is an incredible honor. The club has a unique mission that combines professional sports excellence with national wildlife conservation advocacy, and I am determined to help the the Wildlife Stars Of Uganda conquer the league this season.'"
    ],
    date: "June 07, 2026",
    category: "transfers",
    image_url: "id2.jpg", 
    gallery: ["gallery2.jpg"]
  },
  {
    id: 3,
    title: "UWA FC Players Launch New Wildlife Awareness Outreach Campaign",
    summary: "The Wildlife Stars Of Uganda squad members travel to local schools near Murchison Falls to promote conservation education, merging the influence of sports with community advocacy.",
    content: [
      "In direct alignment with the core corporate mandate of the Uganda Wildlife Authority, UWA FC players took an official break from their pitch training routines to spearhead an impactful wildlife conservation drive across local schools.",
      "The team traveled directly to communities bordering the Murchison Falls conservation area, distributing sports gear alongside educational materials. These items highlighted the critical importance of protecting endangered local species and combating illegal poaching frameworks.",
      "The Commissioner General commended the players' active participation, stating that UWA FC serves as a powerful src bridge connecting community youth directly to national tourism and environmental preservation initiatives."
    ],
    date: "June 05, 2026",
    category: "community",
    image_url: "id3.jpg", 
    gallery: ["gallery2.jpg"]
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
    category: "contracts", 
    image_url: "id4.jpg", 
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
    image_url: "id5.jpg", 
    gallery: []
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
    image_url: "id6.jpg", 
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
    image_url: "id7.jpg", 
    gallery: []
  },
  {
    id: 8,
    title: "The Wildlife Stars Of Uganda Strengthen Backline with Experienced Left-Back Atuhairwe Ronald",
    summary: "UWA FC completes the transfer of defensive specialist Ronald Atuhairwe to add structural depth and stability to the Wildlife Stars Of Uganda' left flank.",
    content: [
      "UWA FC has completed the signing of veteran left-back Atuhairwe Ronald on a free transfer. The experienced defender brings tactical awareness and crossing accuracy to the team's defensive and offensive setups.",
      "Having played at the highest levels of regional club football, Atuhairwe's arrival resolves structural vulnerabilities identified on our left flank during previous match reviews. His strict professionalism makes him an ideal role model for academy players.",
      "The technical team has confirmed that Atuhairwe passed his baseline physical performance metrics with flying colors and will report directly to first-team camp layout preparations."
    ],
    date: "May 27, 2026",
    category: "transfers",
    image_url: "id8.jpg", 
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
    image_url: "id9.jpg", 
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
    image_url: "id10.jpg", 
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
    image_url: "id11.jpg", 
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
    image_url: "id12.jpg", 
    gallery: []
  }
];
export default function HomeView({ cart = [], onCartChange, currentUserProfile, setCheckoutStep, setActivePage }: HomeViewProps) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const squad = context ? context.squad : [];

  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null);
  const [isAppInstalled, setIsPwaInstalled] = useState<boolean>(false);

  useEffect(() => {
    const sheetId = "uwa-home-breathing-styles";
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement("style");
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaHomeCardBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02); }
          50% { transform: scale(1.015); box-shadow: 0 15px 25px -5px rgba(212, 175, 55, 0.1); border-color: rgba(212, 175, 55, 0.25) !important; background-color: rgba(4, 26, 14, 0.4) !important; }
        }
        .home-breathing-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; animation: uwaHomeCardBreath 5.6s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .home-breathing-card:nth-child(2n) { animation-delay: 0.8s; }
        .home-breathing-card:nth-child(3n) { animation-delay: 1.6s; }
        .home-breathing-card:hover { transform: scale(1.035) translateY(-5px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(4, 26, 14, 0.55) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.2) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setPwaInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerPwaInstallation = async () => {
    if (!pwaInstallPrompt) return;
    pwaInstallPrompt.prompt();
    const { outcome } = await pwaInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsPwaInstalled(true);
    }
    setPwaInstallPrompt(null);
  };

    const handleArticleRedirect = (article: any) => {
    navigate({ to: '/news', state: { directArticle: article } as any });
  };


  const resolvedLocalArray = SquadDataFile 
    ? (SquadDataFile.default || (SquadDataFile as any).squad || (SquadDataFile as any).squadData || (SquadDataFile as any).players || Object.values(SquadDataFile).find(Array.isArray)) 
    : [];

  const activeSquadDataset = Array.isArray(squad) && squad.length > 0 ? squad : (Array.isArray(resolvedLocalArray) ? resolvedLocalArray : []);
    const executeInstantHomePurchase = (product: any) => {
    // 🔌 Access the global master context pipeline directly
    if (context && typeof context.addToCart === 'function') {
      
      
      const verifiedSize = Array.isArray(product.sizes) 
        ? product.sizes[0] 
        : (typeof product.sizes === 'string' ? product.sizes : "Standard");

      const normalizedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        sizes: [verifiedSize]
      };

      
      context.addToCart(normalizedProduct, { [normalizedProduct.id]: verifiedSize });
      
      
      if (typeof setCheckoutStep === 'function') setCheckoutStep('checkout');
      if (typeof setActivePage === 'function') setActivePage('shop');
      navigate({ to: '/shop/$subSection', params: { subSection: 'overview' }, search: { step: 'checkout' } as any });
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#020B05] overflow-x-hidden box-border font-sans -mt-16 md:-mt-20 relative select-none">
    
      <div className="w-full box-border">
        <Banner />
      </div>

      <section className="w-full py-8 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-widest block text-[#DAA520]">Uganda Wildlife Authority FC</span>
            <h2 className="text-lg sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">The Heritage of the Wildlife Stars Of Uganda</h2>
            <p className="text-gray-400 text-[11px] sm:text-sm leading-relaxed font-medium">
              Founded in 2010, UWA FC (The Wildlife Rangers) is more than just a football team as we are ambassadors for Uganda's natural heritage. Competing at the highest levels of Ugandan football, our squad carries a dual mission which is to achieve athletic excellence on the pitch and to spearhead anti-poaching and conservation awareness across the nation. Every match we play celebrates the beauty of Uganda's wildlife, tourism, strength and the entire resilience Conservation Axis.
            </p>
          </div>
          <div className="home-breathing-card p-4 rounded-2xl bg-[#041A0E]/30 border border-[#DAA520]/15 flex items-start gap-3">
            <IoShieldCheckmarkOutline className="text-xl sm:text-2xl text-[#DAA520] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-wide">FUFA Affiliate Status</h4>
              <p className="text-gray-400 text-[10px] sm:text-[11px] leading-normal font-sans mt-0.5">Fully certified under the Buganda Regional League registry logs on the competitive road to top-flight national divisions.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full box-border border-b border-white/5 bg-black/10">
        <ScheduleDashboard />
      </div>

      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full box-border">
          <h3 className="text-white font-black text-xs sm:text-base uppercase tracking-wider flex items-center gap-2">
            <span className="h-4 w-1 bg-[#DAA520] rounded-full"></span> Infrastructure Development Portals
          </h3>
          <span className="text-amber-400 font-mono text-[8px] sm:text-xs font-bold uppercase tracking-wider bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/20 w-max flex-none">
            📅 Next Event: November 3rd, Annually
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full box-border items-stretch">
          
          <div className="home-breathing-card p-4 rounded-2xl border bg-[#041A0E]/20 flex flex-col justify-between box-border border-white/5 transition-all">
            <div className="space-y-2">
              <h4 className="text-white font-black text-[11px] sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoMapOutline className="text-[#DAA520]" /> Zirobwe Land Acquisition (12 Acres)</h4>
              <p className="text-gray-400 text-[10px] sm:text-xs font-sans leading-relaxed font-medium">Strategic allocation layout targeting 12 acres of land in Zirobwe earmarked for permanent training camp bases. Total acquisition capital is estimated at 400 Million UGX.</p>
            </div>
            <button type="button" onClick={() => navigate({ to: '/about/$subSection', params: { subSection: 'facilities' } })} className="w-full mt-4 py-2 bg-[#0B4622]/40 rounded-xl text-[9px] sm:text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Review Land Purchase Plans</button>
          </div>

          <div className="home-breathing-card p-4 rounded-2xl border bg-[#041A0E]/20 flex flex-col justify-between box-border border-white/5 transition-all">
            <div className="space-y-2">
              <h4 className="text-white font-black text-[11px] sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoCashOutline className="text-[#DAA520]" /> Proposed UWA Stadium Construction Plan</h4>
              <p className="text-gray-400 text-[10px] sm:text-xs font-sans leading-relaxed font-medium">Comprehensive engineering blueprints for our flagship stadium project. Estimated at 29 Billion UGX capital expenditure incorporating solar installations and high-capacity pavilion grids.</p>
            </div>
            <button type="button" onClick={() => navigate({ to: '/about/$subSection', params: { subSection: 'facilities' } })} className="w-full mt-4 py-2 bg-[#0B4622]/40 rounded-xl text-[9px] sm:text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Review Construction Blueprints</button>
          </div>
          <div className="home-breathing-card p-2.5 rounded-2xl border bg-gradient-to-b from-[#062613]/80 to-[#031109] flex flex-col justify-between box-border border-[#DAA520]/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-2.5 right-2.5 bg-neutral-900 text-white font-mono font-black text-[6px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-20 border border-white/5">Ordinary Kit</div>
            <div>
              <div className="w-full           h-32 bg-black/50 rounded-xl overflow-hidden mb-2.5 relative border border-white/5 flex items-center justify-center p-2 select-none">
                <img src={new URL('../../assets/home/ordinary_kit.jpg', import.meta.url).href} className="w-full h-full object-cover filter drop-shadow-md transition-transform duration-300 hover:scale-110 relative z-10" alt="Ordinary Kit" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              </div>
              <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-wide text-left px-1">Eco Green Turf Marathon (Ordinary)</h4>
              <p className="text-neutral-400 text-[9px] sm:text-[10px] font-sans leading-tight mt-1 px-1">Includes the official commemorative match race tag and supporter runner t-shirt. Purchases fund our 12-acre Zirobwe grounds.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/5 w-full flex items-center justify-between gap-1.5 box-border">
              <span className="text-xs sm:text-sm font-mono font-black text-emerald-400 pl-1 flex-none">UGX 30,000</span>
              <button type="button" onClick={() => executeInstantHomePurchase({ id: "eco-green-marathon-ordinary", name: "Eco Green Turf Marathon Kit (Ordinary)", price: 30000, img: "ordinary_kit.jpg" })} className="flex-1 bg-[#DAA520] hover:bg-[#B38F2D] text-black font-mono font-black text-[9px] uppercase py-2 rounded-lg tracking-wider transition-all text-center cursor-pointer shadow-md active:scale-95">Buy Kit</button>
            </div>
          </div>

          <div className="home-breathing-card p-2.5 rounded-2xl border bg-gradient-to-b from-[#062613]/80 to-[#031109] flex flex-col justify-between box-border border-[#DAA520]/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-2.5 right-2.5 bg-amber-500 text-black font-mono font-black text-[6px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-20 font-black">VIP Package</div>
            <div>
              <div className="w-full h-32 bg-black/50 rounded-xl overflow-hidden mb-2.5 relative border border-white/5 flex items-center justify-center p-2 select-none">
                <img src={new URL('../../assets/home/vip_kit.jpg', import.meta.url).href} className="w-full h-full object-cover filter drop-shadow-md transition-transform duration-300 hover:scale-110 relative z-10" alt="VIP Kit" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              </div>
              <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-wide text-left px-1">Eco Green Turf Marathon (VIP Package)</h4>
              <p className="text-neutral-400 text-[9px] sm:text-[10px] font-sans leading-tight mt-1 px-1">runners t'shirt, custom UWA Wildlife Stars plastic water bottle, and entry registry access clearance badges.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/5 w-full flex items-center justify-between gap-1.5 box-border">
              <span className="text-xs sm:text-sm font-mono font-black text-emerald-400 pl-1 flex-none">UGX 50,000</span>
              <button type="button" onClick={() => executeInstantHomePurchase({ id: "eco-green-marathon-vip", name: "Eco Green Turf Marathon Kit (VIP Package)", price: 50000, img: "vip_kit.jpg" })} className="flex-1 bg-[#DAA520] hover:bg-[#B38F2D] text-black font-mono font-black text-[9px] uppercase py-2 rounded-lg tracking-wider transition-all text-center cursor-pointer shadow-md active:scale-95">Buy VIP</button>
            </div>
          </div>

          <div className="home-breathing-card p-2.5 rounded-2xl border bg-gradient-to-b from-[#062613]/80 to-[#031109] flex flex-col justify-between box-border border-[#DAA520]/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-black font-mono font-black text-[6px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-20 font-black">VVIP Elite</div>
            <div>
              <div className="w-full h-32 bg-black/50 rounded-xl overflow-hidden mb-2.5 relative border border-white/5 flex items-center justify-center p-2 select-none">
                <img src={new URL('../../assets/home/vvip_kit.jpg', import.meta.url).href} className="w-full h-full object-cover filter drop-shadow-md transition-transform duration-300 hover:scale-110 relative z-10" alt="VVIP Kit" onError={(e: any) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-wide text-left px-1">Eco Green Turf Marathon (VVIP Package)</h4>
              <p className="text-neutral-400 text-[9px] sm:text-[10px] font-sans leading-tight mt-1 px-1">Complete executive ecosystem kit package: includes premium jersey, insulated water bottle, and a branded UWA FC supporter cap.</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/5 w-full flex items-center justify-between gap-1.5 box-border">
              <span className="text-xs sm:text-sm font-mono font-black text-emerald-400 pl-1 flex-none">UGX 100,000</span>
              <button type="button" onClick={() => executeInstantHomePurchase({ id: "eco-green-marathon-vvip", name: "Eco Green Turf Marathon Kit (VVIP Package)", price: 100000, img: "vvip_kit.jpg" })} className="flex-1 bg-[#DAA520] hover:bg-[#B38F2D] text-black font-mono font-black text-[9px] uppercase py-2 rounded-lg tracking-wider transition-all text-center cursor-pointer shadow-md active:scale-95">Buy VVIP</button>
            </div>
          </div>

        </div>
      </section>

      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full box-border">
          <div className="space-y-3 min-w-0">
            <span className="font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-widest block text-[#DAA520]">Campaign Training Phase</span>
            <h2 className="text-lg sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">Pre-Season Endurance Workouts</h2>
            <p className="text-gray-400 text-[11px] sm:text-sm leading-relaxed font-sans font-medium text-neutral-300">
              The technical committee has finalized the physical fitness bootcamp schedules. Training parameters have shifted to high-altitude loading models designed to optimize tactical endurance over intense 90-minute league matches. Closed warm-up trial fixtures are being logged ahead of upcoming tournament selection windows.
            </p>
          </div>
          <div className="w-full h-64 sm:h-56 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 relative group flex-none select-none shadow-xl">
            <img src={new URL('../../assets/home/preseason_camp.jpg', import.meta.url).href} alt="UWA FC Pre-Season Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 relative z-10" onError={(e: any) => { e.currentTarget.style.display = 'none'; }} />
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-black/30 z-0"><IoCameraOutline size={24} className="opacity-40 text-[#DAA520]" /></div>
          </div>
        </div>
      </section>
      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full box-border items-stretch">
          
          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/tickets_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Tickets" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoTicketOutline className="text-[#DAA520]" /> Matchday Passes</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Secure General Admission or Main Grandstand tickets via integrated MoMo settlement nodes.</p>
              </div>
              <button onClick={() => navigate({ to: '/tickets' })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Book Passes</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/shop_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Shop" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoCartOutline className="text-[#DAA520]" /> Official Megastore</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Procure high-fidelity Forest Green kits, accessories, and training tracksuit options directly.</p>
              </div>
              <button onClick={() => navigate({ to: '/shop/$subSection', params: { subSection: 'overview' } })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Explore Shop</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/membership_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Membership" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoPeopleOutline className="text-[#DAA520]" /> Supporter Tiers</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Register verified accounts into the fan register ledger database to unlock voting cards.</p>
              </div>
              <button onClick={() => navigate({ to: '/membership' })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Join Register</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-gradient-to-br from-[#110f03] to-black/40 flex flex-col justify-between min-h-[290px] box-border border-[#DAA520]/20 shadow-xl relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono font-black text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-20 animate-pulse">Official Notice</div>
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/assembly_notice.jpg', import.meta.url).href} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300 relative z-10" alt="Simbas Fan Assembly" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-0" />
              <div className="absolute bottom-2 left-2 z-10 text-left flex items-center gap-1.5">
                <IoMegaphoneOutline size={18} className="text-[#DAA520]" />
                <span className="font-mono text-white text-[10px] font-black uppercase tracking-tight">Supporters Bureau</span>
              </div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-[#DAA520] font-black text-xs uppercase tracking-wide">Upcoming General Assembly</h4>
                <p className="text-gray-400 text-[10px] leading-tight font-sans mt-1">Join the annual general fan assembly and stadium development project meeting next month. Registration details and agenda updates inside.</p>
              </div>
              <button onClick={() => navigate({ to: '/membership' })} className="w-full mt-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-mono font-black text-[9px] uppercase tracking-wider hover:from-amber-600 hover:to-amber-700 transition-all text-center cursor-pointer shadow-md">Review Event Details</button>
            </div>
          </div>

        </div>
      </section>
      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full box-border items-stretch">
          
          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/tickets_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Tickets" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoTicketOutline className="text-[#DAA520]" /> Matchday Passes</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Secure General Admission or Main Grandstand tickets via integrated MoMo settlement nodes.</p>
              </div>
              <button onClick={() => navigate({ to: '/tickets' })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Book Passes</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/shop_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Shop" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoCartOutline className="text-[#DAA520]" /> Official Megastore</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Procure high-fidelity Forest Green kits, accessories, and training tracksuit options directly.</p>
              </div>
              <button onClick={() => navigate({ to: '/shop/$subSection', params: { subSection: 'overview' } })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Explore Shop</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-black/20 flex flex-col justify-between min-h-[290px] box-border border-white/5">
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/membership_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover relative z-10" alt="Membership" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-0"><IoCameraOutline size={20} className="text-[#DAA520]/20" /></div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5"><IoPeopleOutline className="text-[#DAA520]" /> Supporter Tiers</h4>
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-tight font-sans mt-1">Register verified accounts into the fan register ledger database to unlock voting cards.</p>
              </div>
              <button onClick={() => navigate({ to: '/membership' })} className="w-full mt-3 py-1.5 bg-[#0B4622]/40 rounded-lg text-[10px] font-mono font-black uppercase text-[#DAA520] border border-[#DAA520]/20 hover:bg-[#0B4622] hover:text-white transition-all text-center cursor-pointer">Join Register</button>
            </div>
          </div>

          <div className="home-breathing-card p-2 rounded-2xl border bg-gradient-to-br from-[#110f03] to-black/40 flex flex-col justify-between min-h-[290px] box-border border-[#DAA520]/20 shadow-xl relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono font-black text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow z-20 animate-pulse">Official Notice</div>
            <div className="w-full h-32 bg-[#031109] rounded-xl overflow-hidden border border-white/5 mb-3 relative flex items-center justify-center select-none">
              <img src={new URL('../../assets/home/assembly_notice.jpg', import.meta.url).href} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300 relative z-10" alt="Simbas Fan Assembly" onError={(e: any)=>{e.currentTarget.style.display='none';}} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-0" />
              <div className="absolute bottom-2 left-2 z-10 text-left flex items-center gap-1.5">
                <IoMegaphoneOutline size={18} className="text-[#DAA520]" />
                <span className="font-mono text-white text-[10px] font-black uppercase tracking-tight">Supporters Bureau</span>
              </div>
            </div>
            <div className="px-1.5 pb-2 flex-grow flex flex-col justify-between text-left">
              <div>
                <h4 className="text-[#DAA520] font-black text-xs uppercase tracking-wide">Upcoming General Assembly</h4>
                <p className="text-gray-400 text-[10px] leading-tight font-sans mt-1">Join the annual general fan assembly and stadium development project meeting next month. Registration details and agenda updates inside.</p>
              </div>
              <button onClick={() => navigate({ to: '/membership' })} className="w-full mt-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-mono font-black text-[9px] uppercase tracking-wider hover:from-amber-600 hover:to-amber-700 transition-all text-center cursor-pointer shadow-md">Review Event Details</button>
            </div>
          </div>

        </div>
      </section>
      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="flex flex-col border-b border-white/5 pb-2 mb-4 gap-2 w-full box-border">
          <div className="flex justify-between items-end w-full">
            <div className="text-left">
              <span className="font-mono font-bold text-[8px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Official Merchandise Outlets</span>
              <h2 className="text-base sm:text-2xl font-black uppercase tracking-tight mt-0.5 leading-none">Featured Fan Gear</h2>
            </div>
            <button 
              type="button" 
              onClick={() => navigate({ to: '/shop/\$subSection', params: { subSection: 'overview' } })} 
              className="bg-[#0B4622] border border-[#D4AF37]/20 px-2.5 py-1.5 rounded-lg text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-tight flex items-center gap-1 hover:bg-[#073016] transition-all cursor-pointer"
            >
              Browse Shop Arena
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 box-border">
          {homeFeaturedProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            return (
              <div key={product.id} className="home-breathing-card p-2 sm:p-3.5 rounded-xl border bg-[#041A0E]/30 text-left flex flex-col justify-between min-h-[350px] sm:min-h-[440px] box-border relative transition-all duration-300 border-white/5">
                <div>
                  <div className="w-full h-44 sm:h-56 bg-neutral-950 rounded-lg overflow-hidden relative border border-white/5 flex items-center justify-center p-1.5">
                    <span className="absolute top-1.5 right-1.5 text-[6px] sm:text-[8px] font-mono bg-neutral-900/80 px-1 py-0.5 rounded border border-white/5 text-[#D4AF37] font-bold uppercase z-20">{product.delivery}</span>
                    <img 
                      src={new URL(`../../assets/home/${product.img}`, import.meta.url).href}  
                      className="w-full h-full object-cover filter drop-shadow-md transition-transform duration-300 hover:scale-105 relative z-10" 
                      alt={product.name} 
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <div className="mt-2 px-0.5">
                    <h4 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-tight leading-tight line-clamp-1">{product.name}</h4>
                    <p className="hidden sm:block text-neutral-400 text-[10px] font-sans mt-0.5 line-clamp-2 leading-tight">{product.description}</p>
                  </div>
                </div>
                <div className="mt-2 pt-1.5 border-t border-white/5 flex flex-col justify-between items-start gap-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 px-0.5">
                    {hasDiscount && <span className="text-neutral-500 line-through text-[8px] sm:text-[10px] font-mono">UGX {product.originalPrice.toLocaleString()}</span>}
                    <span className="font-mono text-[10px] sm:text-xs font-black text-emerald-400">UGX {product.price.toLocaleString()}</span>
                  </div>
                  <button type="button" onClick={() => executeInstantHomePurchase(product)} className="w-full mt-1 py-1.5 bg-[#0B4622] rounded-md text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/20 cursor-pointer text-center hover:bg-[#073016] transition-all">Buy Now & Checkout</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="border-b border-white/5 pb-2 mb-5 flex items-center justify-between">
          <div>
            <span className="font-mono font-bold text-[10px] uppercase tracking-widest block text-[#D4AF37]">Media & Press Bureau Center</span>
            <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mt-0.5">Official Club Bulletins</h3>
          </div>
          <button onClick={() => navigate({ to: '/news' })} className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase hover:underline flex items-center gap-0.5 cursor-pointer">All News <IoArrowForwardOutline /></button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full box-border items-stretch">
          {officialPresentationNews.slice(0, 3).map((bulletin) => (
            <div key={bulletin.id} className="flex w-full box-border p-0 m-0">
              <New 
                content_title={bulletin.title}
                content_summary={bulletin.summary}
                date={bulletin.date}
                image_url={new URL(`../../assets/home/${bulletin.image_url}`, import.meta.url).href}
                onReadClick={() => handleArticleRedirect(bulletin)}
              />
            </div>
          ))}
          <div className="home-breathing-card flex flex-col bg-gradient-to-b from-[#062613]/90 to-black/40 rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 transition-all duration-300 w-full box-border group justify-between p-3 text-left">
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="w-full h-36 bg-black rounded-lg overflow-hidden relative border border-white/5 flex items-center justify-center select-none aspect-video">
                  <img src={new URL('../../assets/home/tv_thumb.jpg', import.meta.url).href} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-300 transform relative z-10" alt="UWA FC TV Stream" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
                    <div className="h-10 w-12 rounded-full bg-[#D4AF37] text-[#020B05] flex items-center justify-center shadow-xl font-black font-mono text-[10px] transition-transform cursor-pointer">▶ PLAY</div>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-red-600 text-white font-mono font-black text-[7px] uppercase tracking-tight px-1.5 py-0.5 rounded shadow z-30 animate-pulse">● LIVE</span>
                </div>
                <div className="mt-2.5 px-0.5">
                  <span className="text-[#D4AF37] font-mono text-[8px] uppercase font-black tracking-widest block">The Wildlife Stars Of Uganda Broadcast</span>
                  <h4 className="text-white font-black text-[11px] uppercase tracking-tight mt-0.5 leading-tight">UWA FC TV Streaming Hub</h4>
                  <p className="text-neutral-400 text-[10px] font-sans mt-1 leading-normal line-clamp-2">Access matchday interviews, pre-season tactical logs, and live matches directly.</p>
                </div>
              </div>
              <button onClick={() => navigate({ to: '/videos/' as any })} className="w-full mt-3 py-1.5 bg-[#0B4622] text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg text-[10px] font-mono font-black uppercase hover:bg-[#073016] transition-all cursor-pointer text-center">Launch TV Console</button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-left border-b border-white/5">
        <div className="border-b border-white/5 pb-2 mb-5">
          <span className="font-mono font-bold text-[10px] uppercase tracking-widest block text-[#DAA520]">Official FUFA Registry</span>
          <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mt-0.5">The Wildlife Stars Of Uganda Team Roster</h3>
        </div>
        <div className="w-full box-border space-y-6">
          <RosterSection title="Technical Leadership Bureau" type="technical" squad={activeSquadDataset} />
          <RosterSection title="Goalkeepers" type="goalkeeper" squad={activeSquadDataset} />
          <RosterSection title="Defenders" type="defender" squad={activeSquadDataset} />
          <RosterSection title="Midfielders" type="midfielder" squad={activeSquadDataset} />
          <RosterSection title="Forwards & Strikers" type="forward" squad={activeSquadDataset} />
        </div>
      </section>

      <section className="w-full py-10 px-3.5 sm:px-6 max-w-7xl mx-auto box-border text-center overflow-hidden">
        <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest block mb-6 text-[#DAA520]">Institutional Sponsors & Strategic Partners</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full box-border">
          {[
            { name: "UGANDA WILDLIFE AUTHORITY", file: "uwa_logo.png" },
            { name: "MINISTRY OF TOURISM", file: "ministry_tourism.png" },
            { name: "FEDERATION OF UGANDAN FOOTBALL ASSOCIATION", file: "fufa_logo.png" },
            { name: "MTN MOMO", file: "mtn_logo.png" },
            { name: "AIRTEL MONEY UG", file: "airtel_logo.png" }
          ].map((sponsor, idx) => (
            <div key={idx} className="home-breathing-card flex flex-col items-center justify-between gap-3 p-4 rounded-xl bg-[#041A0E]/40 border border-white/5 w-full">
              <div className="h-24 w-full flex items-center justify-center relative p-1">
                <img src={new URL(`../../assets/sponsors/${sponsor.file}`, import.meta.url).href} alt={sponsor.name} className="max-w-full max-h-full object-contain relative z-10" onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <span className="font-black font-mono text-[9px] uppercase tracking-wider text-center text-neutral-400 block">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
