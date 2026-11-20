import React, { useState, useMemo } from 'react';
import type { EDITransaction, TabKey } from '../../types/edi';
import { StatusBadge } from './StatusBadge';
import { DocumentBadgeMatrix } from './DocumentBadgeMatrix';

interface TransactionsTableProps {
  transactions: EDITransaction[];
  onSelectPO?: (poNumber: string) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onSelectPO,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tab definitions with counts
  const tabCounts = useMemo(() => {
    return {
      all: transactions.length,
      awaiting_shipment: transactions.filter((t) => t.status === 'awaiting_shipment').length,
      '856_810_sent': transactions.filter((t) => t.status === '856_810_sent').length,
      needs_attention: transactions.filter(
        (t) => t.status === 'unacknowledged' || t.status === 'import_failed'
      ).length,
      inventory_846: null,
    };
  }, [transactions]);

  const tabs: { key: TabKey; label: string; count: number | null }[] = [
    { key: 'all', label: 'All orders', count: tabCounts.all },
    { key: 'awaiting_shipment', label: 'Awaiting shipment', count: tabCounts.awaiting_shipment },
    { key: '856_810_sent', label: '856 / 810 sent', count: tabCounts['856_810_sent'] },
    { key: 'needs_attention', label: 'Needs attention', count: tabCounts.needs_attention },
    { key: 'inventory_846', label: 'Inventory (846)', count: null },
  ];

  // Filtering transactions by tab and search query
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Tab filter
      if (activeTab === 'awaiting_shipment' && tx.status !== 'awaiting_shipment') {
        return false;
      }
      if (activeTab === '856_810_sent' && tx.status !== '856_810_sent') {
        return false;
      }
      if (
        activeTab === 'needs_attention' &&
        tx.status !== 'unacknowledged' &&
        tx.status !== 'import_failed'
      ) {
        return false;
      }
      if (activeTab === 'inventory_846') {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        tx.poNumber.toLowerCase().includes(q) ||
        tx.customerName.toLowerCase().includes(q) ||
        (tx.shopifyOrder && tx.shopifyOrder.toLowerCase().includes(q)) ||
        tx.statusLabel.toLowerCase().includes(q)
      );
    });
  }, [transactions, activeTab, searchQuery]);

  return (
    <s-section>
      {/* Exact underline tabs matching reference screenshot */}
      <div className="flex border-b border-gray-200 gap-6 overflow-x-auto px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2.5 text-[13px] transition-colors whitespace-nowrap cursor-pointer relative ${
                isActive
                  ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700 font-medium'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-1 text-gray-500">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Polaris Table Component */}
      <s-table>
        {/* Search Field Filter Slot */}
        <div slot="filters" className="py-2.5">
          <s-search-field
            placeholder="Search PO #, customer, Shopify order, SKU, tracking (last 4)"
            value={searchQuery}
            onInput={(event) => setSearchQuery(event.currentTarget.value || '')}
          />
        </div>

        {/* Table Header */}
        <s-table-header-row slot="header">
          <s-table-header>PO number</s-table-header>
          <s-table-header>Status</s-table-header>
          <s-table-header>PO date</s-table-header>
          <s-table-header>Customer</s-table-header>
          <s-table-header>Items</s-table-header>
          <s-table-header>Shopify order</s-table-header>
          <s-table-header>Documents</s-table-header>
          <s-table-header></s-table-header>
        </s-table-header-row>

        {/* Table Body */}
        <s-table-body>
          {filteredTransactions.length === 0 ? (
            <s-table-row>
              <s-table-cell>
                <s-text color="subdued">No orders match your filter criteria.</s-text>
              </s-table-cell>
            </s-table-row>
          ) : (
            filteredTransactions.map((tx) => (
              <s-table-row key={tx.id}>
                <s-table-cell>
                  <s-link
                    href={`#${tx.poNumber}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPO?.(tx.poNumber);
                    }}
                  >
                    <span className="font-semibold text-[#005bd3]">
                      {tx.poNumber}
                    </span>
                  </s-link>
                </s-table-cell>

                <s-table-cell>
                  <StatusBadge status={tx.status} label={tx.statusLabel} />
                </s-table-cell>

                <s-table-cell>
                  <s-text>{tx.poDate}</s-text>
                </s-table-cell>

                <s-table-cell>
                  <s-text>{tx.customerName}</s-text>
                </s-table-cell>

                <s-table-cell>
                  <s-text>
                    {tx.itemsCount} · ${tx.totalAmount.toFixed(2)}
                  </s-text>
                </s-table-cell>

                <s-table-cell>
                  {tx.shopifyOrder ? (
                    <s-text>
                      <strong>{tx.shopifyOrder}</strong>
                    </s-text>
                  ) : (
                    <s-text color="subdued">Not created</s-text>
                  )}
                </s-table-cell>

                <s-table-cell>
                  <DocumentBadgeMatrix documents={tx.documents} />
                </s-table-cell>

                <s-table-cell>
                  <s-button
                    variant="secondary"
                    onClick={() => onSelectPO?.(tx.poNumber)}
                  >
                    View
                  </s-button>
                </s-table-cell>
              </s-table-row>
            ))
          )}
        </s-table-body>
      </s-table>

      {/* Footer Info */}
      <div className="pt-3 text-[12px] text-gray-500">
        <s-text color="subdued">
          Showing {filteredTransactions.length} of {transactions.length} orders
        </s-text>
      </div>
    </s-section>
  );
};
