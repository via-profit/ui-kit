import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Logo from '~/components/Logo';
import ThemeSwitcher from './ThemeSwitcher';

const Container = styled.header`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary().toString()};
  box-shadow: ${({ theme }) => theme.colors.backgroundPrimary().darken(30).alpha(0.5).toString()}
    0px 6px 10px;
  padding: 0 2em;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary().toString()};
`;

const Header: React.FC = () => (
  <Container>
    <LogoLink to="/">
      <Logo />
    </LogoLink>
    <ThemeSwitcher />
  </Container>
);

export default Header;
