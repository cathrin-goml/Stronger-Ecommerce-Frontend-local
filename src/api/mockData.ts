import type {
  EDITransactionListItem,
  EDITransactionDetail,
  MetricCardStats,
} from '../types/edi';

export const mockMetricStats: MetricCardStats = {
  po850Received: {
    count: 4,
    subtext: 'purchase orders in',
  },
  po997Sent: {
    count: 5,
    subtext: '2 rejected, 3 accepted',
  },
  po856_810Sent: {
    ratio: '2 / 2',
    subtext: 'ship notices / invoices',
  },
  po846LastRun: {
    time: '10-23 10:01',
    subtext: '61 products · UTC',
  },
  needsAttention: {
    count: 3,
    subtext: '1 import failed · 2 unacknowledged',
  },
};

export const mockTransactionList: EDITransactionListItem[] = [
  {
    id: '13470948425809',
    poNumber: '13470948425809',
    status: {
      label: '856 / 810 sent',
      tone: 'info',
    },
    poDate: '2026-06-10',
    customer: 'Jordan Hattemer',
    itemCount: 2,
    orderTotal: 733.0,
    shopifyOrder: '#1042',
    documentsSummary: {
      doc850: 'received',
      doc997: 'accepted',
      doc856: 'acknowledged',
      doc810: 'acknowledged',
    },
  },
  {
    id: '13470948425810',
    poNumber: '13470948425810',
    status: {
      label: 'Awaiting shipment',
      tone: 'warning',
    },
    poDate: '2026-11-10',
    customer: 'Robert Miller',
    itemCount: 1,
    orderTotal: 850.0,
    shopifyOrder: '#1043',
    documentsSummary: {
      doc850: 'received',
      doc997: 'accepted',
      doc856: 'not_sent',
      doc810: 'not_sent',
    },
  },
  {
    id: '13470948425811',
    poNumber: '13470948425811',
    status: {
      label: 'Unacknowledged by ShopHQ',
      tone: 'critical',
    },
    poDate: '2026-11-09',
    customer: 'Sarah Jenkins',
    itemCount: 1,
    orderTotal: 425.0,
    shopifyOrder: '#1044',
    documentsSummary: {
      doc850: 'received',
      doc997: 'accepted',
      doc856: 'unacknowledged',
      doc810: 'unacknowledged',
    },
  },
  {
    id: '13470948425812',
    poNumber: '13470948425812',
    status: {
      label: 'Import failed · retrying',
      tone: 'critical',
    },
    poDate: '2026-11-11',
    customer: 'Michael Henderson',
    itemCount: 1,
    orderTotal: 650.0,
    shopifyOrder: null,
    documentsSummary: {
      doc850: 'received',
      doc997: 'rejected',
      doc856: 'not_sent',
      doc810: 'not_sent',
    },
  },
];

