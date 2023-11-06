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

const ExampleBadgeColors: React.FC = () => (
  <>
    <BadgeGroup>
      <Badge variant="standard" color="primary">
        Standard primary
      </Badge>
      <Badge variant="outlined" color="secondary">
        Outlined secondary
      </Badge>
    </BadgeGroup>
    <BadgeGroup>
      <Badge variant="standard" color="lightpink">
        Standard lightpink
      </Badge>
      <Badge variant="outlined" color="#529d29">
        Outlined #529d29
      </Badge>
    </BadgeGroup>
  </>
);

export default ExampleBadgeColors;
