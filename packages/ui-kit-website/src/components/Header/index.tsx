import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Logo from '~/components/Logo';
import ThemeSwitcher from './ThemeSwitcher';

const Container = styled.header`
  position: sticky;
  top: 0;
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.darken(20).toString()};
  box-shadow: ${({ theme }) => theme.color.accentPrimary.darken(100).alpha(0.2).toString()} 0 0.3em
    0.6em;
  padding: 0 2em;
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  font-size: 2rem;
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
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
