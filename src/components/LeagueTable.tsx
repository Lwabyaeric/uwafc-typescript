import React from 'react';

export default function LeagueTable() {
    
    const rawLeagueData = [
        { team: "Masaka City SC", w: 14, d: 5, l: 3, gf: 45, ga: 15 },
        { team: "Buwambo United FC", w: 13, d: 6, l: 3, gf: 38, ga: 19 },
        { team: "Simba FC", w: 12, d: 6, l: 4, gf: 48, ga: 15 },
        { team: "UWA FC (Our Team)", w: 11, d: 7, l: 4, gf: 42, ga: 17, active: true },
        { team: "Young Simba FC", w: 10, d: 6, l: 6, gf: 39, ga: 14 },
        { team: "Kira United FC", w: 8, d: 9, l: 5, gf: 24, ga: 20 }
    ];

    
    const standings = rawLeagueData
        .map((club) => {
            const played = club.w + club.d + club.l;
            const goalDifference = club.gf - club.ga;
            const points = (club.w * 3) + (club.d * 1);
            const gdString = goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`;

            return {
                ...club,
                p: played,
                gd: gdString,
                gdRaw: goalDifference,
                pts: points
            };
        })
        
        .sort((a, b) => b.pts - a.pts || b.gdRaw - a.gdRaw)
        // Assigns official ranking index after sorting
        .map((club, index) => ({ ...club, rank: index + 1 }));

    return (
        <div className="bg-neutral-900/40 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800/40 shadow-xl max-w-4xl mx-auto my-4 sm:my-10 text-left box-border">
            
            {/* COMPACT SECTION HEADER */}
            <div className="mb-4 sm:mb-6">
                <span className="text-[#f2a900] text-[8px] sm:text-[10px] font-black tracking-widest uppercase block mb-0.5">
                    Table Standings
                </span>
                <h3 className="text-white font-black text-base sm:text-xl uppercase tracking-tight leading-tight">
                    Buganda Regional League Log
                </h3>
                <hr className="h-[2px] w-8 sm:w-12 bg-[#0d522c] border-none mt-1.5" />
            </div>

            <div className="overflow-x-auto rounded-lg border border-neutral-800/50 scrollbar-none w-full mb-3">
                <table className="w-full text-xs sm:text-sm text-gray-300 table-auto min-w-[420px] sm:min-w-full">
                    <thead className="text-[10px] sm:text-xs uppercase bg-neutral-950 font-black tracking-wider text-[#f2a900] border-b border-neutral-800">
                        <tr>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center w-8">Pos</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Club</th>
                            <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-center">P</th>
                            <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-center">W</th>
                            <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-center">D</th>
                            <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-center">L</th>
                            <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-center">GD</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center bg-[#0d522c]/20 w-10 sm:w-14">Pts</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/40">
                        {standings.map((club) => (
                            <tr 
                                key={club.rank} 
                                className={`transition-colors duration-200 ${
                                    club.active 
                                        ? 'bg-gradient-to-r from-[#0d522c]/30 to-transparent font-bold border-l-[3px] sm:border-l-4 border-[#f2a900]' 
                                        : 'hover:bg-neutral-900/20'
                                }`}
                            >
                             
                                <td className="px-2 sm:px-4 py-2 sm:py-2.5 text-center font-mono">
                                    <span className={`inline-block w-5 h-5 leading-5 rounded text-center text-[10px] font-bold ${
                                        club.rank === 1 
                                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' // 🟢 ONLY ONE TEAM GOES TO PLAYOFF
                                            : club.rank >= 6 
                                            ? 'bg-rose-950 text-rose-400 border border-rose-900/40' // Relegation Threat
                                            : 'text-gray-400'
                                    }`}>
                                        {club.rank}
                                    </span>
                                </td>
                                
                                <td className={`px-2 sm:px-4 py-2 sm:py-2.5 text-left font-semibold max-w-[120px] sm:max-w-none truncate ${club.active ? 'text-white' : 'text-gray-200'}`}>
                                    {club.team}
                                </td>
                                
                                <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-mono">{club.p}</td>
                                <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-mono text-emerald-400/90">{club.w}</td>
                                <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-mono text-gray-400">{club.d}</td>
                                <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-mono text-rose-400/90">{club.l}</td>
                                <td className={`px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-mono text-[11px] sm:text-xs ${club.gd.startsWith('+') ? 'text-emerald-500' : 'text-gray-400'}`}>
                                    {club.gd}
                                </td>
                                
                                <td className={`px-2 sm:px-4 py-2 sm:py-2.5 text-center font-mono font-black ${club.active ? 'text-[#f2a900] bg-[#0d522c]/30' : 'text-white bg-neutral-950/20'}`}>
                                    {club.pts}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 pt-2 border-t border-neutral-800/40 text-[9px] sm:text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded"></span>
                    <span>Top Team: FUFA Big League Promotional Playoff Zone</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-rose-500/20 border border-rose-500/40 rounded"></span>
                    <span>Regional Relegation Danger Zone</span>
                </div>
            </div>
        </div>
    );
}
