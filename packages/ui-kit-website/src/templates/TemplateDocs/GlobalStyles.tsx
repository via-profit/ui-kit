import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        & ::-webkit-scrollbar {
          width: 0.6rem;
          height: 0.6rem;
        }

        & ::-webkit-scrollbar-corner {
          background: none;
        }

        & ::-webkit-scrollbar-thumb {
          background: ${theme.isDark
            ? theme.color.backgroundPrimary.lighten(20).toString()
            : theme.color.backgroundPrimary.darken(120).toString()};
          border-radius: 0.3rem;
        }

        & ::-webkit-scrollbar-thumb:horizontal:hover,
        & ::-webkit-scrollbar-thumb:vertical:hover {
          background: ${theme.color.accentPrimary.toString()};
        }
      `}
    />
  );
};

export default GlobalStyles;
