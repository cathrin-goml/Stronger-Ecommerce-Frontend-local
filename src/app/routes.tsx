import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TransactionsListPage } from '../pages/TransactionsListPage';
import { TransactionDetailPage } from '../pages/TransactionDetailPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TransactionsListPage />} />
      <Route path="/transactions" element={<TransactionsListPage />} />
      <Route path="/transactions/:poNumber" element={<TransactionDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
