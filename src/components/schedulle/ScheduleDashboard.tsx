import React, { useState, useEffect, useRef } from 'react';
import { 
  IoCalendarOutline, IoTrophyOutline, IoLayersOutline, IoRibbonOutline, 
  IoLocationOutline, IoTimeOutline, IoAnalyticsOutline, IoGridOutline, IoCameraOutline
} from 'react-icons/io5';
import TablePosition from "./TablePosition";
import FixturesDashboard from "./FixturesDashboard";
import MatchStats from "../MatchStats";

import team1 from "/src/assets/team1.png"; 
import team2 from "/src/assets/team2.png"; 
import buwamboLogo from "/src/assets/buwambo-fc.png";
import kiyindaLogo from "/src/assets/kiyinda-boys-fc.png";
import kajjansiLogo from "/src/assets/Kajjansi-united-fc.png";
import lukayaLogo from "/src/assets/Lukaya-Town-council-fc.png"; 
import kibogaLogo from "/src/assets/kiboga-united-sc.png";
import masakaLogo from "/src/assets/masaka-city.png";

import prisonsLogo from "/src/assets/prisons.png";
import mtElgonLogo from "/src/assets/mt-elgon.png";
import bwindiLogo from "/src/assets/bwindi.png";
import kibaleLogo from "/src/assets/kibale.png";
import murchisonLogo from "/src/assets/murchison.png";
import kidepoLogo from "/src/assets/kidepo.png";
import queenLogo from "/src/assets/queen.png";
import policeLogo from "/src/assets/police.png";
import updfLogo from "/src/assets/updf.png";
import hqLogo from "/src/assets/headquarter.png";
import mburoLogo from "/src/assets/mburo.png";

export interface GoalScorer {
  player: string;
  min: string;
  goals?: number;
}

export interface MatchStatRow {
  label: string;
  home: number;
  away: number;
  suffix: string;
}

export interface TournamentMatchItem {
  id: string;
  tournament: 'buganda' | 'interca' | 'interforce';
  group?: 'Group A' | 'Group B' | 'Round Robin';
  stage?: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  venue: string;
  score: string | null;
  scorers: {
    home: GoalScorer[];
    away: GoalScorer[];
  };
  stats: MatchStatRow[];
  competitionType: string;
  matchTitle: string;
  type?: string;
  title?: string;
  isHome?: boolean;
}

