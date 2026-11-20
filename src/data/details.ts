import type { EDITransactionDetail } from '../types/edi';

export const transactionDetailsData: Record<string, EDITransactionDetail> = {
  '13470948425810': {
    id: 'tx-2',
    poNumber: '13470948425810',
    status: 'awaiting_shipment',
    statusLabel: '• Awaiting shipment',
    statusTone: 'warning',
    poDate: '2026-11-10',
    customerName: 'Robert Miller',
    itemsCount: 1,
    totalAmount: 850.0,
    shopifyOrder: '#1043',
    subTitle: 'ShopHQ drop-ship · Robert Miller · PO date 2026-11-10',
    documents: {
      '850': 'success',
      '997': 'success',
      '856': 'muted',
      '810': 'muted',
    },
    documentsList: [
      {
        id: 'doc-1',
        document: '850',
        direction: 'Inbound',
        controlNumbers: '000000411 / 411 / 000000411',
        timestampUTC: '2026-11-11 14:08',
        statusLabel: 'Received',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *261111*1408*U*00401*000000411*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261111*1408*411*X*004010~
ST*850*000000411~
BEG*00*NE*13470948425810**20261110~
REF*IA*BOS002~
REF*CO*4697996~
DTM*010*20261116~
N1*ST*Robert Miller~
N3*Address masked~
N4*Austin*TX*78701*US~
PO1*1*1*EA*850.00**SK*W-104992-BLUE*UP*840840150011~
CTT*1~
SE*11*000000411~
GE*1*411~
IEA*1*000000411~`,
      },
      {
        id: 'doc-2',
        document: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000118 / 118 / 0118',
        timestampUTC: '2026-11-11 14:09',
        statusLabel: 'Accepted (AK5 A)',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *261111*1409*U*00401*000000118*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261111*1409*118*X*004010~
ST*997*0118~
AK1*PO*411~
AK2*850*000000411~
AK5*A~
AK9*A*1*1*1~
SE*6*0118~
GE*1*118~
IEA*1*000000118~`,
      },
    ],
    documentsNote:
      'Not yet sent: 856, 810 — sent once the whole order is shipped with tracking (checked about every 30 minutes).',
    lifecycle: [
      {
        id: 'life-1',
        title: '850 purchase order received',
        status: 'completed',
        timestampUTC: '2026-11-11 14:08 UTC',
        endpointOrSource: '/Live/Get',
        details: 'ISA 000000411',
      },
      {
        id: 'life-2',
        title: 'Shopify order #1043 created',
        status: 'completed',
        timestampUTC: '2026-11-11 14:08 UTC',
        endpointOrSource: 'Shopify',
      },
      {
        id: 'life-3',
        title: '997 sent — accepted (Shopify order created)',
        status: 'completed',
        timestampUTC: '2026-11-11 14:09 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000118',
      },
      {
        id: 'life-4',
        title: '856 + 810',
        status: 'pending',
        details: 'Waiting for the order to be fully shipped with tracking',
      },
    ],
    vendorRef: 'BOS002',
    customerRef: '4697996',
    shipMethod: '03 · UPS Ground',
    requestedShipDate: '2026-11-16',
    shipmentInvoiceNo: null,
    trackingNumber: null,
    shippingAddress: {
      name: 'Robert Miller',
      street: 'Address masked',
      cityStateZip: 'Austin, TX',
      phone: 'Phone masked',
    },
    lineItems: [
      {
        id: 'item-1',
        quantity: 1,
        title: 'Gevril Columbus Circle Swiss Automatic Watch - Blue Dial',
        price: 850.0,
        sku: 'W-104992-BLUE',
        vendorCode: 'GEV-COL-AUTO',
        upc: '840840150011',
        retailPrice: 1499.99,
      },
    ],
  },
  '13470948425809': {
    id: 'tx-1',
    poNumber: '13470948425809',
    status: '856_810_sent',
    statusLabel: '• 856 / 810 sent',
    statusTone: 'info',
    poDate: '2026-06-10',
    customerName: 'Jordan Hattemer',
    itemsCount: 2,
    totalAmount: 733.0,
    shopifyOrder: '#1042',
    subTitle: 'ShopHQ drop-ship · Jordan Hattemer · PO date 2026-06-10',
    documents: {
      '850': 'success',
      '997': 'success',
      '856': 'success',
      '810': 'success',
    },
    documentsList: [
      {
        id: 'doc-1',
        document: '850',
        direction: 'Inbound',
        controlNumbers: '000000001 / 1 / 000000001',
        timestampUTC: '2026-06-17 09:56',
        statusLabel: 'Received',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *260617*0956*U*00401*000000001*0*P*>~
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
        id: 'doc-2',
        document: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000003 / 3 / 0003',
        timestampUTC: '2026-09-10 19:33',
        statusLabel: 'Rejected (AK5 R)',
        statusTone: 'critical',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *260910*1933*U*00401*000000003*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20260910*1933*3*X*004010~
ST*997*0003~
AK1*PO*1~
AK2*850*000000001~
AK3*PO1*1~
AK4*1*8~
AK5*R*5~
AK9*R*1*1*0~
SE*8*0003~
GE*1*3~
IEA*1*000000003~`,
      },
      {
        id: 'doc-3',
        document: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000007 / 7 / 0007',
        timestampUTC: '2026-09-10 19:57',
        statusLabel: 'Accepted (AK5 A)',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *260910*1957*U*00401*000000007*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20260910*1957*7*X*004010~
ST*997*0007~
AK1*PO*1~
AK2*850*000000001~
AK5*A~
AK9*A*1*1*1~
SE*6*0007~
GE*1*7~
IEA*1*000000007~`,
      },
      {
        id: 'doc-4',
        document: '856',
        direction: 'Outbound',
        controlNumbers: '000000008 / 8 / 0008',
        timestampUTC: '2026-09-10 20:03',
        statusLabel: 'Acknowledged (AK9 A)',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *260910*2003*U*00401*000000008*0*P*>~
GS*SH*STRONGERECOM*SHOPHQ*20260910*2003*8*X*004010~
ST*856*0008~
BSN*00*8992998*20260910*2003~
HL*1**S~
TD1*CTN25*1~
TD5*B*02*UPSN*M*UPS Ground~
REF*BM*8992998~
REF*CN*1Z9999999999991688~
DTM*011*20260910~
N1*ST*Jordan Hattemer~
N3*3030 France Avenue South, Unit 240~
N4*Minneapolis*MN*55416*US~
HL*2*1*O~
PRF*13470948425809~
HL*3*2*I~
LIN*1*SK*W-104662-GOLDTONE/SILVER*UP*840840148940~
SN1*1*1*EA~
LIN*2*SK*W-104662-SILVERTONE/BLACK*UP*840840148896~
SN1*2*1*EA~
CTT*3~
SE*18*0008~
GE*1*8~
IEA*1*000000008~`,
      },
      {
        id: 'doc-5',
        document: '810',
        direction: 'Outbound',
        controlNumbers: '000000009 / 9 / 0009',
        timestampUTC: '2026-09-10 20:03',
        statusLabel: 'Acknowledged (AK9 A)',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *260910*2003*U*00401*000000009*0*P*>~
GS*IN*STRONGERECOM*SHOPHQ*20260910*2003*9*X*004010~
ST*810*0009~
BIG*20260910*8992998*20260610*13470948425809~
CUR*USD~
REF*IA*BOS002~
REF*CO*4697996~
IT1*1*1*EA*384.00**SK*W-104662-GOLDTONE/SILVER*UP*840840148940~
IT1*2*1*EA*349.00**SK*W-104662-SILVERTONE/BLACK*UP*840840148896~
TDS*73300~
CTT*2~
SE*10*0009~
GE*1*9~
IEA*1*000000009~`,
      },
      {
        id: 'doc-6',
        document: '997 for 856',
        direction: 'Inbound',
        controlNumbers: '997000046 / 997000046 / 997000046',
        timestampUTC: '2026-09-10 22:00',
        statusLabel: 'AK9 A',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *260910*2200*U*00401*997000046*0*P*>~
GS*FA*SHOPHQ*STRONGERECOM*20260910*2200*997000046*X*004010~
ST*997*997000046~
AK1*SH*8~
AK2*856*0008~
AK5*A~
AK9*A*1*1*1~
SE*6*997000046~
GE*1*997000046~
IEA*1*997000046~`,
      },
      {
        id: 'doc-7',
        document: '997 for 810',
        direction: 'Inbound',
        controlNumbers: '997000047 / 997000047 / 997000047',
        timestampUTC: '2026-09-10 22:00',
        statusLabel: 'AK9 A',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *260910*2200*U*00401*997000047*0*P*>~
GS*FA*SHOPHQ*STRONGERECOM*20260910*2200*997000047*X*004010~
ST*997*997000047~
AK1*IN*9~
AK2*810*0009~
AK5*A~
AK9*A*1*1*1~
SE*6*997000047~
GE*1*997000047~
IEA*1*997000047~`,
      },
    ],
    lifecycle: [
      {
        id: 'life-1',
        title: '850 purchase order received',
        status: 'completed',
        timestampUTC: '2026-06-17 09:56 UTC',
        endpointOrSource: '/Live/Get',
        details: 'ISA 000000001',
      },
      {
        id: 'life-2',
        title: 'Shopify order creation failed',
        status: 'failed',
        timestampUTC: '2026-09-10 19:32 UTC',
        details: '850 stays in /Live/Get and is retried on the next run',
      },
      {
        id: 'life-3',
        title: '997 sent — rejected (Shopify order not created)',
        status: 'failed',
        timestampUTC: '2026-09-10 19:33 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000003',
      },
      {
        id: 'life-4',
        title: 'Shopify order #1042 created',
        status: 'completed',
        timestampUTC: '2026-09-10 19:56 UTC',
        endpointOrSource: 'Shopify',
      },
      {
        id: 'life-5',
        title: '997 sent — accepted (Shopify order created)',
        status: 'completed',
        timestampUTC: '2026-09-10 19:57 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000007',
      },
      {
        id: 'life-6',
        title: 'Fulfilled with tracking ...1688',
        status: 'completed',
        timestampUTC: '2026-09-10 20:03 UTC',
        endpointOrSource: 'Shopify',
      },
      {
        id: 'life-7',
        title: '856 ship notice sent',
        status: 'completed',
        timestampUTC: '2026-09-10 20:03 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000008',
      },
      {
        id: 'life-8',
        title: '810 invoice sent',
        status: 'completed',
        timestampUTC: '2026-09-10 20:03 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000009',
      },
      {
        id: 'life-9',
        title: 'ShopHQ 997 for 856 received',
        status: 'completed',
        timestampUTC: '2026-09-10 22:00 UTC',
        details: 'AK9 A · accepted',
      },
      {
        id: 'life-10',
        title: 'ShopHQ 997 for 810 received',
        status: 'completed',
        timestampUTC: '2026-09-10 22:00 UTC',
        details: 'AK9 A · accepted',
      },
    ],
    vendorRef: 'BOS002',
    customerRef: '4697996',
    shipMethod: '03 · UPS Ground',
    requestedShipDate: '2026-06-15',
    shipmentInvoiceNo: '8992998',
    trackingNumber: '...1688',
    shippingAddress: {
      name: 'Jordan Hattemer',
      street: '3030 France Avenue South, Unit 240',
      cityStateZip: 'Minneapolis, MN 55416, US',
      phone: '+1 651-239-4684',
    },
    lineItems: [
      {
        id: 'item-1',
        quantity: 1,
        title: "Gevril Men's 42mm Stuyvesant Swiss Automatic Date Watch - Goldtone/Silver",
        price: 384.0,
        sku: 'W-104662-GOLDTONE/SILVER',
        vendorCode: 'VN 49805B',
        upc: '840840148940',
        retailPrice: 699.99,
      },
      {
        id: 'item-2',
        quantity: 1,
        title: "Gevril Men's 42mm Stuyvesant Swiss Automatic Date Watch - Silvertone/Black",
        price: 349.0,
        sku: 'W-104662-SILVERTONE/BLACK',
        vendorCode: 'VN 49800B',
        upc: '840840148896',
        retailPrice: 649.99,
      },
    ],
  },
  '13470948425811': {
    id: 'tx-3',
    poNumber: '13470948425811',
    status: 'unacknowledged',
    statusLabel: '• Unacknowledged by ShopHQ',
    statusTone: 'critical',
    poDate: '2026-11-09',
    customerName: 'Sarah Jenkins',
    itemsCount: 1,
    totalAmount: 425.0,
    shopifyOrder: '#1044',
    subTitle: 'ShopHQ drop-ship · Sarah Jenkins · PO date 2026-11-09',
    documents: {
      '850': 'success',
      '997': 'success',
      '856': 'critical',
      '810': 'critical',
    },
    documentsList: [
      {
        id: 'doc-1',
        document: '850',
        direction: 'Inbound',
        controlNumbers: '000000405 / 405 / 000000405',
        timestampUTC: '2026-11-09 16:20',
        statusLabel: 'Received',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *261109*1620*U*00401*000000405*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261109*1620*405*X*004010~
ST*850*000000405~
BEG*00*NE*13470948425811**20261109~
REF*IA*BOS002~
REF*CO*4697996~
DTM*010*20261113~
N1*ST*Sarah Jenkins~
N3*Address masked~
N4*Denver*CO*80201*US~
PO1*1*1*EA*425.00**SK*W-105110-STEEL*UP*840840150127~
CTT*1~
SE*11*000000405~
GE*1*405~
IEA*1*000000405~`,
      },
      {
        id: 'doc-2',
        document: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000112 / 112 / 0112',
        timestampUTC: '2026-11-09 16:21',
        statusLabel: 'Accepted (AK5 A)',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *261109*1621*U*00401*000000112*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261109*1621*112*X*004010~
ST*997*0112~
AK1*PO*405~
AK2*850*000000405~
AK5*A~
AK9*A*1*1*1~
SE*6*0112~
GE*1*112~
IEA*1*000000112~`,
      },
      {
        id: 'doc-3',
        document: '856',
        direction: 'Outbound',
        controlNumbers: '000000114 / 114 / 0114',
        timestampUTC: '2026-11-10 14:30',
        statusLabel: 'Unacknowledged > 24h',
        statusTone: 'critical',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *261110*1430*U*00401*000000114*0*P*>~
GS*SH*STRONGERECOM*SHOPHQ*20261110*1430*114*X*004010~
ST*856*0114~
BSN*00*8993140*20261110*1430~
HL*1**S~
TD1*CTN25*1~
TD5*B*02*UPSN*M*UPS Ground~
REF*BM*8993140~
REF*CN*1Z9999999999994471~
DTM*011*20261110~
N1*ST*Sarah Jenkins~
N3*Address masked~
N4*Denver*CO*80201*US~
HL*2*1*O~
PRF*13470948425811~
HL*3*2*I~
LIN*1*SK*W-105110-STEEL*UP*840840150127~
SN1*1*1*EA~
CTT*3~
SE*16*0114~
GE*1*114~
IEA*1*000000114~`,
      },
      {
        id: 'doc-4',
        document: '810',
        direction: 'Outbound',
        controlNumbers: '000000115 / 115 / 0115',
        timestampUTC: '2026-11-10 14:30',
        statusLabel: 'Unacknowledged > 24h',
        statusTone: 'critical',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *261110*1430*U*00401*000000115*0*P*>~
GS*IN*STRONGERECOM*SHOPHQ*20261110*1430*115*X*004010~
ST*810*0115~
BIG*20261110*8993140*20261109*13470948425811~
CUR*USD~
REF*IA*BOS002~
REF*CO*4697996~
IT1*1*1*EA*425.00**SK*W-105110-STEEL*UP*840840150127~
TDS*42500~
CTT*1~
SE*9*0115~
GE*1*115~
IEA*1*000000115~`,
      },
    ],
    lifecycle: [
      {
        id: 'life-1',
        title: '850 purchase order received',
        status: 'completed',
        timestampUTC: '2026-11-09 16:20 UTC',
        endpointOrSource: '/Live/Get',
        details: 'ISA 000000405',
      },
      {
        id: 'life-2',
        title: 'Shopify order #1044 created',
        status: 'completed',
        timestampUTC: '2026-11-09 16:20 UTC',
        endpointOrSource: 'Shopify',
      },
      {
        id: 'life-3',
        title: '997 sent — accepted (Shopify order created)',
        status: 'completed',
        timestampUTC: '2026-11-09 16:21 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000112',
      },
      {
        id: 'life-4',
        title: 'Fulfilled with tracking ...4471',
        status: 'completed',
        timestampUTC: '2026-11-10 14:29 UTC',
        endpointOrSource: 'Shopify',
      },
      {
        id: 'life-5',
        title: '856 ship notice sent',
        status: 'failed',
        timestampUTC: '2026-11-10 14:30 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000114',
      },
      {
        id: 'life-6',
        title: '810 invoice sent',
        status: 'failed',
        timestampUTC: '2026-11-10 14:30 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000115',
      },
    ],
    vendorRef: 'BOS002',
    customerRef: '4697996',
    shipMethod: '03 · UPS Ground',
    requestedShipDate: '2026-11-13',
    shipmentInvoiceNo: '8993140',
    trackingNumber: '...4471',
    shippingAddress: {
      name: 'Sarah Jenkins',
      street: 'Address masked',
      cityStateZip: 'Denver, CO',
      phone: 'Phone masked',
    },
    lineItems: [
      {
        id: 'item-1',
        quantity: 1,
        title: 'Gevril Wall Street Swiss Automatic Chronograph',
        price: 425.0,
        sku: 'W-105110-STEEL',
        vendorCode: 'VN GEV-WALLST-01',
        upc: '840840150127',
        retailPrice: 799.99,
      },
    ],
  },
  '13470948425812': {
    id: 'tx-4',
    poNumber: '13470948425812',
    status: 'import_failed',
    statusLabel: '• Import failed · retrying',
    statusTone: 'critical',
    poDate: '2026-11-11',
    customerName: 'Michael Henderson',
    itemsCount: 1,
    totalAmount: 650.0,
    shopifyOrder: null,
    subTitle: 'ShopHQ drop-ship · Michael Henderson · PO date 2026-11-11',
    documents: {
      '850': 'success',
      '997': 'critical',
      '856': 'muted',
      '810': 'muted',
    },
    documentsList: [
      {
        id: 'doc-1',
        document: '850',
        direction: 'Inbound',
        controlNumbers: '000000415 / 415 / 000000415',
        timestampUTC: '2026-11-11 11:20',
        statusLabel: 'Received',
        statusTone: 'success',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*SHOPHQ        *ZZ*STRONGERECOM    *261111*1120*U*00401*000000415*0*P*>~
GS*PO*SHOPHQ*STRONGERECOM*20261111*1120*415*X*004010~
ST*850*000000415~
BEG*00*NE*13470948425812**20261111~
REF*IA*BOS002~
REF*CO*4698112~
DTM*010*20261118~
N1*ST*Michael Henderson~
N3*Address masked~
N4*Phoenix*AZ*85001*US~
PO1*1*1*EA*650.00**SK*W-104990-BLACK*UP*840840150250~
CTT*1~
SE*11*000000415~
GE*1*415~
IEA*1*000000415~`,
      },
      {
        id: 'doc-2',
        document: '997 for 850',
        direction: 'Outbound',
        controlNumbers: '000000120 / 120 / 0120',
        timestampUTC: '2026-11-11 11:21',
        statusLabel: 'Rejected (AK5 R)',
        statusTone: 'critical',
        hasViewRaw: true,
        rawPayload: `ISA*00*          *00*          *ZZ*STRONGERECOM    *ZZ*SHOPHQ          *261111*1121*U*00401*000000120*0*P*>~
GS*FA*STRONGERECOM*SHOPHQ*20261111*1121*120*X*004010~
ST*997*0120~
AK1*PO*415~
AK2*850*000000415~
AK3*PO1*1~
AK4*1*8~
AK5*R*5~
AK9*R*1*1*0~
SE*8*0120~
GE*1*120~
IEA*1*000000120~`,
      },
    ],
    documentsNote:
      'Order import failed. EDI service will retry on the next scheduled run.',
    lifecycle: [
      {
        id: 'life-1',
        title: '850 purchase order received',
        status: 'completed',
        timestampUTC: '2026-11-11 11:20 UTC',
        endpointOrSource: '/Live/Get',
        details: 'ISA 000000415',
      },
      {
        id: 'life-2',
        title: 'Shopify order creation failed',
        status: 'failed',
        timestampUTC: '2026-11-11 11:21 UTC',
        details: 'Missing inventory SKU match in Shopify catalog',
      },
      {
        id: 'life-3',
        title: '997 sent — rejected (AK5 R)',
        status: 'failed',
        timestampUTC: '2026-11-11 11:21 UTC',
        endpointOrSource: '/Live/Put',
        details: 'ISA 000000120',
      },
    ],
    vendorRef: 'BOS002',
    customerRef: '4698112',
    shipMethod: '03 · UPS Ground',
    requestedShipDate: '2026-11-18',
    shipmentInvoiceNo: null,
    trackingNumber: null,
    shippingAddress: {
      name: 'Michael Henderson',
      street: 'Address masked',
      cityStateZip: 'Phoenix, AZ',
      phone: 'Phone masked',
    },
    lineItems: [
      {
        id: 'item-1',
        quantity: 1,
        title: 'Gevril Avenue of Americas Swiss Automatic Watch',
        price: 650.0,
        sku: 'W-104990-BLACK',
        vendorCode: 'VN GEV-AMER-AUTO',
        upc: '840840150250',
        retailPrice: 1199.99,
      },
    ],
  },
};
