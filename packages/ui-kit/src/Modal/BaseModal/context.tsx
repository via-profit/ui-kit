import React from 'react';

export type State = {
  readonly isOpen: boolean;
  readonly isMounted: boolean;
  readonly destroyTimeout: number;
  readonly onRequestClose: () => void;
  readonly closeOnEsape: boolean;
  readonly closeOnOverlayClick: boolean;
};

export type Context = {
  readonly state: State;
  readonly dispatch: React.Dispatch<Action>;
};

export type ActionSetState = {
  readonly type: 'setState';
  readonly payload: Partial<State>;
};

export type Action = ActionSetState;

export const PORTAL_ID = 'modal-portal';

export const defaultState: State = {
  isOpen: false,
  isMounted: false,
  destroyTimeout: 240,
  closeOnEsape: true,
  closeOnOverlayClick: true,
  onRequestClose: () => undefined,
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actionSetState = (payload: ActionSetState['payload']): ActionSetState => ({
  type: 'setState',
  payload,
});

const context = React.createContext<Context>({ state: defaultState, dispatch: () => undefined });

export interface ContextProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly initialState: Omit<State, 'isMounted'>;
}

export const ContextProvider: React.FC<ContextProviderProps> = props => {
  const { children, initialState } = props;
  const [state, dispatch] = React.useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });

  return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export const useContext = () => {
  const { state, dispatch } = React.useContext(context);

  return {
    state,
    dispatch,
  };
};