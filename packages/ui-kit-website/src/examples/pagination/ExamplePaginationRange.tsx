import React from 'react';
import styled from '@emotion/styled';
import Pagination from '@via-profit/ui-kit/src/Pagination';

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Caption = styled.div`
  margin-bottom: 0.4em;
  font-size: 0.85em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const variants = [
  { siblings: 1, boundaries: 1 },
  { siblings: 0, boundaries: 1 },
  { siblings: 2, boundaries: 2 },
  { siblings: 1, boundaries: 0 },
];

// Uncontrolled: every pagination keeps its page itself, `defaultPage` is the initial one
const ExamplePaginationRange: React.FC = () => (
  <Rows>
    {variants.map(({ siblings, boundaries }) => (
      <div key={`${siblings}-${boundaries}`}>
        <Caption>
          siblings={siblings} boundaries={boundaries}
        </Caption>
        <Pagination
          count={50}
          defaultPage={25}
          siblings={siblings}
          boundaries={boundaries}
          aria-label={`siblings=${siblings} boundaries=${boundaries}`}
        />
      </div>
    ))}
  </Rows>
);

export default ExamplePaginationRange;
