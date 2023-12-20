// import React from 'react';

// export type State = {
//   readonly date: Date;
//   readonly selected: readonly Date[];
//   readonly minDate: Date;
//   readonly maxDate: Date;
// };

// export const defaultState: State = {
//   date: new Date(),
//   selected: [],
//   minDate: new Date(new Date().getFullYear() - 1, 0, 1, 0, 0, 0), // plus 1 year
//   maxDate: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0), // minus 1 year
// };

// export type CalendarContextProviderProps = {
//   readonly children: React.ReactNode | readonly React.ReactNode[];
//   readonly initialState: Partial<State>;
// };

// export const actionSetPartial = (payload: Partial<State>): ActionSetPartial => ({
//   type: 'setPartial',
//   payload,
// });

// export type ActionSetPartial = {
//   readonly type: 'setPartial';
//   readonly payload: Partial<State>;
// };

// export type Action = ActionSetPartial;

// type Context = {
//   readonly state: State;
//   readonly dispatch: React.Dispatch<Action>;
// };

// const context = React.createContext<Context>({
//   state: defaultState,
//   dispatch: () => undefined,
// });

// const reducer: React.Reducer<State, Action> = (state, action) => {
//   switch (action.type) {
//     case 'setPartial':
//       return {
//         ...state,
//         ...action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export const CalendarProvider: React.FC<CalendarContextProviderProps> = props => {
//   const { children, initialState } = props;
//   const [state, dispatch] = React.useReducer(reducer, {
//     ...defaultState,
//     ...initialState,
//   });

//   return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
// };

// export const useContext = () => {
//   const { state, dispatch } = React.useContext(context);

//   return { state, dispatch };
// };
