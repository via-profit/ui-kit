import React from 'react';
import styled from '@emotion/styled';
import Spinner from '@via-profit/ui-kit/src/LoadingIndicator';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const ExampleLoadingIndicatorStatic: React.FC = () => (
  <Row>
    <Spinner size={16} fill={false} />
    <Spinner size="1.5em" fill={false} />
    <Spinner fill={false} />
    <Spinner size="4em" fill={false} />
  </Row>
);

export default ExampleLoadingIndicatorStatic;
