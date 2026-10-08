import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ContactUsPage from '@/components/contact/ContactUsPage';

export const Route = createFileRoute('/contact')({
  component: () => <ContactUsPage />,
});
