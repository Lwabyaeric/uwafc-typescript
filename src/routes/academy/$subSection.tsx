import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import AcademyPage from '@/components/academy/AcademyPage'; 
export const Route = createFileRoute('/academy/$subSection')({
  component: () => <AcademyPage />,
});
