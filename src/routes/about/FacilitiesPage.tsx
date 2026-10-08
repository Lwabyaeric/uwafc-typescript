import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import FacilitiesPage from '@/components/about/FacilitiesPage';

export const Route = createFileRoute('/about/FacilitiesPage')({
  component: () => <FacilitiesPage />,
});
