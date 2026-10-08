import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ShopPage from '@/components/shop/ShopPage';

export const Route = createFileRoute('/shop/$subSection')({
  component: ShopRouteComponent,
});
function ShopRouteComponent() {
  
  const ShopPageOverride = ShopPage as any;

  return (
    <ShopPageOverride 
      cart={[]} 
      onCartChange={() => {}} 
      currentUserProfile={null} 
    />
  );
}
