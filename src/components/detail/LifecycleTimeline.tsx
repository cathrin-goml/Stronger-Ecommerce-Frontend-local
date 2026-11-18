import React from 'react';
import { Card, Box, Text, BlockStack } from '@shopify/polaris';
import type { LifecycleStep } from '../../types/edi';

interface LifecycleTimelineProps {
  steps: LifecycleStep[];
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({ steps }) => {
  return (
    <Card padding="400">
      <Box paddingBlockEnd="300">
        <Text as="h2" variant="headingSm" fontWeight="semibold">
          Lifecycle
        </Text>
      </Box>

      <div style={{ paddingTop: '4px' }}>
        {steps.map((step, idx) => {
          let dot = (
            <div className="w-2.5 h-2.5 rounded-full bg-[#008060] ring-4 ring-white" />
          );

          if (step.status === 'failed') {
            dot = (
              <div className="w-2.5 h-2.5 rounded-full bg-[#DE350B] ring-4 ring-white" />
            );
          } else if (step.status === 'pending') {
            dot = (
              <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 bg-white ring-4 ring-white" />
            );
          }

          const details: string[] = [];
          if (step.timeUtc) details.push(step.timeUtc);
          if (step.channel) details.push(step.channel);
          if (step.isa) details.push(step.isa);

          return (
            <div key={step.id} className="flex items-start gap-3">
              {/* Vertical rail with dot and connecting line */}
              <div className="flex flex-col items-center flex-shrink-0 w-3">
                <div className="z-10 flex items-center justify-center mt-1">
                  {dot}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-[1.5px] bg-gray-200 flex-1 min-h-[30px] my-0.5" />
                )}
              </div>

              {/* Text content */}
              <div className={`min-w-0 ${idx < steps.length - 1 ? 'pb-3.5' : ''}`}>
                <BlockStack gap="050">
                  <Text as="p" variant="bodySm" fontWeight="medium">
                    {step.title}
                  </Text>

                  {details.length > 0 && (
                    <Text as="p" variant="bodyXs" tone="subdued">
                      <code className="font-mono text-xs">{details.join(' · ')}</code>
                    </Text>
                  )}

                  {step.note && (
                    <Text as="p" variant="bodyXs" tone="subdued">
                      {step.note}
                    </Text>
                  )}
                </BlockStack>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
