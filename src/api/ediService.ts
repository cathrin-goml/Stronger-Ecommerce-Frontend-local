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
  mockRefreshResponse,
} from './mockData';
import {
  normalizeTransactionList,
  normalizeMetrics,
  normalizeTransactionDetail,
} from './dataNormalizers';

// Check if backend API base URL is provided
export const hasBackendApi = Boolean(import.meta.env.VITE_API_BASE_URL);

// Standard REST endpoint paths
export const API_ENDPOINTS = {
  transactions: '/transactions',
  metrics: '/metrics',
  detail: (poNumber: string) => `/transactions/${poNumber}`,
  refresh: '/transactions/refresh',
};

export const ediService = {
  async getMetrics(): Promise<MetricCardStats> {
    if (!hasBackendApi) {
      return mockMetricStats;
    }

    try {
      const response = await api.get(API_ENDPOINTS.metrics);
      const normalized = normalizeMetrics(response.data);
      if (normalized) {
        return normalized;
      }
      console.warn('[EDI API] Backend metrics response could not be parsed, using mock data.');
      return mockMetricStats;
    } catch (error) {
      console.warn('[EDI API] Failed to fetch metrics from backend, using fallback data:', error);
      return mockMetricStats;
    }
  },

  async getTransactions(): Promise<EDITransactionListItem[]> {
    if (!hasBackendApi) {
      return mockTransactionList;
    }

    try {
      const response = await api.get(API_ENDPOINTS.transactions);
      const normalized = normalizeTransactionList(response.data);
      if (normalized) {
        return normalized;
      }
      console.warn('[EDI API] Backend transactions response could not be parsed as array, using mock data.');
      return mockTransactionList;
    } catch (error) {
      console.warn('[EDI API] Failed to fetch transactions from backend, using fallback data:', error);
      return mockTransactionList;
    }
  },

  async getTransactionByPo(poNumber: string): Promise<EDITransactionDetail | null> {
    if (!hasBackendApi) {
      return mockTransactionDetails[poNumber] || null;
    }

    try {
      const response = await api.get(API_ENDPOINTS.detail(poNumber));
      const normalized = normalizeTransactionDetail(response.data);
      if (normalized) {
        return normalized;
      }
      return mockTransactionDetails[poNumber] || null;
    } catch (error) {
      console.warn(`[EDI API] Failed to fetch PO ${poNumber} from backend:`, error);
      return mockTransactionDetails[poNumber] || null;
    }
  },

  async refreshTransactions(): Promise<{ success: boolean; refreshedAt: string }> {
    if (!hasBackendApi) {
      return mockRefreshResponse;
    }

    try {
      const response = await api.post(API_ENDPOINTS.refresh);
      return response.data || mockRefreshResponse;
    } catch (error) {
      console.warn('[EDI API] Backend refresh endpoint call failed:', error);
      return mockRefreshResponse;
    }
  },
};
