import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import AboutUsPage from '../../components/about/AboutUsPage';

export const Route = createFileRoute('/about/$subSection')({
  component: () => <AboutUsPage />,
});
