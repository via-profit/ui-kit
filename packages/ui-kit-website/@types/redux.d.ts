declare interface ReduxStore {
  readonly ui: {
    readonly theme: 'light' | 'dark';
    readonly fontSize: 'small' | 'normal' | 'medium' | 'large';
    readonly locale: 'ru-RU';
    readonly device: 'desktop' | 'tablet' | 'mobile';
  };
}
