import React, { useState, useEffect } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContextProvider } from '@/context/Context';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootLayoutComponent,
});

function RootLayoutComponent() {
  const [chromeInstallPrompt, setChromeInstallPrompt] = useState<any>(null);
  const [isInstallAvailable, setIsInstallButtonVisible] = useState<boolean>(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstallButtonVisible(false);
      return;
    }

    const catchChromePrompt = (event: Event) => {
      event.preventDefault();
      setChromeInstallPrompt(event);
      setIsInstallButtonVisible(true);
    };

    const handleSuccessfulInstallation = () => {
      setChromeInstallPrompt(null);
      setIsInstallButtonVisible(false);
    };

    window.addEventListener('beforeinstallprompt', catchChromePrompt);
    window.addEventListener('appinstalled', handleSuccessfulInstallation);

    return () => {
      window.removeEventListener('beforeinstallprompt', catchChromePrompt);
      window.removeEventListener('appinstalled', handleSuccessfulInstallation);
    };
  }, []);

  const handleCustomHeaderInstallAction = async () => {
    if (!chromeInstallPrompt) return;

    chromeInstallPrompt.prompt();

    const userChoiceOutcome = await chromeInstallPrompt.userChoice;
    if (userChoiceOutcome.outcome === 'accepted') {
      setIsInstallButtonVisible(false);
    }
    setChromeInstallPrompt(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider> 
        <div className="min-h-screen flex flex-col justify-between bg-[#020B05] select-none">
          <Header 
            currentUserProfile={null} 
            showInstallButton={isInstallAvailable}
            onInstallClick={handleCustomHeaderInstallAction}
          />
          
          <div className="flex-grow pt-16 md:pt-20">
            <Outlet />
          </div>
          
          <Footer />
        </div>
      </ContextProvider>
    </QueryClientProvider>
  );
}
