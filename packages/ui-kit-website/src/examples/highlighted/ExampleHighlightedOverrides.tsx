import React from 'react';
import styled from '@emotion/styled';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import HighlightedMark from '@via-profit/ui-kit/src/Highlighted/HighlightedMark';
import { useIntl } from 'react-intl';

// Defined once at module level, not during the render
const Mark = styled(HighlightedMark)`
  padding: 0 0.15em;
  border-radius: 0.2em;
  font-weight: inherit;
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const overrides = { Mark };

const ExampleHighlightedOverrides: React.FC = () => {
  const intl = useIntl();

  return (
    <Highlighted
      text={intl.formatMessage({ defaultMessage: 'Доставка по Москве и Московской области' })}
      highlight={intl.formatMessage({ defaultMessage: 'моск' })}
      overrides={overrides}
    />
  );
};

export default ExampleHighlightedOverrides;
