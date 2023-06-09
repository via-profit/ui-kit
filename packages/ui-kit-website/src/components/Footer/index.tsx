import React from 'react';
import styled from '@emotion/styled';

const Container = styled.footer`
  background-color: ${({ theme }) =>
    theme.isDark
      ? theme.colors.backgroundPrimary.darken(30).toString()
      : theme.colors.backgroundPrimary.toString()};
  padding: 2rem 2rem;
  height: 6rem;
  border-top: 1px solid;
  border-top-color: ${({ theme }) =>
    theme.isDark ? 'transparent' : theme.colors.backgroundPrimary.darken(20).toString()};
`;

const Footer: React.FC = () => (
  <Container>
    <>Footer</>
  </Container>
);

export default Footer;
