import React from 'react';
import styled from '@emotion/styled';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary.toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  padding: 1rem 2rem;
`;

const Footer: React.FC = () => (
  <Container>
    <>Footer</>
  </Container>
);

export default Footer;
