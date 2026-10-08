import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import MembershipPage from '@/components/membership/MembershipPage';

export const Route = createFileRoute('/membership')({
  component: () => <MembershipPage />,
});
