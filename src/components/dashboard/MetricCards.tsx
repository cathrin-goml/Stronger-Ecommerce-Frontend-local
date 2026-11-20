import React from 'react';
import type { EDISummaryMetrics, MetricCardItem } from '../../types/edi';

interface MetricCardsProps {
  metrics: EDISummaryMetrics;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  const cardList: MetricCardItem[] = [
    metrics.poReceived,
    metrics.ackSent,
    metrics.shipInvoicesSent,
    metrics.inventoryLastRun,
    metrics.needsAttention,
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cardList.map((card, index) => (
        <s-section key={index}>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-gray-500">
              {card.label}
            </span>
            <span
              className={`text-[26px] font-bold tracking-tight mt-1 ${
                card.isCritical ? 'text-[#d82c0d]' : 'text-gray-900'
              }`}
            >
              {card.value}
            </span>
            <span className="text-[12px] text-gray-500 mt-1">
              {card.subtitle}
            </span>
          </div>
        </s-section>
      ))}
    </div>
  );
};
