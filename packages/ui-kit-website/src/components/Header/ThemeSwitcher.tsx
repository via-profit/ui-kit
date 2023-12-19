import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Icon from '~/components/Icons/PaletteOutline';
import Button from '@via-profit/ui-kit/src/Button';
import { uiActions } from '~/redux/ui';

const Container = styled.div`
  & > button {
    margin-right: 0.2em;
  }
  & > button:last-of-type {
    margin-right: 0;
  }
`;

const selector = createStructuredSelector({
  currentThemeName: (store: ReduxStore) => store.ui.theme,
});

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { currentThemeName } = useSelector(selector);

  const switchTheme = React.useCallback(() => {
    dispatch(uiActions.theme(currentThemeName === 'dark' ? 'light' : 'dark'));
  }, [currentThemeName, dispatch]);

  return (
    <Container>
      <Button
        iconOnly
        title={intl.formatMessage({ defaultMessage: 'Сменить тему' })}
        type="button"
        onClick={() => switchTheme()}
      >
        <Icon />
      </Button>
    </Container>
  );
};

export default ThemeSwitcher;
