import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router'; 
import IconTeam from '../../assets/f-icon.png';
import { AiFillInstagram, AiFillFacebook, AiFillYoutube, AiFillTwitterCircle } from 'react-icons/ai';
import { IoLogoWhatsapp, IoCallOutline, IoCloseOutline, IoMegaphoneOutline, IoChatbubblesOutline } from 'react-icons/io5';

export default function Footer() {
    const currentYear: number = new Date().getFullYear();

    const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false);
    const [showWidgetBadge, setShowWidgetBadge] = useState<boolean>(false);

    useEffect(() => {
        const widgetTimer = setTimeout(() => {
            setShowWidgetBadge(true);
        }, 4000);
        return () => clearTimeout(widgetTimer);
    }, []);

    useEffect(() => {
        const sheetId = 'uwa-footer-anchors-breath';
        if (!document.getElementById(sheetId)) {
            const styleNode = document.createElement('style');
            styleNode.id = sheetId;
            styleNode.innerHTML = `
                @keyframes uwaFooterElementBreath {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
                    50% { transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(212, 175, 55, 0.08); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.5) !important; }
                }
                .footer-breath-node { animation: uwaFooterElementBreath 5.2s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
                .footer-breath-node:nth-child(2n) { animation-delay: 1.2s; }
                .footer-breath-node:nth-child(3n) { animation-delay: 2.4s; }
                .footer-breath-node:hover { transform: scale(1.04) translateY(-2px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(6, 38, 19, 0.55) !important; box-shadow: 0 15px 25px -4px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
            `;
            document.head.appendChild(styleNode);
        }
    }, []);

    const officialUwaChannelUrl: string = "https://whatsapp.com"; 
    const managerWhatsAppLine: string = "256756966391"; 
    const encodedGreeting: string = encodeURIComponent("Hello UWA FC Secretariat, I am inquiring about Matchday Passes, club trials, and The Wildlife stars of Uganda fan registration.");
    const liveChatUrl: string = `https://wa.me{managerWhatsAppLine}?text=${encodedGreeting}`;

    return (
        <div 
            className="w-full text-white box-border select-none font-sans relative"
            style={{ 
                background: 'linear-gradient(135deg, #031109 0%, #062613 50%, #031109 100%)',
                borderTop: '2px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 -4px 15px rgba(3, 17, 9, 0.6)'
            }}
        >
            <div className='max-w-7xl mx-auto container px-3 sm:px-6 py-4 box-border w-full text-left'>
                
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5 pb-4 w-full box-border text-center sm:text-left'>
                    <div className='flex items-center gap-3 max-w-xl w-full sm:w-auto justify-center sm:justify-start'>
                        
                        <div className="bg-white h-11 w-11 rounded-full shadow-md flex items-center justify-center border-2 border-[#D4AF37] flex-shrink-0 p-1.5 overflow-hidden">
                            <img src={IconTeam} className='w-full h-full object-contain rounded-full' alt="UWA FC Logo" />
                        </div>
                        
                        <div className="min-w-0 text-left">
                            <h4 className='text-white font-black text-xs sm:text-sm uppercase tracking-wide leading-none mb-1'>
                                UWA FC <span style={{ color: '#D4AF37' }}>The Wildlife Stars of uganda</span>
                            </h4>
                            <p className='text-gray-400 text-[10px] sm:text-xs leading-none font-sans truncate max-w-[210px] xs:max-w-none'>
                                Official Digital portal.
                            </p>
                        </div>
                    </div>

                    <div className='text-[10px] sm:text-xs text-gray-300 font-sans leading-normal flex-shrink-0 text-center sm:text-right font-medium'>
                        <p>Plot 7 Kira Road, Kamwokya — P.O. Box 3530, Kampala, UG</p>
                        <p className="mt-0.5">Media Inquiries: <a href="mailto:info@ugandawildlife.org" className="text-[#D4AF37] hover:underline font-mono font-bold">info@ugandawildlife.org</a></p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between items-start gap-6 pt-4 w-full box-border'>

                    <div className='grid grid-cols-3 w-full lg:w-[65%] justify-between gap-x-3 gap-y-4 box-border text-left'>
                        
                        <div className="min-w-[90px] truncate">
                            <p className='font-black uppercase tracking-wider text-[9px] sm:text-[10px] text-[#D4AF37] font-mono'>The Club</p>
                            <ul className='my-1 space-y-1 font-medium'>
                                <li><Link to="/about/$subSection" params={{ subSection: 'overview' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Overview</Link></li>
                                <li><Link to="/about/$subSection" params={{ subSection: 'history' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Our History</Link></li>
                                <li><Link to="/about/$subSection" params={{ subSection: 'management' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Management</Link></li>
                                <li><Link to="/about/$subSection" params={{ subSection: 'partners' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Partners</Link></li>
                            </ul>
                        </div>

                        <div className="min-w-[90px] truncate">
                            <p className='font-black uppercase tracking-wider text-[9px] sm:text-[10px] text-[#D4AF37] font-mono'>Athletics</p>
                            <ul className='my-1 space-y-1 font-medium'>
                                <li><Link to="/fans/$subSection" params={{ subSection: 'council' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Team Roster</Link></li>
                                <li><Link to="/fans/$subSection" params={{ subSection: 'fixtures' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Match Center</Link></li>
                                <li><Link to="/about/$subSection" params={{ subSection: 'facilities' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Grounds Arena</Link></li>
                                <li><Link to="/honours" className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Trophy Case</Link></li>
                            </ul>
                        </div>

                        <div className="min-w-[90px] truncate">
                            <p className='font-black uppercase tracking-wider text-[9px] sm:text-[10px] text-[#D4AF37] font-mono'>Experience</p>
                            <ul className='my-1 space-y-1 font-medium'>
                                <li><Link to="/shop/$subSection" params={{ subSection: 'home' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Megastore</Link></li>
                                <li><Link to="/academy/$subSection" params={{ subSection: 'home' }} className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Youth Academy</Link></li>
                                <li><Link to="/news" className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>News Hub</Link></li>
                                <li><Link to="/contact" className='text-[10px] sm:text-xs text-gray-400 hover:text-white block py-0.5 transition-colors'>Contact Desk</Link></li>
                            </ul>
                        </div>

                    </div>

                    <div className='w-full lg:w-auto text-left lg:text-right flex flex-col lg:items-end gap-1.5 flex-shrink-0 box-border'>
                        <p className='font-black uppercase tracking-wider text-[9px] sm:text-[10px] text-gray-400 font-mono'>Follow The Wildlife Stars of Uganda</p>
                        <ul className='flex gap-3.5 my-1 justify-start lg:justify-end select-none'>
                            <li><a className='text-gray-400 hover:text-[#D4AF37] text-xl transition-all block transform hover:scale-110' title='Instagram' href='#' target='_blank' rel="noreferrer"><AiFillInstagram /></a></li>
                            <li><a className='text-gray-400 hover:text-[#D4AF37] text-xl transition-all block transform hover:scale-110' title='Facebook' href='https://facebook.com' target='_blank' rel="noreferrer"><AiFillFacebook /></a></li>
                            <li><a className='text-gray-400 hover:text-[#D4AF37] text-xl transition-all block transform hover:scale-110' title='Twitter' href='#' target='_blank' rel="noreferrer"><AiFillTwitterCircle /></a></li>
                            <li><a className='text-gray-400 hover:text-[#D4AF37] text-xl transition-all block transform hover:scale-110' title='YouTube' href='https://youtube.com' target='_blank' rel="noreferrer"><AiFillYoutube /></a></li>
                        </ul>
                        <div className='flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-gray-500 mt-1.5 justify-start lg:justify-end font-black font-mono uppercase tracking-wider'>
                          <Link to='/membership' className='text-emerald-500 hover:text-emerald-400 transition-colors'>Join Club Membership</Link>
                          <span className="text-neutral-800 select-none">•</span>
                          <Link to='/tickets' className='text-amber-500 hover:text-amber-400 transition-colors'>Buy Match Tickets</Link>
                          <span className="text-neutral-700 select-none">•</span>
                          <a href='https://fufa.co.ug' target='_blank' rel="noreferrer" className='hover:text-white transition-colors'>FUFA Regulations</a>
                        </div>
                    </div>
                </div>
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 w-full box-border">
                    <div className="text-left w-full xl:w-auto shrink-0">
                        <h5 className="text-[11px] sm:text-xs text-emerald-500 font-mono font-black uppercase tracking-wider leading-none">Official Support Desk</h5>
                        <p className="text-neutral-400 text-[10px] sm:text-xs font-sans mt-1 font-medium">Instant transaction queries for match tickets and registrations.</p>
                    </div>
                    
                    {/* 📱 Mobile Hotline Strip with Scrollbar Rule Hidden completely */}
                    <div className="flex flex-row flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-3 w-full xl:w-auto justify-start xl:justify-end box-border pb-1 pt-0.5 touch-pan-x">
                        
                        <a href="tel:+256414355000" className="footer-breath-node flex items-center gap-2.5 bg-[#041A0E] border border-emerald-900/60 px-3 py-2 rounded-xl transition-all group shadow-lg flex-shrink-0 min-w-[145px]">
                            <div className="p-1.5 bg-emerald-950/80 rounded text-emerald-400 group-hover:text-white transition-colors"><IoCallOutline size={12} /></div>
                            <div className="min-w-0 text-left">
                                <p className="text-[7px] uppercase text-neutral-400 font-mono font-black tracking-wider leading-none">HQ Office Line</p>
                                <p className="text-[10px] font-black text-white font-mono mt-1 leading-none">+256 414 355000</p>
                            </div>
                        </a>
                        
                        <a href="tel:+256772000000" className="footer-breath-node flex items-center gap-2.5 bg-[#041A0E] border border-emerald-900/60 px-3 py-2 rounded-xl transition-all group shadow-lg flex-shrink-0 min-w-[145px]">
                            <div className="p-1.5 bg-yellow-500/10 text-yellow-400 rounded"><IoCallOutline size={12} /></div>
                            <div className="min-w-0 text-left">
                                <p className="text-[7px] uppercase text-neutral-400 font-mono font-black tracking-wider leading-none">MTN Hotline</p>
                                <p className="text-[10px] font-black text-white font-mono mt-1 leading-none">+256 772 000000</p>
                            </div>
                        </a>

                        <a href="tel:+256756966391" className="footer-breath-node flex items-center gap-2.5 bg-[#041A0E] border border-emerald-900/60 px-3 py-2 rounded-xl transition-all group shadow-lg flex-shrink-0 min-w-[145px]">
                            <div className="p-1.5 bg-red-500/10 text-red-500 rounded"><IoCallOutline size={12} /></div>
                            <div className="min-w-0 text-left">
                                <p className="text-[7px] uppercase text-neutral-400 font-mono font-black tracking-wider leading-none">Airtel Hotline</p>
                                <p className="text-[10px] font-black text-white font-mono mt-1 leading-none">+256756966391</p>
                            </div>
                        </a>
                        
                    </div>
                </div>

                {/* Fixed Communications Floating Action Desk Container */}
                <div className="fixed bottom-5 right-5 z-50 font-sans select-none text-left pointer-events-auto">
                    {isWidgetOpen && (
                        <div className="absolute bottom-16 right-0 bg-[#031109] text-white p-4 rounded-2xl border border-[#DAA520]/40 shadow-2xl w-64 md:w-72 animate-fadeIn transition-all duration-300">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-[#DAA520] tracking-wider font-mono">The Wildlife Stars Of Uganda Communication Portal</h4>
                                    <p className="text-[9px] text-neutral-400 font-bold leading-none mt-0.5">Uganda Wildlife Authority FC Links</p>
                                </div>
                                <button type="button" onClick={() => setIsWidgetOpen(false)} className="text-neutral-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"><IoCloseOutline size={18} /></button>
                            </div>
                            <div className="space-y-3">
                                <a href={officialUwaChannelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-[#041A0E] border border-emerald-900/40 hover:border-emerald-500/50 transition-all group"><div className="p-2 bg-[#25D366] text-black rounded-lg animate-pulse"><IoMegaphoneOutline size={16} /></div><div className="min-w-0"><h5 className="text-[11px] font-black uppercase text-white tracking-wide group-hover:text-[#25D366] leading-none">Join Bulletin Channel</h5><p className="text-[9px] text-neutral-400 font-medium mt-1 leading-snug">Get instant squad sheets, live match scores, and official reports.</p></div></a>
                                <a href={liveChatUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-[#041A0E] border border-emerald-900/40 hover:border-[#DAA520]/50 transition-all group"><div className="p-2 bg-[#DAA520] text-black rounded-lg"><IoChatbubblesOutline size={16} /></div><div className="min-w-0"><h5 className="text-[11px] font-black uppercase text-white tracking-wide group-hover:text-[#DAA520] leading-none">Chat With Us Live</h5><p className="text-[9px] text-neutral-400 font-medium mt-1 leading-snug">Direct inquiries regarding MoMo payments, tickets, and membership data.</p></div></a>
                            </div>
                        </div>
                    )}

                    {showWidgetBadge && !isWidgetOpen && (
                        <div className="absolute bottom-16 right-0 bg-gradient-to-r from-[#041A0E] to-[#0A3D1C] text-white px-3 py-2.5 rounded-xl border border-[#DAA520]/30 shadow-2xl w-48 text-center animate-fadeIn">
                            <p className="text-[10px] font-extrabold tracking-tight text-white leading-tight">Connect with UWA FC Secretariat</p>
                            <button type="button" onClick={() => { setIsWidgetOpen(true); setShowWidgetBadge(false); }} className="mt-2 text-[8px] font-mono font-black uppercase bg-[#DAA520] text-black px-2 py-0.5 rounded tracking-widest block mx-auto hover:bg-white hover:text-[#041A0E] transition-all cursor-pointer">Open Desk</button>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => { setIsWidgetOpen(!isWidgetOpen); setShowWidgetBadge(false); }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/15 outline-none shadow-2xl cursor-pointer ${
                            isWidgetOpen ? 'bg-red-600 text-white rotate-90' : 'bg-gradient-to-b from-[#0B4622] to-[#031109] text-[#DAA520]'
                        }`}
                        style={{ boxShadow: '0 10px 25px -5px rgba(4, 26, 14, 0.7)' }}
                    >
                        {isWidgetOpen ? (
                            <IoCloseOutline size={24} />
                        ) : (
                            <div className="relative">
                                <IoLogoWhatsapp size={24} className="sm:text-2xl animate-pulse" />
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            </div>
                        )}
                    </button>
                </div>

                <div className='border-t border-white/5 pt-3 mt-3 text-center text-[9px] sm:text-[10px] tracking-normal text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2 font-medium font-sans w-full box-border'>
                    <p>© {currentYear} Uganda Wildlife Authority (UWA). All Rights Reserved.</p>
                    <p className="font-mono text-[9px] sm:text-[10px]">
                        Architecture Engineered by <span className="font-bold" style={{ color: '#D4AF37' }}>Lwabya Eric</span> for the IT Division.
                    </p>
                </div>
                
            </div>
        </div>
    );
}
