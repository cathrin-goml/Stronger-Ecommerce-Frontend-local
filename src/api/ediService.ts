import { api } from './axiosConfig';
import type {
  EDITransactionListItem,
  EDITransactionDetail,
  MetricCardStats,
} from '../types/edi';
import {
  mockMetricStats,
  mockTransactionList,
  mockTransactionDetails,
} from './mockData';
import {
  normalizeTransactionList,
  normalizeMetrics,
  normalizeTransactionDetail,
} from './dataNormalizers';

// Check if backend API base URL is provided
export const hasBackendApi = Boolean(import.meta.env.VITE_API_BASE_URL);

// Backend API Endpoints matching NestJS EDI Controller
export const API_ENDPOINTS = {
  status: '/api/edi/status',
  orders: '/api/edi/orders',
  orderDetail: (poNumber: string) => `/api/edi/orders/${encodeURIComponent(poNumber)}`,
  fulfill: (poNumber: string) => `/api/edi/fulfill/${encodeURIComponent(poNumber)}`,
  ingest850: '/api/edi/ingest/850',
  reconcile997: '/api/edi/reconcile/997',
  inventory846: '/api/edi/inventory/846',
  inventorySnapshot: '/api/edi/inventory/snapshot',
};

export const ediService = {
  /**
   * Fetch KPI metrics and status summary
   */
  async getMetrics(): Promise<MetricCardStats> {
    if (!hasBackendApi) {
      return mockMetricStats;
    }

    try {
      const response = await api.get(API_ENDPOINTS.status);
      const normalized = normalizeMetrics(response.data);
      if (normalized) {
        return normalized;
      }
      return mockMetricStats;
    } catch (error) {
      console.warn('[EDI API] Failed to fetch metrics from backend, using fallback data:', error);
      return mockMetricStats;
    }
  },

  /**
   * Fetch all canonical EDI orders
   */
  async getTransactions(): Promise<EDITransactionListItem[]> {
    if (!hasBackendApi) {
      return mockTransactionList;
    }

    try {
      const response = await api.get(API_ENDPOINTS.orders);
      const liveOrders = normalizeTransactionList(response.data) || [];

      // Merge live orders with remaining mock orders so all demo PO numbers remain viewable
      const livePoNumbers = new Set(liveOrders.map((o) => o.poNumber));
      const remainingMocks = mockTransactionList.filter(
        (m) => !livePoNumbers.has(m.poNumber)
      );

      return [...liveOrders, ...remainingMocks];
    } catch (error) {
      console.warn('[EDI API] Failed to fetch transactions from backend, using fallback data:', error);
      return mockTransactionList;
    }
  },

  /**
   * Fetch a single canonical order by PO number
   */
  async getTransactionByPo(poNumber: string): Promise<EDITransactionDetail | null> {
    if (!hasBackendApi) {
      return mockTransactionDetails[poNumber] || null;
    }

    try {
      const response = await api.get(API_ENDPOINTS.orderDetail(poNumber));
      const normalized = normalizeTransactionDetail(response.data);
      if (normalized) {
        return normalized;
      }
      return mockTransactionDetails[poNumber] || null;
    } catch (error) {
      console.warn(`[EDI API] Failed to fetch PO ${poNumber} from backend, using mock:`, error);
      return mockTransactionDetails[poNumber] || null;
    }
  },

  /**
   * Trigger order fulfillment (produces 856 ASN & 810 Invoice)
   */
  async fulfillOrder(poNumber: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await api.post(API_ENDPOINTS.fulfill(poNumber));
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error(`[EDI API] Failed to fulfill order ${poNumber}:`, error);
      return {
        success: false,
        error: error?.response?.data?.message || error?.message || 'Failed to fulfill order',
      };
    }
  },

  /**
   * Ingest sample 850 order to test live end-to-end processing
   */
  async ingestSample850(): Promise<{ success: boolean; data?: any }> {
    try {
      const response = await api.post(`${API_ENDPOINTS.ingest850}?useSample=true`, {});
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('[EDI API] Failed to ingest sample 850:', error);
      return { success: false };
    }
  },

  /**
   * Refresh transactions list
   */
  async refreshTransactions(): Promise<{ success: boolean; refreshedAt: string }> {
    return {
      success: true,
      refreshedAt: new Date().toISOString(),
    };
  },
};
