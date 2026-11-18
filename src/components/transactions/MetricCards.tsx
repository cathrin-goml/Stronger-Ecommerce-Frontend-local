import React from 'react';
import { Card, Text, BlockStack, InlineGrid } from '@shopify/polaris';
import type { MetricCardStats } from '../../types/edi';

interface MetricCardsProps {
  stats: MetricCardStats;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ stats }) => {
  return (
    <InlineGrid columns={{ xs: 2, sm: 2, md: 3, lg: 5 }} gap="300">
      {/* 850 received */}
      <Card padding="400">
        <BlockStack gap="100">
          <Text as="h3" variant="bodySm" tone="subdued">
            850 received
          </Text>
          <Text as="p" variant="headingXl" fontWeight="bold">
            {stats.po850Received.count}
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            {stats.po850Received.subtext}
          </Text>
        </BlockStack>
      </Card>

      {/* 997 sent */}
      <Card padding="400">
        <BlockStack gap="100">
          <Text as="h3" variant="bodySm" tone="subdued">
            997 sent
          </Text>
          <Text as="p" variant="headingXl" fontWeight="bold">
            {stats.po997Sent.count}
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            {stats.po997Sent.subtext}
          </Text>
        </BlockStack>
      </Card>

      {/* 856 / 810 sent */}
      <Card padding="400">
        <BlockStack gap="100">
          <Text as="h3" variant="bodySm" tone="subdued">
            856 / 810 sent
          </Text>
          <Text as="p" variant="headingXl" fontWeight="bold">
            {stats.po856_810Sent.ratio}
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            {stats.po856_810Sent.subtext}
          </Text>
        </BlockStack>
      </Card>

      {/* 846 last run */}
      <Card padding="400">
        <BlockStack gap="100">
          <Text as="h3" variant="bodySm" tone="subdued">
            846 last run
          </Text>
          <Text as="p" variant="headingXl" fontWeight="bold">
            {stats.po846LastRun.time}
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            {stats.po846LastRun.subtext}
          </Text>
        </BlockStack>
      </Card>

      {/* Needs attention */}
      <Card padding="400">
        <BlockStack gap="100">
          <Text as="h3" variant="bodySm" tone="subdued">
            Needs attention
          </Text>
          <Text as="p" variant="headingXl" fontWeight="bold" tone="critical">
            {stats.needsAttention.count}
          </Text>
          <Text as="p" variant="bodyXs" tone="subdued">
            {stats.needsAttention.subtext}
          </Text>
        </BlockStack>
      </Card>
    </InlineGrid>
  );
};
