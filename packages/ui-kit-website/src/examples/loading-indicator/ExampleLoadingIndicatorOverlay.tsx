import React from 'react';
import styled from '@emotion/styled';
import { LoadingOverlay } from '@via-profit/ui-kit/src/LoadingIndicator';
import Surface from '@via-profit/ui-kit/src/Surface';
import Button from '@via-profit/ui-kit/src/Button';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

// The overlay covers the nearest positioned ancestor
const Block = styled.div`
  position: relative;
  margin-bottom: 1em;
`;

const Overlay = styled(LoadingOverlay)`
  border-radius: inherit;
  background-color: ${({ theme }) => theme.color.surface.alpha(0.7).toString()};
`;

const ExampleLoadingIndicatorOverlay: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <Block>
        <Surface header={<FormattedMessage defaultMessage="Отчёт за месяц" />}>
          <Paragraph>
            <FormattedMessage defaultMessage="Выручка выросла на 12%, количество заказов — на 8%." />
          </Paragraph>
        </Surface>
        {isLoading && <Overlay />}
      </Block>
      <Button onClick={() => setIsLoading(value => !value)}>
        {isLoading ? (
          <FormattedMessage defaultMessage="Скрыть индикатор" />
        ) : (
          <FormattedMessage defaultMessage="Показать индикатор" />
        )}
      </Button>
    </>
  );
};

export default ExampleLoadingIndicatorOverlay;
