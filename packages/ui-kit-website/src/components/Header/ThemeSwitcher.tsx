import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import SunIcon from '~/components/Icons/SunOutline';
import MoonIcon from '~/components/Icons/MoonOutline';
import { uiActions } from '~/redux/ui';
import IconButton from './IconButton';

const selector = createStructuredSelector({
  currentThemeName: (store: ReduxStore) => store.ui.theme,
});

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { currentThemeName } = useSelector(selector);
  const isDark = currentThemeName === 'dark';

  const switchTheme = React.useCallback(() => {
    dispatch(uiActions.theme(isDark ? 'light' : 'dark'));
  }, [isDark, dispatch]);

  const title = isDark
    ? intl.formatMessage({ defaultMessage: 'Включить светлую тему' })
    : intl.formatMessage({ defaultMessage: 'Включить тёмную тему' });

  return (
    <IconButton type="button" title={title} aria-label={title} onClick={switchTheme}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
