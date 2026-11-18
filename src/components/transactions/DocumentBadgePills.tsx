import React from 'react';
import { Badge, InlineStack } from '@shopify/polaris';
import type { DocumentsSummary } from '../../types/edi';

interface DocumentBadgePillsProps {
  summary: DocumentsSummary;
}

function getTone(status: string): 'success' | 'critical' | undefined {
  if (status === 'received' || status === 'accepted' || status === 'acknowledged') {
    return 'success';
  }
  if (status === 'rejected' || status === 'unacknowledged') {
    return 'critical';
  }
  return undefined; // Renders Polaris neutral / subdued badge
}

export const DocumentBadgePills: React.FC<DocumentBadgePillsProps> = ({ summary }) => {
  const docs = [
    { label: '850', status: summary.doc850 },
    { label: '997', status: summary.doc997 },
    { label: '856', status: summary.doc856 },
    { label: '810', status: summary.doc810 },
  ];

  return (
    <InlineStack gap="100" wrap={false} align="start" blockAlign="center">
      {docs.map((doc) => (
        <Badge key={doc.label} size="small" tone={getTone(doc.status)}>
          {doc.label}
        </Badge>
      ))}
    </InlineStack>
  );
};
