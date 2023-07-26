import blue from './blue';

const blueDark: typeof blue = {
  ...blue,
  isDark: true,
  color: {
    ...blue.color,
    backgroundPrimary: '#262629',
    backgroundSecondary: '#1b1b1b',
    accentPrimary: '#6a88f9',
    accentPrimaryContrast: '#f1f1f1',
    accentSecondary: '#c059ff',
    accentSecondaryContrast: '#f1f1f1',
    textPrimary: '#c4c4d8',
    textSecondary: '#717275',
    surface: '#1b1b1b',
  },
};

export default blueDark;
