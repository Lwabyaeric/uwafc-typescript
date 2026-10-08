import React, { createContext, useState, useEffect, ReactNode } from 'react'; 
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { menus as menus_data } from '../data/menus';
import { achievements as achievements_data } from '../data/achievements';
import { squad as squad_data } from '../data/squad';
import { news as news_data } from '../data/news';
import { footer as footer_data } from '../data/footer';

const firebaseConfig = { 
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho", 
  authDomain: "://firebaseapp.com", 
  projectId: "uwa-fc", 
  storageBucket: "uwa-fc.firebasestorage.app", 
  messagingSenderId: "387684494889", 
  appId: "1:387684494889:web:373435029bd43bfbbe3638"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);

export interface StandingPosition {
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
  active?: boolean;
}

export interface AppContextInterface {
  menus: any[];
  toggleShowMenu: boolean;
  setToggleShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  positions: StandingPosition[];
  achievements: any[];
  squad: any[];
  news: any[];
  footer: any[];
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  updateCartQty: (targetId: string | number, delta: number) => void;
  addToCart: (product: any, selectedSizes?: any) => void;
  liveFixtures: any[];
}

export const Context = createContext<AppContextInterface | undefined>(undefined);
export function ContextProvider({ children }: { children: ReactNode }) {
  const [menus, setMenus] = useState<any[]>([]);
  const [toggleShowMenu, setToggleShowMenu] = useState<boolean>(false);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [squad, setSquad] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [footer, setFooter] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [positions, setPositions] = useState<StandingPosition[]>([]);
  const [liveFixtures, setLiveFixtures] = useState<any[]>([]);

  useEffect(() => {
    setMenus(menus_data || []);
    setAchievements(achievements_data || []);
    setSquad(squad_data || []);
    setNews(news_data || []);
    setFooter(footer_data || []);

    const positionsQuery = query(collection(db, "standings"), orderBy("pts", "desc"));
    const unsubscribeStandings = onSnapshot(positionsQuery, (snapshot) => {
      const updatedPositions = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        pos: index + 1,
        ...doc.data()
      })) as unknown as StandingPosition[];
      setPositions(updatedPositions.length > 0 ? updatedPositions : [
        { id: 1, pos: 1, club: "Masaka City SC", jj: 22, jg: 14, je: 5, jp: 3, gf: 45, gc: 15, dif: "+30", pts: 47 },
        { id: 2, pos: 2, club: "Buwambo United FC", jj: 22, jg: 13, je: 6, jp: 3, gf: 38, gc: 19, dif: "+19", pts: 45 },
        { id: 3, pos: 3, club: "UWA FC", jj: 22, jg: 12, je: 6, jp: 4, gf: 50, gc: 17, dif: "+33", pts: 42, active: true }
      ]);
    });

    const fixturesQuery = query(collection(db, "fixtures"), orderBy("date", "asc"));
    const unsubscribeFixtures = onSnapshot(fixturesQuery, (snapshot) => {
      const fixturesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLiveFixtures(fixturesList);
    });

    return () => {
      unsubscribeStandings();
      unsubscribeFixtures();
    };
  }, []);

  const updateCartQty = (targetId: string | number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === targetId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is any => item !== null)
    );
  };

  const addToCart = (product: any, selectedSizes: Record<string, string> = {}) => {
    const activeSize = selectedSizes[product.id] || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard");
    const compiledItemKey = `${product.id}-${activeSize}`;
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === compiledItemKey);
      if (existingItem) {
        return prevCart.map(item => item.id === compiledItemKey ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { id: compiledItemKey, name: product.name, price: product.price, quantity: 1, selectedSize: activeSize, chosenSize: activeSize, img: product.img }];
    });
  };

  return (
    <Context.Provider value={{
      menus, toggleShowMenu, setToggleShowMenu, positions, achievements,
      squad, news, footer, cart, setCart, updateCartQty, addToCart, liveFixtures
    }}>
      {children}
    </Context.Provider>
  );
}
