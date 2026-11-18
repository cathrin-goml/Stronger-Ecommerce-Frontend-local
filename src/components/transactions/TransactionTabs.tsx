import React from 'react';
import { Tabs } from '@shopify/polaris';
import type { FilterTabId } from '../../types/edi';

interface TransactionTabsProps {
  activeTab: FilterTabId;
  onTabChange: (tab: FilterTabId) => void;
  counts: {
    all: number;
    awaiting: number;
    sent: number;
    attention: number;
  };
}

export const TransactionTabs: React.FC<TransactionTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    {
      id: 'all',
      content: `All orders ${counts.all}`,
    },
    {
      id: 'awaiting',
      content: `Awaiting shipment ${counts.awaiting}`,
    },
    {
      id: 'sent',
      content: `856 / 810 sent ${counts.sent}`,
    },
    {
      id: 'attention',
      content: `Needs attention ${counts.attention}`,
    },
    {
      id: 'inventory',
      content: 'Inventory (846)',
    },
  ];

  const selectedIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleSelect = (index: number) => {
    onTabChange(tabs[index].id as FilterTabId);
  };

  return (
    <div className="border-b border-gray-200 overflow-x-auto w-full min-w-0">
      <Tabs tabs={tabs} selected={selectedIndex >= 0 ? selectedIndex : 0} onSelect={handleSelect} />
    </div>
  );
};
