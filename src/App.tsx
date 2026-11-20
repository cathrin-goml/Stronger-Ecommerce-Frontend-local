import { useState, useEffect, useCallback } from 'react';
import { ShopifyAdminBar } from './components/dashboard/ShopifyAdminBar';
import { DocumentFlowBanner } from './components/dashboard/DocumentFlowBanner';
import { MetricCards } from './components/dashboard/MetricCards';
import { TransactionsTable } from './components/dashboard/TransactionsTable';
import { TransactionDetail } from './components/transaction-detail/TransactionDetail';
import { ediService } from './services/ediService';
import type {
  EDISummaryMetrics,
  EDITransaction,
  EDITransactionDetail,
} from './types/edi';
import { summaryMetricsData } from './data/metrics';
import { transactionsData } from './data/transactions';

function App() {
  const [metrics, setMetrics] = useState<EDISummaryMetrics>(summaryMetricsData);
  const [transactions, setTransactions] = useState<EDITransaction[]>(transactionsData);
  const [selectedPoNumber, setSelectedPoNumber] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<EDITransactionDetail | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load transaction detail whenever a PO number is selected
  useEffect(() => {
    if (!selectedPoNumber) return;
    let isMounted = true;
    ediService.getTransactionDetail(selectedPoNumber).then((data) => {
      if (isMounted) setSelectedDetail(data);
    });
    return () => {
      isMounted = false;
    };
  }, [selectedPoNumber]);

  // Handle refresh action (works seamlessly with mock or backend)
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [freshMetrics, freshTransactions] = await Promise.all([
        ediService.getSummaryMetrics(),
        ediService.getTransactions(),
      ]);
      setMetrics(freshMetrics);
      setTransactions(freshTransactions);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f2f4] flex flex-col w-full">
      {/* Top Shopify Admin Mock Frame */}
      <ShopifyAdminBar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-5">
        {selectedDetail ? (
          /* EDI Transaction Detail View */
          <TransactionDetail
            detail={selectedDetail}
            onBack={() => {
              setSelectedPoNumber(null);
              setSelectedDetail(null);
            }}
          />
        ) : (
          /* EDI Transactions List View - Full Frame Width */
          <s-page heading="EDI Transactions" inlineSize="large">
            <s-button
              slot="primary-action"
              variant="secondary"
              onClick={handleRefresh}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </s-button>

            <s-stack gap="base">
              {/* Document Flow Banner */}
              <DocumentFlowBanner />

              {/* Metric Summary Cards */}
              <MetricCards metrics={metrics} />

              {/* Transactions Table Section */}
              <TransactionsTable
                transactions={transactions}
                onSelectPO={(poNumber) => setSelectedPoNumber(poNumber)}
              />
            </s-stack>
          </s-page>
        )}
      </main>
    </div>
  );
}

export default App;
