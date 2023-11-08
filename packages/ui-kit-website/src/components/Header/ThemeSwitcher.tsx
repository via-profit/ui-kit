import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
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
  const { currentThemeName } = useSelector(selector);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const themeVariants: (typeof currentThemeName)[] = React.useMemo(
    () => ['light', 'dark', 'green', 'greenDark', 'blue', 'blueDark'],
    [],
  );

  return (
    <Container>
      <Button type="button" onClick={event => setAnchorEl(anchorEl ? null : event.currentTarget)}>
        <FormattedMessage defaultMessage="Сменить тему" />
      </Button>

      <Menu
        value={currentThemeName}
        items={themeVariants}
        anchorElement={anchorEl}
        isOpen={Boolean(anchorEl)}
        onRequestClose={() => setAnchorEl(null)}
        getOptionSelected={({ item, value }) => item === value}
        onSelectItem={item => {
          dispatch(uiActions.theme(item));
        }}
      >
        {({ item, index }, menuProps) => (
          <MenuItem {...menuProps} key={index}>
            {item}
          </MenuItem>
        )}
      </Menu>
    </Container>
  );
};

export default ThemeSwitcher;
