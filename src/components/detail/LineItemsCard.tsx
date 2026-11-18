import React from 'react';
import { Card, Box, Text, BlockStack, InlineStack, Divider } from '@shopify/polaris';
import type { LineItemData } from '../../types/edi';

interface LineItemsCardProps {
  items: LineItemData[];
}

export const LineItemsCard: React.FC<LineItemsCardProps> = ({ items }) => {
  return (
    <Card padding="400">
      <Box paddingBlockEnd="300">
        <Text as="h2" variant="headingSm" fontWeight="semibold">
          Line items ({items.length})
        </Text>
      </Box>

      <BlockStack gap="300">
        {items.map((item, idx) => (
          <React.Fragment key={item.id || idx}>
            {idx > 0 && <Divider />}
            <BlockStack gap="100">
              {/* Title and price */}
              <InlineStack align="space-between" blockAlign="start" gap="200">
                <Text as="span" variant="bodySm" fontWeight="medium">
                  {item.quantity}x {item.title}
                </Text>
                <Text as="span" variant="bodySm" fontWeight="semibold">
                  {item.price}
                </Text>
              </InlineStack>

              {/* SKU and metadata */}
              <BlockStack gap="050">
                <Text as="p" variant="bodyXs" tone="subdued">
                  <code className="font-mono text-xs">SK {item.sku}</code>
                </Text>
                <Text as="p" variant="bodyXs" tone="subdued">
                  <code className="font-mono text-xs">
                    VN {item.vendorStyle} - UP {item.upc} · retail {item.retailPrice}
                  </code>
                </Text>
              </BlockStack>
            </BlockStack>
          </React.Fragment>
        ))}
      </BlockStack>
    </Card>
  );
};
