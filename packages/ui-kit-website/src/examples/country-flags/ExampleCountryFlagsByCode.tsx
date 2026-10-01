import React from 'react';
import styled from '@emotion/styled';
import * as flags from '@via-profit/ui-kit/src/CountryFlags';
import TextField from '@via-profit/ui-kit/src/TextField';
import { useIntl } from 'react-intl';

type FlagCode = keyof typeof flags;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1em;
`;

const Preview = styled.span`
  font-size: 2.6em;
  line-height: 1;
  display: inline-flex;
`;

const ExampleCountryFlagsByCode: React.FC = () => {
  const intl = useIntl();
  const [code, setCode] = React.useState('JP');
  const key = code.toUpperCase() as FlagCode;
  // The placeholder for an unknown code
  const Flag = key in flags ? flags[key] : flags.Unknown;

  return (
    <Row>
      <TextField
        label={intl.formatMessage({ defaultMessage: 'Код страны' })}
        value={code}
        maxLength={4}
        onChange={event => setCode(event.currentTarget.value)}
      />
      <Preview>
        <Flag aria-label={code} />
      </Preview>
    </Row>
  );
};

export default ExampleCountryFlagsByCode;
