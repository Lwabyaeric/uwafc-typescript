import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import NewsHubPage from '@/components/news/NewsHubPage';

export const Route = createFileRoute('/news')({
  component: NewsRouteComponent,
});

function NewsRouteComponent() {
  return <NewsHubPage />;
}
