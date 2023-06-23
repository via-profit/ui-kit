import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

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

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Button type="button" onClick={() => dispatch(uiActions.theme('light'))}>
        Light
      </Button>
      <Button type="button" onClick={() => dispatch(uiActions.theme('dark'))}>
        Dark
      </Button>
      <Button type="button" onClick={() => dispatch(uiActions.theme('green'))}>
        Green
      </Button>
      <Button type="button" onClick={() => dispatch(uiActions.theme('greenDark'))}>
        Green Dark
      </Button>
    </Container>
  );
};

export default ThemeSwitcher;