interface StandingRow {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}
export default function ScheduleDashboard() {
  const [activePanel, setActivePanel] = useState<string>('center');
  const [activeTab, setActiveTab] = useState<'buganda' | 'interca' | 'interforce'>('buganda');
  const [matchViewMode, setMatchViewMode] = useState<'fixtures' | 'tables'>('fixtures');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('upcoming');
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sheetId = "uwa-tournament-dashboard-breath";
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement("style");
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaTournamentBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02); }
          50% { transform: scale(1.012); box-shadow: 0 12px 20px -5px rgba(212, 175, 55, 0.12); border-color: rgba(212, 175, 55, 0.3) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .tournament-breath-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; animation: uwaTournamentBreath 5.4s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .tournament-breath-card:nth-child(2n) { animation-delay: 0.8s; }
        .tournament-breath-card:hover { transform: scale(1.025) translateY(-4px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 20px 30px -5px rgba(212, 175, 55, 0.2) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  const matchCenterData: TournamentMatchItem[] = [
    {
      id: "upcoming", tournament: "buganda", stage: "Group Stage", matchTitle: "Upcoming Fixture", competitionType: "Buganda Regional League",
      homeTeam: "UWA FC", awayTeam: "Masaka City SC", homeLogo: team1, awayLogo: masakaLogo,
      date: "2026-10-12", time: "16:00", venue: "UWA Grounds (Home)", score: null,
      scorers: { home: [], away: [] },
      stats: [
        { label: "Win Probability", home: 62, away: 38, suffix: "%" },
        { label: "Avg Goals/Game", home: 2.1, away: 1.4, suffix: "" },
        { label: "Clean Sheet Rate", home: 45, away: 30, suffix: "%" },
        { label: "Form Index Rating", home: 82, away: 70, suffix: "" },
        { label: "Wildlife Awareness Pledges", home: 0, away: 0, suffix: " Fans" }
      ]
    },
    { 
      id: "c1", tournament: "buganda", stage: "Quarter Final", matchTitle: "Quarter Final", competitionType: "Uganda Cup",
      homeTeam: "Buwambo FC", awayTeam: "UWA FC", homeLogo: buwamboLogo, awayLogo: team1,
      date: "2026-10-05", time: "15:00", venue: "Buwambo Ground (Away)", score: "1 - 2", 
      scorers: { home: [{ player: "Home Striker", min: "14'" }, { player: "Midfielder", min: "72'" }], away: [{ player: "UWA Striker", min: "44' (Pen)" }] },
      stats: [
        { label: "Possession", home: 58, away: 42, suffix: "%" }, { label: "Shots on Target", home: 6, away: 4, suffix: "" },
        { label: "Corners", home: 5, away: 3, suffix: "" }, { label: "Fouls Committed", home: 14, away: 12, suffix: "" },
        { label: "Wildlife Awareness Pledges", home: 0, away: 85, suffix: " Fans" }
      ]
    },
    { 
      id: "m2", tournament: "buganda", stage: "Matchday 14", matchTitle: "International Friendly", competitionType: "Club Friendly",
      homeTeam: "Kiyinda Boys FC", awayTeam: "UWA FC", homeLogo: kiyindaLogo, awayLogo: team1,
      date: "2026-09-28", time: "15:30", venue: "Mityana Ground (Away)", score: "3 - 0", 
      scorers: { home: [], away: [ { player: "Capt. Okello", min: "23', 68'", goals: 2 }, { player: "Nsubuga", min: "56'", goals: 1 } ] },
      stats: [
        { label: "Possession", home: 35, away: 65, suffix: "%" }, { label: "Shots on Target", home: 2, away: 9, suffix: "" },
        { label: "Corners", home: 2, away: 7, suffix: "" }, { label: "Fouls Committed", home: 15, away: 8, suffix: "" },
        { label: "Wildlife Awareness Pledges", home: 0, away: 110, suffix: " Fans" }
      ]
    },
    { 
      id: "m1", tournament: "buganda", stage: "Matchday 13", matchTitle: "Matchday 13", competitionType: "Buganda Regional League",
      homeTeam: "UWA FC", awayTeam: "Kajjansi United FC", homeLogo: team1, awayLogo: kajjansiLogo,
      date: "2026-07-12", time: "16:00", venue: "UWA Grounds (Home)", score: "1 - 1", 
      scorers: { home: [{ player: "Ssemanda", min: "61'" }], away: [{ player: "Kajjansi Forward", min: "89'" }] },
      stats: [
        { label: "Possession", home: 52, away: 48, suffix: "%" }, { label: "Shots on Target", home: 5, away: 5, suffix: "" },
        { label: "Corners", home: 4, away: 4, suffix: "" }, { label: "Fouls Committed", home: 10, away: 11, suffix: "" },
        { label: "Wildlife Awareness Pledges", home: 195, away: 0, suffix: " Fans" }
      ]
    },
        { 
      id: "m3", tournament: "buganda", stage: "Matchday 12", matchTitle: "Matchday 12", competitionType: "Buganda Regional League",
      homeTeam: "UWA FC", awayTeam: "Lukaya Town", homeLogo: team1, awayLogo: lukayaLogo,
      date: "2026-06-28", time: "16:00", venue: "UWA Grounds (Home)", score: "2 - 0", 
      scorers: { home: [{ player: "Oloya", min: "5'" }, { player: "Wanyama", min: "41'" }], away: [] },
      stats: [
        { label: "Possession", home: 55, away: 45, suffix: "%" }, 
        { label: "Shots on Target", home: 7, away: 2, suffix: "" },
        { label: "Corners", home: 6, away: 3, suffix: "" }, 
        { label: "Fouls Committed", home: 9, away: 13, suffix: "" },

        { label: "Wildlife Awareness Pledges", home: 160, away: 0, suffix: " Fans" }
      ]
    },

    { 
      id: "m4", tournament: "buganda", stage: "Matchday 11", matchTitle: "Matchday 11", competitionType: "Buganda Regional League",
      homeTeam: "Kiboga United SC", awayTeam: "UWA FC", homeLogo: kibogaLogo, awayLogo: team1,
      date: "2026-06-14", time: "15:30", venue: "Kiboga S.S Ground (Away)", score: "0 - 1", 
      scorers: { home: [], away: [{ player: "Ssebuyira", min: "88'" }] },
      stats: [
        { label: "Possession", home: 51, away: 49, suffix: "%" }, { label: "Shots on Target", home: 3, away: 2, suffix: "" },
        { label: "Corners", home: 4, away: 5, suffix: "" }, { label: "Fouls Committed", home: 12, away: 12, suffix: "" },
        { label: "Wildlife Awareness Pledges", home: 0, away: 75, suffix: " Fans" }
      ]
    }
  ];
  const interCaData: TournamentMatchItem[] = [
    {
      id: "ica-ga1", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 1", competitionType: "Inter-CA Cup",
      homeTeam: "Queen Elizabeth CA", awayTeam: "Murchison Falls CA", homeLogo: queenLogo, awayLogo: murchisonLogo,
      date: "2026-08-13", time: "14:00", venue: "Paraa Eco Ground", score: "2 - 1",
      scorers: { home: [{ player: "Okena", min: "34'" }], away: [{ player: "Mukasa", min: "76'" }] },
      stats: [{ label: "Possession", home: 55, away: 45, suffix: "%" }, { label: "Shots on Target", home: 5, away: 3, suffix: "" }]
    },
    {
      id: "ica-ga2", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 1", competitionType: "Inter-CA Cup",
      homeTeam: "Kidepo Valley CA", awayTeam: "Lake Mburo CA", homeLogo: kidepoLogo, awayLogo: mburoLogo,
      date: "2026-08-13", time: "16:15", venue: "Apoka Arena", score: "1 - 0",
      scorers: { home: [{ player: "Lokiru", min: "58'" }], away: [] },
      stats: [{ label: "Possession", home: 48, away: 52, suffix: "%" }, { label: "Shots on Target", home: 4, away: 2, suffix: "" }]
    },
    {
      id: "ica-ga3", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 2", competitionType: "Inter-CA Cup",
      homeTeam: "Murchison Falls CA", awayTeam: "Lake Mburo CA", homeLogo: murchisonLogo, awayLogo: mburoLogo,
      date: "2026-08-14", time: "14:00", venue: "Paraa Eco Ground", score: "3 - 0",
      scorers: { home: [{ player: "Ssewankambo", min: "10', 61'", goals: 2 }, { player: "Oloya", min: "80'" }], away: [] },
      stats: [{ label: "Possession", home: 65, away: 35, suffix: "%" }, { label: "Shots on Target", home: 9, away: 1, suffix: "" }]
    },
    {
      id: "ica-ga4", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 2", competitionType: "Inter-CA Cup",
      homeTeam: "Lake Mburo CA", awayTeam: "Queen Elizabeth CA", homeLogo: mburoLogo, awayLogo: queenLogo,
      date: "2026-08-14", time: "16:15", venue: "Mburo Ground", score: "1 - 1",
      scorers: { home: [{ player: "Zebrass", min: "44'" }], away: [{ player: "Ranger", min: "90'" }] },
      stats: [{ label: "Possession", home: 42, away: 58, suffix: "%" }, { label: "Shots on Target", home: 3, away: 6, suffix: "" }]
    },
    {
      id: "ica-ga5", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 3", competitionType: "Inter-CA Cup",
      homeTeam: "Headquarters (HQs)", awayTeam: "Kidepo Valley CA", homeLogo: hqLogo, awayLogo: kidepoLogo,
      date: "2026-08-15", time: "14:00", venue: "Kampala Central Ground", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 45, away: 55, suffix: "%" }, { label: "Clean Sheet Rate", home: 30, away: 40, suffix: "%" }]
    },
    {
      id: "ica-ga6", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 3", competitionType: "Inter-CA Cup",
      homeTeam: "Queen Elizabeth CA", awayTeam: "Kidepo Valley CA", homeLogo: queenLogo, awayLogo: kidepoLogo,
      date: "2026-08-15", time: "16:15", venue: "Rubirizi Field", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 52, away: 48, suffix: "%" }, { label: "Clean Sheet Rate", home: 50, away: 45, suffix: "%" }]
    },
    {
      id: "ica-gb1", tournament: "interca", group: "Group B", stage: "Group Stage", matchTitle: "Matchday 1", competitionType: "Inter-CA Cup",
      homeTeam: "Bwindi Forest CA", awayTeam: "Kibale Forest CA", homeLogo: bwindiLogo, awayLogo: kibaleLogo,
      date: "2026-08-13", time: "14:00", venue: "Bwindi Ground", score: "0 - 0",
      scorers: { home: [], away: [] }, stats: [{ label: "Possession", home: 50, away: 50, suffix: "%" }, { label: "Shots on Target", home: 2, away: 2, suffix: "" }]
    },
    {
      id: "ica-gb2", tournament: "interca", group: "Group B", stage: "Group Stage", matchTitle: "Matchday 1", competitionType: "Inter-CA Cup",
      homeTeam: "Mount Elgon CA", awayTeam: "Bwindi Forest CA", homeLogo: mtElgonLogo, awayLogo: bwindiLogo,
      date: "2026-08-13", time: "16:15", venue: "Kapchorwa Field", score: "3 - 1",
      scorers: { home: [{ player: "Cheptegei", min: "12', 44'", goals: 2 }], away: [] },
      stats: [{ label: "Possession", home: 60, away: 40, suffix: "%" }, { label: "Shots on Target", home: 8, away: 4, suffix: "" }]
    },
        
    {
      id: "ica-ga6-new", tournament: "interca", group: "Group A", stage: "Group Stage", matchTitle: "Matchday 3", competitionType: "Inter-CA Cup",
      homeTeam: "Murchison Falls CA", awayTeam: "Kidepo Valley CA", homeLogo: murchisonLogo, awayLogo: kidepoLogo,
      date: "2026-08-16", time: "14:00", venue: "Paraa Eco Ground", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 55, away: 45, suffix: "%" }, { label: "Clean Sheet Rate", home: 45, away: 35, suffix: "%" }]
    },
    
    {
      id: "ica-gb4-new", tournament: "interca", group: "Group B", stage: "Group Stage", matchTitle: "Matchday 2", competitionType: "Inter-CA Cup",
      homeTeam: "Lake Mburo CA", awayTeam: "Bwindi Forest CA", homeLogo: mburoLogo, awayLogo: bwindiLogo,
      date: "2026-08-15", time: "16:15", venue: "Mburo Ground", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 42, away: 58, suffix: "%" }, { label: "Clean Sheet Rate", home: 30, away: 55, suffix: "%" }]
    },
  
    {
      id: "ica-gb6-new", tournament: "interca", group: "Group B", stage: "Group Stage", matchTitle: "Matchday 3", competitionType: "Inter-CA Cup",
      homeTeam: "Headquarters (HQs)", awayTeam: "Mount Elgon CA", homeLogo: hqLogo, awayLogo: mtElgonLogo,
      date: "2026-08-16", time: "16:15", venue: "Kampala Central Ground", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 40, away: 60, suffix: "%" }, { label: "Clean Sheet Rate", home: 25, away: 50, suffix: "%" }]
    },

    {
      id: "ica-gb3", tournament: "interca", group: "Group B", stage: "Group Stage", matchTitle: "Matchday 2", competitionType: "Inter-CA Cup",
      homeTeam: "Kibale Forest CA", awayTeam: "Mount Elgon CA", homeLogo: kibaleLogo, awayLogo: mtElgonLogo,
      date: "2026-08-15", time: "14:00", venue: "Kibale Track", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 48, away: 52, suffix: "%" }, { label: "Clean Sheet Rate", home: 40, away: 45, suffix: "%" }]
    },
    {
      id: "ica-sf1", tournament: "interca", stage: "Semi-Final", matchTitle: "Semi-Final 1", competitionType: "Inter-CA Cup Knockouts",
      homeTeam: "Murchison Falls CA", awayTeam: "Mount Elgon CA", homeLogo: murchisonLogo, awayLogo: mtElgonLogo,
      date: "2026-08-20", time: "14:00", venue: "Namulonge Match Arena", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Projected Form Index", home: 88, away: 76, suffix: "" }, { label: "Progression Chance", home: 64, away: 36, suffix: "%" }]
    },
    {
      id: "ica-sf2", tournament: "interca", stage: "Semi-Final", matchTitle: "Semi-Final 2", competitionType: "Inter-CA Cup Knockouts",
      homeTeam: "Bwindi Forest CA", awayTeam: "Queen Elizabeth CA", homeLogo: bwindiLogo, awayLogo: queenLogo,
      date: "2026-08-20", time: "16:30", venue: "Namulonge Match Arena", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Projected Form Index", home: 82, away: 84, suffix: "" }, { label: "Progression Chance", home: 49, away: 51, suffix: "%" }]
    },
    {
      id: "ica-final", tournament: "interca", stage: "Grand Final", matchTitle: "Championship Final", competitionType: "Inter-CA Cup Knockouts",
      homeTeam: "SF1 Winner", awayTeam: "SF2 Winner", homeLogo: kibaleLogo, awayLogo: hqLogo,
      date: "2026-08-23", time: "16:00", venue: "Kampala National Stadium", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Crowd Support Metric", home: 50, away: 50, suffix: "%" }]
    }
  ];
  const interforceData: TournamentMatchItem[] = [
    {
      id: "if-1", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 1", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Wildlife Authority", awayTeam: "Uganda Peoples' Defence Forces", homeLogo: team1, awayLogo: updfLogo,
      date: "2026-09-08", time: "16:00", venue: "Bombo Barracks Ground", score: "1 - 1",
      scorers: { home: [{ player: "Sserwadda", min: "42'" }], away: [{ player: "Simba Striker", min: "89'" }] },
      stats: [{ label: "Possession", home: 52, away: 48, suffix: "%" }, { label: "Shots on Target", home: 5, away: 4, suffix: "" }]
    },
    {
      id: "if-2", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 1", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Police Force", awayTeam: "Uganda Prisons Service", homeLogo: policeLogo, awayLogo: prisonsLogo,
      date: "2026-09-08", time: "14:00", venue: "Kavumba Grounds", score: "2 - 0",
      scorers: { home: [{ player: "Police Winger", min: "12', 64'", goals: 2 }], away: [] },
      stats: [{ label: "Possession", home: 56, away: 44, suffix: "%" }, { label: "Shots on Target", home: 7, away: 2, suffix: "" }]
    },
    {
      id: "if-3", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 2", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Wildlife Authority", awayTeam: "Uganda Police Force", homeLogo: team1, awayLogo: policeLogo,
      date: "2026-09-12", time: "16:00", venue: "Kavumba Grounds", score: "1 - 2",
      scorers: { home: [{ player: "Okello", min: "44'" }], away: [{ player: "Police Fwd", min: "15', 73'", goals: 2 }] },
      stats: [{ label: "Possession", home: 49, away: 51, suffix: "%" }, { label: "Shots on Target", home: 4, away: 6, suffix: "" }]
    },
    {
      id: "if-4", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 2", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Peoples' Defence Forces", awayTeam: "Uganda Prisons Service", homeLogo: updfLogo, awayLogo: prisonsLogo,
      date: "2026-09-12", time: "14:00", venue: "Bombo Barracks Ground", score: "2 - 1",
      scorers: { home: [{ player: "Simba Pro", min: "33', 59'", goals: 2 }], away: [{ player: "Prison Guard", min: "81'" }] },
      stats: [{ label: "Possession", home: 58, away: 42, suffix: "%" }, { label: "Shots on Target", home: 6, away: 3, suffix: "" }]
    },
    {
      id: "if-5", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 3", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Wildlife Authority", awayTeam: "Uganda Prisons Service", homeLogo: team1, awayLogo: prisonsLogo,
      date: "2026-09-16", time: "16:00", venue: "UWA Grounds (Home)", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 60, away: 40, suffix: "%" }, { label: "Clean Sheet Rate", home: 45, away: 40, suffix: "%" }]
    },
    {
      id: "if-6", tournament: "interforce", group: "Round Robin", matchTitle: "Matchday 3", competitionType: "Inter-Forces Championship",
      homeTeam: "Uganda Peoples' Defence Forces", awayTeam: "Uganda Police Force", homeLogo: updfLogo, awayLogo: policeLogo,
      date: "2026-09-16", time: "14:00", venue: "Bombo Barracks Ground", score: null, scorers: { home: [], away: [] },
      stats: [{ label: "Win Probability", home: 46, away: 54, suffix: "%" }, { label: "Clean Sheet Rate", home: 35, away: 45, suffix: "%" }]
    }
  ];

  const masterFixturesCollection = [...matchCenterData, ...interCaData, ...interforceData];

  const bugandaStandings: StandingRow[] = [
    { rank: 1, team: "Masaka City SC", played: 22, won: 14, drawn: 5, lost: 3, goalsFor: 45, goalsAgainst: 15, points: 47 },
    { rank: 2, team: "Buwambo United FC", played: 22, won: 13, drawn: 6, lost: 3, goalsFor: 38, goalsAgainst: 19, points: 45 },
    { rank: 3, team: "UWA FC", played: 22, won: 12, drawn: 6, lost: 4, goalsFor: 50, goalsAgainst: 17, points: 42 },
    { rank: 4, team: "Young Simba FC", played: 22, won: 10, drawn: 6, lost: 6, goalsFor: 39, goalsAgainst: 14, points: 36 },
    { rank: 5, team: "Kira United FC", played: 22, won: 8, drawn: 9, lost: 5, goalsFor: 24, goalsAgainst: 20, points: 33 }
  ];

  const caGroupAStandings: StandingRow[] = [
    { rank: 1, team: "Murchison Falls CA", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 6 },
    { rank: 2, team: "Queen Elizabeth CA", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { rank: 3, team: "Kidepo Valley CA", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 3, points: 3 },
    { rank: 4, team: "Lake Mburo CA", played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 2 }
  ];

  const caGroupBStandings: StandingRow[] = [
    { rank: 1, team: "Bwindi Forest CA", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, points: 7 },
    { rank: 2, team: "Mount Elgon CA", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { rank: 3, team: "Kibale Forest CA", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 1 },
    { rank: 4, team: "Headquarters (HQs)", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, points: 0 }
  ];

  const interforceTable: StandingRow[] = [
    { rank: 1, team: "Uganda Police Force", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 6 },
    { rank: 2, team: "Uganda Wildlife Authority", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 1 },
    { rank: 3, team: "Uganda Peoples' Defence Forces", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 2, points: 1 },
    { rank: 4, team: "Uganda Prisons Service", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
  ];
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || activePanel !== 'center' || matchViewMode !== 'fixtures' || isHoveredOrTouched) return;
    let speed = 1; let id: number;
    const continuousScroll = () => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) { el.scrollLeft = 0; } else { el.scrollLeft += speed; }
      id = requestAnimationFrame(continuousScroll);
    };
    id = requestAnimationFrame(continuousScroll);
    return () => cancelAnimationFrame(id);
  }, [activePanel, matchViewMode, isHoveredOrTouched]);

  const filteredMatches = masterFixturesCollection.filter(m => m.tournament === activeTab);
  const selectedMatch = filteredMatches.find(m => m.id === selectedMatchId) || filteredMatches[0];
  return (
    <div className='h-auto pt-4 pb-10 sm:py-16 lg:py-20 px-2 sm:px-4 lg:px-6 w-full box-border select-none text-left' style={{ background: 'linear-gradient(to bottom, #031109 0%, #062613 50%, #031109 100%)', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
      <div className='text-center mb-4 sm:mb-8'>
        <span className="font-black text-[9px] sm:text-xs uppercase tracking-widest block mb-0.5" style={{ color: '#D4AF37' }}>Match Center & Analytics</span>
        <h2 className='font-black text-xl sm:text-3xl text-white uppercase tracking-tight leading-none'>Fixtures & Results</h2>
        <hr className='mx-auto h-[2.5px] sm:h-[3.5px] w-10 sm:w-14 border-none mt-2 rounded-full' style={{ backgroundColor: '#D4AF37' }} />
      </div>

      <div className="flex gap-1 max-w-xl mx-auto mb-6 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80 shadow-2xl">
        {[
          { id: 'center', label: 'Match Center' },
          { id: 'calendar', label: 'Full Fixtures' },
          { id: 'standings', label: 'League Table' }
        ].map((panel) => (
          <button
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={`flex-1 text-center py-2.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase font-black tracking-wider transition-all duration-200 cursor-pointer ${
              activePanel === panel.id ? 'bg-[#0d522c] text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg' : 'text-gray-400'
            }`}
          >
            {panel.label}
          </button>
        ))}
      </div>

      {activePanel === 'center' && (
        <div className="w-full max-w-7xl mx-auto px-1 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-1 max-w-2xl mx-auto mb-6 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80 w-full">
            <button 
              onClick={() => { 
                setActiveTab('buganda'); 
                setSelectedMatchId('upcoming');
              }} 
              className={`flex-1 text-center py-2 rounded-lg font-mono text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${activeTab === 'buganda' ? 'bg-[#0d522c] text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg' : 'text-gray-400'}`}
            >
              Buganda Regional League
            </button>
            <button 
              onClick={() => { 
                setActiveTab('interca'); 
                setSelectedMatchId('ica-ga1');
              }} 
              className={`flex-1 text-center py-2 rounded-lg font-mono text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${activeTab === 'interca' ? 'bg-[#0d522c] text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg' : 'text-gray-400'}`}
            >
              Inter-CA Cup (15 Games Total)
            </button>
            <button 
              onClick={() => { 
                setActiveTab('interforce'); 
                setSelectedMatchId('if-1');
              }} 
              className={`flex-1 text-center py-2 rounded-lg font-mono text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${activeTab === 'interforce' ? 'bg-[#0d522c] text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg' : 'text-gray-400'}`}
            >
              Inter-Forces Championship
            </button>
          </div>

          <div className="flex border border-neutral-800 bg-neutral-950/60 p-0.5 rounded-lg mb-6 w-56 text-center shadow-inner">
            <button onClick={() => setMatchViewMode('fixtures')} className={`flex-1 py-1 rounded text-[9px] sm:text-[10px] uppercase font-bold font-mono tracking-wide transition-all cursor-pointer ${matchViewMode === 'fixtures' ? 'bg-[#0d522c]/50 text-white border border-neutral-800' : 'text-neutral-500'}`}>Fixtures Grid</button>
            <button onClick={() => setMatchViewMode('tables')} className={`flex-1 py-1 rounded text-[9px] sm:text-[10px] uppercase font-bold font-mono tracking-wide transition-all cursor-pointer ${matchViewMode === 'tables' ? 'bg-[#0b4622]/50 text-white border border-neutral-800' : 'text-neutral-500'}`}>Points Log</button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto w-full box-border">
        {activePanel === 'center' && matchViewMode === 'fixtures' && (
          <div className="w-full flex flex-col gap-6 transition-all duration-300">
            <div className="w-full">
              <p className='text-gray-400 font-black text-center lg:text-left text-[9px] sm:text-xs uppercase tracking-widest mb-3 px-2'>
                🔥 Live Carousel Track • Swipe smoothly to review tactical statistics and match highlights
              </p>
              
              <div 
                ref={scrollContainerRef}
                onMouseEnter={() => setIsHoveredOrTouched(true)}
                onMouseLeave={() => setIsHoveredOrTouched(false)}
                onTouchStart={() => setIsHoveredOrTouched(true)}
                onTouchEnd={() => setIsHoveredOrTouched(false)}
                className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 pt-1 px-2 gap-3 lg:grid lg:grid-cols-6 lg:overflow-x-visible lg:pb-0 scroll-smooth select-none"
              >
                {filteredMatches.map((match) => (
                  <div 
                    key={match.id} 
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`tournament-breath-card p-4 rounded-xl border text-left flex flex-col justify-between min-h-[170px] flex-shrink-0 w-[65vw] sm:w-[40vw] lg:w-auto cursor-pointer transition-all duration-300 ${selectedMatchId === match.id ? 'ring-2 ring-[#D4AF37] scale-[1.01] shadow-2xl bg-[#062613]/50' : 'opacity-80 lg:opacity-60 hover:opacity-100'}`}
                  >
                    <div className="flex flex-col w-full border-b border-white/5 pb-1.5 mb-2">
                      <span className="text-[10px] font-mono text-[#D4AF37] font-black uppercase tracking-tight">{match.competitionType}</span>
                      <span className="text-[8px] font-mono text-neutral-400 font-bold uppercase mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{match.matchTitle} • {match.venue}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-center">
                      <div className="flex-1 min-w-0">
                        {typeof match.homeLogo === 'string' && (match.homeLogo.startsWith('.') || match.homeLogo.startsWith('/')) ? (
                          <img src={match.homeLogo} className="w-10 h-10 object-contain mx-auto" alt="" />
                        ) : <span className="text-2xl block">{match.homeLogo}</span>}
                        <span className="text-[9px] font-bold text-white block uppercase truncate mt-1">{match.homeTeam}</span>
                      </div>
                      <div className="px-2 font-mono font-black text-xs sm:text-sm bg-neutral-950/80 py-1 rounded border border-white/5 text-[#D4AF37]">{match.score || "VS"}</div>
                      <div className="flex-1 min-w-0">
                        {typeof match.awayLogo === 'string' && (match.awayLogo.startsWith('.') || match.awayLogo.startsWith('/')) ? (
                          <img src={match.awayLogo} className="w-10 h-10 object-contain mx-auto" alt="" />
                        ) : <span className="text-2xl block">{match.awayLogo}</span>}
                        <span className="text-[9px] font-bold text-white block uppercase truncate mt-1">{match.awayTeam}</span>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-1.5 flex justify-between items-center text-[8px] font-mono text-[#D4AF37] font-black">
                      <span className="truncate max-w-[60%] text-neutral-500">🗓️ {match.date}</span>
                      <span>🕒 {match.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedMatch && !Array.isArray(selectedMatch) && (
              <div className="w-full transition-all duration-300">
                <MatchStats 
                  matchData={{
                    id: selectedMatch.id,
                    score: selectedMatch.score,
                    scorers: selectedMatch.scorers,
                    stats: selectedMatch.stats,
                    homeTeam: selectedMatch.homeTeam,
                    awayTeam: selectedMatch.awayTeam,
                    opponent: 'opponent' in selectedMatch 
                      ? (selectedMatch as any).opponent 
                      : (selectedMatch.homeTeam.includes("UWA") || selectedMatch.homeTeam.includes("Authority") 
                          ? selectedMatch.awayTeam 
                          : selectedMatch.homeTeam),
                    isHome: 'opponent' in selectedMatch 
                      ? (selectedMatch as any).isHome 
                      : (selectedMatch.homeTeam.includes("UWA") || selectedMatch.homeTeam.includes("Authority"))
                  } as any} 
                />
              </div>
            )}
          </div>
        )}
        {activePanel === 'center' && matchViewMode === 'tables' && (
          <div className="max-w-4xl mx-auto w-full box-border">
            {activeTab === 'buganda' && (
              <div className="bg-neutral-900/40 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-neutral-800/40 shadow-2xl">
                <h3 className="text-white font-black text-xl uppercase tracking-wide text-center mb-4">Buganda Regional League Log</h3>
                <div className="overflow-x-auto w-full border border-neutral-800/60 rounded-xl">
                  <table className="w-full text-center text-xs text-gray-300">
                    <thead className="bg-neutral-950 font-black tracking-wider text-[#D4AF37] border-b border-neutral-800">
                      <tr>
                        <th className="py-3 px-2 text-center w-10">Pos</th>
                        <th className="text-left py-3 px-3">Club</th>
                        <th className="w-10 py-3">P</th>
                        <th className="w-10 py-3">W</th>
                        <th className="w-10 py-3">D</th>
                        <th className="w-10 py-3">L</th>
                        <th className="w-14 py-3 bg-[#0b4622]/20 text-[#D4AF37]">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bugandaStandings.map(r => { 
                        const isUWA = r.team === "UWA FC"; 
                        return (
                          <tr key={r.team} className="hover:bg-white/5" style={{ background: isUWA ? 'linear-gradient(to right, rgba(11, 70, 34, 0.4), transparent)' : 'transparent' }}>
                            <td className="py-3 font-mono font-bold text-gray-500">{r.rank}</td>
                            <td className={`py-3 px-3 text-left font-sans font-bold ${isUWA ? 'text-white' : 'text-gray-300'}`}>{r.team}</td>
                            <td className="font-mono">{r.played}</td>
                            <td className="font-mono text-emerald-400">{r.won}</td>
                            <td className="font-mono text-gray-400">{r.drawn}</td>
                            <td className="font-mono text-rose-400">{r.lost}</td>
                            <td className="py-3 font-mono font-black text-[#D4AF37] bg-[#0b4622]/10">{r.points}</td>
                          </tr>
                        ); 
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'interca' && (
              <div className="space-y-6">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[10px] font-mono text-amber-400 leading-relaxed">🏆 Tournament Format Execution Guide: 8 Conservation Area units partitioned cleanly across Group A & Group B (4 Teams Each). Top 2 teams from each tier instantly qualify for the high-stakes Knockout Semis. Played annually every 13th August.</div>
                
                <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                  <h3 className="text-[#D4AF37] font-mono font-black text-xs uppercase tracking-wider mb-3">Inter-CA Group A Points Log (4 Parks)</h3>
                  <div className="overflow-x-auto w-full border border-white/5 rounded-lg">
                    <table className="w-full text-center text-[10px] font-mono">
                      <thead className="bg-neutral-950 text-neutral-400 border-b border-white/5">
                        <tr>
                          <th className="py-2 text-left px-2">Pos</th>
                          <th className="py-2 text-left">Park Unit</th>
                          <th>P</th><th>W</th><th>D</th><th>L</th>
                          <th className="text-[#D4AF37]">PTS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {caGroupAStandings.map(r => (
                          <tr key={r.team} className="hover:bg-white/5">
                            <td className="py-2 px-2 text-left font-bold text-neutral-500">{r.rank}</td>
                            <td className="py-2 text-left font-sans font-bold text-white">{r.team}</td>
                            <td>{r.played}</td><td className="text-emerald-400">{r.won}</td><td>{r.drawn}</td><td className="text-red-400">{r.lost}</td>
                            <td className="text-[#D4AF37] font-bold">{r.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                  <h3 className="text-[#D4AF37] font-mono font-black text-xs uppercase tracking-wider mb-3">Inter-CA Group B Points Log (4 Parks)</h3>
                  <div className="overflow-x-auto w-full border border-white/5 rounded-lg">
                    <table className="w-full text-center text-[10px] font-mono">
                      <thead className="bg-neutral-950 text-neutral-400 border-b border-white/5">
                        <tr>
                          <th className="py-2 text-left px-2">Pos</th>
                          <th className="py-2 text-left">Park Unit</th>
                          <th>P</th><th>W</th><th>D</th><th>L</th>
                          <th className="text-[#D4AF37]">PTS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {caGroupBStandings.map(r => (
                          <tr key={r.team} className="hover:bg-white/5">
                            <td className="py-2 px-2 text-left font-bold text-neutral-500">{r.rank}</td>
                            <td className="py-2 text-left font-sans font-bold text-white">{r.team}</td>
                            <td>{r.played}</td><td className="text-emerald-400">{r.won}</td><td>{r.drawn}</td><td className="text-red-400">{r.lost}</td>
                            <td className="text-[#D4AF37] font-bold">{r.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interforce' && (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[10px] font-mono text-emerald-400 leading-relaxed">⚔️ Tournament Format Execution Guide: All 4 Armed Services forces (UPDF, Police, Prisons, UWA) mapped inside a single cohesive Round Robin pipeline grid. Played from 8th to 20th September every year.</div>
                <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                  <h3 className="text-[#D4AF37] font-mono font-black text-xs uppercase tracking-wider mb-3">Inter-Forces Championship Standing Table</h3>
                  <div className="overflow-x-auto w-full border border-white/5 rounded-lg">
                    <table className="w-full text-center text-[10px] font-mono">
                      <thead className="bg-neutral-950 text-neutral-400 border-b border-white/5">
                        <tr>
                          <th className="py-2 text-left px-2">Pos</th>
                          <th className="py-2 text-left">Armed Force</th>
                          <th>P</th><th>W</th><th>D</th><th>L</th>
                          <th className="text-[#D4AF37]">PTS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {interforceTable.map(r => { 
                          const isUWA = r.team.includes("Authority"); 
                          return (
                            <tr key={r.team} className="hover:bg-white/5" style={{ background: isUWA ? 'linear-gradient(to right, rgba(11, 70, 34, 0.4), transparent)' : 'transparent' }}>
                              <td className="py-2 px-2 text-left font-bold text-neutral-500">{r.rank}</td>
                              <td className="py-2 text-left font-sans font-bold text-white">{r.team}</td>
                              <td>{r.played}</td><td className="text-emerald-400">{r.won}</td><td>{r.drawn}</td><td className="text-red-400">{r.lost}</td>
                              <td className="py-2 font-mono font-black text-[#D4AF37] bg-[#0b4622]/10">{r.points}</td>
                            </tr>
                          ); 
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activePanel === 'calendar' && <div className="px-1"><FixturesDashboard /></div>}
        {activePanel === 'standings' && <div className="px-1"><TablePosition /></div>}
      </div>
    </div>
  );
}
