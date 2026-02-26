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
  params?: {
    views?: readonly CalendarView[];
    initialView?: CalendarView;
  },
): State<Range> => {
  const { views, initialView } = params || {};

  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 3);

  let calendarViewVariants: readonly CalendarView[] = ['days', 'months', 'years'];
  let calendarCurrentView: CalendarView = 'days';

  if (views && typeof initialView === 'string') {
    if (!views.includes(initialView)) {
      throw new Error(`Property views must be contained prperty initialView`);
    }
    calendarCurrentView = initialView;
    calendarViewVariants = views;
  }

  if (views && typeof initialView !== 'string') {
    if (views.includes('days')) {
      calendarCurrentView = 'days';
      calendarViewVariants = views;
    } else {
      calendarCurrentView = views[0];
      calendarViewVariants = views;
    }
  }

  if (!views && typeof initialView === 'string') {
    calendarViewVariants = ['days', 'months', 'years'];
    calendarCurrentView = initialView;
  }

  return {
    calendarValue: range
      ? ([currentDate, nextDate] as CalendarValue<Range>)
      : (new Date() as CalendarValue<Range>),
    calendarDate: range ? currentDate : new Date(),
    calendarCurrentView,
    calendarViewVariants,
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
