import React from 'react';
import styled from '@emotion/styled';
import Tooltip from '@via-profit/ui-kit/src/Tooltip';
import TooltipContainer from '@via-profit/ui-kit/src/Tooltip/TooltipContainer';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Container = styled(TooltipContainer)`
  padding: 0.75em 1em;
  font-size: 0.85em;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: 0 0.3em 1.2em rgba(0, 0, 0, 0.18);
  border: 1px solid ${({ theme }) => theme.color.textPrimary.alpha(0.12).toString()};
`;

const overrides = { Container };

const Term = styled.span`
  border-bottom: 1px dashed currentColor;
  cursor: help;
`;

const ExampleTooltipOverrides: React.FC = () => (
  <p>
    <FormattedMessage
      defaultMessage="Сумма указана с учётом {nds}."
      values={{
        nds: (
          <Tooltip
            describeChild
            arrow
            overrides={overrides}
            title={<FormattedMessage defaultMessage="Налог на добавленную стоимость, 20%" />}
          >
            <Term tabIndex={0}>
              <FormattedMessage defaultMessage="НДС" />
            </Term>
          </Tooltip>
        ),
      }}
    />
  </p>
);

export default ExampleTooltipOverrides;
