import React from 'react';
import { Card, Box, Text, BlockStack } from '@shopify/polaris';
import type { ShipToData } from '../../types/edi';

interface ShipToCardProps {
  shipTo: ShipToData;
}

export const ShipToCard: React.FC<ShipToCardProps> = ({ shipTo }) => {
  return (
    <Card padding="400">
      <Box paddingBlockEnd="300">
        <Text as="h2" variant="headingSm" fontWeight="semibold">
          Ship to (ST)
        </Text>
      </Box>

      <BlockStack gap="100">
        <Text as="p" fontWeight="semibold" variant="bodySm">
          {shipTo.name}
        </Text>
        {shipTo.addressLines.map((line, idx) => (
          <Text key={idx} as="p" tone="subdued" variant="bodySm">
            {line}
          </Text>
        ))}
      </BlockStack>
    </Card>
  );
};
