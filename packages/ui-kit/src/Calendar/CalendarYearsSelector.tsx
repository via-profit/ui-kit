import React from 'react';
import styled from '@emotion/styled';
import YearCell, { CalendarYearCellProps } from './CalendarYearCell';

import useCalendar from './use-calendar';

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

/**
 * A plain scrollable grid: a couple of hundreds buttons do not need the virtualization
 */
const SelectorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  padding: 0.8em;
  height: 100%;
  box-sizing: border-box;
`;

const CalendarYearsSelector: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarYearsSelectorProps
> = (props, ref) => {
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
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const selectedRef = React.useRef<HTMLButtonElement | null>(null);

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

  // Show the selected year in the middle of the list.
  // The container is scrolled directly: scrollIntoView would scroll the page too
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    const selected = selectedRef.current;
    if (container && selected) {
      container.scrollTop =
        selected.offsetTop -
        container.offsetTop -
        container.clientHeight / 2 +
        selected.offsetHeight / 2;
    }
  }, []);

  const setRefs = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  return (
    <SelectorContainer ref={setRefs}>
      {years.map(year => {
        const isSelected = date.getFullYear() === year;

        return (
          <overridesMap.YearCell
            key={year}
            ref={isSelected ? selectedRef : undefined}
            accentColor={accentColor}
            isSelected={isSelected}
            aria-pressed={isSelected}
            onClick={() => onChange(year)}
          >
            {getYearLabel(new Date(year, 0, 1))}
          </overridesMap.YearCell>
        );
      })}
    </SelectorContainer>
  );
};

export default React.forwardRef(CalendarYearsSelector);
