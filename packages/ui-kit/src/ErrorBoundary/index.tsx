import React from 'react';

import RenderError from './RenderError';

type State = {
  readonly error: Error | null;
};

export type ErrorBoundaryProps = {
  readonly children: React.ReactNode;

  /**
   * What is shown instead of the children after an error. Without it the error message is shown:
   * the name, the message and the stack in the development mode, `title` and `description` in production
   */
  readonly fallback?: React.ReactNode;

  /**
   * The heading of the error message in production
   * Default: `Something went wrong`
   */
  readonly title?: React.ReactNode;

  /**
   * The text of the error message in production
   * Default: `Please let the developers know`
   */
  readonly description?: React.ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback, title, description } = this.props;

    if (error) {
      if (typeof fallback !== 'undefined') {
        return fallback;
      }

      return <RenderError error={error} title={title} description={description} />;
    }

    return children;
  }
}

export default ErrorBoundary;
