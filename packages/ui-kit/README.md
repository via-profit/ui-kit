## Установка.

для работы требуются следующие модули:

- react
- react-dom
- @emotion/styled - CSS In JS
- @emotion/react - CSS In JS React
- react-modal - Мобальные окна и дроверы
- react-popper - Выпадающие меню
- react-window - Виртуализированный список

```bash
$ npm install @emotion/react @emotion/styled react react-dom react-modal react-popper react-window

```

## Темы

Для переопределения темы оформления в пакете `@emotion/styled` создайте, например в директории `@types`, файл `emotion.d.ts` со следующим содержимым:

```ts
declare module '@emotion/react' {
  import { UITheme } from '@via-profit/ui-kit';

  export interface Theme extends UITheme {}
}
```

Для переопределения темы оформления в пакете `@via-profit/ui-kit` создайте, например в директории `@types`, файл `ui-kit.d.ts` со следующим содержимым:

_@types/emotion.d.ts_

```ts
declare module '@via-profit/ui-kit' {
  import {
    UIThemeOverrideColor as Colors,
    UIThemeOverrideZIndex as ZIndexes,
  } from '@via-profit/ui-kit';

  export interface UIThemeOverrideColor extends Colors {
    readonly drawer: string;
    readonly drawerContrast: string;
  }

  export interface UIThemeOverrideZIndex extends ZIndexes {
    readonly notifications: number;
  }
}
```
