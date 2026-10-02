# Темы оформления

## Содержание

- [Описание](#описание)
- [Создание темы](#создание-темы)
- [Параметры темы](#параметры-темы)
- [Шкала отступов](#шкала-отступов)
- [Оформление компонентов](#оформление-компонентов)
- [Тёмная тема](#тёмная-тема)
- [Использование темы](#использование-темы)
- [Несколько тем на странице](#несколько-тем-на-странице)
- [TypeScript](#typescript)
- [Размер шрифта](#размер-шрифта)

## Описание

Компоненты берут из темы оформления цвета, скругления, `z-index`, рамку фокуса, тени и оформление отдельных компонентов. Тема создаётся функцией `createTheme` и передаётся компонентом `<ThemeProvider>`, который оборачивает провайдер [@emotion/react](https://emotion.sh/docs/theming). Все вложенные компоненты получают эту тему.

_Пример использования:_

```tsx
import React from 'react';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

// Create the theme once, outside of the components
const theme = createTheme({
  isDark: false,
  color: {
    accentPrimary: '#66b13d',
    accentPrimaryContrast: '#ffffff',
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Button color="primary">Кнопка</Button>
  </ThemeProvider>
);

export default App;
```

<ExampleThemeProvider />

Тему лучше создавать один раз — в отдельном файле или через `React.useMemo`: `createTheme` каждый раз возвращает новый объект, и при новом объекте все компоненты перерисовываются.

## Создание темы

`createTheme(overrides)` принимает только то, что нужно изменить, а остальное берёт из значений по умолчанию:

```ts
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

const theme = createTheme({
  isDark: false,
  color: {
    accentPrimary: '#66b13d',
  },
  shape: {
    radiusFactor: 0.5,
  },
});
```

Цвета передаются строками в любом формате, который понимает [`Color.fromString`](../color/README.md#создание-цвета): hex, `rgb()`, `hsl()` или название. В готовой теме каждый цвет — экземпляр класса [`Color`](../color/README.md).

## Параметры темы

### `isDark`
Признак тёмной темы. Компоненты используют его, чтобы подобрать оттенки рамок, прокрутки и подсветки. Цвета `isDark` не меняет — подробнее в разделе [Тёмная тема](#тёмная-тема).
- Тип: `boolean`
- По умолчанию: `false`

### `color`
Цвета темы. Все необязательны.

| Цвет | Назначение | По умолчанию |
|------|------------|--------------|
| `backgroundPrimary` | фон страницы | `#fafafa` |
| `backgroundSecondary` | дополнительный фон; в светлой теме используется для полупрозрачной подсветки | `#0e1200` |
| `surface` | фон карточек, меню, окон, полей | `#fff` |
| `textPrimary` | основной текст | `#0b1643` |
| `textSecondary` | второстепенный текст | `#525252` |
| `accentPrimary` | основной акцент (`color="primary"`) | `#009900` |
| `accentPrimaryContrast` | текст на основном акценте | `#e0f2ea` |
| `accentSecondary` | второстепенный акцент (`color="secondary"`) | `#0b1643` |
| `accentSecondaryContrast` | текст на второстепенном акценте | `#FFFFFF` |
| `error` | ошибки | `#ff2b2b` |
| `errorContrast` | текст на цвете ошибки | `#ffffff` |
| `warning` | предупреждения | `#fcbf03` |
| `warningContrast` | текст на цвете предупреждения | `#ffffff` |
| `success` | успешное действие | `#0ca400` |
| `successContrast` | текст на цвете успеха | `#ffffff` |

### `shape.radiusFactor`
Множитель скругления углов в `em`: компоненты умножают его на свой коэффициент, например поле ввода — на 2.
- Тип: `0 | 0.1 | 0.2 | … | 0.9 | 1`
- По умолчанию: `0.3`

### `spacing`
Шкала отступов: `xs`, `sm`, `md`, `lg`, `xl`. Подробнее в разделе [Шкала отступов](#шкала-отступов).
- Тип: `{ xs?: string; sm?: string; md?: string; lg?: string; xl?: string }`
- По умолчанию: `0.25em`, `0.5em`, `1em`, `1.5em`, `2em`

### `zIndex`
Значения `z-index`.
- `header` — шапка приложения. По умолчанию `8`
- `modal` — модальные окна, меню и всплывающие элементы. По умолчанию `10`

### `typography.fontFamily`
Шрифт темы. Компоненты наследуют шрифт страницы, поэтому примените его к `body` приложения: `font-family: ${theme.typography.fontFamily}`.
- Тип: `string`
- По умолчанию: `undefined`

### `focusRing`
Рамка фокуса для всех компонентов: `width`, `offset` и `color` — любые значения CSS. Если её нет, каждый компонент рисует свой фокус (обводку, ореол). Если задан `width` или `color`, все компоненты показывают одинаковую обводку; без `color` она цвета `accentPrimary`.
- Тип: `{ width?: string; offset?: string; color?: string }`
- По умолчанию: `{}`

### `elevation`
Тени: `popup` — у всплывающих элементов (меню, календарь дейтпикера, уведомления), `surface` — у карточек и панелей (`Surface`, `Accordion`, `Table`). Если значения нет, у компонента остаётся своя тень.
- Тип: `{ popup?: string; surface?: string }`
- По умолчанию: `{}`

### `components`
Оформление компонентов: `defaultProps` и `overrides` по имени компонента. Подробнее в разделе [Оформление компонентов](#оформление-компонентов).
- Тип: `UIThemeComponents`
- По умолчанию: `{}`

### `fontSize`
Размеры шрифта в пикселях для приложения: `small` (`14`), `normal` (`16`), `medium` (`18`), `large` (`20`). Компоненты сами их не используют — подробнее в разделе [Размер шрифта](#размер-шрифта).

Цвета текущей темы этой страницы:

<ExampleThemePalette />

## Шкала отступов

`theme.spacing` — пять шагов отступов: `xs`, `sm`, `md`, `lg`, `xl`. Их используют [стек](../stack/README.md) и [сетка](../grid/README.md) в свойстве `gap`, а вы можете использовать их в своих `styled`. Так отступы во всём приложении остаются согласованными.

Значения — любые длины CSS. Лучше задавать их в `em`, тогда отступы растут вместе с размером шрифта. Можно переопределить отдельные шаги:

```tsx
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

// A more spacious interface: the larger steps only
const theme = createTheme({
  spacing: {
    lg: '2em',
    xl: '3em',
  },
});
```

В своих компонентах:

```tsx
import styled from '@emotion/styled';

const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;
```

## Оформление компонентов

Цвета и токены меняют палитру, но не форму элементов. Чтобы изменить вид компонентов во всём приложении, задайте их оформление в `components`. Для каждого компонента можно передать:

- `defaultProps` — свойства, которые компонент получает, если их не передали явно. Например, уведомления в правом нижнем углу: `Toast: { defaultProps: { position: 'bottom-right' } }`;
- `overrides` — части, которые заменяют стандартные, как `overrides` у самого компонента. Обычно это стандартная часть, расширенная через `styled`.

Создавайте части один раз — на уровне модуля, а не внутри функции, которая строит тему. Если светлая и тёмная темы используют одни и те же части, а цвета части берёт из `theme`, переключение темы не пересоздаёт компоненты, и поля ввода не теряют фокус и введённое значение.

```tsx
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import createTheme from '@via-profit/ui-kit/ThemeProvider/createTheme';
import SwitchTrack from '@via-profit/ui-kit/Switch/SwitchTrack';

// Created once, at the module level
const Track = styled(SwitchTrack)(
  ({ theme, checked }) => css`
    border-radius: 0.625rem;
    background-color: ${checked ? theme.color.accentPrimary.toString() : 'transparent'};
  `,
);

const theme = createTheme({
  focusRing: { width: '2px', offset: '1px', color: '#1b1b1b' },
  elevation: { popup: '0 8px 16px rgba(0, 0, 0, 0.14)' },
  components: {
    Switch: { overrides: { Track } },
    Toast: { defaultProps: { position: 'bottom-right' } },
  },
});
```

Имена компонентов — как у импорта: `Button`, `TextField`, `Switch`, `Checkbox`, `Radio`, `Slider`, `Menu`, `Toast`, `Tooltip`, `Calendar` и другие. Части у каждого компонента — те же, что в его `overrides`. Что нужно учесть:

- `TextArea` и `Selectbox` используют части `TextField` (поле, подпись, текст ошибки), но получают их из своих `overrides`: задайте их в теме и для этих компонентов;
- `Dialog`, `Drawer`, `ConfirmBox` и `MessageBox` передают базовому окну свои части. `Modal.overrides.Inner` в теме их не заменяет, а замена `Dialog.overrides.Inner` теряет разметку диалога для программ чтения с экрана. Окно диалога удобнее оформить через `Modal.overrides.InnerContainer` — контейнер вокруг окна;
- у вкладок части выводите вы сами, поэтому у `Tabs` в теме есть только `defaultProps`. То же у пунктов меню: тема оформляет список `Menu`, но не `MenuItem`;
- `overrides.Container` у `Button` получает `variant`: у голого `ButtonBase`, например у кнопки удаления в бейдже, его нет.

### Приоритет

То, что передано компоненту в коде, всегда важнее темы:

- свойство, переданное явно, важнее `defaultProps` темы. Внутри `ButtonGroup` порядок такой: свойство кнопки, затем свойство группы, затем тема;
- часть из `overrides` компонента заменяет часть из `overrides` темы целиком: стили темы к этому экземпляру не применяются. Чтобы сохранить вид темы и изменить его частично, расширьте часть темы, а не стандартную: экспортируйте части из модуля темы и используйте `styled(ThemeTrack)`.

## Тёмная тема

`isDark: true` не превращает светлые цвета в тёмные — значения по умолчанию рассчитаны на светлую тему. Для тёмной темы передайте свои цвета фона, поверхностей и текста:

```ts
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

export const darkTheme = createTheme({
  isDark: true,
  color: {
    backgroundPrimary: '#15181e',
    backgroundSecondary: '#2d3440',
    surface: '#262c36',
    textPrimary: '#d8dce3',
    textSecondary: '#8b93a1',
    accentPrimary: '#22c7d6',
    accentPrimaryContrast: '#062a30',
  },
});
```

Чтобы переключать темы, храните название текущей темы в состоянии приложения и передавайте в `<ThemeProvider>` соответствующую тему.

## Использование темы

В стилях `@emotion/styled` тема доступна через `theme`:

```tsx
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border: 1px solid ${({ theme }) => theme.color.accentPrimary.alpha(0.4).toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
`;
```

В компонентах — через хук `useTheme` из `@via-profit/ui-kit/ThemeProvider` (он же `useTheme` из `@emotion/react`):

```tsx
import React from 'react';
import { useTheme } from '@via-profit/ui-kit/ThemeProvider';

const Hint: React.FC = () => {
  const theme = useTheme();

  return <span style={{ color: theme.color.textSecondary.toString() }}>Подсказка</span>;
};
```

Цвета в теме — объекты [`Color`](../color/README.md), поэтому их можно затемнять, смешивать и делать прозрачными: `theme.color.accentPrimary.darken(40).alpha(0.5).toString()`. Для CSS вызывайте `toString()`.

Тема недоступна в том же компоненте, который отрисовывает `<ThemeProvider>`: `useTheme` в нём вернёт тему уровнем выше.

## Несколько тем на странице

`<ThemeProvider>` можно вкладывать: компоненты внутри вложенного провайдера получают его тему. Так можно, например, выделить блок другим акцентом или показать светлый блок на тёмной странице:

```tsx
import React from 'react';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

const blueTheme = createTheme({ isDark: false, color: { accentPrimary: '#2a78fd' } });
const pinkTheme = createTheme({ isDark: false, color: { accentPrimary: '#ff5671' } });

const Example: React.FC = () => (
  <>
    <ThemeProvider theme={blueTheme}>
      <Button color="primary">Синяя</Button>
    </ThemeProvider>
    <ThemeProvider theme={pinkTheme}>
      <Button color="primary">Розовая</Button>
    </ThemeProvider>
  </>
);

export default Example;
```

<ExampleMultiThemming />

## TypeScript

Чтобы `theme` в стилях и `useTheme` были типизированы, расширьте тип темы `@emotion/react`. Например, создайте в проекте файл `@types/emotion.d.ts`:

```ts
import '@emotion/react';
import { UITheme } from '@via-profit/ui-kit/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
```

Чтобы добавить в тему свои цвета, расширьте интерфейс `UIThemeOverrideColor` модуля `@via-profit/ui-kit`, например в файле `@types/ui-kit.d.ts`:

```ts
import { UIThemeOverrideColor as Colors } from '@via-profit/ui-kit';

declare module '@via-profit/ui-kit' {
  export interface UIThemeOverrideColor extends Colors {
    readonly mainSidebar: string;
    readonly mainSidebarContrast: string;
  }
}
```

После этого новые цвета нужно передавать в `createTheme`, а в готовой теме они доступны как `theme.color.mainSidebar`.

Так же расширяются и остальные части темы:

- `UIThemeOverrideColor` — цвета (`color`);
- `UIThemeOverrideZIndex` — значения `z-index` (`zIndex`);
- `UIThemeOverrideShape` — параметры форм (`shape`);
- `UIThemeOverrideFontSize` — размеры шрифта (`fontSize`);
- `UIThemeOverrideTypography`, `UIThemeOverrideFocusRing`, `UIThemeOverrideElevation` — шрифт, рамка фокуса и тени;
- `UIThemeComponents` — оформление компонентов (`components`): так добавляется оформление своих компонентов;
- `UIThemeOverrides` — параметры `createTheme` целиком; `UITheme` — готовая тема.

## Размер шрифта

Все размеры компонентов заданы в `em` и `rem`, поэтому весь интерфейс масштабируется вместе с размером шрифта страницы. `theme.fontSize` хранит четыре размера (`small`, `normal`, `medium`, `large`), между которыми может выбирать пользователь. Компоненты эти значения не применяют — задайте выбранный размер сами, например для `<html>`:

```tsx
import React from 'react';
import { Global, css } from '@emotion/react';
import { useTheme } from '@via-profit/ui-kit/ThemeProvider';

const GlobalStyles: React.FC<{ readonly size: 'small' | 'normal' | 'medium' | 'large' }> = ({
  size,
}) => {
  const { fontSize } = useTheme();

  return (
    <Global
      styles={css`
        html {
          font-size: ${fontSize[size]}px;
        }
      `}
    />
  );
};

export default GlobalStyles;
```
