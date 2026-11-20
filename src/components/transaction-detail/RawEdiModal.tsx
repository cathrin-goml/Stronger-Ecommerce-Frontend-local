import React, { useState } from 'react';
import type { EDIDocumentRow } from '../../types/edi';

interface RawEdiModalProps {
  isOpen: boolean;
  document: EDIDocumentRow | null;
  onClose: () => void;
}

export const RawEdiModal: React.FC<RawEdiModalProps> = ({
  isOpen,
  document,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !document) return null;

  // Strict separation of concerns: payload comes solely from the data model
  const payload = document.rawPayload || 'No raw EDI payload available for this document.';

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
            Raw EDI - {document.document} ({document.controlNumbers})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Dark Terminal / Code Area */}
        <div className="rounded-lg bg-[#18181b] p-4 text-white shadow-inner">
          <pre className="font-mono text-[12px] leading-relaxed text-gray-100 overflow-x-auto whitespace-pre scrollbar-thin scrollbar-thumb-gray-600">
            {payload}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-5">
          <s-button variant="secondary" onClick={onClose}>
            Close
          </s-button>
          <s-button variant="primary" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </s-button>
        </div>
      </div>
    </div>
  );
};
