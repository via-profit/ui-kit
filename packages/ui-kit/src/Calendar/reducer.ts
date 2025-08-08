import { CalendarValue } from './use-calendar';

export type State<Range extends boolean | undefined = undefined> = {
  readonly calendarDate: Date;
  readonly calendarValue: CalendarValue<Range>;
  readonly calendarCurrentView: CalendarView;
  readonly calendarViewVariants: readonly CalendarView[];
};

export type CalendarView = 'days' | 'months' | 'years';

export const createDefaultState = <Range extends boolean | undefined = undefined>(
  range?: Range,
): State<Range> => {
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 3);

  return {
    calendarValue: range
      ? ([currentDate, nextDate] as CalendarValue<Range>)
      : (new Date() as CalendarValue<Range>),
    calendarDate: range ? currentDate : new Date(),
    calendarCurrentView: 'days',
    calendarViewVariants: ['years', 'months', 'days'],
  };
};

export type Action<Range extends boolean | undefined = undefined> = {
  readonly type: 'setPartial';
  readonly payload: Partial<State<Range>>;
};

export const reducer = <Range extends boolean | undefined = undefined>(
  state: State<Range>,
  action: Action<Range>,
) => {
  switch (action.type) {
    case 'setPartial':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
