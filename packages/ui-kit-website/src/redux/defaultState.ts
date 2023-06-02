const defaultState: Readonly<ReduxStore> = {
  ui: {
    theme: 'light',
    fontSize: 'normal',
    locale: 'ru-RU',
    device: 'desktop',
  },
};

const storeRef: Mutable<{ currentState: ReduxStore }> = {
  currentState: defaultState,
};

export const reduxDefaultState = {
  /**
   * Returns Default state. Not initial
   */
  getDefaultState: () => defaultState,

  /**
   * Returns initial state
   */
  getInitialState: () => storeRef.currentState,

  /**
   * Mutate initial state
   */
  setInitialState: (cb: (state: ReduxStore) => ReduxStore): ReduxStore => {
    const newState = cb(storeRef.currentState);

    storeRef.currentState = newState;

    return newState;
  },
};

export default reduxDefaultState;
