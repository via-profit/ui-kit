import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleButtonVariants: React.FC = () => (
  <Row>
    <Button variant="standard">standard</Button>
    <Button variant="outlined">outlined</Button>
    <Button variant="plain">plain</Button>
  </Row>
);

export default ExampleButtonVariants;
