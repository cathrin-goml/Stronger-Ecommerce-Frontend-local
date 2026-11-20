import React from 'react';

export const ShopifyAdminBar: React.FC = () => {
  return (
    <header className="bg-[#1a1a1a] text-white px-6 py-2.5 flex items-center text-xs tracking-tight">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white">Shopify admin</span>
        <span className="text-[#8c8c8c]">
          mock frame · App Bridge renders this in the real embedded app
        </span>
      </div>
    </header>
  );
};
