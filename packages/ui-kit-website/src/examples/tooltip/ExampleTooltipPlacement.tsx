import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Tooltip from '@via-profit/ui-kit/src/Tooltip';
import { FormattedMessage, useIntl } from 'react-intl';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 0.5em;
  justify-content: center;
  padding: 2em 0;
`;

const ExampleTooltipPlacement: React.FC = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ defaultMessage: 'Подсказка' });

  return (
    <Grid>
      <Tooltip arrow placement="top-start" title={title}>
        <Button variant="outlined">top-start</Button>
      </Tooltip>
      <Tooltip arrow placement="top" title={title}>
        <Button variant="outlined">top</Button>
      </Tooltip>
      <Tooltip arrow placement="top-end" title={title}>
        <Button variant="outlined">top-end</Button>
      </Tooltip>
      <Tooltip arrow placement="left" title={title}>
        <Button variant="outlined">left</Button>
      </Tooltip>
      <span />
      <Tooltip arrow placement="right" title={title}>
        <Button variant="outlined">right</Button>
      </Tooltip>
      <Tooltip arrow placement="bottom-start" title={title}>
        <Button variant="outlined">bottom-start</Button>
      </Tooltip>
      <Tooltip
        arrow
        placement="bottom"
        title={
          <FormattedMessage defaultMessage="Подсказка может быть длинной: текст переносится, ширина не больше 20em" />
        }
        describeChild
      >
        <Button variant="outlined">bottom</Button>
      </Tooltip>
      <Tooltip arrow placement="bottom-end" title={title}>
        <Button variant="outlined">bottom-end</Button>
      </Tooltip>
    </Grid>
  );
};

export default ExampleTooltipPlacement;
