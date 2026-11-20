import React from 'react';
import type { EDILineItem } from '../../types/edi';

interface LineItemsCardProps {
  items: EDILineItem[];
}

export const LineItemsCard: React.FC<LineItemsCardProps> = ({ items }) => {
  return (
    <s-section heading={`Line items (${items.length})`}>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-semibold text-[13px] text-[#1a1a1a] leading-snug">
                {item.quantity}x {item.title}
              </span>
              <span className="font-bold text-[13px] text-[#1a1a1a] shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <div className="text-[12px] text-[#6d7175] font-mono">
              SK {item.sku}
            </div>

            <div className="text-[12px] text-[#6d7175]">
              {item.vendorCode} · UP {item.upc} · retail ${item.retailPrice.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </s-section>
  );
};
