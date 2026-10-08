import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import UserAccountPage from '@/components/account/UserAccountPage';

export const Route = createFileRoute('/account/$subSection')({
  component: AccountRouteComponent,
});

function AccountRouteComponent() {
  return <UserAccountPage currentUserProfile={null} />;
}
