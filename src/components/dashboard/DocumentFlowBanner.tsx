import React from 'react';
import { documentFlowBannerData } from '../../data/banner';

export const DocumentFlowBanner: React.FC = () => {
  return (
    <s-banner tone="info">
      <s-text>
        <strong>{documentFlowBannerData.title}</strong>{' '}
        {documentFlowBannerData.lead}{' '}
        <code>{documentFlowBannerData.getEndpoint}</code>{' '}
        {documentFlowBannerData.afterGet}{' '}
        <strong>{documentFlowBannerData.highlightShipped}</strong>{' '}
        {documentFlowBannerData.betweenShippedAndPut}{' '}
        <code>{documentFlowBannerData.putEndpoint}</code>{' '}
        {documentFlowBannerData.rulesDescription}
      </s-text>
    </s-banner>
  );
};
