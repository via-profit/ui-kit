import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@via-profit/ui-kit/src/Button';
import { uiActions } from '~/redux/ui';

const selector = createStructuredSelector({
  currentTheme: (store: ReduxStore) => store.ui.theme,
});

const ThemeSwitcher: React.FC = () => {
  const { currentTheme } = useSelector(selector);
  const dispatch = useDispatch();
  const nextTheme = React.useMemo(
    () => (currentTheme === 'light' ? 'dark' : 'light'),
    [currentTheme],
  );

  return (
    <Button
      variant="standard"
      onClick={() => dispatch(uiActions.theme(nextTheme))}
    >{`Switch to ${nextTheme}`}</Button>
  );
};

export default ThemeSwitcher;
