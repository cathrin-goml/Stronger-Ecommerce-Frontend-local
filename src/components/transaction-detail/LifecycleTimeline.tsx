import React from 'react';
import type { LifecycleEvent } from '../../types/edi';

interface LifecycleTimelineProps {
  events: LifecycleEvent[];
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({ events }) => {
  return (
    <s-section heading="Lifecycle">
      <div className="relative pl-6 space-y-6 pt-2">
        {/* Continuous vertical timeline connector line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-[1.5px] bg-[#e1e3e5]" />

        {events.map((event) => {
          let dotNode = (
            <div className="absolute -left-[23px] mt-1 h-3.5 w-3.5 rounded-full bg-[#008060] ring-4 ring-white shrink-0" />
          );
          let titleColor = 'text-gray-900';

          if (event.status === 'failed') {
            dotNode = (
              <div className="absolute -left-[23px] mt-1 h-3.5 w-3.5 rounded-full bg-[#d82c0d] ring-4 ring-white shrink-0" />
            );
            titleColor = 'text-[#d82c0d]';
          } else if (event.status === 'pending') {
            dotNode = (
              <div className="absolute -left-[23px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-gray-400 bg-white ring-4 ring-white shrink-0" />
            );
            titleColor = 'text-gray-600';
          }

          return (
            <div key={event.id} className="relative flex items-start gap-3">
              {dotNode}

              <div className="flex flex-col">
                <span className={`text-[13px] font-semibold ${titleColor}`}>
                  {event.title}
                </span>

                {(event.timestampUTC || event.endpointOrSource || event.details) && (
                  <span className="text-[12px] text-gray-500 mt-0.5">
                    {[
                      event.timestampUTC,
                      event.endpointOrSource,
                      event.details,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </s-section>
  );
};
