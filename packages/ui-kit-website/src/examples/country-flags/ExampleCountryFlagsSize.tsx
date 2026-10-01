import React from 'react';
import styled from '@emotion/styled';
import BR from '@via-profit/ui-kit/src/CountryFlags/BR';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

// Rounded corners and a thin border, so the white parts of the flag are visible on a white background
const Flag = styled(BR)`
  border-radius: 0.15em;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.textPrimary.alpha(0.15).toString()};
`;

const ExampleCountryFlagsSize: React.FC = () => (
  <Row>
    <Flag />
    <Flag style={{ fontSize: '2em' }} />
    <Flag width="6em" height="4em" />
  </Row>
);

export default ExampleCountryFlagsSize;
