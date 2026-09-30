import React from 'react';
import styled from '@emotion/styled';
import Color from '@via-profit/ui-kit/src/Color';
import TextField from '@via-profit/ui-kit/src/TextField';
import { FormattedMessage, useIntl } from 'react-intl';

const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
  gap: 0.5em;
  margin-top: 1em;
`;

const Swatch = styled.div`
  padding: 1em 0.8em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  font-size: 0.85em;
  line-height: 1.5;
`;

const Code = styled.code`
  display: block;
  opacity: 0.8;
`;

const ExampleColorBasic: React.FC = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState('#22c7d6');

  const base = React.useMemo(() => {
    try {
      return Color.fromString(value);
    } catch {
      return null;
    }
  }, [value]);

  const variants: [string, Color][] = base
    ? [
        ['lighten(60)', base.lighten(60)],
        [intl.formatMessage({ defaultMessage: 'исходный' }), base],
        ['darken(60)', base.darken(60)],
        ['alpha(0.4)', base.alpha(0.4)],
        ['mix("white", 0.5)', base.mix('white', 0.5)],
        ['mix("black", 0.5)', base.mix('black', 0.5)],
      ]
    : [];

  return (
    <>
      <TextField
        label={<FormattedMessage defaultMessage="Цвет: hex, rgb, hsl или название" />}
        value={value}
        error={base === null}
        errorText={<FormattedMessage defaultMessage="Не удалось разобрать цвет" />}
        onChange={event => setValue(event.currentTarget.value)}
      />
      <Swatches>
        {variants.map(([label, color]) => (
          <Swatch
            key={label}
            style={{
              backgroundColor: color.toString(),
              color: color.getContrastColor().toString(),
            }}
          >
            {label}
            <Code>{color.toHexString(true)}</Code>
          </Swatch>
        ))}
      </Swatches>
    </>
  );
};

export default ExampleColorBasic;
