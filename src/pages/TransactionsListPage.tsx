import React from 'react';
import { Page, BlockStack } from '@shopify/polaris';
import { useEdi } from '../store/ediContext';
import { FlowBanner } from '../components/transactions/FlowBanner';
import { MetricCards } from '../components/transactions/MetricCards';
import { TransactionTabs } from '../components/transactions/TransactionTabs';
import { TransactionsTable } from '../components/transactions/TransactionsTable';

export const TransactionsListPage: React.FC = () => {
  const {
    transactions,
    filteredTransactions,
    metrics,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    isLoading,
    refreshData,
  } = useEdi();

  // Calculate tab counts
  const counts = {
    all: transactions.length,
    awaiting: transactions.filter((t) =>
      t.status.label.toLowerCase().includes('awaiting')
    ).length,
    sent: transactions.filter((t) =>
      t.status.label.toLowerCase().includes('sent')
    ).length,
    attention: transactions.filter((t) => t.status.tone === 'critical').length,
  };

  return (
    <Page
      fullWidth
      title="EDI transactions"
      primaryAction={{
        content: 'Refresh',
        loading: isLoading,
        onAction: refreshData,
      }}
    >
      <div className="w-full min-w-0">
        <BlockStack gap="400">
          {/* Document Flow Informational Banner */}
          <FlowBanner />

          {/* 5-Column Metric Cards */}
          <MetricCards stats={metrics} />

          {/* Orders Card with Tabs and Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full min-w-0">
            <TransactionTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={counts}
            />

            <TransactionsTable
              transactions={filteredTransactions}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={transactions.length}
            />
          </div>
        </BlockStack>
      </div>
    </Page>
  );
};
