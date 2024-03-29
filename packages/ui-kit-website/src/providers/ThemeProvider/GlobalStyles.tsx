import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GloalStyles: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family:
            Open Sans,
            system-ui;
          background-color: ${theme.color.backgroundPrimary.toString()};
          color: ${theme.color.textPrimary.toString()};
        }
        * {
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GloalStyles;
