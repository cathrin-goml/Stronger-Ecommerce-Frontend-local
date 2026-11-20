import React from 'react';
import type { TransactionStatus } from '../../types/edi';

interface StatusBadgeProps {
  status: TransactionStatus;
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  // Exact color styling and dot indicators matching Shopify reference screenshots
  switch (status) {
    case '856_810_sent':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d8f3f6] px-2.5 py-0.5 text-[12px] font-semibold text-[#005c66] whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00808c] shrink-0" />
          {label}
        </span>
      );

    case 'awaiting_shipment':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1b8] px-2.5 py-0.5 text-[12px] font-semibold text-[#7a5e00] whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8c7300] shrink-0" />
          {label}
        </span>
      );

    case 'unacknowledged':
    case 'import_failed':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffe5e5] px-2.5 py-0.5 text-[12px] font-semibold text-[#8a0000] whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d82c0d] shrink-0" />
          {label}
        </span>
      );
  }
};
