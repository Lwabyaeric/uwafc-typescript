import React, { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { Context } from "../../context/Context";

interface NavbarItem {
  id: string | number;
  target_name: string;
  title: string;
}

interface NavbarProps {
  items: NavbarItem[];
}
export function Navbar({ items }: NavbarProps) {
  return (
    <nav className="px-6 text-sm font-medium h-full">
      <ul className="md:flex flex-row items-center space-x-3 hidden h-full">
        {items.map((item: NavbarItem) => (
          <li key={item.id} className="h-full">
            <Link 
              to={item.target_name as any} 
              className="text-white block px-3 py-6 hover:text-[#f2a900] transition-colors duration-200 uppercase tracking-wider text-xs font-bold"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export function NavbarBurger({ items }: NavbarProps) {
  const contextValue = useContext(Context) as any;
  const toggleShowMenu: boolean = contextValue?.toggleShowMenu ?? false;
  const setToggleShowMenu = contextValue?.setToggleShowMenu;

  function handleMenuItemclick(): void {
    if (typeof setToggleShowMenu === 'function') {
      setToggleShowMenu(false);
    }
  }

  const sideDrawerLogoPath: string = "/src/assets/logo.png"; 

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#041a0e]/70 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          toggleShowMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => typeof setToggleShowMenu === 'function' && setToggleShowMenu(false)}
      />
      <div 
        id="navbarBurger"
        className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-[#0d522c] via-[#093d20] to-[#daa520]/90 z-50 shadow-2xl transition-transform duration-300 ease-in-out transform border-r border-[#f2a900]/30 md:hidden text-left ${
          toggleShowMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-[#f2a900]/20 flex items-center justify-between bg-[#041a0e]/30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#f2a900] flex-shrink-0 p-1.5 overflow-hidden">
              <img 
                src={sideDrawerLogoPath} 
                className="w-full h-full object-contain rounded-full" 
                alt="UWA FC Circular Crest" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentNode as HTMLElement | null;
                  if (parent) {
                    parent.innerHTML = `<div class="text-[10px] font-black text-[#0d522c]">UWA</div>`;
                  }
                }}
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-black text-sm uppercase tracking-wider leading-none">UWA FC</h4>
              <p className="text-[#f2a900] text-[9px] font-bold uppercase tracking-widest mt-1 leading-none">Digital Portal</p>
            </div>
          </div>

          <button 
            onClick={() => typeof setToggleShowMenu === 'function' && setToggleShowMenu(false)}
            className="text-white hover:text-neutral-950 p-1.5 text-xs bg-[#041a0e]/50 hover:bg-[#f2a900] rounded-md border border-[#f2a900]/30 transition-all duration-200"
          >
            ✕
          </button>
        </div>
        <ul className="py-2 overflow-y-auto max-h-[calc(100vh-170px)]">
          {items.map((item: NavbarItem) => (
            <li key={item.id} className="border-b border-[#041a0e]/10">
              <Link 
                className="text-white px-6 py-3.5 w-full block hover:bg-[#041a0e]/40 hover:text-[#f2a900] transition-all duration-200 font-bold text-xs uppercase tracking-widest border-l-4 border-transparent hover:border-white" 
                to={item.target_name as any} 
                onClick={() => handleMenuItemclick()}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-6 left-6 right-6 border-t border-[#041a0e]/20 pt-4 bg-[#041a0e]/10 p-2 rounded-lg text-center">
          <p className="text-[10px] text-white font-mono tracking-tighter uppercase font-bold">
            Uganda Wildlife Authority
          </p>
          <p className="text-[9px] text-[#f2a900] font-sans tracking-widest uppercase font-light mt-0.5">
            Conserving for the Future
          </p>
        </div>
      </div>
    </>
  );
}
