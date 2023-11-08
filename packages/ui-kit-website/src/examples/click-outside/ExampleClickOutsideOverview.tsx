import React from 'react';
import ClickOutside from '@via-profit/ui-kit/src/ClickOutside';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const ClickableElement = styled.div`
  padding: 2em;
  border: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
  user-select: none;
`;

const ExampleClickOutsideOverview: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <ClickOutside onOutsideClick={() => setCounter(c => c + 1)}>
      <ClickableElement>
        <Paragraph>
          <FormattedMessage defaultMessage="Кликни вне этого элемента" />
        </Paragraph>
        <Paragraph>
          <FormattedMessage
            defaultMessage="Всего кликов: {counter}"
            values={{
              counter: <Strong>{counter}</Strong>,
            }}
          />
        </Paragraph>
      </ClickableElement>
    </ClickOutside>
  );
};
export default ExampleClickOutsideOverview;
