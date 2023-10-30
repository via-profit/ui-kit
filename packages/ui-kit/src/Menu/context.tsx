import React from 'react';

export const PORTAL_ID = 'ui-kit-portal';

export interface MenuState {
  readonly selectedIndexes: readonly number[];
  readonly markedIndex: number;
  readonly hoveredIndex: number;
}

export type Actions = ActionSetMenuState;

interface ActionSetMenuState {
  readonly type: 'setMenuState';
  readonly payload: Partial<MenuState>;
}

type Context = {
  readonly state: MenuState;
  readonly dispatch: React.Dispatch<Actions>;
};

export const actionSetmenuState = (payload: ActionSetMenuState['payload']): ActionSetMenuState => ({
  type: 'setMenuState',
  payload,
});

export const defaultState: MenuState = {
  selectedIndexes: [],
  markedIndex: -1,
  hoveredIndex: -1,
};

const reducer: React.Reducer<MenuState, Actions> = (state, action) => {
  switch (action.type) {
    case 'setMenuState': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

const context = React.createContext<Context>({
  state: defaultState,
  dispatch: () => undefined,
});

interface MenuContextProviderProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

export const MenuContextProvider: React.FC<MenuContextProviderProps> = props => {
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
