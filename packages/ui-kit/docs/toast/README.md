# Уведомления

## Содержание

- [Описание](#описание)
- [Загрузка и обновление](#загрузка-и-обновление)
- [Кнопки в уведомлении](#кнопки-в-уведомлении)
- [Своё содержимое и расположение](#своё-содержимое-и-расположение)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Переопределение](#переопределение)
- [Переход с react-toastify](#переход-с-react-toastify)
- [Свойства](#свойства)

## Описание

Уведомления (тосты) — короткие сообщения о результате действия: «Заказ создан», «Не удалось сохранить». Они появляются в углу экрана и сами закрываются через 5 секунд.

Разместите `<ToastContainer>` один раз в корне приложения, а уведомления показывайте функцией `toast` из любого места, в том числе вне React-компонентов. API повторяет [react-toastify](https://fkhadra.github.io/react-toastify/), поэтому переход почти не требует правок, — подробнее в разделе [Переход с react-toastify](#переход-с-react-toastify).

- `toast(content, options)` — уведомление без иконки или с типом из `options.type`;
- `toast.info`, `toast.success`, `toast.warning`, `toast.error` — уведомление с иконкой типа;
- `toast.dismiss(id)` закрывает уведомление, а без `id` — все.

Каждая функция возвращает `id` уведомления. Курсор над уведомлением и фокус внутри него останавливают таймер, неактивное окно браузера — тоже. Клик по уведомлению закрывает его.

_Пример использования:_

```tsx
import React from 'react';
import { toast, ToastContainer } from '@via-profit/ui-kit/Toast';

const App: React.FC = () => (
  <>
    <Routes />
    <ToastContainer position="top-right" autoClose={3000} limit={8} />
  </>
);

// Anywhere in the application
toast('Черновик сохранён');
toast('Заказ создан', { type: 'success' });
toast.error('Не удалось сохранить заказ', {
  description: 'Нет связи с сервером. Попробуйте ещё раз.',
});
```

<ExampleToastBasic />

## Загрузка и обновление

`toast.loading(content)` показывает уведомление со спиннером. Оно не закрывается по таймеру и по клику, у него нет кнопки закрытия: завершите его через `toast.update(id, options)`. `render` задаёт новое содержимое, остальные поля меняют параметры уведомления. После обновления таймер запускается заново.

```tsx
const toastId = toast.loading('Сохранение...');

try {
  await save();
  toast.update(toastId, { render: 'Сохранено', type: 'success', isLoading: false, autoClose: 3000 });
} catch {
  toast.update(toastId, { render: 'Не удалось сохранить', type: 'error', isLoading: false });
}
```

Уведомление с `isLoading: true` можно создать и обычным вызовом: `toast.info('Сохранение...', { isLoading: true })`.

<ExampleToastLoading />

## Кнопки в уведомлении

`actions` — кнопки уведомления, например «Отменить». Каждая кнопка — объект `{ label, onClick, closeOnClick }`. По умолчанию после клика уведомление закрывается. Если оно должно остаться, передайте `closeOnClick: false`; закрыть его можно функцией `closeToast` — вторым аргументом `onClick`.

Для действий с кнопками увеличьте `autoClose`, чтобы пользователь успел нажать.

```tsx
toast(`Услуга «${service}» удалена`, {
  autoClose: 6000,
  actions: [{ label: 'Отменить', onClick: () => restore(service) }],
});
```

<ExampleToastActions />

## Своё содержимое и расположение

В `content` можно передать любой элемент или функцию, как в react-toastify. Функция получает `closeToast` — с ним удобно закрывать уведомление из своей кнопки. Клик по кнопкам, ссылкам и полям внутри уведомления не закрывает его, поэтому интерактивные элементы работают без лишних настроек.

`position` задаёт угол экрана: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` или `bottom-right`. По умолчанию — `position` контейнера. На узком экране уведомления занимают всю ширину.

```tsx
toast(
  ({ closeToast }) => (
    <>
      <Title>Новая заявка</Title>
      Перевозка дивана, Москва → Тверь
      <Button color="primary" onClick={closeToast}>
        Взять в работу
      </Button>
    </>
  ),
  { autoClose: false, type: 'info' },
);

toast('Позиция bottom-center', { position: 'bottom-center' });
```

<ExampleToastRender />

## Клавиатура и доступность

- F8 переводит фокус на последнее уведомление, Tab — к его кнопкам. Клавишу задаёт свойство `hotkey` контейнера, `null` отключает её;
- Escape закрывает уведомление, в котором находится фокус;
- пока фокус внутри уведомления, таймер стоит;
- область уведомлений — постоянный регион с `aria-live="polite"`: программа чтения с экрана прочитает новое уведомление, когда закончит текущую фразу. Ошибки получают роль `alert` и читаются сразу;
- подпись кнопки закрытия задаёт `closeButtonLabel`, подпись области — `label` (по умолчанию `Close` и `Notifications`).

## Переопределение

Уведомление состоит из компонентов:

- `<Toast>` — карточка уведомления. Получает `type`, `position` и `isClosing`, тип уведомления также записан в атрибут `data-toast-type`
- `<Icon>` — иконка типа или спиннер
- `<CloseButton>` — кнопка закрытия
- `<Action>` — кнопка из `actions`

Передайте `overrides` в `<ToastContainer>`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

Если в приложении нужны уведомления разного вида, создайте несколько контейнеров с разными `containerId` и указывайте `containerId` при вызове `toast`. Уведомление без `containerId` показывает контейнер без `containerId`.

_Пример использования:_ тёмная «таблетка» внизу экрана без кнопки закрытия.

```tsx
import styled from '@emotion/styled';
import { toast, ToastContainer } from '@via-profit/ui-kit/Toast';
import ToastCard from '@via-profit/ui-kit/Toast/ToastCard';

const Toast = styled(ToastCard)`
  border: 0;
  border-radius: 2em;
  padding: 0.5em 1.25em;
  background-color: rgba(11, 22, 67, 0.92);
  color: #fff;
`;

// Created once, outside of the component
const overrides = { Toast };

<ToastContainer
  containerId="pill"
  position="bottom-center"
  autoClose={2000}
  closeButton={false}
  overrides={overrides}
/>;

toast.success('Ссылка скопирована', { containerId: 'pill' });
```

<ExampleToastOverrides />

## Переход с react-toastify

Замените импорт и уберите стили react-toastify:

```diff
- import { toast, ToastContainer, Slide } from 'react-toastify';
- import 'react-toastify/dist/ReactToastify.css';
+ import { toast, ToastContainer } from '@via-profit/ui-kit/Toast';
```

Без изменений работают:

- `toast(content, options)`, `toast.info`, `toast.success`, `toast.warning`, `toast.warn`, `toast.error`, `toast.loading`, `toast.update`, `toast.dismiss`, `toast.isActive`;
- `content` в виде элемента или функции `({ closeToast }) => ...`;
- параметры `toastId`, `type`, `isLoading`, `autoClose`, `position`, `closeButton` (в том числе функция `({ closeToast }) => ...`), `closeOnClick`, `onClick`, `onOpen`, `onClose`, `icon`, `pauseOnHover`, `pauseOnFocusLoss`, `containerId`;
- свойства контейнера `position`, `autoClose`, `limit`, `closeButton`, `closeOnClick`, `pauseOnHover`, `pauseOnFocusLoss`, `newestOnTop`, `containerId`.

Отличия:

- нет полосы прогресса, перетаскивания для закрытия и выбора анимации: уберите у контейнера `hideProgressBar`, `transition`, `draggable` и `theme`;
- стили задаются не CSS-классами `.Toastify__*` и переменными `--toastify-*`, а через `overrides` (см. [Переопределение](#переопределение)). Цвета иконок берутся из темы: `success`, `warning`, `error`, для `info` — `accentPrimary`;
- клик по кнопкам, ссылкам и полям внутри уведомления не закрывает его, даже с `closeOnClick`;
- нет `toast.promise` и `toast.onChange`.

Новое: `description` — вторая строка, `actions` — кнопки уведомления, F8 для перехода к уведомлениям.

## Свойства

### toast(content, options)

#### `content`
Содержимое уведомления: текст, элемент или функция `({ closeToast }) => React.ReactNode`.
- Тип: `ToastContent`
- Обязательное: **да**

Параметры `options`:

#### `toastId`
`id` уведомления. Уведомление с `id`, которое уже показано, не добавляется повторно.
- Тип: `string | number`
- По умолчанию: создаётся автоматически

#### `type`
Тип уведомления, от него зависит иконка.
- Тип: `'default' | 'info' | 'success' | 'warning' | 'error'`
- По умолчанию: `'default'`

#### `description`
Вторая строка под основным текстом.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`

#### `actions`
Кнопки уведомления.
- Тип: `{ label: React.ReactNode; onClick?: (event, closeToast) => void; closeOnClick?: boolean }[]`
- По умолчанию: `undefined`

#### `isLoading`
Спиннер вместо иконки; уведомление не закрывается по таймеру и по клику.
- Тип: `boolean`
- По умолчанию: `false`

#### `autoClose`
Время до закрытия в мс или `false`, чтобы уведомление не закрывалось само.
- Тип: `number | false`
- По умолчанию: `autoClose` контейнера

#### `position`
Угол экрана.
- Тип: `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`
- По умолчанию: `position` контейнера

#### `closeButton`
`false` скрывает кнопку закрытия, функция выводит свою кнопку.
- Тип: `boolean | ({ closeToast }) => React.ReactNode`
- По умолчанию: `closeButton` контейнера

#### `closeOnClick`
Закрывать уведомление по клику. Клики по кнопкам, ссылкам и полям внутри не считаются.
- Тип: `boolean`
- По умолчанию: `closeOnClick` контейнера

#### `icon`
Своя иконка или `false` — без иконки.
- Тип: `React.ReactNode | false`
- По умолчанию: иконка типа

#### `onClick`, `onOpen`, `onClose`
Вызываются при клике по уведомлению, его появлении и закрытии.
- Тип: `(event) => void`, `() => void`, `() => void`
- По умолчанию: `undefined`

#### `pauseOnHover`, `pauseOnFocusLoss`
Останавливать таймер под курсором и в неактивном окне.
- Тип: `boolean`
- По умолчанию: значения контейнера

#### `containerId`
Контейнер, который показывает уведомление.
- Тип: `string`
- По умолчанию: контейнер без `containerId`

### toast.update(id, options)

Принимает те же параметры, кроме `toastId`, и `render` — новое содержимое. Таймер запускается заново.

### ToastContainer

#### `position`
Угол экрана для уведомлений без своей `position`.
- Тип: `ToastPosition`
- По умолчанию: `'top-right'`

#### `autoClose`
Время до закрытия в мс или `false`.
- Тип: `number | false`
- По умолчанию: `5000`

#### `limit`
Сколько уведомлений видно одновременно, остальные ждут очереди.
- Тип: `number`
- По умолчанию: без ограничения

#### `newestOnTop`
Новое уведомление появляется над предыдущими.
- Тип: `boolean`
- По умолчанию: `false`

#### `closeButton`, `closeOnClick`, `pauseOnHover`, `pauseOnFocusLoss`
Значения по умолчанию для уведомлений.
- Тип: `boolean`
- По умолчанию: `true`

#### `closeButtonLabel`
Подпись кнопки закрытия для программ чтения с экрана.
- Тип: `string`
- По умолчанию: `'Close'`

#### `label`
Подпись области уведомлений для программ чтения с экрана.
- Тип: `string`
- По умолчанию: `'Notifications'`

#### `hotkey`
Клавиша перехода к последнему уведомлению, `null` — без клавиши.
- Тип: `string | null`
- По умолчанию: `'F8'`

#### `containerId`
Контейнер показывает только уведомления с этим `containerId`.
- Тип: `string`
- По умолчанию: `undefined`

#### `zIndex`
`z-index` уведомлений.
- Тип: `number`
- По умолчанию: `theme.zIndex.modal + 2`

#### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `ToastOverrides`
- По умолчанию: `undefined`
