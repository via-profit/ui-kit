# @via-profit/ui-kit

[![npm](https://img.shields.io/npm/v/@via-profit/ui-kit)](https://www.npmjs.com/package/@via-profit/ui-kit)
[![Документация](https://github.com/via-profit/ui-kit/actions/workflows/deploy-website.yml/badge.svg)](https://via-profit.github.io/ui-kit/)
[![Лицензия: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./packages/ui-kit/LICENSE)

Набор React-компонентов для интерфейсов: поля ввода, кнопки, календарь, меню, модальные окна и другие. Компоненты оформлены по теме, которую вы задаёте один раз для всего приложения. Каждый компонент можно расширить с помощью `styled` или заменить его части через `overrides`.

**[Документация и живые примеры →](https://via-profit.github.io/ui-kit/)**

## Установка

```bash
npm install @via-profit/ui-kit @emotion/react @emotion/styled react react-dom
```

Пакету нужны `react` и `react-dom` версии 18.2 и новее, `@emotion/react` и `@emotion/styled` версии 11.10.6 и новее.

## Быстрый старт

Оберните приложение в `ThemeProvider` — без него компоненты не отобразятся. Каждый компонент импортируется по своему пути, поэтому в сборку попадают только используемые.

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

Параметры темы, тёмная тема и типизация темы для TypeScript описаны в разделе [Темы оформления](https://via-profit.github.io/ui-kit/docs/theming).

## Компоненты

| Группа               | Компоненты                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Основы               | [ThemeProvider](https://via-profit.github.io/ui-kit/docs/theming), [Typography](https://via-profit.github.io/ui-kit/docs/typography), [Color](https://via-profit.github.io/ui-kit/docs/color)                                                                                                                                      |
| Кнопки               | [Button](https://via-profit.github.io/ui-kit/docs/button), [ButtonGroup](https://via-profit.github.io/ui-kit/docs/button-group)                                                                                                                                                                                                     |
| Поля ввода           | [TextField](https://via-profit.github.io/ui-kit/docs/text-field), [TextArea](https://via-profit.github.io/ui-kit/docs/text-area), [MaskedField](https://via-profit.github.io/ui-kit/docs/masked-field), [PhoneField](https://via-profit.github.io/ui-kit/docs/phone-field), [DatePicker](https://via-profit.github.io/ui-kit/docs/date-picker) |
| Выбор                | [Autocomplete](https://via-profit.github.io/ui-kit/docs/autocomplete), [Selectbox](https://via-profit.github.io/ui-kit/docs/selectbox), [Calendar](https://via-profit.github.io/ui-kit/docs/calendar), [Checkbox](https://via-profit.github.io/ui-kit/docs/checkbox), [Radio](https://via-profit.github.io/ui-kit/docs/radio), [Switch](https://via-profit.github.io/ui-kit/docs/switch) |
| Отображение данных   | [Avatar](https://via-profit.github.io/ui-kit/docs/avatar), [Badge](https://via-profit.github.io/ui-kit/docs/badge), [LoadingIndicator](https://via-profit.github.io/ui-kit/docs/loading-indicator), [Table](https://via-profit.github.io/ui-kit/docs/table) |
| Компоновка           | [Stack](https://via-profit.github.io/ui-kit/docs/stack), [Grid](https://via-profit.github.io/ui-kit/docs/grid), [Surface](https://via-profit.github.io/ui-kit/docs/surface), [Accordion](https://via-profit.github.io/ui-kit/docs/accordion), [Swiper](https://via-profit.github.io/ui-kit/docs/swiper)                            |
| Всплывающие элементы | [Menu](https://via-profit.github.io/ui-kit/docs/menu), [Modal](https://via-profit.github.io/ui-kit/docs/modal), [Popper](https://via-profit.github.io/ui-kit/docs/popper)                                                                                                                                                          |
| Утилиты              | [ClickOutside](https://via-profit.github.io/ui-kit/docs/click-outside), [Highlighted](https://via-profit.github.io/ui-kit/docs/highlighted)                                                                                                                                                                                         |

## Репозиторий

Монорепозиторий на npm workspaces:

- [`packages/ui-kit`](./packages/ui-kit) — библиотека `@via-profit/ui-kit`, которая публикуется в npm. Исходные файлы документации — в [`packages/ui-kit/docs`](./packages/ui-kit/docs/README.md);
- [`packages/ui-kit-website`](./packages/ui-kit-website) — сайт документации, публикуется на GitHub Pages при каждом пуше в `master`.

```bash
npm install   # зависимости обоих пакетов
npm start     # сайт документации в режиме разработки
npm run build # сборка библиотеки
```

Как вести список изменений и выпускать версии — в [CONTRIBUTING.md](./CONTRIBUTING.md).

## Ссылки

- [Документация](https://via-profit.github.io/ui-kit/)
- [Список изменений](./packages/ui-kit/CHANGELOG.md)
- [Пакет в npm](https://www.npmjs.com/package/@via-profit/ui-kit)

## Лицензия

[MIT](./packages/ui-kit/LICENSE)
