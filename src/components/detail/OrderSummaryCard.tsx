import React from 'react';
import { Card, Box, Text, BlockStack, InlineStack } from '@shopify/polaris';
import type { OrderSummaryData } from '../../types/edi';

interface OrderSummaryCardProps {
  order: OrderSummaryData;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  const rows = [
    { label: 'Shopify order', value: order.shopifyOrder, isPrimary: true },
    { label: 'Vendor (REF IA)', value: order.vendorRef },
    { label: 'Customer ref (REF CO)', value: order.customerRef },
    { label: 'Ship method (TD5)', value: order.shipMethod },
    { label: 'Requested ship (DTM 010)', value: order.requestedShip },
    { label: 'Shipment / invoice no.', value: order.shipmentInvoiceNo },
    { label: 'Tracking (MAN CP)', value: order.tracking },
    { label: 'Invoice total', value: order.invoiceTotal, isPrimary: true },
  ];

  return (
    <Card padding="400">
      <Box paddingBlockEnd="300">
        <Text as="h2" variant="headingSm" fontWeight="semibold">
          Order
        </Text>
      </Box>

      <BlockStack gap="200">
        {rows.map((row) => (
          <InlineStack key={row.label} align="space-between" blockAlign="baseline">
            <Text as="span" tone="subdued" variant="bodySm">
              {row.label}
            </Text>
            <Text
              as="span"
              variant="bodySm"
              fontWeight={row.isPrimary ? 'semibold' : 'regular'}
            >
              {row.value}
            </Text>
          </InlineStack>
        ))}
      </BlockStack>
    </Card>
  );
};
