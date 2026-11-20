import type { EDISummaryMetrics } from '../types/edi';

export const summaryMetricsData: EDISummaryMetrics = {
  poReceived: {
    label: '850 received',
    value: 4,
    subtitle: 'purchase orders in',
  },
  ackSent: {
    label: '997 sent',
    value: 5,
    subtitle: '2 rejected, 3 accepted',
  },
  shipInvoicesSent: {
    label: '856 / 810 sent',
    value: '2 / 2',
    subtitle: 'ship notices / invoices',
  },
  inventoryLastRun: {
    label: '846 last run',
    value: '10-23 10:01',
    subtitle: '61 products · UTC',
  },
  needsAttention: {
    label: 'Needs attention',
    value: 3,
    subtitle: '1 import failed · 2 unacknowledged',
    isCritical: true,
  },
};
