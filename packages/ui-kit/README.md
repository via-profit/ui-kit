

```bash
$ npm install @emotion/react @emotion/styled react react-dom react-modal react-popper react-window

```

_@types/emotion.d.ts_

```ts
import { UITheme } from '@via-profit/ui-kit';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}

```