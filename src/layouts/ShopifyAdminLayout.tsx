import React from 'react';
import { MockShopifyFrame } from '../components/admin/MockShopifyFrame';

interface ShopifyAdminLayoutProps {
  children: React.ReactNode;
}

export const ShopifyAdminLayout: React.FC<ShopifyAdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f1f2f4] flex flex-col font-sans antialiased text-[#202223] overflow-x-hidden w-full">
      {/* Top Shopify Admin mock header */}
      <MockShopifyFrame />

      {/* Main page container with fluid responsive padding and boundaries */}
      <main className="flex-1 pb-16 w-full max-w-[1536px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-4 min-w-0">
        {children}
      </main>
    </div>
  );
};
