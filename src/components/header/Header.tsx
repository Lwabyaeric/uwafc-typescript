import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"; 
import Logo from './Logo';
import { FiMenu, FiX, FiShoppingBag, FiChevronDown, FiUser, FiCheckCircle, FiTrash2, FiArrowRight } from "react-icons/fi"; 
import { Context } from "../../context/Context";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  img: string;
  selectedSize?: string;
  chosenSize?: string;
}

export interface UserProfileState {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

export interface HeaderProps {
  currentUserProfile: UserProfileState | null;
  setCheckoutStep?: React.Dispatch<React.SetStateAction<string>> | ((step: string) => void);
  setActivePage?: React.Dispatch<React.SetStateAction<string>> | ((page: string) => void);
  showInstallButton?: boolean;
  onInstallClick?: () => Promise<void> | void;
}

export interface StructuralMenuItem {
  name: string;
  path: string;
  dropdown?: Array<{ name: string; path: string }>;
}
export default function Header({ 
  currentUserProfile, 
  setCheckoutStep, 
  setActivePage,
  showInstallButton = true, // Default to true as a safe guardrail fallback
  onInstallClick     
}: HeaderProps) {
  const context = useContext(Context);
  const toggleShowMenu = context ? context.toggleShowMenu : false;
  const setToggleShowMenu = context ? context.setToggleShowMenu : () => {};
  const cart = context ? context.cart : [];
  const onCartChange = context ? context.setCart : () => {};
  
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  const miniCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toggleShowMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [toggleShowMenu]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        setShowMiniCart(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateHeaderCartQty = (targetId: string | number, delta: number) => {
    const freshCart = cart.map(item => {
      if (item.id === targetId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null);
    onCartChange(freshCart);
  };

  const handleFastHeaderCheckout = () => {
    setShowMiniCart(false);
    setToggleShowMenu(false);
    if (typeof setCheckoutStep === 'function') setCheckoutStep('checkout');
    if (typeof setActivePage === 'function') setActivePage('shop');
    navigate({ to: '/shop/$subSection', params: { subSection: 'overview' }, search: { step: 'checkout' } as any });
  };

  const structuralMenus: StructuralMenuItem[] = [
    { name: "Home", path: "/" },
    { 
      name: "The Club", 
      path: "/about/$subSection",
      dropdown: [
        { name: "About Us Overview", path: "/about/history" },
        { name: "Club History & Heritage", path: "/about/history" },
        { name: "Executive Board & Management", path: "/about/management" },
        { name: "Our Facilities & Grounds", path: "/about/facilities" }, 
        { name: "Honours & Trophy Cabinet", path: "/honours" },
        { name: "Sponsors & Corporate Partners", path: "/about/sponsors" },
        { name: "Contact Bureau", path: "/contact" }
      ]
    },
    { name: "Squad", path: "/Squad" },
    { name: "Fixtures", path: "/fixtures" },
    { 
      name: "Media", 
      path: "/news",
      dropdown: [
        { name: "News Hub Center", path: "/news" },
        { name: "Video Broadcast Hub", path: "/videos" },
        { name: "Anti-Poaching Campaign Updates", path: "/news" }
      ]
    },
    { name: "Membership", path: "/membership" },
    { 
      name: "Fans Portal", 
      path: "/fans/$subSection",
      dropdown: [
        { name: "Fan Leadership Councils", path: "/fans/council" },
        { name: "Official Membership Sign-Up", path: "/membership" },
        { name: "UWA Foundation Advocacy", path: "/foundation/home" }
      ]
    },
    { 
      name: "Experience", 
      path: "/tickets",
      dropdown: [
        { name: "Matchday Tickets", path: "/tickets" },
        { name: "VIP Corporate Hospitality", path: "/hospitality" },
        { name: "Ranger Youth Academy", path: "/academy/home" }
      ]
    },
    { 
      name: "Shop", 
      path: "/shop/$subSection",
      dropdown: [
        { name: "All Merchandise", path: "/shop/overview" },
        { name: "Official Match Kits", path: "/shop/kits" },
        { name: "Fan Accessories", path: "/shop/accessories" }
      ]
    },
    {
      name: currentUserProfile ? currentUserProfile.displayName : "Profile", 
      path: "/account/$subSection",
      dropdown: [
        { name: currentUserProfile ? "Your Wildlife Stars Dashboard" : "Fan Login Desk", path: "/account/dashboard" },
        { name: "Order Tracking Records", path: "/account/orders" }
      ]
    }
  ];

  const handleDropdownToggle = (index: number): void => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  return (
    <>
      <div 
        className="fixed text-white font-bold top-0 left-0 w-full z-40 shadow-xl select-none"
        style={{ 
          background: 'linear-gradient(to right, #031109, #0B4622, #031109)',
          borderBottom: '3px solid #D4AF37'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between mx-auto items-center h-16 md:h-20">
            <Link to="/" onClick={() => setToggleShowMenu(false)} className="text-inherit hover:text-inherit flex items-center h-full py-2 gap-2 md:gap-3 group focus:outline-none shrink-0">
                <div className="bg-white px-1.5 py-1.5 rounded-full shadow-md flex items-center justify-center h-11 w-11 md:h-14 md:w-14 overflow-hidden shrink-0" style={{ border: '2px solid #D4AF37' }}><Logo /></div>
                <div className="flex flex-col justify-center text-left">
                    <span className="font-extrabold text-white tracking-wider uppercase text-xs md:text-sm leading-tight">UWA FC</span>
                    <span className="text-[8px] md:text-[9px] text-emerald-400 font-medium tracking-widest uppercase mt-0.5 whitespace-nowrap">The Wildlife stars of Uganda</span>
                </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 h-full text-[11px] xl:text-[13px] tracking-wide">
              {structuralMenus.map((menu, index) => (
                <div key={index} className="relative group h-full flex items-center" onMouseEnter={() => setActiveDropdown(index)} onMouseLeave={() => setActiveDropdown(null)}>
                  {menu.dropdown ? (
                    <button className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer outline-none font-bold text-[11px] xl:text-[13px] max-w-[150px]">
                      {index === structuralMenus.length - 1 ? (currentUserProfile ? <FiCheckCircle className="inline mr-1 text-emerald-400 text-xs flex-none" /> : <FiUser className="inline mr-1 text-sm text-neutral-400 flex-none" />) : null}
                      <span className="truncate">{menu.name}</span>
                      <FiChevronDown className="transition-transform duration-200 group-hover:rotate-180 text-[10px] text-[#D4AF37] flex-none" />
                    </button>
                  ) : (
                    <Link to={menu.path} className={`px-2 py-1.5 rounded-lg transition-all duration-150 ${currentPath === menu.path ? 'text-[#D4AF37] bg-white/5' : 'hover:bg-white/10 text-white'}`}>{menu.name}</Link>
                  )}
                  {menu.dropdown && activeDropdown === index && (
                    <div className="absolute top-[85%] right-0 w-60 rounded-xl shadow-2xl py-1.5 flex flex-col border border-white/10 z-50" style={{ backgroundColor: '#051b0e' }}>
                      {menu.dropdown.map((sub, subIndex) => (<Link key={subIndex} to={sub.path as any} className="px-4 py-2.5 text-[12px] font-medium text-gray-200 hover:text-[#D4AF37] hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors duration-150">{sub.name}</Link>))}
                    </div>
                  )}
                </div>
              ))}
              
              
                           {/* 🖥️ Corrected Desktop Button Wrapper */}
              {showInstallButton && (
                <button 
                  onClick={onInstallClick || (() => alert("To install, open your browser options menu and tap 'Add to Home Screen'"))} 
                  className="ml-2 px-3 py-1.5 bg-[#D4AF37] text-[#031109] rounded-lg text-[11px] xl:text-[12px] font-extrabold uppercase tracking-wider hover:bg-white hover:text-[#0B4622] transition-all duration-150 shadow-md cursor-pointer flex items-center gap-1"
                >
                  📥 Install App
                </button>
              )}
            </nav>
            
            <div className="flex items-center gap-2 md:gap-4 h-full relative" ref={miniCartRef}>
                
               
                {showInstallButton && (
                  <button 
                    onClick={onInstallClick || (() => alert("Tap your browser's share icon, then select 'Add to Home Screen'"))} 
                    className="flex lg:hidden items-center gap-1 px-2.5 py-1.5 bg-[#D4AF37] text-[#031109] rounded-md text-[10px] font-black uppercase tracking-wider shadow-md transform active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    📥 Install
                  </button>
                )}

                <div onClick={() => setShowMiniCart(!showMiniCart)} className="relative p-2 cursor-pointer transition-transform duration-150 active:scale-95 text-white hover:text-[#D4AF37]" title="Open Order Basket Dropdown">
                    <FiShoppingBag size={22} />
                    {totalItemsCount > 0 && <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full text-[10px] font-mono font-black flex items-center justify-center text-[#031109] shadow-md border" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)', borderColor: '#031109' }}>{totalItemsCount}</span>}
                </div>
                
                {showMiniCart && (
                  <div className="absolute top-[110%] right-0 w-72 sm:w-80 rounded-xl shadow-2xl p-3 border border-white/10 flex flex-col justify-between z-50 transition-all duration-200" style={{ backgroundColor: '#051b0e' }}>
                    <div>
                      <h4 className="text-[#D4AF37] font-mono font-black text-xs uppercase tracking-wider pb-1.5 border-b border-white/5 mb-2 text-left">Shopping Basket ({totalItemsCount})</h4>
                      {cart.length === 0 ? (
                        <div className="text-center py-6 text-neutral-500 font-sans text-xs italic">Your basket is empty.</div>
                      ) : (
                        <div className="space-y-2.5 max-h-[200px] overflow-y-auto scrollbar-none pr-0.5">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-1.5 text-neutral-300 border-b border-white/5 pb-2 last:border-0 text-left">
                              <div className="flex items-center gap-2">
                                <img src={item.img.startsWith('http') || item.img.startsWith('/') || item.img.startsWith('.') ? item.img : new URL(`../../assets/home/${item.img}`, import.meta.url).href} alt={item.name} className="w-8 h-8 rounded bg-neutral-900 object-cover border border-white/10" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.style.display = 'none'; }} />
                                <div className="flex flex-col text-left">
                                  <span className="truncate max-w-[100px] sm:max-w-[120px] font-sans font-bold text-[10px] sm:text-[11px] text-white leading-tight">{item.name}</span>
                                  <span className="text-[8px] text-neutral-400 font-mono">Size: {item.chosenSize || item.selectedSize}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-black/40 px-1 rounded border border-white/5 text-[9px]">
                                  <button type="button" onClick={() => updateHeaderCartQty(item.id, -1)} className="text-neutral-400 font-bold px-0.5">-</button>
                                  <span className="font-mono text-white font-bold">{item.quantity}</span>
                                  <button type="button" onClick={() => updateHeaderCartQty(item.id, 1)} className="text-neutral-400 font-bold px-0.5">+</button>
                                </div>
                                <button type="button" onClick={() => updateHeaderCartQty(item.id, -item.quantity)} className="text-neutral-500 hover:text-red-400 transition-colors"><FiTrash2 size={11} /></button>
                                <span className="font-mono text-[10px] font-bold text-neutral-200">UGX {(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {cart.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center mb-2 font-mono text-[11px] text-left">
                          <span className="text-neutral-400">Basket Subtotal:</span>
                          <span className="text-[#D4AF37] font-black">UGX {cartSubtotalAmount.toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <button onClick={() => { setShowMiniCart(false); navigate({ to: '/shop/\$subSection', params: { subSection: 'overview' }, search: {} }); }} className="py-1.5 border border-white/10 bg-white/5 rounded text-[9px] uppercase tracking-wider text-neutral-300 font-bold text-center hover:bg-white/10 transition-all cursor-pointer">Back To Shop</button>
                          <button onClick={handleFastHeaderCheckout} className="py-1.5 bg-[#0B4622] border border-[#D4AF37]/30 text-[#D4AF37] rounded text-[9px] uppercase tracking-wider font-black text-center flex items-center justify-center gap-1 hover:bg-[#073016] transition-all cursor-pointer shadow-lg transform">Fast Checkout <FiArrowRight size={10} /></button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
          <div onClick={() => setToggleShowMenu(!toggleShowMenu)} className="py-5 px-3 block lg:hidden cursor-pointer text-xl transition-colors duration-200 z-50 text-[#D4AF37]">{toggleShowMenu ? <FiX size={24} /> : <FiMenu size={24} />}</div>
        </div>
      </div>
    </div>
    <div className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${toggleShowMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm h-full w-full" onClick={() => setToggleShowMenu(false)} />
      <div className="absolute top-0 left-0 h-full w-64 pt-20 px-3.5 pb-8 overflow-y-auto flex flex-col gap-2 transition-transform duration-300 shadow-2xl border-r border-white/10" style={{ backgroundColor: '#031109' }}>
        {currentUserProfile && (
          <div className="p-2 mb-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-left shadow-md">
            <div className="h-6 w-6 rounded-full bg-white/20 text-white font-black font-mono text-[10px] flex items-center justify-center border border-white/20 flex-none">{currentUserProfile.displayName ? currentUserProfile.displayName.charAt(0).toUpperCase() : "U"}</div>
            <div className="min-w-0">
              <span className="text-[7px] text-gray-300 block uppercase font-mono tracking-wider font-bold">Logged Supporter</span>
              <p className="text-white text-[11px] font-bold truncate leading-none mt-0.5">{currentUserProfile.displayName}</p>
            </div>
          </div>
        )}
        {/* ⚡ RECTIFIED MOBILE NAVIGATION INSTALL HERO CARD VARIANT */}
        <div className="p-2.5 mb-2 rounded-xl bg-[#041A0E] border-2 border-[#D4AF37] flex flex-col gap-1.5 text-left animate-fadeIn">
          <div className="text-white font-sans font-black uppercase text-[10px] tracking-wider leading-none">UWA FC Web App Available</div>
          <p className="text-neutral-400 text-[9px] leading-tight">Install this system on your mobile home screen for quick offline access during matches.</p>
          <button 
            type="button" 
            onClick={() => { setToggleShowMenu(false); if (onInstallClick) { onInstallClick(); } else { alert("Open browser settings and choose 'Add to Home Screen'"); } }} 
            className="w-full py-1.5 bg-[#D4AF37] text-[#031109] text-center rounded-lg font-black uppercase tracking-wide text-[10px] hover:bg-white hover:text-[#0B4622] transition-colors duration-150 shadow-md cursor-pointer"
          >
            📥 Download Application
          </button>
        </div>

        <div className="flex flex-col gap-2 w-full text-left">
          {structuralMenus.map((menu, index) => {
            const menuLabel = index === structuralMenus.length - 1 ? (currentUserProfile ? currentUserProfile.displayName : "Fan Account Hub") : menu.name;
            const isMobileMenuOpen = activeDropdown === index;
            return (
              <div key={index} className="w-full flex flex-col text-left">
                {menu.dropdown ? (
                  <>
                    <button type="button" onClick={() => handleDropdownToggle(index)} className={`w-full flex justify-between items-center text-left py-2.5 px-3 rounded-xl transition-all duration-150 outline-none cursor-pointer border text-white shadow-sm bg-white/5 border-white/10 active:bg-white/10 ${isMobileMenuOpen ? 'bg-[#041A0E] !border-[#D4AF37]' : ''}`}><span className="flex items-center gap-1.5 min-w-0">{index === structuralMenus.length - 1 ? <FiUser className="text-white text-xs flex-none" /> : null}<span className="truncate tracking-wide text-xs font-bold uppercase">{menuLabel}</span></span><FiChevronDown className={`transition-transform duration-200 text-white text-xs flex-none ${isMobileMenuOpen ? 'rotate-180' : ''}`} /></button>
                    {isMobileMenuOpen && (
                      <div className="flex flex-col pl-3 pr-2 bg-white/5 rounded-xl mt-1.5 py-1 border border-white/5 shadow-inner divide-y divide-white/5 animate-fadeIn">
                        {menu.dropdown.map((sub, subIndex) => (<Link key={subIndex} to={sub.path as any} onClick={() => setToggleShowMenu(false)} className="py-2.5 px-2 text-[11px] font-semibold block text-left text-white/90 hover:bg-white/10 rounded transition-all">{sub.name}</Link>))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={menu.path} onClick={() => setToggleShowMenu(false)} className={`w-full block py-2.5 px-3 rounded-xl transition-all duration-150 border tracking-wide text-xs font-bold uppercase text-left text-white shadow-sm bg-transparent border-transparent hover:bg-white/5 active:bg-white/5 ${currentPath === menu.path ? 'bg-[#041A0E] !border-[#D4AF37]' : ''}`}>{menuLabel}</Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-auto pt-4 border-t border-white/10 text-center"><p className="text-[9px] text-gray-400 font-mono tracking-widest uppercase font-black">Uganda Wildlife Authority</p></div>
      </div>
    </div>
    </>
  );
}
