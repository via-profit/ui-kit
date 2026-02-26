import { CalendarValue } from './use-calendar';

export type State<Range extends boolean | undefined = undefined> = {
  readonly calendarDate: Date;
  readonly calendarValue: CalendarValue<Range>;
  readonly calendarCurrentView: CalendarView;
  readonly calendarViewVariants: readonly CalendarView[];
};

export type CalendarView = 'days' | 'months' | 'years' | 'weeks';

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

  let calendarViewVariants: readonly CalendarView[] | undefined = views;
  let calendarCurrentView: CalendarView | undefined = initialView;

  if (views && typeof initialView === 'string') {
    if (!views.includes(initialView)) {
      throw new Error('Property views must be contained property initialView');
    }
    calendarCurrentView = initialView;
    calendarViewVariants = views;
  }

  if (views && typeof initialView !== 'string') {
    calendarCurrentView = views[0];
    calendarViewVariants = views;
  }

  if (!views && typeof initialView === 'string') {
    calendarViewVariants = ['days', 'months', 'years', 'weeks'];
    calendarCurrentView = initialView;
  }

  if (!views && typeof initialView !== 'string') {
    calendarViewVariants = ['days', 'months', 'years', 'weeks'];
    calendarCurrentView = calendarViewVariants[0];
  }

  if (!calendarCurrentView) {
    throw new Error('Calendar initialView must be initialized');
  }

  if (!calendarViewVariants || calendarViewVariants.length === 0) {
    throw new Error('Calendar views must be initialized');
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
