# Участие в разработке

## Структура

Обычный репозиторий, без npm workspaces:

- `src/` — библиотека `@via-profit/ui-kit`;
- `docs/` — документация компонентов;
- `scripts/build.js` — сборка библиотеки;
- `website/` — SSR-сайт с собственными `package.json`, lock-файлом и зависимостями.

## Разработка и проверки

Для сайта нужен Node.js 24 или новее.

```sh
npm ci
npm ci --prefix website
npm run website
```

Сайт открывается на `http://localhost:8080`. Компоненты берутся прямо из `src/`,
собирать или публиковать библиотеку перед запуском сайта не нужно.

Проверки из корня:

```sh
npm run lint:check
npm run typecheck
npm run build
npm pack --dry-run ./dist
npm --prefix website run lint
npm run website:build
npm --prefix website run test:ssr
```

`npm run lint` исправляет замечания автоматически; `lint:check` только проверяет.
GitHub Actions и публикация на GitHub Pages удалены; проверки выполняются локально.

## Список изменений и версии

Заметные изменения записывайте в корневой `CHANGELOG.md`, раздел «Не выпущено».
Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).
Несовместимые изменения сопровождайте инструкцией для пользователей.

До версии 1.0 несовместимые изменения повышают минорную версию, исправления — патч.

## Публикация библиотеки

1. Обновите версию в корневом `package.json` и lock-файле.
2. Замените «Не выпущено» номером версии и датой; выше добавьте новый пустой раздел.
3. Выполните проверки и `npm run build`.
4. Проверьте пакет и опубликуйте **из `dist/`**:

   ```sh
   cd dist
   npm pack --dry-run
   npm publish
   ```

Сборка очищает `dist/`, компилирует CommonJS и ESM (`dist/esm`), копирует README,
CHANGELOG и LICENSE и генерирует `package.json` с картой `exports`.
Пути импорта остаются прежними: `@via-profit/ui-kit/Button`,
`@via-profit/ui-kit/Button/ButtonContainer` и другие.
Сайт и его зависимости не входят в пакет.

Коммиты и теги выпуска создаются вручную:
`chore(release): 0.14.0`, тег `v0.14.0`.

## Сайт

Оболочка сайта основана на сайте Ability: Webpack собирает браузер и Node.js-сервер,
React Router загружает страницу до SSR, Emotion извлекает стили, браузер гидратирует HTML.
Документация, примеры, витрина, песочницы отступов и теней перенесены со старого сайта.

Тексты оболочки — `website/src/translations/index.ts`. Старые живые примеры сохраняют
`defaultMessage`: локальный Babel-плагин назначает ему ID, равный тексту сообщения.
Извлечение переводов, скомпилированные JSON и команда `i18n` больше не нужны.

Маршруты `/ru` и `/en` предусмотрены, но пока содержимое только русское.
Кнопка EN недоступна; `/en/…` показывает русскую версию.

Запуск production-сборки: `npm run website:prod`.
SSH-деплой, systemd и nginx описаны в [website/README.md](./website/README.md).
