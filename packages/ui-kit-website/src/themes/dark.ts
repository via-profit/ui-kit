import { Theme } from '@emotion/react';

import light from './light';

const dark: Theme = {
  ...light,
  isDark: true,
  colors: {
    ...light.colors,
    backgroundPrimary: '#1e1e2e',
    backgroundSecondary: '#28293c',
    backgroundGrey: '#2c2d3a',
    textPrimary: '#c4c4d8',
    textSecondary: '#9e9e9e',
  },
};

export default dark;
