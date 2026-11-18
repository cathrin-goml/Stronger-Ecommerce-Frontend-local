import type {
  EDITransactionListItem,
  EDITransactionDetail,
  MetricCardStats,
  DocumentBadgeStatus,
  DocumentsSummary,
  EDIDocument,
  LifecycleStep,
  OrderSummaryData,
  ShipToData,
  LineItemData,
  BadgeTone,
} from '../types/edi';

function normalizeStatus(statusRaw: any): DocumentBadgeStatus {
  if (!statusRaw) {
    return { label: 'Unknown', tone: 'info' };
  }
  if (typeof statusRaw === 'string') {
    let tone: BadgeTone = 'info';
    const lower = statusRaw.toLowerCase();
    if (lower.includes('accept') || lower.includes('received') || (lower.includes('acknowledged') && !lower.includes('unacknowledged'))) {
      tone = 'success';
    } else if (lower.includes('awaiting') || lower.includes('pending')) {
      tone = 'warning';
    } else if (lower.includes('fail') || lower.includes('unacknowledged') || lower.includes('rejected')) {
      tone = 'critical';
    }
    return { label: statusRaw, tone };
  }
  return {
    label: statusRaw.label || statusRaw.name || 'Unknown',
    tone: statusRaw.tone || 'info',
  };
}

export function normalizeTransactionListItem(item: any): EDITransactionListItem {
  const poNumber = String(item.poNumber || item.po_number || item.po_no || item.id || '');
  const poDate = String(item.poDate || item.po_date || item.date || item.createdAt || '');
  const customer = String(item.customer || item.customer_name || item.customerName || '—');
  const itemCount = Number(item.itemCount || item.item_count || item.itemsCount || (Array.isArray(item.items) ? item.items.length : 1));
  const orderTotal = Number(item.orderTotal || item.order_total || item.total || item.totalAmount || 0);
  const shopifyOrder = item.shopifyOrder || item.shopify_order || item.order_number || null;

  const defaultDocs: DocumentsSummary = {
    doc850: 'received',
    doc997: 'accepted',
    doc856: 'acknowledged',
    doc810: 'acknowledged',
  };

  const docs = item.documentsSummary || item.documents_summary || defaultDocs;

  return {
    id: String(item.id || poNumber),
    poNumber,
    status: normalizeStatus(item.status),
    poDate,
    customer,
    itemCount,
    orderTotal,
    shopifyOrder: shopifyOrder ? String(shopifyOrder) : null,
    documentsSummary: {
      doc850: docs.doc850 || docs['850'] || 'received',
      doc997: docs.doc997 || docs['997'] || 'accepted',
      doc856: docs.doc856 || docs['856'] || 'acknowledged',
      doc810: docs.doc810 || docs['810'] || 'acknowledged',
    },
  };
}

export function normalizeTransactionList(raw: any): EDITransactionListItem[] | null {
  if (!raw) return null;
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw.data)
    ? raw.data
    : Array.isArray(raw.transactions)
    ? raw.transactions
    : Array.isArray(raw.items)
    ? raw.items
    : null;

  if (!list) return null;
  return list.map(normalizeTransactionListItem);
}

export function normalizeMetrics(raw: any): MetricCardStats | null {
  if (!raw) return null;
  const data = raw.data && typeof raw.data === 'object' ? raw.data : raw;

  if (!data.po850Received && !data.po_850_received && !data.received_850) {
    return null;
  }

  return {
    po850Received: data.po850Received || data.po_850_received || { count: 0, subtext: 'purchase orders in' },
    po997Sent: data.po997Sent || data.po_997_sent || { count: 0, subtext: 'functional acks' },
    po856_810Sent: data.po856_810Sent || data.po_856_810_sent || { ratio: '0 / 0', subtext: 'ship notices / invoices' },
    po846LastRun: data.po846LastRun || data.po_846_last_run || { time: 'N/A', subtext: 'UTC' },
    needsAttention: data.needsAttention || data.needs_attention || { count: 0, subtext: 'requires review' },
  };
}

