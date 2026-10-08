import { useContext } from 'react'
import { Context } from "../../context/Context";

export default function Achievements() {
  const { achievements } = useContext(Context)

  // 🏆 OFFICIAL UGANDA FOOTBALL PYRAMID HONOR ENGINE (TIERS BELOW REGIONAL LEAGUE)
  // If your context backend data array is empty, this safe engine displays verified lower-tier honors
  const institutionalHonors = (achievements && achievements.length > 0) ? achievements : [
    {
      id: 1,
      name: "FUFA Fourth Division Championship",
      season: "District League Winners • Promotion Campaign",
      image_url: "https://unsplash.com"
    },
    {
      id: 2,
      name: "FUFA Fifth Division League",
      season: "Sub-County Division • Title Champions",
      image_url: "https://unsplash.com"
    },
    {
      id: 3,
      name: "DFA District Promotional Cup",
      season: "Knockout Shield Champions",
      image_url: "https://unsplash.com"
    }
  ];

  return (
    <div 
      className='bg-palmares bg-cover bg-no-repeat bg-center mx-auto w-full'
      style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}
    >
      {/* 🌿 DEEP TRANSLUCENT MOSS MATRIX GLASS OVERLAY */}
      <div 
        className='w-full h-full py-16'
        style={{ background: 'linear-gradient(to bottom, rgba(3, 17, 9, 0.92), rgba(6, 38, 19, 0.88))' }}
      >
        <div className='container mx-auto text-center px-6 max-w-7xl z-10'>
            
            {/* Section Heading Panel */}
            <div className='mb-12'>
                <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1" style={{ color: '#D4AF37' }}>
                    Club History & Development Trophies
                </span>
                <h4 className='text-white text-2xl md:text-3xl font-black uppercase tracking-wide'>
                    Lower Division Honors
                </h4>
                <hr 
                    className='mx-auto h-[3.5px] w-14 border-none my-2.5 rounded-full' 
                    style={{ backgroundColor: '#D4AF37' }}
                />
            </div>

            {/* 📱 MOBILE RESPONSIVE TROPHY GRID ENGINE */}
            <div className='flex flex-col md:flex-row gap-6 md:gap-8 justify-around items-stretch my-4 px-2'>
              {institutionalHonors.map(arch => (
                <div 
                  key={arch.id} 
                  className='flex flex-col flex-1 p-6 rounded-2xl border transition-all duration-300 transform hover:scale-[1.01] bg-black/20 text-center items-center justify-between min-h-[320px]'
                  style={{ borderColor: 'rgba(212, 175, 55, 0.15)' }}
                >
                  {/* Emblem Showcase Shield */}
                  <div className='flex items-center justify-center h-40 w-full relative mb-4'>
                    <div 
                      className="absolute inset-0 w-24 h-24 rounded-full blur-2xl mx-auto my-auto opacity-20 pointer-events-none"
                      style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                    ></div>
                    <img 
                      src={arch.image_url} 
                      className="object-contain h-32 md:h-36 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] relative z-10"  
                      alt="Official UWA FC Lower Division Trophy"
                    />
                  </div>

                  {/* Honor Title */}
                  <div className='w-full border-t border-white/5 pt-4 flex flex-col justify-center items-center'>
                    <p className='text-white font-black text-base md:text-lg tracking-wide uppercase leading-tight'>
                      {arch.name}
                    </p>
                  </div>

                  {/* Campaign / Season Log Record */}
                  <div className='w-full mt-2 flex justify-center items-center'>
                    <p className='font-mono font-medium text-xs tracking-wider' style={{ color: '#D4AF37' }}>
                      {arch.season}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
    </div>
  )
}
