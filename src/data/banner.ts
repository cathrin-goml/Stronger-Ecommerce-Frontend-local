export interface DocumentFlowBannerData {
  title: string;
  lead: string;
  getEndpoint: string;
  afterGet: string;
  highlightShipped: string;
  betweenShippedAndPut: string;
  putEndpoint: string;
  rulesDescription: string;
}

export const documentFlowBannerData: DocumentFlowBannerData = {
  title: 'How documents flow.',
  lead: '850 orders are collected from',
  getEndpoint: '/Live/Get',
  afterGet: 'and answered with a 997. Once an order is',
  highlightShipped: 'fully shipped',
  betweenShippedAndPut: 'with tracking, one 856 and one 810 are sent to',
  putEndpoint: '/Live/Put',
  rulesDescription:
    '(no per-partial 856). The 846 inventory snapshot runs daily at ~10:00 UTC. ShopHQ should return a 997 for every 856, 810 and 846 within 24 hours.',
};
