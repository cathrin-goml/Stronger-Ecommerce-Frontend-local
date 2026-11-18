import React from 'react';

export const MockShopifyFrame: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center text-xs select-none min-w-0">
      <span className="font-bold mr-2 text-white text-[12px] sm:text-[13px] flex-shrink-0">
        Shopify admin
      </span>
      <span className="text-gray-400 font-normal truncate text-[11px] sm:text-xs">
        mock frame · App Bridge renders this in the real embedded app
      </span>
    </div>
  );
};
