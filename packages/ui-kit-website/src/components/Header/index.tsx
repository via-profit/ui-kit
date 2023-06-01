import React from 'react';
import styled from '@emotion/styled';

import Logo from '~/components/Logo';

const Container = styled.header`
  position: sticky;
  top: 0;
  background-color: red;
  padding: 1em 2em;
`;

const LogoElem = styled(Logo)`
  font-size: 2rem;
`;

const Header: React.FC = () => (
  <Container>
    <LogoElem />
  </Container>
);

export default Header;
