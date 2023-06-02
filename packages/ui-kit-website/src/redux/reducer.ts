import { combineReducers } from '@reduxjs/toolkit';

import ui from '~/redux/ui';

const reducer = combineReducers({
  ui: ui.reducer,
});

export default reducer;
