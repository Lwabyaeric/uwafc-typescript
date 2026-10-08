import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import SponsorsPage from '@/components/sponsors/SponsorsPage';

export const Route = createFileRoute('/about/sponsors')({
  component: AboutSponsorsSubRouteComponent,
});

function AboutSponsorsSubRouteComponent() {
  return <SponsorsPage />;
}
