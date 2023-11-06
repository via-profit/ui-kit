import green from './green';

const greenDark: typeof green = {
  ...green,
  isDark: true,
  color: {
    ...green.color,
    backgroundPrimary: '#262629',
    backgroundSecondary: '#1b1b1b',
    accentPrimary: '#66b13d',
    accentPrimaryContrast: '#f1f1f1',
    accentSecondary: '#732b00',
    accentSecondaryContrast: '#dfa196',
    textPrimary: '#c4c4d8',
    textSecondary: '#717275',
    surface: '#1b1b1b',
  },
};

export default greenDark;
