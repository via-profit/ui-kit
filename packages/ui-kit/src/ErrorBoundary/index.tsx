import React from 'react';

import RenderError from './RenderError';

type State = {
  readonly error: Error | null;
  readonly errorInfo: React.ErrorInfo | null;
};

type Props = {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode | undefined | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <RenderError error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
