import * as React from 'react';
import { CalendarComponent, CalendarProps, CalendarRef } from './CalendarComponent';
import ErrorBoundary from '../ErrorBoundary';

export * from './CalendarComponent';

const Calendar = React.forwardRef(
  <IsRangeValue extends boolean | undefined = undefined>(
    props: CalendarProps<IsRangeValue>,
    ref: React.Ref<CalendarRef<IsRangeValue>>,
  ): React.ReactNode => (
    <ErrorBoundary>
      <CalendarComponent {...(props as any)} ref={ref} />
    </ErrorBoundary>
  ),
);

Calendar.displayName = 'Calendar';

export default Calendar as <IsRangeValue extends boolean | undefined = undefined>(
  props: CalendarProps<IsRangeValue> & { ref?: React.Ref<CalendarRef<IsRangeValue>> },
) => JSX.Element;
