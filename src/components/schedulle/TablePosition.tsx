import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export interface LeagueStandingRow {
  id: number;
  pos: number;
  club: string;
  jj: number;
  jg: number;
  je: number;
  jp: number;
  gf: number;
  gc: number;
  dif: string;
  pts: number;
}
export default function TablePosition() {
    const rawLeagueData = [
        { id: 1, club: "Masaka City SC", jg: 14, je: 5, jp: 3, gf: 45, gc: 15 },
        { id: 2, club: "Buwambo United FC", jg: 13, je: 6, jp: 3, gf: 38, gc: 19 },
        { id: 3, club: "UWA FC", jg: 12, je: 6, jp: 4, gf: 50, gc: 17 },
        { id: 4, club: "Young Simba FC", jg: 10, je: 6, jp: 6, gf: 39, gc: 14 },
        { id: 5, club: "Kira United FC", jg: 8, je: 9, jp: 5, gf: 24, gc: 20 }
    ];

    const localStandings: LeagueStandingRow[] = rawLeagueData
        .map((team) => {
            const played = team.jg + team.je + team.jp;
            const goalDifference = team.gf - team.gc;
            const points = (team.jg * 3) + (team.je * 1);
            const gdString = goalDifference >= 0 ? `+${goalDifference}` : `${goalDifference}`;

            return {
                id: team.id,
                pos: 0,
                club: team.club,
                jj: played,
                jg: team.jg,
                je: team.je,
                jp: team.jp,
                gf: team.gf,
                gc: team.gc,
                dif: gdString,
                pts: points
            };
        })
        .sort((a, b) => b.pts - a.pts || parseInt(b.dif) - parseInt(a.dif))
        .map((team, index) => ({ ...team, pos: index + 1 }));
    return (
        <div 
            className="uwa-card container mx-auto my-10 md:my-20 p-4 sm:p-8 backdrop-blur-xl rounded-2xl shadow-2xl w-full md:w-3/4 text-left"
            style={{
                backgroundColor: 'rgba(6, 38, 19, 0.45)',
                border: '1.5px solid rgba(212, 175, 55, 0.25)',
                boxShadow: '0 20px 40px rgba(2, 11, 5, 0.5)'
            }}
        >
            <div className="text-center mb-6 sm:mb-8">
                <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1" style={{ color: '#D4AF37' }}>
                    Buganda Regional League Log
                </span>
                <h3 className="text-white font-black text-xl sm:text-3xl uppercase tracking-wide">
                    Table Standings
                </h3>
                <hr 
                    className="mx-auto h-[3.5px] w-14 border-none my-2.5 rounded-full" 
                    style={{ backgroundColor: '#D4AF37' }}
                />
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full text-gray-200 text-xs sm:text-sm table-auto min-w-[500px]">
                    <thead 
                        className="font-black uppercase tracking-wider text-center"
                        style={{ 
                            backgroundColor: 'rgba(3, 17, 9, 0.85)', 
                            color: '#D4AF37',
                            borderBottom: '2px solid rgba(212, 175, 55, 0.2)'
                        }}
                    >
                        <tr>
                            <th className="w-12 py-4">Pos</th>
                            <th className="text-left py-4 px-3">Club</th>
                            <th className="w-12 py-4">P</th>
                            <th className="w-12 py-4">W</th>
                            <th className="w-12 py-4">D</th>
                            <th className="w-12 py-4">L</th>
                            <th className="w-14 py-4 hidden sm:table-cell">GF</th>
                            <th className="w-14 py-4 hidden sm:table-cell">GA</th>
                            <th className="w-16 py-4">GD</th>
                            <th className="w-16 py-4" style={{ backgroundColor: 'rgba(11, 70, 34, 0.3)' }}>Pts</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/5">
                        {localStandings.map((club: LeagueStandingRow) => {
                            const isUWA = club.club === "UWA FC";
                            return (
                                <tr 
                                    key={club.id}
                                    className="text-center transition-colors duration-150 hover:bg-white/5"
                                    style={{
                                        background: isUWA ? 'linear-gradient(to right, rgba(11, 70, 34, 0.5), rgba(6, 38, 19, 0.1))' : 'transparent',
                                        borderLeft: isUWA ? '4px solid #D4AF37' : '4px solid transparent'
                                    }}
                                >
                                    <td className={`py-4 font-mono font-medium ${isUWA ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                                        {club.pos}
                                    </td>
                                    <td className={`py-4 px-3 text-left truncate max-w-[150px] sm:max-w-none ${isUWA ? 'text-white font-black tracking-wide' : 'text-gray-300 font-medium'}`}>
                                        {club.club}
                                    </td>
                                    <td className="py-4 font-mono text-gray-300">{club.jj}</td>
                                    <td className="py-4 font-mono text-emerald-400">{club.jg}</td>
                                    <td className="py-4 font-mono text-gray-400">{club.je}</td>
                                    <td className="py-4 font-mono text-rose-400">{club.jp}</td>
                                    <td className="py-4 font-mono text-gray-400 hidden sm:table-cell">{club.gf}</td>
                                    <td className="py-4 font-mono text-gray-400 hidden sm:table-cell">{club.gc}</td>
                                    <td className={`py-4 font-mono font-bold ${club.dif.startsWith('+') ? 'text-emerald-400' : 'text-gray-400'}`}>
                                        {club.dif}
                                    </td>
                                    <td 
                                        className="py-4 font-mono font-black"
                                        style={{ 
                                            color: isUWA ? '#D4AF37' : '#FFFFFF',
                                            backgroundColor: isUWA ? 'rgba(11, 70, 34, 0.4)' : 'rgba(3, 17, 9, 0.2)' 
                                        }}
                                    >
                                        {club.pts}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-6">
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-all duration-200 font-semibold tracking-wider inline-block">
                    <span className="flex justify-center items-center gap-2 uppercase text-[11px]">
                        View Full League Log
                        <AiOutlineArrowRight className="text-sm" />
                    </span>
                </a>
            </div>
        </div>
    );
}
