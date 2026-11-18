import React from 'react';
import { Banner } from '@shopify/polaris';

export const FlowBanner: React.FC = () => {
  return (
    <Banner tone="info">
      <p className="text-[13px] leading-relaxed text-gray-800">
        <span className="font-semibold">How documents flow.</span> 850 orders
        are collected from <code className="bg-blue-50 px-1 py-0.5 rounded text-xs font-mono">/Live/Get</code> and answered
        with a 997. Once an order is <span className="font-semibold">fully shipped</span> with
        tracking, one 856 and one 810 are sent to{' '}
        <code className="bg-blue-50 px-1 py-0.5 rounded text-xs font-mono">/Live/Put</code> (no per-partial 856). The 846 inventory
        snapshot runs daily at ~10:00 UTC. ShopHQ should return a 997 for every
        856, 810 and 846 within 24 hours.
      </p>
    </Banner>
  );
};
