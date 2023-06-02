import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 20%;
  min-width: 16em;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary().darken(10).toString()};
  color: ${({ theme }) => theme.colors.textPrimary().toString()};
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
    background-color: ${({ theme }) => theme.colors.backgroundPrimary().darken(20).toString()};
  }
`;

const Sidebar: React.FC = () => (
  <Container>
    <ItemsList>
      <Item to="/docs/buttons">Button</Item>
      <Item to="/docs/text-fields">TextField</Item>
    </ItemsList>
  </Container>
);

export default Sidebar;
