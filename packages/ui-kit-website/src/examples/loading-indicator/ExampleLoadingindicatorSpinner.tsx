import React from 'react';
import styled from '@emotion/styled';

import Surface from '@via-profit/ui-kit/src/Surface';
import { Spinner } from '@via-profit/ui-kit/src/LoadingIndicator';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StandardSpinner = styled(Spinner)`
  font-size: 1em;
`;

const MediumSpinner = styled(Spinner)`
  font-size: 2em;
`;

const LargeSpinner = styled(Spinner)`
  font-size: 3em;
`;

const GiantSpinner = styled(Spinner)`
  font-size: 4em;
`;

const ExampleLoadingindicatorSpinner: React.FC = () => (
  <div>
    <Surface title="Spinner">
      <Container>
        <StandardSpinner />
        <MediumSpinner />
        <LargeSpinner />
        <GiantSpinner />
      </Container>
    </Surface>
  </div>
);

export default ExampleLoadingindicatorSpinner;
