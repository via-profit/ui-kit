# Темы оформления

## Содержание

- [Описание](#описание)
- [Создание темы](#создание-темы)
- [Параметры темы](#параметры-темы)
- [Шкала отступов](#шкала-отступов)
- [Внутренние отступы](#внутренние-отступы)
- [Оформление компонентов](#оформление-компонентов)
- [Тёмная тема](#тёмная-тема)
- [Использование темы](#использование-темы)
- [Несколько тем на странице](#несколько-тем-на-странице)
- [TypeScript](#typescript)
- [Размер шрифта](#размер-шрифта)

## Описание

Компоненты берут из темы оформления цвета, скругления, `z-index`, рамку фокуса и тени. Тема создаётся функцией `createTheme` и передаётся компонентом `<ThemeProvider>`, который оборачивает провайдер [@emotion/react](https://emotion.sh/docs/theming). Все вложенные компоненты получают эту тему.

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

### `padding`
Внутренние отступы компонентов по классам элементов: `control`, `item`, `container`. Подробнее в разделе [Внутренние отступы](#внутренние-отступы).
- Тип: `{ control?: { y?: string; x?: string }; item?: …; container?: … }`
- По умолчанию: `control` — `0.75em` / `1em`, `item` — `0.6em` / `0.8em`, `container` — `1em` / `1em`

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
Тени по уровням элементов. У всех компонентов одного уровня одна тень: значение темы или, если его нет, тень по умолчанию.
- `popup` — элементы поверх страницы: меню, календарь, уведомления, подсказки, модальные окна и боковая панель;
- `surface` — карточки и панели на странице: `Surface`, `Accordion`, `Table`;
- `control` — приподнятые части контролов: ручка `Switch`.

Ореол ползунка `Slider` при наведении и фокусе — не тень уровня, а состояние, как рамка фокуса: тема его не меняет. Проверить, у каких элементов тени темы, можно в [песочнице теней](../elevation-playground/README.md).
- Тип: `{ popup?: string; surface?: string; control?: string }`
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

## Внутренние отступы

Все размеры компонентов заданы в `em`, поэтому от размера шрифта интерфейс растёт равномерно. `theme.padding` меняет другое — плотность: сколько воздуха внутри элементов при том же тексте. Например, для небольших экранов ноутбуков отступы можно уменьшить, не уменьшая шрифт.

Отступы разделены на три класса, у каждого `y` — сверху и снизу, `x` — слева и справа:

- `control` — контролы: `Button`, `TextField`, `TextArea`, `Selectbox`, `DatePicker`, `Autocomplete`. `y` задаёт их высоту: все контролы одной высоты при любом значении, поэтому кнопка и поле в одной строке совпадают;
- `item` — строки списков: пункты меню, ячейки таблицы, вкладки;
- `container` — содержимое панелей: `Surface`, `Accordion`, модальные окна, `Drawer`, уведомления.

Значения — любые длины CSS. Лучше задавать их в `em`, тогда отступы по-прежнему растут вместе со шрифтом. Можно переопределить один класс или одну ось:

```tsx
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

// A dense interface for small laptops: the font size is the same
const theme = createTheme({
  padding: {
    control: { y: '0.5em', x: '0.8em' },
    item: { y: '0.4em' },
    container: { y: '0.75em', x: '0.75em' },
  },
});
```

Как отступы влияют на компоненты, можно посмотреть в [песочнице](../playground/README.md).

## Оформление компонентов

Тема задаёт только токены: цвета, скругления, отступы, рамку фокуса, тени. Заменить части отдельного компонента можно через его свойство `overrides` — подробнее на странице компонента.

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
- `UIThemeOverridePadding` — внутренние отступы (`padding`);
- `UIThemeOverrideTypography`, `UIThemeOverrideFocusRing`, `UIThemeOverrideElevation` — шрифт, рамка фокуса и тени;
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
