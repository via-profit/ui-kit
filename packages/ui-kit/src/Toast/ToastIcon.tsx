import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Spinner from '../LoadingIndicator/Spinner';
import type { ToastType } from './store';

export type ToastIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly type: ToastType;
  readonly isLoading: boolean;
};

const StyledIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: 1.25em;
  height: 1.25em;
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const paths: Record<Exclude<ToastType, 'default'>, React.ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 11v6M12 7.5v.01" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m7.5 12.5 3 3 6-6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  warning: (
    <>
      <path
        d="M10.3 3.6a2 2 0 0 1 3.4 0l8.2 14.2A2 2 0 0 1 20.2 21H3.8a2 2 0 0 1-1.7-3.2z"
        fill="currentColor"
      />
      <path d="M12 9v4.5M12 17v.01" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="m8.5 8.5 7 7m0-7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
};

/**
 * The icon of the toast type, or the spinner while the toast is loading.
 * The `default` type has no icon
 */
const ToastIcon: React.ForwardRefRenderFunction<HTMLSpanElement, ToastIconProps> = (props, ref) => {
  const { type, isLoading, children, ...nativeProps } = props;
  const theme = useTheme();

  if (children) {
    return (
      <StyledIcon aria-hidden {...nativeProps} ref={ref}>
        {children}
      </StyledIcon>
    );
  }

  if (isLoading) {
    return (
      <StyledIcon aria-hidden {...nativeProps} ref={ref}>
        <Spinner size="1.25em" />
      </StyledIcon>
    );
  }

  if (type === 'default') {
    return null;
  }

  const colors: Record<Exclude<ToastType, 'default'>, string> = {
    info: theme.color.accentPrimary.toString(),
    success: theme.color.success.toString(),
    warning: theme.color.warning.toString(),
    error: theme.color.error.toString(),
  };

  return (
    <StyledIcon
      aria-hidden
      {...nativeProps}
      style={{ color: colors[type], ...nativeProps.style }}
      ref={ref}
    >
      <svg viewBox="0 0 24 24">{paths[type]}</svg>
    </StyledIcon>
  );
};

export default React.forwardRef(ToastIcon);
