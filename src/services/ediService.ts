import type {
  EDISummaryMetrics,
  EDITransaction,
  EDITransactionDetail,
} from '../types/edi';
import { summaryMetricsData } from '../data/metrics';
import { transactionsData } from '../data/transactions';
import { transactionDetailsData } from '../data/details';
import { api } from '../axiosConfig';

/**
 * Flag to toggle between mock data and real backend API.
 * When backend endpoints are ready, set this to false or configure via .env
 */
const USE_MOCK_DATA = true;

export const ediService = {
  /**
   * Fetches top-level summary metrics (KPIs)
   */
  async getSummaryMetrics(): Promise<EDISummaryMetrics> {
    if (USE_MOCK_DATA) {
      // Return consolidated mock data with simulated async resolve
      return Promise.resolve({ ...summaryMetricsData });
    }
    const response = await api.get<EDISummaryMetrics>('/api/edi/metrics');
    return response.data;
  },

  /**
   * Fetches the list of EDI transactions
   */
  async getTransactions(): Promise<EDITransaction[]> {
    if (USE_MOCK_DATA) {
      return Promise.resolve([...transactionsData]);
    }
    const response = await api.get<EDITransaction[]>('/api/edi/transactions');
    return response.data;
  },

  /**
   * Fetches detailed data for a specific Purchase Order
   */
  async getTransactionDetail(poNumber: string): Promise<EDITransactionDetail | null> {
    if (USE_MOCK_DATA) {
      const detail = transactionDetailsData[poNumber] || null;
      return Promise.resolve(detail ? { ...detail } : null);
    }
    const response = await api.get<EDITransactionDetail>(`/api/edi/transactions/${poNumber}`);
    return response.data;
  },
};
