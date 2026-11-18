import React, { useState } from 'react';
import { Card, Box, Text, Button, DataTable } from '@shopify/polaris';
import type { EDIDocument } from '../../types/edi';
import { StatusBadge } from '../common/StatusBadge';
import { RawEdiModal } from '../common/RawEdiModal';

interface DocumentsTableProps {
  documents: EDIDocument[];
  footnote?: string;
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({
  documents,
  footnote,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<EDIDocument | null>(null);

  const rows = documents.map((doc) => [
    <Text as="span" fontWeight="semibold" key={`${doc.id}-type`}>
      {doc.documentType}
    </Text>,
    <Text as="span" tone="subdued" key={`${doc.id}-dir`}>
      {doc.direction}
    </Text>,
    <Text as="span" variant="bodyXs" key={`${doc.id}-ctrl`}>
      <code className="font-mono text-xs">{doc.controlNumbers}</code>
    </Text>,
    <Text as="span" tone="subdued" key={`${doc.id}-time`}>
      {doc.timeUtc}
    </Text>,
    <StatusBadge
      label={doc.status.label}
      tone={doc.status.tone}
      showDot={false}
      key={`${doc.id}-status`}
    />,
    <Button
      variant="plain"
      size="slim"
      onClick={() => setSelectedDoc(doc)}
      key={`${doc.id}-action`}
    >
      View raw
    </Button>,
  ]);

  return (
    <>
      <Card padding="0">
        <Box padding="400" borderBlockEndWidth="025" borderColor="border">
          <Text as="h2" variant="headingSm" fontWeight="semibold">
            Documents
          </Text>
        </Box>

        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
            'numeric',
          ]}
          headings={[
            'Document',
            'Direction',
            'ISA13 / GS06 / ST02',
            'Time (UTC)',
            'Status',
            '',
          ]}
          rows={rows}
          footerContent={footnote}
        />
      </Card>

      {selectedDoc && (
        <RawEdiModal
          open={!!selectedDoc}
          title={`Raw EDI - ${selectedDoc.documentType} (${selectedDoc.controlNumbers})`}
          payload={selectedDoc.rawPayload || ''}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </>
  );
};
