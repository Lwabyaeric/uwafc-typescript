import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import VideoHub from '@/components/videos/VideoHub';

export const Route = createFileRoute('/videos/')({
  component: VideosIndexRouteComponent,
});

function VideosIndexRouteComponent() {
  return <VideoHub />;
}
