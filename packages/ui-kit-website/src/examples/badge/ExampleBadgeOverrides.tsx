import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';

import BadgeContainer from '@via-profit/ui-kit/src/Badge/BadgeContainer';
import BadgeTextWrapper from '@via-profit/ui-kit/src/Badge/BadgeTextWrapper';

const StyledContainer = styled(BadgeContainer)`
  background-color: red !important;
`;

const StyledTextWrapper = styled(BadgeTextWrapper)`
  color: #fff !important;
`;

const ExampleBadgeOverrides: React.FC = () => (
  <>
    <Badge
      variant="standard"
      overrides={{
        Container: React.forwardRef(function Override(props, ref) {
          return <StyledContainer {...props} ref={ref} />;
        }),
        TextWrapper: React.forwardRef(function Override(props, ref) {
          return <StyledTextWrapper {...props} ref={ref} />;
        }),
      }}
    >
      Standard
    </Badge>
  </>
);

export default ExampleBadgeOverrides;
