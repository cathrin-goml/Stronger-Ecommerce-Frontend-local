import React, { useState } from 'react';
import type { EDIDocumentRow } from '../../types/edi';
import { RawEdiModal } from './RawEdiModal';

interface DocumentsTableProps {
  documents: EDIDocumentRow[];
  note?: string;
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents, note }) => {
  const [selectedRawDoc, setSelectedRawDoc] = useState<EDIDocumentRow | null>(null);
  const hasAnyViewRaw = documents.some((d) => d.hasViewRaw);

  const getStatusBadge = (statusLabel: string) => {
    const isSuccess =
      statusLabel === 'Received' ||
      statusLabel.includes('Accepted') ||
      statusLabel.includes('Acknowledged') ||
      statusLabel === 'AK9 A';

    const isCritical =
      statusLabel.includes('Rejected') || statusLabel.includes('Unacknowledged');

    let badgeClass = 'bg-[#f1f2f4] text-[#6d7175]';
    if (isSuccess) {
      badgeClass = 'bg-[#ddf4e4] text-[#166534]';
    } else if (isCritical) {
      badgeClass = 'bg-[#fee2e2] text-[#991b1b]';
    }

    return (
      <span
        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${badgeClass}`}
      >
        {statusLabel}
      </span>
    );
  };

  return (
    <s-section heading="Documents">
      <s-table>
        <s-table-header-row slot="header">
          <s-table-header>Document</s-table-header>
          <s-table-header>Direction</s-table-header>
          <s-table-header>ISA13 / GS06 / ST02</s-table-header>
          <s-table-header>Time (UTC)</s-table-header>
          <s-table-header>Status</s-table-header>
          {hasAnyViewRaw && <s-table-header></s-table-header>}
        </s-table-header-row>

        <s-table-body>
          {documents.map((doc) => (
            <s-table-row key={doc.id}>
              <s-table-cell>
                <span className="font-semibold text-gray-900 text-[13px]">
                  {doc.document}
                </span>
              </s-table-cell>

              <s-table-cell>
                <s-text color="subdued">{doc.direction}</s-text>
              </s-table-cell>

              <s-table-cell>
                <span className="font-mono text-[12px] text-gray-700 tracking-tight">
                  {doc.controlNumbers}
                </span>
              </s-table-cell>

              <s-table-cell>
                <span className="text-[13px] text-gray-700 font-normal">
                  {doc.timestampUTC}
                </span>
              </s-table-cell>

              <s-table-cell>
                {getStatusBadge(doc.statusLabel)}
              </s-table-cell>

              {hasAnyViewRaw && (
                <s-table-cell>
                  {doc.hasViewRaw && (
                    <s-button
                      variant="secondary"
                      onClick={() => setSelectedRawDoc(doc)}
                    >
                      View raw
                    </s-button>
                  )}
                </s-table-cell>
              )}
            </s-table-row>
          ))}
        </s-table-body>
      </s-table>

      {note && (
        <div className="pt-3 text-[12px] text-gray-500">
          <s-text color="subdued">{note}</s-text>
        </div>
      )}

      {/* Raw EDI Payload Modal */}
      <RawEdiModal
        isOpen={Boolean(selectedRawDoc)}
        document={selectedRawDoc}
        onClose={() => setSelectedRawDoc(null)}
      />
    </s-section>
  );
};
