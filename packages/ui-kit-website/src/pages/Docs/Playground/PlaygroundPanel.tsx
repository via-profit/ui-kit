import React from 'react';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Slider from '@via-profit/ui-kit/src/Slider';
import type { ThemePadding } from '@via-profit/ui-kit/src/ThemeProvider';

import SyntaxHighlighter from '~/components/SyntaxHighlighter';
import {
  PlaygroundValues,
  PresetName,
  PADDING_KINDS,
  PRESETS,
  DEFAULT_VALUES,
  findPreset,
  toEm,
  toThemeCode,
} from './values';

export type PlaygroundPanelProps = {
  readonly values: PlaygroundValues;
  readonly onChange: (values: PlaygroundValues) => void;
};

const Panel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
`;

const Group = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
`;

const GroupTitle = styled.legend`
  padding: 0;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const GroupHint = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Row = styled.label`
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr) 3.5rem;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
`;

const RowValue = styled.span`
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

// The panel is narrow: the long lines of the code are wrapped instead of the horizontal scroll
const Code = styled.div`
  font-size: 0.75rem;

  & pre {
    margin: 0;
  }

  & pre,
  & code {
    white-space: pre-wrap !important;
  }
`;

type SliderRowProps = {
  readonly label: string;
  readonly ariaLabel: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly format: (value: number) => string;
  readonly onChange: (value: number) => void;
};

const SliderRow: React.FC<SliderRowProps> = props => {
  const { label, ariaLabel, value, min, max, step, format, onChange } = props;

  return (
    <Row>
      <span aria-hidden>{label}</span>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        color="primary"
        getAriaLabel={() => ariaLabel}
        getAriaValueText={format}
        onChange={onChange}
      />
      <RowValue>{format(value)}</RowValue>
    </Row>
  );
};

const PlaygroundPanel: React.FC<PlaygroundPanelProps> = props => {
  const { values, onChange } = props;
  const intl = useIntl();
  const preset = findPreset(values.padding);

  const kindLabels: Record<ThemePadding, string> = {
    control: intl.formatMessage({ defaultMessage: 'Контролы: кнопки и поля' }),
    item: intl.formatMessage({ defaultMessage: 'Строки: меню, таблицы, вкладки' }),
    container: intl.formatMessage({ defaultMessage: 'Панели: карточки, окна, уведомления' }),
  };

  const axisLabels = {
    y: intl.formatMessage({ defaultMessage: 'сверху и снизу' }),
    x: intl.formatMessage({ defaultMessage: 'слева и справа' }),
  };

  const setPadding = (kind: ThemePadding, axis: 'y' | 'x', value: number) =>
    onChange({
      ...values,
      padding: { ...values.padding, [kind]: { ...values.padding[kind], [axis]: value } },
    });

  const handlePreset = (name: string | null) => {
    // Clicking the selected preset again does not unselect it
    if (name) {
      onChange({ ...values, padding: PRESETS[name as PresetName] });
    }
  };

  return (
    <Panel aria-label={intl.formatMessage({ defaultMessage: 'Настройки темы' })}>
      <ButtonGroup
        fullWidth
        aria-label={intl.formatMessage({ defaultMessage: 'Готовые наборы отступов' })}
        value={preset}
        onChange={handlePreset}
      >
        <Button value="compact">{intl.formatMessage({ defaultMessage: 'Плотно' })}</Button>
        <Button value="default">{intl.formatMessage({ defaultMessage: 'Обычно' })}</Button>
        <Button value="comfortable">{intl.formatMessage({ defaultMessage: 'Просторно' })}</Button>
      </ButtonGroup>

      {PADDING_KINDS.map(kind => (
        <Group key={kind}>
          <GroupTitle>
            <code>padding.{kind}</code>
            <GroupHint>{kindLabels[kind]}</GroupHint>
          </GroupTitle>
          {(['y', 'x'] as const).map(axis => (
            <SliderRow
              key={axis}
              label={axis}
              ariaLabel={`padding.${kind}.${axis}, ${axisLabels[axis]}`}
              value={values.padding[kind][axis]}
              min={0}
              max={2}
              step={0.05}
              format={toEm}
              onChange={value => setPadding(kind, axis, value)}
            />
          ))}
        </Group>
      ))}

      <Group>
        <GroupTitle>
          {intl.formatMessage({ defaultMessage: 'Размер шрифта' })}
          <GroupHint>
            {intl.formatMessage({
              defaultMessage: 'Масштаб: отступы в em растут вместе со шрифтом',
            })}
          </GroupHint>
        </GroupTitle>
        <SliderRow
          label="px"
          ariaLabel={intl.formatMessage({ defaultMessage: 'Размер шрифта' })}
          value={values.fontSize}
          min={12}
          max={20}
          step={1}
          format={value => `${value}px`}
          onChange={fontSize => onChange({ ...values, fontSize })}
        />
      </Group>

      <Button variant="outlined" onClick={() => onChange(DEFAULT_VALUES)}>
        {intl.formatMessage({ defaultMessage: 'Сбросить' })}
      </Button>

      <Code>
        <SyntaxHighlighter language="ts" code={toThemeCode(values.padding)} />
      </Code>
    </Panel>
  );
};

export default PlaygroundPanel;
