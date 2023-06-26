import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import SurfaceContainer from '@via-profit/ui-kit/src/Surface/SurfaceContainer';

const Container = styled(SurfaceContainer)`
  width: 20%;
  min-width: 16em;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary.toString()};
  color: ${({ theme }) => theme.colors.accentPrimaryContrast.toString()};
`;

const ItemsList = styled.nav`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 5rem;
`;

type ItemStyle = {
  readonly $isActive: boolean;
};

const Item = styled(Link, { shouldForwardProp: p => p.match(/^\$/) === null })<ItemStyle>`
  color: currentColor;
  text-decoration: none;
  padding: 1em 1.2em;
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary.lighten(15).toString()};
  }
  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.colors.accentPrimary.toString()};
    `};
`;

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Container noMargin>
      <ItemsList>
        <Item $isActive={matchPath('/docs/button', pathname) !== null} to="/docs/button">
          Button
        </Item>
        <Item $isActive={matchPath('/docs/text-field', pathname) !== null} to="/docs/text-field">
          TextField
        </Item>
        <Item $isActive={matchPath('/docs/table', pathname) !== null} to="/docs/table">
          Tables
        </Item>
        <Item $isActive={matchPath('/docs/theme', pathname) !== null} to="/docs/theme">
          Themes
        </Item>
      </ItemsList>
    </Container>
  );
};

export default Sidebar;
