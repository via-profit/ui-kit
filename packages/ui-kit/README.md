# @via-profit/ui-kit

Набор React-компонентов для интерфейсов: поля ввода, кнопки, календарь, меню, модальные окна и другие. Компоненты оформлены по теме, которую вы задаёте один раз для всего приложения.

## Установка

```bash
npm install @via-profit/ui-kit @emotion/react @emotion/styled react react-dom
```

Пакету нужны `react` и `react-dom` версии 18.2 и новее, `@emotion/react` и `@emotion/styled` версии 11.10.6 и новее.

## Быстрый старт

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

const theme = createTheme();

createRoot(document.getElementById('app')!).render(
  <ThemeProvider theme={theme}>
    <Button color="primary">Привет</Button>
  </ThemeProvider>,
);
```

## Документация

[Документация](https://github.com/via-profit/ui-kit/blob/master/packages/ui-kit/docs/README.md) — установка, тема оформления, общие принципы и описание всех компонентов.

[Список изменений](./CHANGELOG.md)
