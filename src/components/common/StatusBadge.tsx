import React from 'react';
import { Badge } from '@shopify/polaris';
import type { BadgeTone } from '../../types/edi';

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  showDot?: boolean; // Kept for interface compatibility
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  tone = 'info',
}) => {
  let badgeTone: 'info' | 'success' | 'warning' | 'critical' | 'attention' = tone;
  let progress: 'complete' | 'partiallyComplete' | 'incomplete' | undefined = undefined;

  const l = label.toLowerCase();
  if (
    l.includes('accepted') ||
    l.includes('received') ||
    (l.includes('acknowledged') && !l.includes('unacknowledged'))
  ) {
    badgeTone = 'success';
    progress = 'complete';
  } else if (l.includes('awaiting') || tone === 'warning') {
    badgeTone = 'warning';
    progress = 'partiallyComplete';
  } else if (
    l.includes('fail') ||
    l.includes('unacknowledged') ||
    l.includes('rejected') ||
    tone === 'critical'
  ) {
    badgeTone = 'critical';
    progress = 'incomplete';
  } else if (l.includes('856 / 810')) {
    badgeTone = 'info';
    progress = 'complete';
  }

  return (
    <Badge tone={badgeTone} progress={progress}>
      {label}
    </Badge>
  );
};
