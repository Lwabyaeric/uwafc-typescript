// src/routes/index.tsx
import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import HomeView from '@/components/home/HomeView';


export const Route = createFileRoute('/')({
  component: AppHomepageRootRouteComponent,
});

function AppHomepageRootRouteComponent() {
  return (
    <HomeView 
      onCartChange={() => {}} 
      currentUserProfile={null} 
    />
  );
}
