import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import { FormattedMessage } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
`;

// Content up to the edges, e.g. an image or a map
const Cover = styled.div`
  width: 12em;
  height: 7em;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.accentPrimary.toString()},
    ${({ theme }) => theme.color.accentSecondary.toString()}
  );
`;

const Round = styled(Surface)`
  width: 6em;
  height: 6em;
  font-size: 1.4em;
  font-weight: 600;
`;

const ExampleSurfaceVariants: React.FC = () => (
  <Row>
    <Surface inline>inline</Surface>
    <Surface inline noPadding>
      <Cover />
    </Surface>
    <Round inline rounded>
      <FormattedMessage defaultMessage="24°" />
    </Round>
  </Row>
);

export default ExampleSurfaceVariants;
