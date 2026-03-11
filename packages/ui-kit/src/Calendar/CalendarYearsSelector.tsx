import React from 'react';
import styled from '@emotion/styled';
import YearCell, { CalendarYearCellProps } from './CalendarYearCell';

import useCalendar from './use-calendar';
import VirtualizedList from '../Menu/VirtualizedList';
// import VirtualizedItem from '../Menu/VirtualizedItem';

export type CalendarYearsSelectorProps = {
  readonly years: readonly number[];
  /**
   * Cell accent color
   */
  readonly accentColor: 'primary' | 'secondary' | string;
  /**
   * calendar locale
   */
  readonly locale: string;

  /**
   * Calendar date
   */
  readonly date: Date;

  /**
   * Minimum date limit

   */
  readonly minDate: Date;

  /**
   * Maximum date limit
   */
  readonly maxDate: Date;

  /**
   * Selected year callback
   */
  readonly onChange: (year: number) => void;

  /**
   * Overridable components map
   */
  readonly overrides?: CalendarYearsSelectorOverrides;
};

export type CalendarYearsSelectorOverrides = {
  /**
   * Year cell element in years list
   */
  readonly YearCell?: React.ComponentType<
    CalendarYearCellProps & React.RefAttributes<HTMLButtonElement>
  >;
};

type ItemChunk = Item[];

type Item = {
  readonly label: string;
  readonly value: number;
};

const SelectorContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0.8em;
  height: 100%;
  width: 100%;
`;

const SelectorContainerInner = styled.div`
  flex: 1;
  position: relative;
`;

const Chunk = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CalendarYearsSelector: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarYearsSelectorProps
> = (props, ref) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const {
    years,
    date,
    overrides,
    accentColor = 'primary',
    locale = 'ru-RU',
    minDate,
    maxDate,
    onChange,
  } = props;
  const [maxHeight, setMaxHeight] = React.useState<number | undefined>(undefined);

  const overridesMap = React.useMemo(
    () => ({
      YearCell: overrides?.YearCell || YearCell,
    }),
    [overrides],
  );

  const { getYearLabel } = useCalendar({
    locale,
    minDate,
    maxDate,
    weekStartDay: 'monday',
    displayLeadingZero: false,
  });

  const items2: readonly ItemChunk[] = React.useMemo(() => {
    const list: Item[][] = [];
    for (let i = 0; i < years.length; i += 3) {
      list.push(
        years.slice(i, i + 3).map(year => {
          const item: Item = {
            value: year,
            label: getYearLabel(new Date(year, date.getMonth(), date.getDate(), 0, 0, 0, 0)),
          };

          return item;
        }),
      );
    }

    return list;
  }, [date, getYearLabel, years]);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      setMaxHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, []);

  const renderItem = React.useCallback(
    (item: ItemChunk) => (
      <Chunk>
        {item.map(item => {
          const isSelected = date.getFullYear() === item.value;

          return (
            <overridesMap.YearCell
              key={item.value}
              accentColor={accentColor}
              isSelected={isSelected}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </overridesMap.YearCell>
          );
        })}
      </Chunk>
    ),
    [accentColor, date, onChange, overridesMap],
  );

  return (
    <SelectorContainer ref={ref}>
      <SelectorContainerInner ref={containerRef}>
        {maxHeight && <VirtualizedList items={items2} renderItem={renderItem} />}
      </SelectorContainerInner>
    </SelectorContainer>
  );
};

export default React.forwardRef(CalendarYearsSelector);
