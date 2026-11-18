export type BadgeTone = 'success' | 'critical' | 'warning' | 'info' | 'attention';

export type LifecycleStatus = 'completed' | 'failed' | 'pending';

export interface DocumentBadgeStatus {
  label: string;
  tone: BadgeTone;
}

export interface DocumentsSummary {
  doc850: 'received' | 'not_received';
  doc997: 'accepted' | 'rejected' | 'pending';
  doc856: 'acknowledged' | 'unacknowledged' | 'not_sent';
  doc810: 'acknowledged' | 'unacknowledged' | 'not_sent';
}

export interface EDITransactionListItem {
  id: string;
  poNumber: string;
  status: DocumentBadgeStatus;
  poDate: string;
  customer: string;
  itemCount: number;
  orderTotal: number;
  shopifyOrder: string | null;
  documentsSummary: DocumentsSummary;
}

export interface EDIDocument {
  id: string;
  documentType: string;
  direction: 'Inbound' | 'Outbound';
  controlNumbers: string; // ISA13 / GS06 / ST02
  timeUtc: string;
  status: DocumentBadgeStatus;
  rawPayload?: string;
}

export interface LifecycleStep {
  id: string;
  title: string;
  timeUtc?: string;
  channel?: string;
  isa?: string;
  note?: string;
  status: LifecycleStatus;
}

export interface OrderSummaryData {
  shopifyOrder: string;
  vendorRef: string;
  customerRef: string;
  shipMethod: string;
  requestedShip: string;
  shipmentInvoiceNo: string;
  tracking: string;
  invoiceTotal: string;
}

export interface ShipToData {
  name: string;
  addressLines: string[];
  isMasked?: boolean;
}

export interface LineItemData {
  id: string;
  quantity: number;
  title: string;
  price: string;
  sku: string;
  vendorStyle: string;
  upc: string;
  retailPrice: string;
}

export interface EDITransactionDetail {
  poNumber: string;
  status: DocumentBadgeStatus;
  subtitle: string;
  documentsFootnote?: string;
  documents: EDIDocument[];
  lifecycle: LifecycleStep[];
  order: OrderSummaryData;
  shipTo: ShipToData;
  lineItems: LineItemData[];
}

export interface MetricCardStats {
  po850Received: { count: number; subtext: string };
  po997Sent: { count: number; subtext: string };
  po856_810Sent: { ratio: string; subtext: string };
  po846LastRun: { time: string; subtext: string };
  needsAttention: { count: number; subtext: string };
}

export type FilterTabId = 'all' | 'awaiting' | 'sent' | 'attention' | 'inventory';
