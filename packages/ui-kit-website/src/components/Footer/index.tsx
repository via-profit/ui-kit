import React from 'react';
import styled from '@emotion/styled';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.color.backgroundSecondary.darken(20).toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  padding: 1rem 2rem;
  min-height: 12rem;
`;

const Footer: React.FC = () => (
  <Container>
    <>Footer</>
  </Container>
);

export default Footer;
