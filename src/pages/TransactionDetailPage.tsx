import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Page,
  Layout,
  BlockStack,
  Spinner,
  Banner,
} from '@shopify/polaris';
import type { EDITransactionDetail } from '../types/edi';
import { ediService } from '../api/ediService';
import { StatusBadge } from '../components/common/StatusBadge';
import { DocumentsTable } from '../components/detail/DocumentsTable';
import { LifecycleTimeline } from '../components/detail/LifecycleTimeline';
import { OrderSummaryCard } from '../components/detail/OrderSummaryCard';
import { ShipToCard } from '../components/detail/ShipToCard';
import { LineItemsCard } from '../components/detail/LineItemsCard';

export const TransactionDetailPage: React.FC = () => {
  const { poNumber } = useParams<{ poNumber: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<EDITransactionDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!poNumber) return;
    setIsLoading(true);
    ediService
      .getTransactionByPo(poNumber)
      .then((data) => {
        setDetail(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [poNumber]);

  if (isLoading) {
    return (
      <Page fullWidth>
        <div className="flex justify-center items-center py-20">
          <Spinner accessibilityLabel="Loading order details" size="large" />
        </div>
      </Page>
    );
  }

  if (!detail) {
    return (
      <Page fullWidth>
        <div className="mb-4">
          <button
            onClick={() => navigate('/')}
            className="text-[13px] text-[#005bd3] hover:underline flex items-center gap-1 font-normal bg-transparent border-0 p-0 cursor-pointer mb-3"
          >
            ‹ EDI transactions
          </button>
          <Banner tone="critical">
            Could not find EDI transaction with PO number: <strong>{poNumber}</strong>
          </Banner>
        </div>
      </Page>
    );
  }

  return (
    <Page fullWidth>
      <div className="w-full min-w-0">
        <BlockStack gap="400">
          {/* Custom Header replicating design mockup */}
          <div className="mb-1">
            <button
              onClick={() => navigate('/')}
              className="text-[13px] text-[#005bd3] hover:underline inline-flex items-center gap-1 font-normal bg-transparent border-0 p-0 cursor-pointer mb-2"
            >
              ‹ EDI transactions
            </button>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                PO {detail.poNumber}
              </h1>
              <StatusBadge
                label={detail.status.label}
                tone={detail.status.tone}
                showDot={true}
              />
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-1">
              {detail.subtitle}
            </p>
          </div>

          {/* 2-Column Responsive Layout */}
          <Layout>
            {/* Left Column (Primary width) */}
            <Layout.Section>
              <div className="w-full min-w-0">
                <BlockStack gap="400">
                  {/* Documents Table Card */}
                  <DocumentsTable
                    documents={detail.documents}
                    footnote={detail.documentsFootnote}
                  />

                  {/* Lifecycle Timeline Card */}
                  <LifecycleTimeline steps={detail.lifecycle} />
                </BlockStack>
              </div>
            </Layout.Section>

            {/* Right Column (Secondary 1/3 width) */}
            <Layout.Section variant="oneThird">
              <div className="w-full min-w-0">
                <BlockStack gap="400">
                  {/* Order Details Card */}
                  <OrderSummaryCard order={detail.order} />

                  {/* Ship To Address Card */}
                  <ShipToCard shipTo={detail.shipTo} />

                  {/* Line Items Card */}
                  <LineItemsCard items={detail.lineItems} />
                </BlockStack>
              </div>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </div>
    </Page>
  );
};
