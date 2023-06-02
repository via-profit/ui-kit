declare module '*.md' {
  const content: string;

  export default content;
}

declare type Mutable<T> = { -readonly [P in keyof T]: T[P] };

declare interface PreloadedStates {
  REDUX: ReduxStore;
}
