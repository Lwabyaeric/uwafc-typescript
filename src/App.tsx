import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContextProvider } from './context/Context';
import './App.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import HomeView from "./components/home/HomeView";
import AboutUsPage from "./components/about/AboutUsPage";
import FacilitiesPage from "./components/about/FacilitiesPage"; 
import HonoursPage from "./components/honours/HonoursPage";
import ScheduleDashboard from "./components/schedulle/ScheduleDashboard";
import VideoHub from "./components/videos/VideoHub";
import VideoDetail from "./components/videos/VideoDetail";
import TicketsPage from "./components/tickets/TicketsPage";
import HospitalityPage from "./components/hospitality/HospitalityPage";
import AcademyPage from "./components/academy/AcademyPage";
import FansLeadershipPage from "./components/fans/FansLeadershipPage";
import SquadPage from "./components/squad/SquadPage";
import NewsHubPage from "./components/news/NewsHubPage";
import ShopPage from "./components/shop/ShopPage";
import MembershipPage from "./components/membership/MembershipPage";
import FoundationPage from "./components/foundation/FoundationPage";
import SponsorsPage from "./components/sponsors/SponsorsPage";
import ContactUsPage from "./components/contact/ContactUsPage";
import UserAccountPage from "./components/account/UserAccountPage";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
  selectedSize: string;
  chosenSize?: string;
  rawId?: string;
  originalPrice?: number;
}

export interface UserProfileState {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
const firebaseConfig = {
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho",
  authDomain: "://firebaseapp.com",
  projectId: "uwa-fc",
  storageBucket: "uwa-fc.firebasestorage.app",
  messagingSenderId: "387684494889",
  appId: "1:387684494889:web:373435029bd43bfbbe3638",
  measurementId: "G-DF4GNF6N28"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<string>('browse');
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfileState | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);

  useEffect(() => {
    const savedCartMemory = localStorage.getItem('simbas_cart');
    if (savedCartMemory) {
      try {
        setCart(JSON.parse(savedCartMemory));
      } catch (err) {
        console.error("Local storage cart resolution error: ", err);
      }
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setCurrentUserProfile({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Simbas Fan Supporter",
          photoURL: user.photoURL
        });
      } else {
        setCurrentUserProfile(null);
      }
    });

    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      unsubscribeAuth();
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const triggerPWAInstallation = async (): Promise<void> => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Accepted the UWA FC app installation.');
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleGlobalCartChange = (freshCartArray: CartItem[]): void => {
    setCart(freshCartArray);
    localStorage.setItem('simbas_cart', JSON.stringify(freshCartArray));
  };

  const globalCartTallyCount: number = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const ShopComponentOverride = ShopPage as any;
  return (
    <ContextProvider>
      <Router>
        <div 
          className="min-h-screen flex flex-col justify-between overflow-x-hidden font-sans box-border"
          style={{ backgroundColor: '#031109' }}
        >
          <Header 
            currentUserProfile={currentUserProfile}
            setCheckoutStep={setCheckoutStep as any}
            showInstallButton={isInstallable} 
            onInstallClick={triggerPWAInstallation}
          />
          <main className="w-full flex-grow pt-16 md:pt-20 box-border">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomeView 
                    cart={cart as any} 
                    onCartChange={handleGlobalCartChange as any} 
                    currentUserProfile={currentUserProfile}
                    setCheckoutStep={setCheckoutStep as any}
                  />
                } 
              />
              
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/about/:subSection" element={<AboutUsPage />} />
              
              <Route path="/facilities" element={<FacilitiesPage />} />

              <Route path="/honours" element={<HonoursPage />} />
              
              <Route path="/fixtures" element={<ScheduleDashboard />} />
              
              <Route path="/videos" element={<VideoHub />} />
              <Route path="/videos/watch/:videoId" element={<VideoDetail />} />
              
              <Route path="/tickets" element={<TicketsPage {...{ currentUserProfile } as any} />} />
              <Route path="/tickets/:subSection" element={<TicketsPage {...{ currentUserProfile } as any} />} />
              
              <Route path="/hospitality" element={<HospitalityPage {...{ currentUserProfile } as any} />} />
              <Route path="/hospitality/:subSection" element={<HospitalityPage {...{ currentUserProfile } as any} />} />
              
              <Route path="/academy" element={<AcademyPage />} />
              <Route path="/academy/:subSection" element={<AcademyPage />} />
              
              <Route path="/fans" element={<FansLeadershipPage />} />
              <Route path="/fans/:subSection" element={<FansLeadershipPage />} />
              
              <Route path="/squad" element={<SquadPage />} />
              
              <Route path="/news" element={<NewsHubPage />} />
              <Route path="/news/category/:category" element={<NewsHubPage />} />
              
              <Route 
                path="/shop" 
                element={
                  <ShopComponentOverride 
                    cart={cart as any} 
                    onCartChange={handleGlobalCartChange as any} 
                    currentUserProfile={currentUserProfile} 
                  />
                } 
              />
              <Route 
                path="/shop/:subSection" 
                element={
                  <ShopComponentOverride 
                    cart={cart as any} 
                    onCartChange={handleGlobalCartChange as any} 
                    currentUserProfile={currentUserProfile} 
                  />
                } 
              />
              
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/membership/:subSection" element={<MembershipPage />} />

              <Route path="/foundation" element={<FoundationPage {...{ currentUserProfile } as any} />} />
              <Route path="/foundation/:subSection" element={<FoundationPage {...{ currentUserProfile } as any} />} />
              
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              
              <Route 
                path="/account" 
                element={<UserAccountPage currentUserProfile={currentUserProfile} />} 
              />
              <Route 
                path="/account/:subSection" 
                element={<UserAccountPage currentUserProfile={currentUserProfile} />} 
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ContextProvider>
  );
}
