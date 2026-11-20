import React from 'react';
import type { EDITransactionDetail } from '../../types/edi';

interface ShippingAddressCardProps {
  address: EDITransactionDetail['shippingAddress'];
}

export const ShippingAddressCard: React.FC<ShippingAddressCardProps> = ({ address }) => {
  return (
    <s-section heading="Ship to (ST)">
      <div className="space-y-1 text-[13px] leading-relaxed">
        <div className="font-semibold text-[#1a1a1a]">{address.name}</div>
        <div className="text-[#303030]">{address.street}</div>
        <div className="text-[#303030]">{address.cityStateZip}</div>
        <div className="text-[#6d7175] text-[12px] pt-0.5">{address.phone}</div>
      </div>
    </s-section>
  );
};
