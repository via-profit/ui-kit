import React from 'react';
import styled from '@emotion/styled';
import HintPopover from '@via-profit/ui-kit/src/HintPopover';
import HintPopoverContainer from '@via-profit/ui-kit/src/HintPopover/HintPopoverContainer';
import { FormattedMessage, useIntl } from 'react-intl';

// Defined once at module level, not during the render
const Container = styled(HintPopoverContainer)`
  max-width: 30em;
  border-top: 3px solid ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const overrides = { Container };

const ExampleHintPopoverOverrides: React.FC = () => {
  const intl = useIntl();

  return (
    <span>
      <FormattedMessage defaultMessage="Цена в регионе" />
      <HintPopover
        overrides={overrides}
        label={intl.formatMessage({ defaultMessage: 'Как считается цена' })}
      >
        <FormattedMessage defaultMessage="Цена в регионе — базовая стоимость, умноженная на коэффициент региона, с округлением до 10 ₽." />
      </HintPopover>
    </span>
  );
};

export default ExampleHintPopoverOverrides;
