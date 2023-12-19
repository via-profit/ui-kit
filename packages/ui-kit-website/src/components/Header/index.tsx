import React from 'react';
import styled from '@emotion/styled';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';

import ThemeSwitcher from './ThemeSwitcher';

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  padding: 1em 2em;
  display: flex;
  box-shadow: ${({ theme }) => theme.color.surface.darken(100).alpha(0.2).toString()} 0 0.3em 0.6em;
  padding: 0 2em;
  height: 4.8rem;

  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Paragraph)`
  font-weight: 800;
  font-size: 1.4em;
  margin: 0;
`;

interface HeaderProps {
  readonly title?: string;
}

const Header: React.FC<HeaderProps> = props => {
  const { title } = props;

  return (
    <Container>
      <Title>{title}</Title>
      <ThemeSwitcher />
    </Container>
  );
};

export default Header;
