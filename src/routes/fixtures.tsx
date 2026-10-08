import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ScheduleDashboard from '@/components/schedulle/ScheduleDashboard';

export const Route = createFileRoute('/fixtures')({
  component: FixturesRouteComponent,
});

function FixturesRouteComponent() {
  return <ScheduleDashboard />;
}
