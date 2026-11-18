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
  const [isFulfilling, setIsFulfilling] = useState<boolean>(false);
  const [fulfillMessage, setFulfillMessage] = useState<string | null>(null);

  const fetchDetail = () => {
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
  };

  useEffect(() => {
    fetchDetail();
  }, [poNumber]);

  const handleFulfillOrder = async () => {
    if (!poNumber) return;
    setIsFulfilling(true);
    setFulfillMessage(null);
    try {
      const result = await ediService.fulfillOrder(poNumber);
      if (result.success) {
        setFulfillMessage('Order successfully fulfilled! Outbound 856 ASN and 810 Invoice generated and sent.');
        fetchDetail();
      } else {
        setFulfillMessage(result.error || 'Failed to fulfill order');
      }
    } catch (err: any) {
      setFulfillMessage(err.message || 'Error executing fulfillment');
    } finally {
      setIsFulfilling(false);
    }
  };

  if (isLoading) {
    return (
      <Page
        fullWidth
        backAction={{ content: 'EDI transactions', onAction: () => navigate('/') }}
        title={`PO ${poNumber || ''}`}
      >
        <div className="flex justify-center items-center py-20">
          <Spinner accessibilityLabel="Loading order details" size="large" />
        </div>
      </Page>
    );
  }

  if (!detail) {
    return (
      <Page
        fullWidth
        backAction={{ content: 'EDI transactions', onAction: () => navigate('/') }}
        title="Order Not Found"
      >
        <div className="mb-4">
          <Banner tone="critical">
            Could not find EDI transaction with PO number: <strong>{poNumber}</strong>
          </Banner>
        </div>
      </Page>
    );
  }

  const canFulfill =
    detail.status.label.toLowerCase().includes('awaiting') ||
    detail.status.label.toLowerCase().includes('pending');

  return (
    <Page
      fullWidth
      backAction={{ content: 'EDI transactions', onAction: () => navigate('/') }}
      title={`PO ${detail.poNumber}`}
      titleMetadata={
        <StatusBadge
          label={detail.status.label}
          tone={detail.status.tone}
          showDot={true}
        />
      }
      subtitle={detail.subtitle}
      primaryAction={
        canFulfill
          ? {
              content: 'Fulfill Order (Send 856 & 810)',
              loading: isFulfilling,
              onAction: handleFulfillOrder,
            }
          : undefined
      }
    >
      <div className="w-full min-w-0">
        <BlockStack gap="400">
          {/* Fulfillment Success / Alert Banner */}
          {fulfillMessage && (
            <Banner
              tone={fulfillMessage.includes('successfully') ? 'success' : 'critical'}
              onDismiss={() => setFulfillMessage(null)}
            >
              <p>{fulfillMessage}</p>
            </Banner>
          )}

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
