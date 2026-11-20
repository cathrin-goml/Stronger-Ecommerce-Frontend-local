import React from 'react';
import type { EDITransactionDetail } from '../../types/edi';
import { DocumentsTable } from './DocumentsTable';
import { LifecycleTimeline } from './LifecycleTimeline';
import { OrderSummaryCard } from './OrderSummaryCard';
import { ShippingAddressCard } from './ShippingAddressCard';
import { LineItemsCard } from './LineItemsCard';
import { StatusBadge } from '../dashboard/StatusBadge';

interface TransactionDetailProps {
  detail: EDITransactionDetail;
  onBack: () => void;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({ detail, onBack }) => {
  return (
    <s-page heading={`PO ${detail.poNumber}`} inlineSize="large">
      {/* Polaris Breadcrumb Back Link Slot */}
      <s-link
        slot="breadcrumb-actions"
        href="#back"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        ‹ EDI Transactions
      </s-link>

      <div className="w-full space-y-4">
        {/* Contextual Subtitle & Status Badge */}
        <div className="flex items-center gap-3">
          <StatusBadge status={detail.status} label={detail.statusLabel.replace('• ', '')} />
          <s-text color="subdued">{detail.subTitle}</s-text>
        </div>

        {/* Responsive Full-Width 2-Column Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Content Column (Left ~67%) */}
          <div className="lg:col-span-8 space-y-5">
            <DocumentsTable
              documents={detail.documentsList}
              note={detail.documentsNote}
            />
            <LifecycleTimeline events={detail.lifecycle} />
          </div>

          {/* Aside Column (Right ~33%) */}
          <div className="lg:col-span-4 space-y-5">
            <OrderSummaryCard order={detail} />
            <ShippingAddressCard address={detail.shippingAddress} />
            <LineItemsCard items={detail.lineItems} />
          </div>
        </div>
      </div>
    </s-page>
  );
};
