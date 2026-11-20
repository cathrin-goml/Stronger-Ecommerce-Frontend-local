export type DocumentCode = '850' | '997' | '856' | '810';

export type DocumentState = 'success' | 'critical' | 'muted';

export type TransactionStatus = 
  | '856_810_sent' 
  | 'awaiting_shipment' 
  | 'unacknowledged' 
  | 'import_failed';

export type TabKey = 
  | 'all' 
  | 'awaiting_shipment' 
  | '856_810_sent' 
  | 'needs_attention' 
  | 'inventory_846';

export interface EDITransaction {
  id: string;
  poNumber: string;
  status: TransactionStatus;
  statusLabel: string;
  statusTone: 'info' | 'warning' | 'critical';
  poDate: string;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  shopifyOrder: string | null;
  documents: Record<DocumentCode, DocumentState>;
}

export interface MetricCardItem {
  label: string;
  value: string | number;
  subtitle: string;
  isCritical?: boolean;
}

export interface EDISummaryMetrics {
  poReceived: MetricCardItem;
  ackSent: MetricCardItem;
  shipInvoicesSent: MetricCardItem;
  inventoryLastRun: MetricCardItem;
  needsAttention: MetricCardItem;
}

// Detail Page Types
export interface EDIDocumentRow {
  id: string;
  document: string;
  direction: 'Inbound' | 'Outbound';
  controlNumbers: string;
  timestampUTC: string;
  statusLabel: string;
  statusTone: 'success' | 'critical' | 'warning' | 'info' | 'auto';
  hasViewRaw?: boolean;
  rawPayload?: string;
}

export interface LifecycleEvent {
  id: string;
  title: string;
  status: 'completed' | 'failed' | 'pending';
  timestampUTC?: string;
  endpointOrSource?: string;
  details?: string;
}

export interface EDILineItem {
  id: string;
  quantity: number;
  title: string;
  price: number;
  sku: string;
  vendorCode: string;
  upc: string;
  retailPrice: number;
}

export interface EDITransactionDetail extends EDITransaction {
  subTitle: string;
  documentsList: EDIDocumentRow[];
  documentsNote?: string;
  lifecycle: LifecycleEvent[];
  vendorRef: string;
  customerRef: string;
  shipMethod: string;
  requestedShipDate: string;
  shipmentInvoiceNo: string | null;
  trackingNumber: string | null;
  shippingAddress: {
    name: string;
    street: string;
    cityStateZip: string;
    phone: string;
  };
  lineItems: EDILineItem[];
}
