# @via-profit/ui-kit

[![npm](https://img.shields.io/npm/v/@via-profit/ui-kit)](https://www.npmjs.com/package/@via-profit/ui-kit)
[![Лицензия: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Набор React-компонентов для интерфейсов: поля ввода, кнопки, календарь, меню,
модальные окна и другие. Компоненты оформлены по теме, которую вы задаёте один
раз для всего приложения. Компоненты можно расширять через `styled` и заменять
их части через `overrides`.

## Установка

```sh
npm install @via-profit/ui-kit @emotion/react @emotion/styled react react-dom
```

Нужны React и React DOM 18.2+, Emotion 11.10.6+.

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

Каждый компонент импортируется по своему пути: в сборку попадает только используемое.
Без `ThemeProvider` компоненты не отобразятся.

## Документация

- [Введение и перечень компонентов](./docs/README.md)
- [Темы оформления](./docs/theming/README.md)
- [Список изменений](./CHANGELOG.md)
- [Сайт документации: запуск и деплой](./website/README.md)

Для нового SSR-сайта предусмотрен адрес `https://ui-kit.via-profit.ru`.
Это пример конфигурации будущего размещения, а не подтверждение работающего домена.

## Разработка

Библиотека находится в `src/`, документация — в `docs/`, сайт — в `website/`.
Монорепозитория и npm workspaces нет. Зависимости библиотеки и сайта устанавливаются отдельно.
Для сайта нужен Node.js 24+.

```sh
npm ci
npm ci --prefix website
npm run website       # SSR-сайт: localhost:8080
npm run build         # библиотека: dist/ (CommonJS) и dist/esm
npm run website:build # production-сборка сайта
npm run website:prod  # сборка и запуск production-сайта
```

Публикуется библиотека из `dist/`; сайт в npm-пакет не входит.
Правила разработки и выпуска — [CONTRIBUTING.md](./CONTRIBUTING.md).

## Лицензия

[MIT](./LICENSE)
