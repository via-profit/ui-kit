export type State = {
  readonly calendarValue: Date;
  readonly calendarDate: Date;
  readonly calendarCurrentView: CalendarView;
  readonly calendarViewVariants: readonly CalendarView[];
};

export type CalendarView = 'days' | 'monthes' | 'years';

export const defaultState: State = {
  calendarValue: new Date(),
  calendarDate: new Date(),
  calendarCurrentView: 'days',
  calendarViewVariants: ['years', 'monthes', 'days'],
};

export type Action = {
  readonly type: 'setPartial';
  readonly payload: Partial<State>;
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
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
