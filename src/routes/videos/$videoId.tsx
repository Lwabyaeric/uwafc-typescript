// src/routes/videos/$videoId.tsx
import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import VideoDetail from '@/components/videos/VideoDetail'; 

export const Route = createFileRoute('/videos/$videoId')({
  component: VideoDetailRouteComponent,
});

function VideoDetailRouteComponent() {
  return <VideoDetail />;
}
