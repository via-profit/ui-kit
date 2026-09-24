import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import reduxDefaultState from '~/redux/defaultState';

type State = ReduxStore['ui'];

// Reducers must be pure, the settings are saved into cookies by the store subscriber in ReduxProvider

const ui = createSlice({
  name: 'ui',
  initialState: () => reduxDefaultState.getInitialState().ui,
  reducers: {
    reset: () => reduxDefaultState.getDefaultState().ui,
    theme: (state, action: PayloadAction<State['theme']>) => {
      state.theme = action.payload;
    },
    fontSize: (state, action: PayloadAction<State['fontSize']>) => {
      state.fontSize = action.payload;
    },
    locale: (state, action: PayloadAction<State['locale']>) => {
      state.locale = action.payload;
    },
    device: (state, action: PayloadAction<State['device']>) => {
      state.device = action.payload;
    },
  },
});

export const uiActions = ui.actions;

export default ui;
