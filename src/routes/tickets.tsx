import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import TicketsPage from '@/components/tickets/TicketsPage';

export const Route = createFileRoute('/tickets')({
  component: TicketsRouteComponent,
});

function TicketsRouteComponent() {
  return <TicketsPage currentUserProfile={null} />;
}
