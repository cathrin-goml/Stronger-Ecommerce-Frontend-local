import React from 'react';
import type { EDITransactionDetail } from '../../types/edi';

interface OrderSummaryCardProps {
  order: EDITransactionDetail;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  const fields = [
    { label: 'Shopify order', value: order.shopifyOrder || 'Not created' },
    { label: 'Vendor (REF IA)', value: order.vendorRef },
    { label: 'Customer ref (REF CO)', value: order.customerRef },
    { label: 'Ship method (TD5)', value: order.shipMethod },
    { label: 'Requested ship (DTM 010)', value: order.requestedShipDate },
    { label: 'Shipment / invoice no.', value: order.shipmentInvoiceNo || '—' },
    { label: 'Tracking (MAN CP)', value: order.trackingNumber || '—' },
    { label: 'Invoice total', value: `$${order.totalAmount.toFixed(2)}` },
  ];

  return (
    <s-section heading="Order">
      <div className="space-y-2.5 text-[13px]">
        {fields.map((field, idx) => (
          <div key={idx} className="flex justify-between items-baseline gap-4 py-0.5">
            <span className="text-[#6d7175] font-normal">{field.label}</span>
            <span
              className={`text-right ${
                field.value === '—'
                  ? 'text-gray-400 font-normal'
                  : 'font-medium text-[#1a1a1a]'
              }`}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </s-section>
  );
};
