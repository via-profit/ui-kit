import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Surface from '@via-profit/ui-kit/src/Surface';

const Container = styled(Surface)`
  width: 20%;
  min-width: 16em;
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
`;

const ItemsList = styled.nav`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 5rem;
`;

const Item = styled(Link)`
  color: currentColor;
  text-decoration: none;
  padding: 1em 1.2em;
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.darken(20).toString()};
  }
`;

const Sidebar: React.FC = () => (
  <Container noMargin>
    <ItemsList>
      <Item to="/docs/button">Button</Item>
      <Item to="/docs/text-field">TextField</Item>
      <Item to="/docs/table">Tables</Item>
      <Item to="/docs/theme">Themes</Item>
    </ItemsList>
  </Container>
);

export default Sidebar;
