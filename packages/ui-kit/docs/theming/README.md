
# Поддержка тем оформления

## Содержание

- [Описание](#описание)
- [Создание темы оформления](#создание-темы-оформления)
- [Подключение темы оформления](#подключение-темы-оформления)
- [TypeScript](#typescript)
- [Использование темы оформления](#использование-темы-оформления)
- [Использование цветов](#использование-цветов)
- [Использование размера шрифта](#использование-размера-шрифта)
- [Несколько тем одновременно](#несколько-тем-одновременно)




## Описание

Поддержка тем реализована при помощи обёртки над провайдером `ThemeProvider` пакета [@emotion/react](https://emotion.sh/docs/theming).

Прежде всего ваше приложение должно быть, так же как в случае с ванильным @emotion, обёрнуто в специальный компонент-провайдер. Провайдер принимает, в качестве параметра `theme`, объект с заранее подготовленной темой оформления. Все вложенные компоненты будут иметь доступ к переданной теме оформления.

Подробнее о [создании темы оформления](#создание-темы-оформления).

_Полный листинг создания темы и передачи её в провайдер в рамках одного компонента. Однако лучшим решением будет вынести тему в отдельный файл._

```tsx
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  // Create custom theme
  const theme = React.useMemo(
    () =>
      createTheme({
        isDark: false,
        colors: {
          accentPrimary: '#66b13d',
          accentPrimaryContrast: '#FFFFFF',
        },
      }),
    [],
  );

  // Wrap the application in a ThemeProvider
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">The Button Standard</Button>
      <Button color="primary" variant="outlined">
        The Button Outlined
      </Button>
    </ThemeProvider>
  );
};

export default Example;
```

<ExampleThemeProvider>
&nbsp;
&nbsp;



## Создание темы оформления

Для того чтобы создать тему оформления необходимо использовать метод `createTheme` передав в него параметры цвета, шрифта и прочие.

```tsx
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

const myTheme = createTheme({
  isDark: false,
  colors: {
    accentPrimary: '#66b13d',
    accentPrimaryContrast: '#FFFFFF',
  },
});
```

При создании темы, обязательным ключом является лишь ключ `isDark` (Boolean), который определяет является ли текущая тема тёмной, а остальные ключи могут быть опущены. В этом случае будут использоваться значения по умолчанию.

Полный список параметров определения темы с их описанием:

- **isDark** `Boolean` Определяет является ли текущая тема тёмной.
- **fontSize** `Object` Объект, который определяет размер шрифта в пикселях
  - **small** `Number` _По умолчанию - `14`_
  - **normal** `Number` _По умолчанию - `16`_
  - **medium** `Number` _По умолчанию - `18`_
  - **large** `Number` _По умолчанию - `20`_
- **zIndex** `Object` Объект определяющий значение z-index
  - **header** `Number` _По умолчанию - `8`_
  - **mainDrawer** `Number` _По умолчанию - `9`_
  - **modal** `Number` _По умолчанию - `10`_
- **shape** `Object` Объект определяющий различные значения форм
- **radiusFactor** `0 | 1 | 0.5 | 0.1 | 0.2 | 0.3 | 0.4 | 0.6 | 0.7 | 0.8 | 0.9` Фактор скругления углов _По умолчанию - `0.5`_
- **colors** `Object` Объект цветов темы
  - **backgroundPrimary**: `String` Основной цвет заднего плана _По умолчанию `#FFFFFF`_
  - **backgroundSecondary**: `String` Второстепенный цвет заднего плана _По умолчанию `#F9F9F9`_
  - **textPrimary**: `String` Основной цвет текста _По умолчанию `#212121`_
  - **textSecondary**: `String` Второстепенный цвет текста _По умолчанию `#343434`_
  - **surface**: `String` Цвет поверхностей _По умолчанию `#FFFFFF`_
  - **accentPrimary**: `String` Основной цвет акцента _По умолчанию `#FFA800`_
  - **accentPrimaryContrast**: Цвет контраста для основного цвета акцента `String` _По умолчанию `#FFFFFF`_
  - **accentSecondary**: `String` Второстепенный цвет акцента _По умолчанию `#bd00ff`_
  - **accentSecondaryContrast**: `String` Цвет контраста для второстепенного цвета контраста _По умолчанию `#FFFFFF`_
  - **error**: `String` Цвет ошибки _По умолчанию `#ff2b2b`_
  - **errorContrast**: Цвет котраста для ошибки `String` _По умолчанию `#ffffff`_
  - **warning**: `String` Цвет предупреждения _По умолчанию `#fcbf03`_
  - **warningContrast**: `String` Цвет контраста для предупреждения _По умолчанию `#ffffff`_
  - **success**: `String` Цвет успешного выполнения чего-либо _По умолчанию `#0ca400`_
  - **successContrast**: `String` Цвет контраста для цвета успешного выполнения чего-либо _По умолчанию `#ffffff`_




## Подключение темы оформления

Тему, созданную методом [createTheme](#создание-темы-оформления), необходимо передать в `<ThemeProvider>`. С этого момента, все вложенные компоненты будут иметь доступ к переданной теме оформления.

```tsx
import ThemeProvider from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

import myTheme from './my-theme';

const Example: React.FC = () => (
  <ThemeProvider theme={myTheme}>
    <Button color="primary">The Button Standard</Button>
  </ThemeProvider>
);

export default Example;
```

**Замечание**. Обратите внимание, что если попытаться получить доступ к теме в том же компоненте, в котором определён `ThemeProvider`, то это не приведёт к желаемому результату.

## TypeScript

Для того, чтобы тема оформления должным образом определялась в модуле `@emotion` требуется расширить модуль `@emotion/react` [см. расширение модулей при помощи файла деклараций d.ts](https://www.typescriptlang.org/docs/handbook/modules.html#working-with-other-javascript-libraries) согласно его документации подмешав в него типы из `@via-profit/ui-kit`. Один из способов - создать в корне проекта директорию `@types`, а в неё разместить файл `emotion.d.ts` _(название файла может быть любым)_ со следующим содержимым:

_@types/emotion.d.ts_

```ts
import '@emotion/react';
import { UITheme } from '@via-profit/ui-kit/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
```

Для того, чтобы расширить возможности самой темы, например, добавить цвета, следует расширить модуль `@via-profit/ui-kit` тем же способом, что и в предыдущем примере расширения `@emotion/react`.

В модуле `@via-profit/ui-kit` имеются интерфейсы специально созданные для данных целей:

- **UIThemeOverrideColor** - Интерфейс содержит перечисление всех цветов, которые будут доступны в теме по чключу `colors`
- **UIThemeOverrideZIndex** - Интерфейс содержит перечисление свойств `z-index` для различных элементов пользовательского интерфейса, которые будут доступны по ключу `zIndex`
- **UIThemeOverrideShape** - Интерфейс содержит перечисление свойств, определяющих формы объектов, например значения для `border-radius`, которые будут доступны по ключу `shape`
- **UIThemeOverrideFontSize** - Интерфейс содержит перечисление вариантов для размера шрифта, которые будут доступны по ключу `fontSize`
- **UIThemeOverrides** - Общий интерфейс темы, который содержит в себе все перечисленные выше интерфейсы, доступные по их ключам

_Примечание: Более детально ознакомиться с данными типами можно ознакомиться в файле <Your-Project>/node_modules/@via-profit/ui-kit/ThemeProvider/index.d.ts_

В данном примере будет использоваться файл `ui-kit.d.ts` размещённый в директории `@types`:

```ts
import { UIThemeOverrideColor as Colors } from '@via-profit/ui-kit';

declare module '@via-profit/ui-kit' {
  export interface UIThemeOverrideColor extends Colors {
    readonly mainSidebar: string; // <-- Your color name
    readonly mainSidebarContrast: string; // <-- Your color name
  }
}
```

После расширения темы через типы, не забудьте добавить объявленные свойства в саму тему оформления:

```ts
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

const myTheme = createTheme({
  isDark: false,
  colors: {
    accentPrimary: '#66b13d', // <-- Color definition in the base theme
    accentPrimaryContrast: '#FFFFFF', // <-- Color definition in the base theme
    mainSidebar: 'red', // <-- Color definition for the extended theme
    mainSidebarContrast: 'blue', // <-- Color definition for the extended theme
  },
});
```




## Использование темы оформления

Самое частое применение - в стилизованныйх компонентах. Вы можете использовать все те же принципы что и в ванильном @emotion:

```tsx
import styled from '@emotion/styled';

const MyComponent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.header};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;
```

Тема так же доступна по средствам хука `useTheme`. Причём не имеет значения, какой хук вы используете: хук из пакета `@via-profit/ui-theme` или хук из пакета `@emotion/react`:

```tsx
import { useTheme } from '@via-profit/ui-kit/ThemeProvider';

const Example: React.FC = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        borderRadius: `${theme.shape.radiusFactor}em`,
      }}
    />
  );
};

export default Example;
```




## Использование цветов

Данные, переданные при создании темы и данные, которые доступны внутри, несколько различаются. Основным различием является объект **colors**, который содержит цвета палитры темы оформления. В теме, доступной в `styled-components` или через метод `useTheme`, объект **colors** представляет собой объект, где название ключей соответствует переданному набору цветов, а значением каждого такого ключа является экземпляр класса [Color](./color.md).

_При создании темы значение цвета передаётся в виде строки:_

```tsx
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

const myTheme = createTheme({
  isDark: false,
  colors: {
    accentPrimary: '#66b13d', // <-- is a string value
    accentPrimaryContrast: '#FFFFFF', // <-- is a string value
  },
});
```

_При использовании темы значение цвета доступно как экземпляр класса [Color](./color.md):_

```tsx
import styled from '@emotion/styled';

const MyComponent = styled.div`
  background-color: ${({ theme }) =>
    theme.colors.accentPrimary // <-- is a Color class instance. Not a string
      .toString()};
`;
```

Все цвета внутри темы определены через класс [Color](./color.md).

_Пример, как сделать цвет темнее и добавить прозрачность:_

```tsx
import styled from '@emotion/styled';

const MyComponent = styled.div`
  background-color: ${({ theme }) =>
    theme.colors
      .accentPrimary
      .darken(60) // Make darken
      .alpha(0.5) // Alpha channel
      .toString() // Convert to rgba string
`;
```



## Использование размера шрифта

Предполагается, что размер шрифта будет использоваться как настраиваемая величина, например, для того чтобы пользователь мог выбрать размер шрифта вашего приложения. Для простоты мы именуем 4 различных варианта как: `small` `normal` `medium` и `large`. Для каждого названия в теме оформления отводится соответствующий параметр с его реальным значением в пикселях.

В настоящий момент web-браузеры приняли как стандарт значение в **16px** для дефолтного размера текста. В именованных вариантах - это `normal`. Соответственно, `small` - меньше 16px, а `medium` и `large` - больше. Остаётся предложить пользователю один из вариантов и все элементы вашего приложения изменят масштаб в зависимости от выбранного значения, так как в большинстве случаев в теме все размеры зависят от `em` и `rem` единиц измерения, которые в свою очередь, напрямую зависят от размера текста.

_Пример реализации вышенаписанного подхода. Предположим, что для хранения текущего выбранного значения размера шрифта используется [Redux](https://react-redux.js.org/). Тогда мы можем определить CSS-переменные для каждого псевдонима (small, normal, medium и large). Далее, используя всё те же CSS-переменные мы можем присвоить размер шрифта для всего HTML-тега `<body>`:_

```tsx
import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

const selector = createStructuredSelector({
  currentFontSize: (store: ReduxStore) => fontSize,
});

const GlobalStyles: React.FC = () => {
  const { fontSize } = useTheme();
  const { currentFontSize } = useSelector(selector);

  return (
    <Global
      styles={css`
        :root {
          --font-size-small: ${fontSize.small}px;
          --font-size-normal: ${fontSize.normal}px;
          --font-size-medium: ${fontSize.medium}px;
          --font-size-large: ${fontSize.large}px;
        }

        html,
        body {
          font-family: system-ui;
          font-size: var(--font-size-${currentFontSize});
        }
      `}
    />
  );
};

export default GlobalStyles;
```

_Примечание: Разумеется, вы в праве использовать свой способ регулирования размера шрифта в приложении_




## Несколько тем одновременно

Так же как и в оригинальном модуле от [@emotion/react](https://emotion.sh/docs/theming) здесь возможно использовать несколько провайдеров одновременное. Например, вы можете отобразить один блок с одной темой оформления, а ниже - с другой:

_**Шаг 1**. Сначала необходимо создать две разные темы оформления_

```tsx
import React from 'react';
import { createTheme } from '@via-profit/ui-kit/ThemeProvider';

export const redTheme = createTheme({
  isDark: false,
  colors: {
    accentPrimary: 'red',
  },
});

export const blueTheme = createTheme({
  isDark: false,
  colors: {
    accentPrimary: 'blue',
  },
});
```

_**Шаг 2**. Далее необходимо добавить в приложение два провайдера_

```tsx
import React from 'react';
import ThemeProvider from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

import { redTheme, blueTheme } from './my-themes';

const example: React.FC = () => (
  <>
    <ThemeProvider theme={blueTheme}>
      <Button>Button</Button>
    </ThemeProvider>

    <ThemeProvider theme={redTheme}>
      <Button>Button</Button>
    </ThemeProvider>
  </>
);

export default Example;
```

<ExampleMultiThemming>

