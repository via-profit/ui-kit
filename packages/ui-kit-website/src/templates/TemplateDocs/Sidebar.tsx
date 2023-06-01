import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 20%;
  min-width: 16em;
  background-color: orange;
`;

const Sidebar: React.FC = () => (
  <Container>
    <Link to="/docs/buttons">Buttons</Link>
  </Container>
);

export default Sidebar;
