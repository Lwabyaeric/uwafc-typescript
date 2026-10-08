import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import FoundationPage from '@/components/foundation/FoundationPage';

export const Route = createFileRoute('/foundation/$subSection')({
  component: () => <FoundationPage currentUserProfile={null} />,
});
