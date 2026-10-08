interface ClubInfo {
  name: string;
  shortName: string;
  established: string;
  primaryColor: string;
  secondaryColor: string;
  stadium: string;
  governingAgency: string;
  complianceLevel: string;
}

interface MatchContext {
  fixture: string;
  competition: string;
  status: string;
  formation: string;
}

interface TeamConfig {
  clubInfo: ClubInfo;
  matchContext: MatchContext;
}

interface StaffContract {
  start: string;
  until: string;
}

interface StaffMetrics {
  [key: string]: string | number;
}

interface SquadMember {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  position: string;
  role: string;
  subCategory: string;
  code: string;
  img: string;
  img_url: string;
  dateOfBirth: string;
  nationality: string;
  shirtNumber: number | null;
  isCaptain: string | boolean;
  contract: StaffContract;
  metrics: StaffMetrics;
}

export const teamConfig: TeamConfig = {
  clubInfo: {
    name: "Uganda Wildlife Authority Football Club",
    shortName: "UWA FC",
    established: "1996",
    primaryColor: "#004B23", 
    secondaryColor: "#DAA520", 
    stadium: "Namulonge Stadium, Gayaza Town", 
    governingAgency: "Uganda Wildlife Authority",
    complianceLevel: "National GoU Digital Systems Standard"
  },
  matchContext: {
    fixture: "UWA FC vs Buwambo UTD",
    competition: "Buganda Regional League",
    status: "Staging / Live Grid Simulation",
    formation: "4-3-3"
  }
};
export const squad: SquadMember[] = [
    {
        "id": 9001,
        "firstName": "ANDREW",
        "lastName": "MUGAGGA",
        "name": "Mugagga Andrew",
        "position": "Technical Staff",
        "role": "Head Coach",
        "subCategory": "technical",
        "code": "HC",
        "img": "staff-head-coach.jpg",
        "img_url":"../../assets/squad/head-coach.jpg",
        "dateOfBirth": "1985-01-01",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Head Coach",
        "contract": { "start": "2024-01", "until": "2026-12" },
        "metrics": { "Experience": "12 Years", "License": "FUFA Pro", "Formation": "4-3-3", "Tactics": "High Press" }
    },
    {
        "id": 9002,
        "firstName": "PATRICK",
        "lastName": "OKAE",
        "name": "Okae Patrick",
        "position": "Technical Staff",
        "role": "Assistant Coach",
        "subCategory": "technical",
        "code": "AC",
        "img": "staff-asst-coach.jpg",
        "img_url":"../../assets/squad/asst-coach.jpg",
        "dateOfBirth": "1988-04-12",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Assistant Coach",
        "contract": { "start": "2024-01", "until": "2026-12" },
        "metrics": { "Experience": "6 Years", "License": "CAF A", "Focus": "Set Pieces", "Drills": "Tactical" }
    },
    {
        "id": 9003,
        "firstName": "JOHN",
        "lastName": "SSEWANKAMBO",
        "name": "Ssewankambo John",
        "position": "Technical Staff",
        "role": "Goalkeeper Coach",
        "subCategory": "technical",
        "code": "GK",
        "img": "staff-gk-coach.jpg",
        "img_url": "../../assets/squad/gk-coach.jpg",
        "dateOfBirth": "1983-09-14",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "GK Coach",
        "contract": { "start": "2024-01", "until": "2026-12" },
        "metrics": { "Experience": "8 Years", "License": "FUFA GK-I", "Focus": "Reflexes", "Handling": "Elite" }
    },
    {
        "id": 9004,
        "firstName": "FRED",
        "lastName": "NSUBUGA",
        "name": "Nsubuga Fred",
        "position": "Technical Staff",
        "role": "Team Manager",
        "subCategory": "technical",
        "code": "TM",
        "img": "staff-manager.jpg",
        "img_url":"../../assets/squad/team-manager.jpg",
        "dateOfBirth": "1980-11-22",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Team Manager",
        "contract": { "start": "2023-06", "until": "2026-12" },
        "metrics": { "Operations": "Logistics Core", "Audits": "100% Passed", "Travels": "Managed", "Compliance": "Standard" }
    },
    {
        "id": 9005,
        "firstName": "IVAN",
        "lastName": "KATO",
        "name": "Kato Ivan",
        "position": "Technical Staff",
        "role": "Video Analyst",
        "subCategory": "technical",
        "code": "VA",
        "img": "staff-video-analyst.jpg",
        "img_url": "../../assets/squad/video-analyst.jpg",
        "dateOfBirth": "1992-03-30",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Video Analyst",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "Software": "Hudl Pro", "Reports": "Weekly", "Analysis": "Symmetry", "Workload": "Matchdays" }
    },
    {
        "id": 9006,
        "firstName": "ROBERT",
        "lastName": "MUGISHA",
        "name": "Mugisha Robert",
        "position": "Technical Staff",
        "role": "Technical Director",
        "subCategory": "technical",
        "code": "TD",
        "img": "staff-tech-director.jpg",
        "img_url": "../../assets/squad/technical-director.jpg",
        "dateOfBirth": "1978-07-19",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Tech Director",
        "contract": { "start": "2022-01", "until": "2027-12" },
        "metrics": { "Experience": "15 Years", "Philosophy": "Eco-Sports", "BoardSeat": "Active Member", "Scouting": "Oversight" }
    },
    {
        "id": 9007,
        "firstName": "DAVID",
        "lastName": "WASSWA",
        "name": "Wasswa David",
        "position": "Technical Staff",
        "role": "Kit Manager",
        "subCategory": "technical",
        "code": "KM",
        "img": "staff-kit-manager.jpg",
        "img_url": "../../assets/squad/kit-manager.jpg",
        "dateOfBirth": "1989-12-05",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Kit Manager",
        "contract": { "start": "2023-01", "until": "2026-12" },
        "metrics": { "Storage": "Namulonge base", "Inventory": "Full Kit Security", "GearSetup": "Matchdays", "Status": "Optimal" }
    },
    {
        "id": 9101,
        "firstName": "DR. CLAIRE",
        "lastName": "NABASA",
        "name": "Dr. Nabasa Claire",
        "position": "Medical Staff",
        "role": "Team Doctor",
        "subCategory": "medical",
        "code": "MD",
        "img": "staff-doctor.jpg",
        "img_url":"../../assets/squad/team-doctor.jpg",
        "dateOfBirth": "1987-05-24",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Chief Doctor",
        "contract": { "start": "2023-01", "until": "2027-12" },
        "metrics": { "Degree": "Sports MD", "Diagnostics": "Mandatory", "Authority": "Final Medical Clear" }
    },
    {
        "id": 9102,
        "firstName": "MOSES",
        "lastName": "LWANGA",
        "name": "Lwanga Moses",
        "position": "Medical Staff",
        "role": "Nutritionist",
        "subCategory": "medical",
        "code": "NT",
        "img": "staff-nutritionist.jpg",
        "img_url": "../../assets/squad/nutritionist.jpg",
        "dateOfBirth": "1991-02-14",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Nutritionist",
        "contract": { "start": "2024-01", "until": "2026-12" },
        "metrics": { "Planning": "Caloric Mapping", "Hydration": "Electrolytes", "FatMetrics": "Skinfold Tested" }
    },
    {
        "id": 9103,
        "firstName": "JOAN",
        "lastName": "NAMUBIRU",
        "name": "Namubiru Joan",
        "position": "Medical Staff",
        "role": "Sports Psychologist",
        "subCategory": "medical",
        "code": "SP",
        "img": "staff-psychologist.jpg",
        "img_url": "../../assets/squad/pyschologist.jpg",
        "dateOfBirth": "1986-10-11",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Psychologist",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "Focus": "Match Pressure", "Sessions": "Bi-Weekly", "Approach": "Cognitive Load" }
    },
    {
        "id": 9104,
        "firstName": "EMMANUEL",
        "lastName": "ONYANGO",
        "name": "Onyango Emmanuel",
        "position": "Medical Staff",
        "role": "Fitness Coach",
        "subCategory": "medical",
        "code": "FC",
        "img": "staff-fitness-coach.jpg",
        "img_url":  "../../assets/squad/fitness-coach.jpg",
        "dateOfBirth": "1990-08-04",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Fitness Coach",
        "contract": { "start": "2024-01", "until": "2026-12" },
        "metrics": { "Tracking": "GPS Catapult Pro", "Testing": "VO2 Max Tests", "Conditioning": "High-Intensity" }
    },
    {
        "id": 9105,
        "firstName": "RONALD",
        "lastName": "KISEKKA",
        "name": "Kisekka Ronald",
        "position": "Medical Staff",
        "role": "Massage Therapist",
        "subCategory": "medical",
        "code": "MT",
        "img": "staff-therapist.jpg",
        "img_url": "../../assets/squad/massage-therapist.jpg",
        "dateOfBirth": "1993-01-25",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Masseuse",
        "contract": { "start": "2023-07", "until": "2026-12" },
        "metrics": { "Therapy": "Deep Tissue", "Cycles": "Post-Game 24h", "Capacity": "Full Squad" }
    },
    {
        "id": 9106,
        "firstName": "DENIS",
        "lastName": "OKELLO",
        "name": "Okello Denis",
        "position": "Medical Staff",
        "role": "Strength & Conditioning",
        "subCategory": "medical",
        "code": "SC",
        "img": "staff-strength-coach.jpg",
        "img_url": "../../assets/squad/strength-coach.jpg",
        "dateOfBirth": "1988-11-09",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "S&C Specialist",
        "contract": { "start": "2024-01", "until": "2027-06" },
        "metrics": { "Focus": "Power Isolation", "Prevention": "Eccentric Loads", "GymAudits": "Weekly" }
    },
    {
        "id": 9201,
        "firstName": "CHARLES",
        "lastName": "SSEKASANVU",
        "name": "Ssekasanvu Charles",
        "position": "Scouting Staff",
        "role": "Scouting Team Head",
        "subCategory": "scouting",
        "code": "SH",
        "img": "staff-scout-head.jpg",
        "img_url": "../../assets/squad/charles.jpg",
        "dateOfBirth": "1984-06-18",
        "nationality": "Uganda",
        "shirtNumber": null,
        "isCaptain": "Chief Scout",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "Regions": "Buganda Network", "Database": "Custom Engine", "TargetPool": "Grassroots Youth" }
    },
    {
        "id": 7821,
        "firstName": "NSAMBA",
        "lastName": "NSAMBA",
        "name": "NSAMBA",
        "position": "Goalkeeper",
        "subCategory": "field",
        "role": "Player",
        "code": "GK",
        "img": "player-nsamba.jpg",
        "img_url": "../../assets/squad/nsamba.jpg",
        "dateOfBirth": "1998-05-12",
        "nationality": "Uganda",
        "shirtNumber": 22,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 28, "reflexes": "90/100", "handling": "84/100", "diving": "87/100", "cleanSheets": 12 }
    },
    {
        "id": 7879,
        "firstName": "OGWANG",
        "lastName": "OGWANG",
        "name": "OGWANG",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-ogwang.jpg",
        "img_url": "../../assets/squad/ogwang.png",
        "dateOfBirth": "1997-04-15",
        "nationality": "Uganda",
        "shirtNumber": 13,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 29, "pace": "78/100", "defending": "85/100", "physicality": "84/100", "tackling": "86%" }
    },
    {
        "id": 32014,
        "firstName": "KAJUBI",
        "lastName": "KAJUBI",
        "name": "KAJUBI",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-kajubi.jpg",
        "img_url": "../../assets/squad/kajubi.png",
        "dateOfBirth": "2000-01-10",
        "nationality": "Uganda",
        "shirtNumber": 19,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 26, "pace": "81/100", "defending": "82/100", "passing": "78/100", "interceptions": "80%" }
    },
    {
        "id": 33035,
        "firstName": "SSEWANYANA",
        "lastName": "SSEWANYANA",
        "name": "SSEWANYANA",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-ssewanyana.jpg",
        "img_url":  "../../assets/squad/ssewanyana.png",
        "dateOfBirth": "1996-08-24",
        "nationality": "Uganda",
        "shirtNumber": 17,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 30, "pace": "74/100", "defending": "88/100", "physicality": "90/100", "aerialDuels": "85%" }
    },
    {
        "id": 16,
        "firstName": "SSEMWOGERERE",
        "lastName": "SSEMWOGERERE",
        "name": "SSEMWOGERERE",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-ssemwogerere.jpg",
        "img_url": "../../assets/squad/ssemwogerere.png",
        "dateOfBirth": "1995-03-03",
        "nationality": "Uganda",
        "shirtNumber": 4,
        "isCaptain": "Main Captain",
        "contract": { "start": "2023-07", "until": "2027-06" },
        "metrics": { "age": 31, "pace": "76/100", "defending": "91/100", "physicality": "89/100", "leadership": "95/100" }
    },
    {
        "id": 33139,
        "firstName": "ASIKU",
        "lastName": "ASIKU",
        "name": "ASIKU",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-asiku.jpg",
        "img_url":"../../assets/squad/asiku.png",
        "dateOfBirth": "2001-02-14",
        "nationality": "Uganda",
        "shirtNumber": 13,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 25, "pace": "81/100", "defending": "83/100", "tackling": "85/100", "stamina": "82%" }
    },
    {
        "id": 58580,
        "firstName": "SSEMPIIRA",
        "lastName": "SSEMPIIRA",
        "name": "SSEMPIIRA",
        "position": "Defender",
        "subCategory": "field",
        "role": "Player",
        "code": "DF",
        "img": "player-ssempiira.jpg",
        "img_url": "../../assets/squad/ssempira.png",
        "dateOfBirth": "1998-07-22",
        "nationality": "Uganda",
        "shirtNumber": 14,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 27, "pace": "75/100", "defending": "85/100", "physicality": "87/100", "strength": "88%" }
    },
    {
        "id": 1772,
        "firstName": "PARIYO",
        "lastName": "PARIYO",
        "name": "PARIYO",
        "position": "Midfielder",
        "subCategory": "field",
        "role": "Player",
        "code": "MF",
        "img": "player-pariyo.jpg",
        "img_url": "../../assets/squad/pariyo.png",
        "dateOfBirth": "1999-06-30",
        "nationality": "Uganda",
        "shirtNumber": 25,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 27, "pace": "82/100", "passing": "85/100", "dribbling": "80/100", "stamina": "88%" }
    },
    {
        "id": 3624,
        "firstName": "AKULEPI",
        "lastName": "AKULEPI",
        "name": "AKULEPI",
        "position": "Midfielder",
        "subCategory": "field",
        "role": "Player",
        "code": "MF",
        "img": "player-akulepi.jpg",
        "img_url": "../../assets/squad/akulepi.png",
        "dateOfBirth": "1997-12-05",
        "nationality": "Uganda",
        "shirtNumber": 16,
        "isCaptain": "Third Captain",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 28, "pace": "78/100", "passing": "83/100", "interceptions": "86/100", "tackling": "84%" }
    },
    {
        "id": 7783,
        "firstName": "SSEMUGU",
        "lastName": "SSEMUGU",
        "name": "SSEMUGU",
        "position": "Midfielder",
        "subCategory": "field",
        "role": "Player",
        "code": "MF",
        "img": "player-ssemugu.jpg",
        "img_url": "../../assets/squad/ssemugu.png",
        "dateOfBirth": "1996-04-18",
        "nationality": "Uganda",
        "shirtNumber": 15,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 30, "pace": "75/100", "passing": "88/100", "longBalls": "86/100", "crossing": "81%" }
    },
    {
        "id": 144708,
        "firstName": "OGEN",
        "lastName": "OGEN",
        "name": "OGEN",
        "position": "Midfielder",
        "subCategory": "field",
        "role": "Player",
        "code": "MF",
        "img": "player-ogen.jpg",
        "img_url": "../../assets/squad/ogen.png",
        "dateOfBirth": "2000-09-11",
        "nationality": "Uganda",
        "shirtNumber": 15,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 25, "pace": "83/100", "passing": "86/100", "dribbling": "84/100", "vision": "80%" }
    },
    {
        "id": 150595,
        "firstName": "LUTAYA",
        "lastName": "LUTAYA",
        "name": "LUTAYA",
        "position": "Midfielder",
        "subCategory": "field",
        "role": "Player",
        "code": "MF",
        "img": "player-lutaya.jpg",
        "img_url": "../../assets/squad/lutaya.png",
        "dateOfBirth": "2002-01-05",
        "nationality": "Uganda",
        "shirtNumber": 16,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 24, "pace": "85/100", "passing": "82/100", "stamina": "89/100", "acceleration": "86%" }
    },
    {
        "id": 32123,
        "firstName": "EJOKU",
        "lastName": "EJOKU",
        "name": "EJOKU",
        "position": "Forward",
        "subCategory": "field",
        "role": "Player",
        "code": "FW",
        "img": "player-ejoku.jpg",
        "img_url": "../../assets/squad/ejoku.png",
        "dateOfBirth": "1998-10-14",
        "nationality": "Uganda",
        "shirtNumber": 9,
        "isCaptain": "Second Captain",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 27, "pace": "91/100", "shooting": "88/100", "dribbling": "82/100", "totalGoals": 58 }
    },
    {
        "id": 32491,
        "firstName": "SSEBADUKA",
        "lastName": "SSEBADUKA",
        "name": "SSEBADUKA",
        "position": "Forward",
        "subCategory": "field",
        "role": "Player",
        "code": "FW",
        "img": "player-ssebaduka.jpg",
        "img_url": "../../assets/squad/ssebaduka.png",
        "dateOfBirth": "2000-01-19",
        "nationality": "Uganda",
        "shirtNumber": 14,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 26, "pace": "93/100", "shooting": "84/100", "acceleration": "95/100", "finishing": "85%" }
    },
    {
        "id": 33038,
        "firstName": "TIGAN",
        "lastName": "TIGAN",
        "name": "TIGAN",
        "position": "Forward",
        "subCategory": "field",
        "role": "Player",
        "code": "FW",
        "img": "player-tigan.jpg",
        "img_url":  "../../assets/squad/tigan.png",
        "dateOfBirth": "1991-01-15",
        "nationality": "Uganda",
        "shirtNumber": 23,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 35, "pace": "80/100", "shooting": "85/100", "positioning": "89/100", "shotPower": "87%" }
    },
    {
        "id": 33106,
        "firstName": "KASAGGA",
        "lastName": "KASAGGA",
        "name": "KASAGGA",
        "position": "Goalkeeper",
        "subCategory": "field",
        "role": "Player",
        "code": "GK",
        "img": "player-kasagga.jpg",
        "img_url": "../../assets/squad/kasaga2.jpg",
        "dateOfBirth": "1999-11-20",
        "nationality": "Uganda",
        "shirtNumber": 12,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 27, "reflexes": "84/100", "handling": "81/100", "diving": "83/100", "distribution": "76%" }
    },
    {
        "id": 161288,
        "firstName": "MATOVU",
        "lastName": "MATOVU",
        "name": "MATOVU",
        "position": "Forward",
        "subCategory": "field",
        "role": "Player",
        "code": "FW",
        "img": "player-matovu.jpg",
        "img_url": "../../assets/squad/matovu.png",
        "dateOfBirth": "2001-05-18",
        "nationality": "Uganda",
        "shirtNumber": 17,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 25, "pace": "92/100", "shooting": "83/100", "finishing": "85/100", "shotPower": "82%" }
    },
    {
        "id": 18,
        "firstName": "WAFULA",
        "lastName": "WAFULA",
        "name": "WAFULA",
        "position": "Forward",
        "subCategory": "field",
        "role": "Player",
        "code": "FW",
        "img": "player-wafula.jpg",
        "img_url": "../../assets/squad/wafula.png",
        "dateOfBirth": "2000-12-12",
        "nationality": "Uganda",
        "shirtNumber": 18,
        "isCaptain": "No",
        "contract": { "start": "2024-07", "until": "2027-06" },
        "metrics": { "age": 25, "pace": "90/100", "shooting": "86/100", "positioning": "88/100", "composure": "84%" }
    }
];

const squadData: SquadMember[] = []; 
const players: SquadMember[] = [];   

export { squadData, players };
export default squadData;
