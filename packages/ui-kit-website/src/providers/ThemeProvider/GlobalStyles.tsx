import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GloalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          color-scheme: ${theme.isDark ? 'dark' : 'light'};
          --font-mono: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
          --header-height: 3.75rem;
        }

        html {
          scroll-padding-top: calc(var(--header-height) + 1rem);
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            'Segoe UI',
            sans-serif;
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          background-color: ${theme.color.backgroundPrimary.toString()};
          color: ${theme.color.textPrimary.toString()};
          transition: background-color 160ms ease-out;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background-color: ${theme.color.accentPrimary.alpha(0.3).toString()};
        }

        :focus-visible {
          outline: 2px solid ${theme.color.accentPrimary.toString()};
          outline-offset: 2px;
        }

        code,
        pre,
        kbd {
          font-variant-ligatures: none;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: ${theme.color.border.toString()} transparent;
        }

        ::-webkit-scrollbar {
          width: 0.5rem;
          height: 0.5rem;
        }

        ::-webkit-scrollbar-corner,
        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.color.border.toString()};
          border-radius: 0.25rem;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.color.accentPrimary.alpha(0.6).toString()};
        }
      `}
    />
  );
};

export default GloalStyles;
