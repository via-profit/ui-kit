# @via-profit/ui-kit — сайт документации

SSR-сайт на Webpack, React Router и Node.js, основанный на сайте Ability.
Сервер возвращает HTML со стилями Emotion и содержимым статьи; браузер гидратирует
его и подключает живые примеры, поиск и переключение темы. Нужен Node.js 24+.

## Запуск

Из корня репозитория:

```sh
npm ci --prefix website
npm run website
```

Адрес — `http://localhost:8080`. Пересборка автоматически перезапускает сервер.
Переменные: `HOST` (по умолчанию `0.0.0.0`), `PORT` (8080), `SITE_URL` (публичный origin).

```sh
npm --prefix website run lint
npm run website:build
npm --prefix website run test:ssr
npm run website:prod
```

Production-файлы — `website/dist/`, разработка — `website/build/`.
`npm --prefix website run serve` запускает уже собранный `dist/server.cjs`.
GitHub Pages не поддерживает этот сервер; workflow статического сайта удалён.

## Страницы и локали

- `/` и старые адреса `/docs/…` перенаправляются на `/ru/…`.
- `/ru/…` — русский сайт. `/en/…` пока показывает русское содержимое.
  Переключатель EN недоступен. Переведённые локали перечисляются в `src/utils/locale.ts`.
- `src/utils/docs.ts` — общий реестр страниц, `src/routes/index.tsx` — загрузчики
  модулей с примерами. Markdown загружается до SSR и до гидратации.
- Навигация компонентов берётся из `../docs/README.md`.
- Документация — `../docs/`, журнал — `../CHANGELOG.md`, примеры — `src/examples/`.
  Витрина и обе песочницы находятся в `src/pages/Docs/`.
- Темы и их дополнительные цвета — `src/themes/`. Тема хранится в cookie
  `ui-kit-theme` и учитывается при SSR.
- Интерфейсные переводы — типизированный словарь `src/translations/index.ts`.
  В старых примерах сохранён `react-intl` с `defaultMessage`.
  `scripts/default-message-id.js` назначает тексту стабильный ID без извлечения переводов.
  Команда `i18n`, `src/lang/` и JSON-переводы удалены.
- Alias `@via-profit/ui-kit` указывает на исходники библиотеки в `../src/`.
  Webpack использует зависимости сайта для всего дерева, чтобы React и Emotion не дублировались.

## Индексация

Доступны `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` и Markdown статей
(например, `/ru/docs/button.md`). Непереведённая `/en/` исключена из карты сайта.
Для корректных абсолютных ссылок за HTTPS задайте `SITE_URL=https://ваш-домен`.

## Деплой через SSH и systemd

Деплой не автоматический. Сначала скопируйте `.env.deploy.example` в `.env.deploy`
и проверьте **все значения**. Домен `ui-kit.via-profit.ru`, порт 9046,
каталог `/home/web/ui-kit.via-profit.ru` и юнит `viaprofit.uikit` — примеры,
не сведения о действующем сервере.

```sh
cp website/.env.deploy.example website/.env.deploy
# Отредактируйте website/.env.deploy
npm run deploy
```

Скрипт проверяет Node.js на сервере, собирает сайт локально, передаёт архив по SSH,
проверяет SHA-256 и публикует `dist`, `start.sh`, `.env` и systemd-юнит.
На сервере не требуются npm-зависимости: они входят в Webpack-сборку.
Локальный `.env.deploy` не коммитится.

Первая установка юнита выполняется вручную по комментарию
в `deploy/viaprofit.uikit.service`. После публикации:

```sh
sudo systemctl daemon-reload # если изменился зарегистрированный юнит
sudo systemctl restart viaprofit.uikit
systemctl status viaprofit.uikit
journalctl -u viaprofit.uikit -f
```

Пример nginx — `deploy/nginx.conf`: HTTPS проксирует запросы на `127.0.0.1:9046`.
DNS, TLS, путь к Node.js и доступы пользователя `web` настраиваются отдельно.
Реальная публикация сайта в рамках переноса не выполнялась.
