import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

export interface InnerProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const Inner: React.FC<InnerProps> = props => {
  const { children } = props;
  const theme = useTheme();

  return (
    <>
      <Global
        styles={css`
          body {
            font-family: system-ui;
            background-color: ${theme.colors.backgroundPrimary.toString()};
            color: ${theme.colors.textPrimary.toString()};
          }
        `}
      />
      {children}
    </>
  );
};

export default Inner;
