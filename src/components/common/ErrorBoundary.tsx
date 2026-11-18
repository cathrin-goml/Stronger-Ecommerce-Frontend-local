import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Banner } from '@shopify/polaris';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto">
          <Banner tone="critical" title="Something went wrong rendering this view">
            <p className="text-xs font-mono mt-2 bg-red-50 p-2 rounded">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-3 py-1.5 text-xs bg-red-600 text-white rounded font-medium hover:bg-red-700"
            >
              Reload Page
            </button>
          </Banner>
        </div>
      );
    }

    return this.props.children;
  }
}
