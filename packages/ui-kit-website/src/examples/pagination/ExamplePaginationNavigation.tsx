import React from 'react';
import styled from '@emotion/styled';
import Pagination from '@via-profit/ui-kit/src/Pagination';
import Switch from '@via-profit/ui-kit/src/Switch';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1.5em;
`;

const ExamplePaginationNavigation: React.FC = () => {
  const intl = useIntl();
  const [showFirstLast, setShowFirstLast] = React.useState(true);
  const [showPrevNext, setShowPrevNext] = React.useState(true);
  const [small, setSmall] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <Column>
      <Options>
        <Switch checked={showFirstLast} onChange={() => setShowFirstLast(!showFirstLast)}>
          showFirstLast
        </Switch>
        <Switch checked={showPrevNext} onChange={() => setShowPrevNext(!showPrevNext)}>
          showPrevNext
        </Switch>
        <Switch checked={small} onChange={() => setSmall(!small)}>
          size=&quot;small&quot;
        </Switch>
        <Switch checked={disabled} onChange={() => setDisabled(!disabled)}>
          disabled
        </Switch>
      </Options>
      <Pagination
        count={20}
        defaultPage={1}
        showFirstLast={showFirstLast}
        showPrevNext={showPrevNext}
        size={small ? 'small' : 'medium'}
        disabled={disabled}
        aria-label={intl.formatMessage({ defaultMessage: 'Страницы каталога' })}
      />
      <FormattedMessage defaultMessage="На первой странице кнопки «назад» и «в начало» недоступны, на последней — «вперёд» и «в конец»." />
    </Column>
  );
};

export default ExamplePaginationNavigation;
