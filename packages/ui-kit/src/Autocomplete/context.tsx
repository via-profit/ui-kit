import React from 'react';

import type { AnchorElement } from '../Menu';

type State = {
  readonly currentOpen: boolean;
  readonly currentLoading: boolean;
  readonly anchorElement: AnchorElement | null;
  readonly filteredItems: readonly unknown[];
  readonly inputValue: string;
  readonly currentValue: unknown | null;
};

type Action = ActionSetPartial;

type Context = {
  readonly state: State;
  readonly dispatch: React.Dispatch<Action>;
};

type ActionSetPartial = {
  readonly type: 'setPartial';
  readonly payload: Partial<State>;
};

export const actionSetPartial = (payload: ActionSetPartial['payload']): ActionSetPartial => ({
  type: 'setPartial',
  payload,
});

export const defaultState: State = {
  currentOpen: false,
  currentLoading: false,
  anchorElement: null,
  filteredItems: [],
  currentValue: null,
  inputValue: '',
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

const context = React.createContext<Context>({
  state: defaultState,
  dispatch: () => undefined,
});

interface ContextProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

export const ContextProvider: React.FC<ContextProviderProps> = props => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export const useContext = () => {
  const { state, dispatch } = React.useContext(context);

  return {
    state,
    dispatch,
  };
};

export default useContext;
