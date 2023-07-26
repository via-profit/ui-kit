import React from 'react';
import styled from '@emotion/styled';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  padding: 1rem 2rem;
`;

const Footer: React.FC = () => (
  <Container>
    <>Footer</>
  </Container>
);

export default Footer;
