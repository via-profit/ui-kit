import React from 'react';

import { MoonIcon, SunIcon } from '~/components/Icons';
import { useUi } from '~/providers/UiProvider';
import { useT } from '~/translations';
import IconButton from './IconButton';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useUi();
  const t = useT();
  const isDark = theme === 'dark';
  const title = isDark ? t('header.themeLight') : t('header.themeDark');

  return (
    <IconButton
      type="button"
      title={title}
      aria-label={title}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