export const mockTransactionDetails: Record<string, EDITransactionDetail> = {
  '13470948425809': {
    poNumber: '13470948425809',
    status: {
      label: '856 / 810 sent',
      tone: 'info',
    },
    subtitle: 'ShopHQ drop-ship · Jordan Hattemer · PO date 2026-06-10',
    documents: [
      {
        id: 'doc-850-1',
        documentType: '850',
        direction: 'Inbound',
        controlNumbers: '000000001 / 1 / 000000001',
        timeUtc: '2026-06-17 09:56',
        status: { label: 'Received', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *260617*0956*U*00401*000000001*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20260617*0956*1*X*004010~
ST*850*000000001~
BEG*00*NE*13470948425809**20260610~
REF*IA*BOS002~
REF*CO*4697996~
DTM*010*20260615~
N1*ST*Jordan Hattemer~
N3*3030 France Avenue South, Unit 240~
N4*Minneapolis*MN*55416*US~
PO1*1*1*EA*384.00**SK*W-104662-GOLDTONE/SILVER*UP*840840148940~
PO1*2*1*EA*349.00**SK*W-104662-SILVERTONE/BLACK*UP*840840148896~
CTT*2~
SE*12*000000001~
GE*1*1~
IEA*1*000000001~`,
      },
      {
        id: 'doc-997-1',
        documentType: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000003 / 3 / 0003',
        timeUtc: '2026-09-10 19:33',
        status: { label: 'Rejected (AK5 R)', tone: 'critical' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *260910*1933*U*00401*000000003*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20260910*1933*3*X*004010~
ST*997*0003~
AK1*PO*1~
AK2*850*000000001~
AK5*R*5~
AK9*R*1*1*0~
SE*8*0003~
GE*1*3~
IEA*1*000000003~`,
      },
      {
        id: 'doc-997-2',
        documentType: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000007 / 7 / 0007',
        timeUtc: '2026-09-10 19:57',
        status: { label: 'Accepted (AK5 A)', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *260910*1957*U*00401*000000007*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20260910*1957*7*X*004010~
ST*997*0007~
AK1*PO*1~
AK2*850*000000001~
AK5*A~
AK9*A*1*1*1~
SE*8*0007~
GE*1*7~
IEA*1*000000007~`,
      },
      {
        id: 'doc-856-1',
        documentType: '856',
        direction: 'Outbound',
        controlNumbers: '000000008 / 8 / 0008',
        timeUtc: '2026-09-10 20:03',
        status: { label: 'Acknowledged (AK9 A)', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *260910*2003*U*00401*000000008*0*P*>~
GS*SH*STRONGERECOM*SHOPHQ*20260910*2003*8*X*004010~
ST*856*0008~
BSN*00*8992998*20260910*2003~
HL*1**S~
TD5*B*2*UPS*U*UPS Ground~
REF*BM*8992998~
REF*CN*1Z...1688~
SE*8*0008~
GE*1*8~
IEA*1*000000008~`,
      },
      {
        id: 'doc-810-1',
        documentType: '810',
        direction: 'Outbound',
        controlNumbers: '000000009 / 9 / 0009',
        timeUtc: '2026-09-10 20:03',
        status: { label: 'Acknowledged (AK9 A)', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *260910*2003*U*00401*000000009*0*P*>~
GS*IN*STRONGERECOM*SHOPHQ*20260910*2003*9*X*004010~
ST*810*0009~
BIG*20260910*8992998*20260610*13470948425809~
TDS*73300~
SE*5*0009~
GE*1*9~
IEA*1*000000009~`,
      },
      {
        id: 'doc-997-856',
        documentType: '997 for 856',
        direction: 'Inbound',
        controlNumbers: '997000046 / 997000046 / 997000046',
        timeUtc: '2026-09-10 22:00',
        status: { label: 'AK9 A', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *260910*2200*U*00401*997000046*0*P*>~
GS*FA*SHOPHQ*STRONGERECOM*20260910*2200*997000046*X*004010~
ST*997*0046~
AK1*SH*8~
AK2*856*0008~
AK5*A~
AK9*A*1*1*1~
SE*6*0046~
GE*1*997000046~
IEA*1*997000046~`,
      },
      {
        id: 'doc-997-810',
        documentType: '997 for 810',
        direction: 'Inbound',
        controlNumbers: '997000047 / 997000047 / 997000047',
        timeUtc: '2026-09-10 22:00',
        status: { label: 'AK9 A', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *260910*2200*U*00401*997000047*0*P*>~
GS*FA*SHOPHQ*STRONGERECOM*20260910*2200*997000047*X*004010~
ST*997*0047~
AK1*IN*9~
AK2*810*0009~
AK5*A~
AK9*A*1*1*1~
SE*6*0047~
GE*1*997000047~
IEA*1*997000047~`,
      },
    ],
    lifecycle: [
      {
        id: 'lc-1',
        title: '850 purchase order received',
        timeUtc: '2026-06-17 09:56 UTC',
        channel: '/Live/Get',
        isa: 'ISA 000000001',
        status: 'completed',
      },
      {
        id: 'lc-2',
        title: 'Shopify order creation failed',
        timeUtc: '2026-09-10 19:32 UTC',
        note: '850 stays in /Live/Get and is retried on the next run',
        status: 'failed',
      },
      {
        id: 'lc-3',
        title: '997 sent — rejected (Shopify order not created)',
        timeUtc: '2026-09-10 19:33 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000003',
        status: 'failed',
      },
      {
        id: 'lc-4',
        title: 'Shopify order #1042 created',
        timeUtc: '2026-09-10 19:56 UTC',
        channel: 'Shopify',
        status: 'completed',
      },
      {
        id: 'lc-5',
        title: '997 sent — accepted (Shopify order created)',
        timeUtc: '2026-09-10 19:57 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000007',
        status: 'completed',
      },
      {
        id: 'lc-6',
        title: 'Fulfilled with tracking ...1688',
        timeUtc: '2026-09-10 20:03 UTC',
        channel: 'Shopify',
        status: 'completed',
      },
      {
        id: 'lc-7',
        title: '856 ship notice sent',
        timeUtc: '2026-09-10 20:03 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000008',
        status: 'completed',
      },
      {
        id: 'lc-8',
        title: '810 invoice sent',
        timeUtc: '2026-09-10 20:03 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000009',
        status: 'completed',
      },
      {
        id: 'lc-9',
        title: 'ShopHQ 997 for 856 received',
        timeUtc: '2026-09-10 22:00 UTC',
        channel: 'AK9 A · accepted',
        status: 'completed',
      },
      {
        id: 'lc-10',
        title: 'ShopHQ 997 for 810 received',
        timeUtc: '2026-09-10 22:00 UTC',
        channel: 'AK9 A · accepted',
        status: 'completed',
      },
    ],
    order: {
      shopifyOrder: '#1042',
      vendorRef: 'BOS002',
      customerRef: '4697996',
      shipMethod: '03 · UPS Ground',
      requestedShip: '2026-06-15',
      shipmentInvoiceNo: '8992998',
      tracking: '...1688',
      invoiceTotal: '$733.00',
    },
    shipTo: {
      name: 'Jordan Hattemer',
      addressLines: [
        '3030 France Avenue South, Unit 240',
        'Minneapolis, MN 55416, US',
        '+1 651-239-4684',
      ],
      isMasked: false,
    },
    lineItems: [
      {
        id: 'li-1',
        quantity: 1,
        title: "Gevril Men's 42mm Stuyvesant Swiss Automatic Date Watch - Goldtone/Silver",
        price: '$384.00',
        sku: 'W-104662-GOLDTONE/SILVER',
        vendorStyle: '49805B',
        upc: '840840148940',
        retailPrice: '$699.99',
      },
      {
        id: 'li-2',
        quantity: 1,
        title: "Gevril Men's 42mm Stuyvesant Swiss Automatic Date Watch - Silvertone/Black",
        price: '$349.00',
        sku: 'W-104662-SILVERTONE/BLACK',
        vendorStyle: '49800B',
        upc: '840840148896',
        retailPrice: '$649.99',
      },
    ],
  },

  '13470948425810': {
    poNumber: '13470948425810',
    status: {
      label: 'Awaiting shipment',
      tone: 'warning',
    },
    subtitle: 'ShopHQ drop-ship · Robert Miller · PO date 2026-11-10',
    documentsFootnote:
      'Not yet sent: 856, 810 — sent once the whole order is shipped with tracking (checked about every 30 minutes).',
    documents: [
      {
        id: 'doc-850-2',
        documentType: '850',
        direction: 'Inbound',
        controlNumbers: '000000411 / 411 / 000000411',
        timeUtc: '2026-11-11 14:08',
        status: { label: 'Received', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *261111*1408*U*00401*000000411*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261111*1408*411*X*004010~
ST*850*000000411~
BEG*00*NE*13470948425810**20261110~
REF*IA*BOS002~
REF*CO*4697996~
DTM*010*20261116~
N1*ST*Robert Miller~
N4*Austin*TX***US~
PO1*1*1*EA*850.00**SK*W-104992-BLUE*UP*840840150011~
CTT*1~
SE*10*000000411~
GE*1*411~
IEA*1*000000411~`,
      },
      {
        id: 'doc-997-2a',
        documentType: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000118 / 118 / 0118',
        timeUtc: '2026-11-11 14:09',
        status: { label: 'Accepted (AK5 A)', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *261111*1409*U*00401*000000118*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261111*1409*118*X*004010~
ST*997*0118~
AK1*PO*411~
AK2*850*000000411~
AK5*A~
AK9*A*1*1*1~
SE*8*0118~
GE*1*118~
IEA*1*000000118~`,
      },
    ],
    lifecycle: [
      {
        id: 'lc-1',
        title: '850 purchase order received',
        timeUtc: '2026-11-11 14:08 UTC',
        channel: '/Live/Get',
        isa: 'ISA 000000411',
        status: 'completed',
      },
      {
        id: 'lc-2',
        title: 'Shopify order #1043 created',
        timeUtc: '2026-11-11 14:08 UTC',
        channel: 'Shopify',
        status: 'completed',
      },
      {
        id: 'lc-3',
        title: '997 sent — accepted (Shopify order created)',
        timeUtc: '2026-11-11 14:09 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000118',
        status: 'completed',
      },
      {
        id: 'lc-4',
        title: '856 + 810',
        note: 'Waiting for the order to be fully shipped with tracking',
        status: 'pending',
      },
    ],
    order: {
      shopifyOrder: '#1043',
      vendorRef: 'BOS002',
      customerRef: '4697996',
      shipMethod: '03 · UPS Ground',
      requestedShip: '2026-11-16',
      shipmentInvoiceNo: '—',
      tracking: '—',
      invoiceTotal: '$850.00',
    },
    shipTo: {
      name: 'Robert Miller',
      addressLines: ['Address masked', 'Austin, TX', 'Phone masked'],
      isMasked: true,
    },
    lineItems: [
      {
        id: 'li-1',
        quantity: 1,
        title: 'Gevril Columbus Circle Swiss Automatic Watch - Blue Dial',
        price: '$850.00',
        sku: 'W-104992-BLUE',
        vendorStyle: 'GEV-COL-AUT0',
        upc: '840840150011',
        retailPrice: '$1499.99',
      },
    ],
  },

  '13470948425811': {
    poNumber: '13470948425811',
    status: {
      label: 'Unacknowledged by ShopHQ',
      tone: 'critical',
    },
    subtitle: 'ShopHQ drop-ship · Sarah Jenkins · PO date 2026-11-09',
    documents: [
      {
        id: 'doc-850-3',
        documentType: '850',
        direction: 'Inbound',
        controlNumbers: '000000405 / 405 / 000000405',
        timeUtc: '2026-11-09 16:20',
        status: { label: 'Received', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *261109*1620*U*00401*000000405*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261109*1620*405*X*004010~
ST*850*000000405~
BEG*00*NE*13470948425811**20261109~
REF*IA*BOS002~
REF*CO*4697996~
DTM*010*20261113~
N1*ST*Sarah Jenkins~
N4*Denver*CO***US~
PO1*1*1*EA*425.00**SK*W-105110-STEEL*UP*840840150127~
CTT*1~
SE*10*000000405~
GE*1*405~
IEA*1*000000405~`,
      },
      {
        id: 'doc-997-3',
        documentType: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000112 / 112 / 0112',
        timeUtc: '2026-11-09 16:21',
        status: { label: 'Accepted (AK5 A)', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *261109*1621*U*00401*000000112*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261109*1621*112*X*004010~
ST*997*0112~
AK1*PO*405~
AK2*850*000000405~
AK5*A~
AK9*A*1*1*1~
SE*8*0112~
GE*1*112~
IEA*1*000000112~`,
      },
      {
        id: 'doc-856-3',
        documentType: '856',
        direction: 'Outbound',
        controlNumbers: '000000114 / 114 / 0114',
        timeUtc: '2026-11-10 14:30',
        status: { label: 'Unacknowledged > 24h', tone: 'critical' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *261110*1430*U*00401*000000114*0*P*>~
GS*SH*STRONGERECOM*SHOPHQ*20261110*1430*114*X*004010~
ST*856*0114~
BSN*00*8993140*20261110*1430~
HL*1**S~
TD5*B*2*UPS*U*UPS Ground~
REF*BM*8993140~
REF*CN*1Z...4471~
SE*8*0114~
GE*1*114~
IEA*1*000000114~`,
      },
      {
        id: 'doc-810-3',
        documentType: '810',
        direction: 'Outbound',
        controlNumbers: '000000115 / 115 / 0115',
        timeUtc: '2026-11-10 14:30',
        status: { label: 'Unacknowledged > 24h', tone: 'critical' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *261110*1430*U*00401*000000115*0*P*>~
GS*IN*STRONGERECOM*SHOPHQ*20261110*1430*115*X*004010~
ST*810*0115~
BIG*20261110*8993140*20261109*13470948425811~
TDS*42500~
SE*5*0115~
GE*1*115~
IEA*1*000000115~`,
      },
    ],
    lifecycle: [
      {
        id: 'lc-1',
        title: '850 purchase order received',
        timeUtc: '2026-11-09 16:20 UTC',
        channel: '/Live/Get',
        isa: 'ISA 000000405',
        status: 'completed',
      },
      {
        id: 'lc-2',
        title: 'Shopify order #1044 created',
        timeUtc: '2026-11-09 16:20 UTC',
        channel: 'Shopify',
        status: 'completed',
      },
      {
        id: 'lc-3',
        title: '997 sent — accepted (Shopify order created)',
        timeUtc: '2026-11-09 16:21 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000112',
        status: 'completed',
      },
      {
        id: 'lc-4',
        title: 'Fulfilled with tracking ...4471',
        timeUtc: '2026-11-10 14:29 UTC',
        channel: 'Shopify',
        status: 'completed',
      },
      {
        id: 'lc-5',
        title: '856 ship notice sent',
        timeUtc: '2026-11-10 14:30 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000114',
        status: 'failed',
      },
      {
        id: 'lc-6',
        title: '810 invoice sent',
        timeUtc: '2026-11-10 14:30 UTC',
        channel: '/Live/Put',
        isa: 'ISA 000000115',
        status: 'failed',
      },
    ],
    order: {
      shopifyOrder: '#1044',
      vendorRef: 'BOS002',
      customerRef: '4697996',
      shipMethod: '03 · UPS Ground',
      requestedShip: '2026-11-13',
      shipmentInvoiceNo: '8993140',
      tracking: '...4471',
      invoiceTotal: '$425.00',
    },
    shipTo: {
      name: 'Sarah Jenkins',
      addressLines: ['Address masked', 'Denver, CO', 'Phone masked'],
      isMasked: true,
    },
    lineItems: [
      {
        id: 'li-1',
        quantity: 1,
        title: 'Gevril Wall Street Swiss Automatic Chronograph',
        price: '$425.00',
        sku: 'W-105110-STEEL',
        vendorStyle: 'GEV-WALLST-01',
        upc: '840840150127',
        retailPrice: '$799.99',
      },
    ],
  },

  '13470948425812': {
    poNumber: '13470948425812',
    status: {
      label: 'Import failed · retrying',
      tone: 'critical',
    },
    subtitle: 'ShopHQ drop-ship · Michael Henderson · PO date 2026-11-11',
    documents: [
      {
        id: 'doc-850-4',
        documentType: '850',
        direction: 'Inbound',
        controlNumbers: '000000450 / 450 / 000000450',
        timeUtc: '2026-11-11 10:15',
        status: { label: 'Received', tone: 'success' },
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ         *ZZ*STRONGERECOM   *261111*1015*U*00401*000000450*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261111*1015*450*X*004010~
ST*850*000000450~
BEG*00*NE*13470948425812**20261111~
REF*IA*BOS002~
REF*CO*4698120~
DTM*010*20261115~
N1*ST*Michael Henderson~
N3*742 Evergreen Terrace~
N4*Springfield*OR*97477*US~
PO1*1*1*EA*650.00**SK*W-104200-LEATHER*UP*840840150999~
CTT*1~
SE*11*000000450~
GE*1*450~
IEA*1*000000450~`,
      },
      {
        id: 'doc-997-4',
        documentType: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000120 / 120 / 0120',
        timeUtc: '2026-11-11 10:16',
        status: { label: 'Rejected (AK5 R)', tone: 'critical' },
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM   *ZZ*SHOPHQ         *261111*1016*U*00401*000000120*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261111*1016*120*X*004010~
ST*997*0120~
AK1*PO*450~
AK2*850*000000450~
AK5*R*5~
AK9*R*1*1*0~
SE*8*0120~
GE*1*120~
IEA*1*000000120~`,
      },
    ],
    lifecycle: [
      {
        id: 'lc-1',
        title: '850 purchase order received',
        timeUtc: '2026-11-11 10:15 UTC',
        channel: '/Live/Get',
        isa: 'ISA 000000450',
        status: 'completed',
      },
      {
        id: 'lc-2',
        title: 'Shopify order creation failed',
        timeUtc: '2026-11-11 10:16 UTC',
        note: 'Customer SKU missing in Shopify catalogue. Retrying on next inventory sync.',
        status: 'failed',
      },
    ],
    order: {
      shopifyOrder: 'Not created',
      vendorRef: 'BOS002',
      customerRef: '4698120',
      shipMethod: '03 · UPS Ground',
      requestedShip: '2026-11-15',
      shipmentInvoiceNo: '—',
      tracking: '—',
      invoiceTotal: '$650.00',
    },
    shipTo: {
      name: 'Michael Henderson',
      addressLines: ['742 Evergreen Terrace', 'Springfield, OR 97477, US', '+1 541-555-0199'],
      isMasked: false,
    },
    lineItems: [
      {
        id: 'li-1',
        quantity: 1,
        title: 'Gevril Avenue of Americas Automatic Date',
        price: '$650.00',
        sku: 'W-104200-LEATHER',
        vendorStyle: 'GEV-AVENUE-01',
        upc: '840840150999',
        retailPrice: '$1200.00',
      },
    ],
  },
};

export const mockRefreshResponse = {
  success: true,
  refreshedAt: '2026-11-16T10:00:00.000Z',
};
