import React from 'react';
import styled from '@emotion/styled';
import * as flags from '@via-profit/ui-kit/src/CountryFlags';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage, useIntl } from 'react-intl';

const Grid = styled.ul`
  margin: 1em 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7em, 1fr));
  gap: 0.5em;
  max-height: 24em;
  overflow-y: auto;
`;

const Cell = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
  padding: 0.6em 0.3em;
  text-align: center;
  font-size: 0.8em;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.04).toString()};

  & > svg {
    font-size: 2em;
  }
`;

const Code = styled.strong`
  font-family: monospace;
`;

const codes = (Object.keys(flags) as (keyof typeof flags)[]).filter(code => code !== 'Unknown');

const ExampleCountryFlagsGallery: React.FC = () => {
  const intl = useIntl();
  const [query, setQuery] = React.useState('');

  const regionNames = React.useMemo(() => {
    try {
      return new Intl.DisplayNames([intl.locale], { type: 'region' });
    } catch {
      return null;
    }
  }, [intl.locale]);

  const getName = React.useCallback(
    (code: string) => {
      try {
        // Non-ISO codes (e.g. GEAB) are not supported by Intl.DisplayNames
        return regionNames?.of(code) ?? '';
      } catch {
        return '';
      }
    },
    [regionNames],
  );

  const items = React.useMemo(() => {
    const needle = query.trim().toLowerCase();

    return codes
      .map(code => ({ code, name: getName(code) }))
      .filter(
        ({ code, name }) =>
          needle === '' ||
          code.toLowerCase().includes(needle) ||
          name.toLowerCase().includes(needle),
      );
  }, [query, getName]);

  return (
    <>
      <TextField
        fullWidth
        label={intl.formatMessage({ defaultMessage: 'Поиск по коду или названию' })}
        value={query}
        onChange={event => setQuery(event.currentTarget.value)}
      />
      <Grid>
        {items.map(({ code, name }) => {
          const Flag = flags[code];

          return (
            <Cell key={code}>
              <Flag />
              <Code>{code}</Code>
              {name && name !== code && <span>{name}</span>}
            </Cell>
          );
        })}
      </Grid>
      {items.length === 0 && <FormattedMessage defaultMessage="Ничего не найдено" />}
    </>
  );
};

export default ExampleCountryFlagsGallery;
