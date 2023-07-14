import React from 'react';
import styled from '@emotion/styled';

import BR from '@via-profit/ui-kit/src/CountryFlags/BR';
import RU from '@via-profit/ui-kit/src/CountryFlags/RU';
import IN from '@via-profit/ui-kit/src/CountryFlags/IN';
import CN from '@via-profit/ui-kit/src/CountryFlags/CN';
import ZA from '@via-profit/ui-kit/src/CountryFlags/ZA';

const Container = styled.div`
  & > svg {
    margin: 1em;
  }
`;

const ExampleCountryFlagsOverview: React.FC = () => (
  <Container>
    <BR />
    <RU />
    <IN />
    <CN />
    <ZA />
  </Container>
);

export default ExampleCountryFlagsOverview;
