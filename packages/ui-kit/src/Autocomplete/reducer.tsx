import React from 'react';

import type { Value, AnchorElement } from '@via-profit/ui-kit/src/Menu';

type State<T, Multiple extends boolean | undefined = undefined> = {
  readonly currentOpen: boolean;
  readonly currentValue: Value<T, Multiple>;
  readonly anchorElement: AnchorElement | null;
  readonly filteredItems: T[];
};

type Action = ActionSetPartial;

type ActionSetPartial = {
  readonly type: 'setpartial';
  readonly payload: Partial<State<any, false>>;
};

export const reducer: React.Reducer<State<any, false>, Action> = (state, action) => {
  switch (action.type) {
    case 'setpartial':
      return {
        ...state,
        currentOpen: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
