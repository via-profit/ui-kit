import React from 'react';

import type { AnchorElement, Value } from '../Menu';
import { FilterItems, ItemToString } from './AutocompleteContainer';

type State = {
  readonly currentOpen: boolean;
  readonly currentLoading: boolean;
  readonly anchorElement: AnchorElement | null;
  readonly filteredItems: readonly unknown[];
  readonly inputValue: string;
  readonly currentValue: unknown | null;
};

type Action = ActionSetPartial;

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

export const createInitialState = <T, Multiple extends boolean | undefined = undefined>(params: {
  readonly items: readonly T[];
  readonly value: Value<T, Multiple> | null;
  readonly selectedItemToString: ItemToString<T, Multiple>;
  readonly isOpen?: boolean;
  readonly filterItems: FilterItems<T> | undefined;
}): State => {
  const { filterItems, isOpen, items, selectedItemToString, value } = params;
  const inputValue = !value
    ? ''
    : selectedItemToString(value as Multiple extends undefined ? T : readonly T[]);

  const data = {
    inputValue: inputValue,
    query: inputValue.trim().toLocaleLowerCase(),
  };

  const filteredItems = filterItems ? filterItems(items, data) : items;

  return {
    ...defaultState,
    filteredItems,
    inputValue,
    currentValue: value,
    currentOpen: Boolean(isOpen),
  };
};

const StateContext = React.createContext(defaultState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => undefined);

interface ContextProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly initialState?: Partial<State>;
}

export const ContextProvider: React.FC<ContextProviderProps> = props => {
  const { children, initialState } = props;
  const [state, dispatch] = React.useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });

  const stateValue = React.useMemo(() => state, [state]);
  const dispatchValue = React.useMemo(() => dispatch, []);

  return (
    <DispatchContext.Provider value={dispatchValue}>
      <StateContext.Provider value={stateValue}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useContextState = (): State => {
  const context = React.useContext(StateContext);

  if (context === undefined) {
    throw new Error('useContextState must be used within a ContextProvider');
  }

  return context;
};

export const useContextDispatch = (): React.Dispatch<Action> => {
  const context = React.useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useContextDispatch must be used within a ContextProvider');
  }

  return context;
};
