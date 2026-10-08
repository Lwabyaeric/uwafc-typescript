import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import SquadPage from '@/components/squad/SquadPage';

export const Route = createFileRoute('/Squad')({
  component: DirectSquadRootRouteComponent,
});

function DirectSquadRootRouteComponent() {
  return <SquadPage />;
}
