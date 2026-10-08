import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import HospitalityPage from '@/components/hospitality/HospitalityPage';

export const Route = createFileRoute('/hospitality')({
  component: HospitalityRouteComponent,
});

function HospitalityRouteComponent() {
  return <HospitalityPage currentUserProfile={null} />;
}
