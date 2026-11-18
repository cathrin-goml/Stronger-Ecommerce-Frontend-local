import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  EDITransactionListItem,
  MetricCardStats,
  FilterTabId,
} from '../types/edi';
import { ediService, hasBackendApi } from '../api/ediService';
import { mockMetricStats, mockTransactionList } from '../api/mockData';

interface EdiContextType {
  transactions: EDITransactionListItem[];
  filteredTransactions: EDITransactionListItem[];
  metrics: MetricCardStats;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: FilterTabId;
  setActiveTab: (tab: FilterTabId) => void;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  ingestSample850: () => Promise<void>;
  isLiveApi: boolean;
}

const EdiContext = createContext<EdiContextType | undefined>(undefined);

export const EdiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<EDITransactionListItem[]>(mockTransactionList);
  const [metrics, setMetrics] = useState<MetricCardStats>(mockMetricStats);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTabId>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [trans, mets] = await Promise.all([
        ediService.getTransactions(),
        ediService.getMetrics(),
      ]);
      if (Array.isArray(trans) && trans.length > 0) {
        setTransactions(trans);
      }
      if (mets && typeof mets === 'object') {
        setMetrics(mets);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await ediService.refreshTransactions();
    await loadData();
  };

  const ingestSample850 = async () => {
    setIsLoading(true);
    try {
      await ediService.ingestSample850();
      await loadData();
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    if (!Array.isArray(transactions)) return [];

    return transactions.filter((item) => {
      // Tab filter
      if (activeTab === 'awaiting') {
        if (!item.status.label.toLowerCase().includes('awaiting')) return false;
      } else if (activeTab === 'sent') {
        if (!item.status.label.toLowerCase().includes('sent')) return false;
      } else if (activeTab === 'attention') {
        if (item.status.tone !== 'critical') return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.poNumber.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        (item.shopifyOrder && item.shopifyOrder.toLowerCase().includes(q)) ||
        item.status.label.toLowerCase().includes(q)
      );
    });
  }, [transactions, activeTab, searchQuery]);

  return (
    <EdiContext.Provider
      value={{
        transactions,
        filteredTransactions,
        metrics,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        isLoading,
        refreshData,
        ingestSample850,
        isLiveApi: hasBackendApi,
      }}
    >
      {children}
    </EdiContext.Provider>
  );
};

export const useEdi = (): EdiContextType => {
  const context = useContext(EdiContext);
  if (!context) {
    throw new Error('useEdi must be used within an EdiProvider');
  }
  return context;
};
