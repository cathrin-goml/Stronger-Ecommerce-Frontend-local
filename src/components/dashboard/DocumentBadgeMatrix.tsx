import React from 'react';
import type { DocumentCode, DocumentState } from '../../types/edi';

interface DocumentBadgeMatrixProps {
  documents: Record<DocumentCode, DocumentState>;
}

export const DocumentBadgeMatrix: React.FC<DocumentBadgeMatrixProps> = ({ documents }) => {
  const getBadgeStyle = (state: DocumentState) => {
    switch (state) {
      case 'success':
        return 'bg-[#ddf4e4] text-[#166534]';
      case 'critical':
        return 'bg-[#fee2e2] text-[#991b1b]';
      case 'muted':
      default:
        return 'bg-[#f1f2f4] text-[#6d7175]';
    }
  };

  const docList: DocumentCode[] = ['850', '997', '856', '810'];

  return (
    <div className="grid grid-cols-3 gap-1 w-fit">
      {docList.map((code) => {
        const state = documents[code] || 'muted';
        return (
          <span
            key={code}
            className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold text-center min-w-[28px] ${getBadgeStyle(
              state
            )}`}
          >
            {code}
          </span>
        );
      })}
    </div>
  );
};
