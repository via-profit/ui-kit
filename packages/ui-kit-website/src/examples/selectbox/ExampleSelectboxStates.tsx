import React from 'react';
import styled from '@emotion/styled';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import { FormattedMessage, useIntl } from 'react-intl';

import IconBell from '~/components/Icons/IconBell';

type Item = {
  readonly id: string;
  readonly name: string;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  gap: 1em;
`;

type DemoProps = {
  readonly items: readonly Item[];
  readonly label: React.ReactNode;
  readonly notSetLabel: string;
  readonly required?: boolean;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly startIcon?: React.ReactElement;
};

const Demo: React.FC<DemoProps> = props => {
  const { items, required, ...restProps } = props;
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Selectbox
      {...restProps}
      fullWidth
      requiredAsterisk={required}
      error={required && value === null}
      errorText={required ? <FormattedMessage defaultMessage="Выберите значение" /> : undefined}
      value={value}
      items={items}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={item => setValue(item)}
      getOptionSelected={({ item, value }) => item.id === value.id}
      selectedItemToString={item => item.name}
    >
      {({ item }, itemProps) => (
        <SelectboxItem {...itemProps} key={item.id}>
          {item.name}
        </SelectboxItem>
      )}
    </Selectbox>
  );
};

const ExampleSelectboxStates: React.FC = () => {
  const intl = useIntl();
  const notSetLabel = intl.formatMessage({ defaultMessage: 'Не выбрано' });
  const items: Item[] = React.useMemo(
    () => [
      { id: 'low', name: intl.formatMessage({ defaultMessage: 'Низкий' }) },
      { id: 'normal', name: intl.formatMessage({ defaultMessage: 'Обычный' }) },
      { id: 'high', name: intl.formatMessage({ defaultMessage: 'Высокий' }) },
    ],
    [intl],
  );

  return (
    <Grid>
      <Demo
        items={items}
        notSetLabel={notSetLabel}
        required
        label={<FormattedMessage defaultMessage="Обязательное поле" />}
      />
      <Demo
        items={items}
        notSetLabel={notSetLabel}
        startIcon={<IconBell />}
        label={<FormattedMessage defaultMessage="С иконкой" />}
      />
      <Demo
        items={items}
        notSetLabel={notSetLabel}
        isLoading
        label={<FormattedMessage defaultMessage="Загрузка" />}
      />
      <Demo
        items={items}
        notSetLabel={notSetLabel}
        disabled
        label={<FormattedMessage defaultMessage="Недоступно" />}
      />
    </Grid>
  );
};

export default ExampleSelectboxStates;