export function normalizeTransactionDetail(raw: any): EDITransactionDetail | null {
  if (!raw) return null;
  const item = raw.data && typeof raw.data === 'object' ? raw.data : raw;
  if (!item.poNumber && !item.po_number && !item.id) return null;

  const poNumber = String(item.poNumber || item.po_number || item.id);
  const status = normalizeStatus(item.status);
  const subtitle = String(
    item.subtitle ||
      `ShopHQ drop-ship · ${item.customer || item.customer_name || 'Customer'} · PO date ${item.poDate || item.po_date || ''}`
  );

  const documents: EDIDocument[] = Array.isArray(item.documents)
    ? item.documents.map((d: any, idx: number) => ({
        id: String(d.id || `doc-${idx}`),
        documentType: String(d.documentType || d.document_type || d.type || '850'),
        direction: d.direction === 'Outbound' || d.direction === 'OUTBOUND' ? 'Outbound' : 'Inbound',
        controlNumbers: String(d.controlNumbers || d.control_numbers || '—'),
        timeUtc: String(d.timeUtc || d.time_utc || d.timestamp || ''),
        status: normalizeStatus(d.status),
        rawPayload: d.rawPayload || d.raw_payload || d.payload || '',
      }))
    : [];

  const lifecycle: LifecycleStep[] = Array.isArray(item.lifecycle)
    ? item.lifecycle.map((lc: any, idx: number) => ({
        id: String(lc.id || `lc-${idx}`),
        title: String(lc.title || lc.name || ''),
        timeUtc: lc.timeUtc || lc.time_utc,
        channel: lc.channel,
        isa: lc.isa,
        note: lc.note || lc.description,
        status: lc.status === 'failed' ? 'failed' : lc.status === 'pending' ? 'pending' : 'completed',
      }))
    : [];

  const orderRaw = item.order || item.orderDetails || item.order_details || {};
  const order: OrderSummaryData = {
    shopifyOrder: String(orderRaw.shopifyOrder || orderRaw.shopify_order || item.shopifyOrder || '—'),
    vendorRef: String(orderRaw.vendorRef || orderRaw.vendor_ref || '—'),
    customerRef: String(orderRaw.customerRef || orderRaw.customer_ref || '—'),
    shipMethod: String(orderRaw.shipMethod || orderRaw.ship_method || '—'),
    requestedShip: String(orderRaw.requestedShip || orderRaw.requested_ship || '—'),
    shipmentInvoiceNo: String(orderRaw.shipmentInvoiceNo || orderRaw.shipment_invoice_no || '—'),
    tracking: String(orderRaw.tracking || orderRaw.tracking_number || '—'),
    invoiceTotal: String(orderRaw.invoiceTotal || orderRaw.invoice_total || `$${item.orderTotal || 0}`),
  };

  const shipToRaw = item.shipTo || item.ship_to || item.shippingAddress || {};
  const shipTo: ShipToData = {
    name: String(shipToRaw.name || item.customer || '—'),
    addressLines: Array.isArray(shipToRaw.addressLines || shipToRaw.address_lines)
      ? shipToRaw.addressLines || shipToRaw.address_lines
      : [
          shipToRaw.street || shipToRaw.address1 || '—',
          `${shipToRaw.city || ''}, ${shipToRaw.state || ''} ${shipToRaw.zip || ''}`.trim() || '—',
          shipToRaw.phone || '—',
        ].filter(Boolean),
    isMasked: Boolean(shipToRaw.isMasked || shipToRaw.is_masked),
  };

  const lineItems: LineItemData[] = Array.isArray(item.lineItems || item.line_items || item.items)
    ? (item.lineItems || item.line_items || item.items).map((li: any, idx: number) => ({
        id: String(li.id || `li-${idx}`),
        quantity: Number(li.quantity || li.qty || 1),
        title: String(li.title || li.name || '—'),
        price: String(li.price || (li.total ? `$${li.total}` : '$0.00')),
        sku: String(li.sku || '—'),
        vendorStyle: String(li.vendorStyle || li.vendor_style || '—'),
        upc: String(li.upc || '—'),
        retailPrice: String(li.retailPrice || li.retail_price || '—'),
      }))
    : [];

  return {
    poNumber,
    status,
    subtitle,
    documentsFootnote: item.documentsFootnote || item.documents_footnote,
    documents,
    lifecycle,
    order,
    shipTo,
    lineItems,
  };
}
