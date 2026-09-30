import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';
import { useIntl } from 'react-intl';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleBadgeClickable: React.FC = () => {
  const intl = useIntl();
  const categories = React.useMemo(
    () => [
      intl.formatMessage({ defaultMessage: 'Книги' }),
      intl.formatMessage({ defaultMessage: 'Музыка' }),
      intl.formatMessage({ defaultMessage: 'Фильмы' }),
      intl.formatMessage({ defaultMessage: 'Игры' }),
    ],
    [intl],
  );
  const [selected, setSelected] = React.useState<readonly string[]>([categories[0]]);

  const toggle = (category: string) =>
    setSelected(current =>
      current.includes(category) ? current.filter(c => c !== category) : [...current, category],
    );

  return (
    <Group>
      {categories.map(category => {
        const isSelected = selected.includes(category);

        return (
          <Badge
            key={category}
            color="primary"
            variant={isSelected ? 'standard' : 'outlined'}
            aria-pressed={isSelected}
            onClick={() => toggle(category)}
          >
            {category}
          </Badge>
        );
      })}
    </Group>
  );
};

export default ExampleBadgeClickable;
