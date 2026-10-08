import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import HonoursPage from '../components/honours/HonoursPage';

export const Route = createFileRoute('/honours')({
  component: HonoursRouteComponent,
});

function HonoursRouteComponent() {
  return <HonoursPage />;
}
