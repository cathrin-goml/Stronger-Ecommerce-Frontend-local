import React, { useState } from 'react';
import { Modal, TextContainer } from '@shopify/polaris';

interface RawEdiModalProps {
  open: boolean;
  title: string;
  payload: string;
  onClose: () => void;
}

export const RawEdiModal: React.FC<RawEdiModalProps> = ({
  open,
  title,
  payload,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      primaryAction={{
        content: copied ? 'Copied!' : 'Copy to clipboard',
        onAction: handleCopy,
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-gray-700">
            {payload || 'No raw EDI payload available for this transaction.'}
          </div>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
