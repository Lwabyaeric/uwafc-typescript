import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import FansLeadershipPage from '@/components/fans/FansLeadershipPage';

export const Route = createFileRoute('/fans/$subSection')({
  component: () => <FansLeadershipPage />,
});
