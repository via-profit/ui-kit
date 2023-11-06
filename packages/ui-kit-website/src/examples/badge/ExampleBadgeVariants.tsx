import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';

const BadgeGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleBadgeVariants: React.FC = () => (
  <>
    <BadgeGroup>
      <Badge variant="standard">Standard</Badge>
      <Badge variant="outlined">Outlined</Badge>
    </BadgeGroup>
  </>
);

export default ExampleBadgeVariants;
