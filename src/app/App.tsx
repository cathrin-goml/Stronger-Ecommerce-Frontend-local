import React from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { BrowserRouter } from 'react-router-dom';
import { EdiProvider } from '../store/ediContext';
import { ShopifyAdminLayout } from '../layouts/ShopifyAdminLayout';
import { AppRoutes } from './routes';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <AppProvider i18n={enTranslations}>
      <ErrorBoundary>
        <BrowserRouter>
          <EdiProvider>
            <ShopifyAdminLayout>
              <AppRoutes />
            </ShopifyAdminLayout>
          </EdiProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
