import React from 'react';
import styled from '@emotion/styled';
import Pagination from '@via-profit/ui-kit/src/Pagination';
import Surface from '@via-profit/ui-kit/src/Surface';

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ExamplePaginationAppearance: React.FC = () => (
  <Rows>
    <Pagination count={8} defaultPage={3} aria-label="default" />
    <Pagination
      count={8}
      defaultPage={3}
      variant="plain"
      navigationVariant="plain"
      aria-label="plain"
    />
    <Pagination
      count={8}
      defaultPage={3}
      variant="outlined"
      color="secondary"
      navigationVariant="standard"
      aria-label="outlined, secondary"
    />
    <Pagination
      count={8}
      defaultPage={3}
      color="#e0435f"
      navigationColor="#e0435f"
      aria-label="#e0435f"
    />
    {/* On the surface the not selected pages keep a soft fill and stay visible */}
    <Surface>
      <Pagination count={8} defaultPage={3} aria-label="surface" />
    </Surface>
  </Rows>
);

export default ExamplePaginationAppearance;
