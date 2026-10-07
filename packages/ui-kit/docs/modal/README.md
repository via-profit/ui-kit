# Модальные окна

## Содержание

- [Описание](#описание)
- [Диалог](#диалог)
- [Форма в диалоге](#форма-в-диалоге)
- [Подтверждение](#подтверждение)
- [Сообщение](#сообщение)
- [Боковая панель](#боковая-панель)
- [Поведение](#поведение)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Modal>` открывает окно поверх страницы. Вид окна задаёт свойство `variant`:

- **`dialog`** — диалог с произвольным содержимым (по умолчанию);
- **`confirm-box`** — подтверждение действия с кнопками «подтвердить» и «отмена»;
- **`message-box`** — сообщение с одной кнопкой;
- **`drawer`** — панель, выезжающая от края экрана.

Окно не закрывается само: видимостью управляет свойство `isOpen`, а о том, что окно пора закрыть, сообщает `onRequestClose` — по клавише <kbd>Esc</kbd>, клику по затемнённому фону или кнопке закрытия.

Каждый вид можно импортировать и отдельно: `Dialog`, `ConfirmBox`, `MessageBox`, `Drawer` из `@via-profit/ui-kit/Modal`.

## Диалог

_Пример использования:_

```tsx
import React from 'react';
import Modal from '@via-profit/ui-kit/Modal';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть диалог</Button>
      <Modal variant="dialog" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <h3>Условия использования</h3>
        <p>Диалог закрывается кнопкой, клавишей Esc или кликом по затемнённому фону.</p>
        <Button color="primary" onClick={() => setIsOpen(false)}>
          Понятно
        </Button>
      </Modal>
    </>
  );
};

export default Example;
```

<ExampleModalOverview />

## Форма в диалоге

Содержимое диалога — обычные компоненты, в том числе поля ввода. Окна можно открывать друг над другом: <kbd>Esc</kbd> закрывает только верхнее, а после его закрытия фокус возвращается туда, где был.

В примере ниже `onRequestClose` не закрывает диалог сразу, если в форме есть несохранённые изменения, а спрашивает подтверждение:

```tsx
import React from 'react';
import Modal from '@via-profit/ui-kit/Modal';
import Button from '@via-profit/ui-kit/Button';
import TextField from '@via-profit/ui-kit/TextField';

const Example: React.FC = () => {
  const [name, setName] = React.useState('Анна Смирнова');
  const [draft, setDraft] = React.useState(name);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const requestClose = () => {
    if (draft !== name) {
      setIsConfirmOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setDraft(name);
          setIsOpen(true);
        }}
      >
        Изменить имя
      </Button>

      <Modal variant="dialog" isOpen={isOpen} onRequestClose={requestClose}>
        <form
          onSubmit={event => {
            event.preventDefault();
            setName(draft);
            setIsOpen(false);
          }}
        >
          <TextField label="Имя" value={draft} onChange={event => setDraft(event.currentTarget.value)} />
          <Button type="button" onClick={requestClose}>
            Отмена
          </Button>
          <Button type="submit" color="primary">
            Сохранить
          </Button>
        </form>
      </Modal>

      <Modal
        variant="confirm-box"
        isOpen={isConfirmOpen}
        header="Закрыть без сохранения?"
        confirmButtonLabel="Закрыть"
        dismissButtonLabel="Продолжить редактирование"
        onRequestYes={() => {
          setIsConfirmOpen(false);
          setIsOpen(false);
        }}
        onRequestClose={() => setIsConfirmOpen(false)}
      >
        Изменения будут потеряны.
      </Modal>
    </>
  );
};

export default Example;
```

Измените имя и нажмите <kbd>Esc</kbd>:

<ExampleModalForm />

## Подтверждение

Вариант `confirm-box` показывает заголовок `header`, содержимое и две кнопки. Кнопка подтверждения вызывает `onRequestYes`, кнопка отмены — `onRequestClose`. Подписи кнопок задают `confirmButtonLabel` и `dismissButtonLabel`. После открытия фокус стоит на кнопке подтверждения.

_Пример использования:_

```tsx
<Modal
  variant="confirm-box"
  isOpen={isOpen}
  header="Удалить файл?"
  confirmButtonLabel="Удалить"
  dismissButtonLabel="Отмена"
  onRequestYes={() => {
    deleteFile();
    setIsOpen(false);
  }}
  onRequestClose={() => setIsOpen(false)}
>
  Файл «Отчёт.pdf» будет удалён без возможности восстановления.
</Modal>
```

<ExampleConfirmBox />

## Сообщение

Вариант `message-box` показывает заголовок `header`, содержимое и одну кнопку, которая вызывает `onRequestClose`. Подпись кнопки задаёт `okButtonLabel`. После открытия фокус стоит на кнопке.

_Пример использования:_

```tsx
<Modal
  variant="message-box"
  isOpen={isOpen}
  header="Заявка отправлена"
  okButtonLabel="Хорошо"
  onRequestClose={() => setIsOpen(false)}
>
  Мы свяжемся с вами в течение рабочего дня.
</Modal>
```

<ExampleMessageBox />

## Боковая панель

Вариант `drawer` выезжает от края экрана, который задаёт обязательное свойство `anchor`: `left`, `right`, `top` или `bottom`. У панели есть необязательные части:

- `header` — заголовок;
- `toolbar` — элементы справа от заголовка, например кнопки;
- `showCloseButton` — кнопка закрытия в заголовке; её подпись для программ чтения с экрана задаёт `closeButtonLabel`;
- `footer` — нижняя часть.

Боковые панели не шире, а верхняя и нижняя — не выше 90% экрана; если содержимое не помещается, оно прокручивается.

_Пример использования:_

```tsx
<Modal
  variant="drawer"
  anchor="left"
  isOpen={isOpen}
  header="Навигация"
  showCloseButton
  footer="Версия 1.0"
  onRequestClose={() => setIsOpen(false)}
>
  <nav>…</nav>
</Modal>
```

<ExampleModalDrawerOverview />

## Поведение

- Окно отрисовывается через портал в элемент `<div id="ui-kit-portal">` в конце `<body>`, поэтому родители с `overflow: hidden` его не обрезают.
- Пока окно открыто, прокрутка страницы заблокирована.
- Клавиша <kbd>Esc</kbd> и клик по фону вызывают `onRequestClose`; это отключается свойствами `closeOnEscape` и `closeOnOverlayClick`. Если открыто несколько окон, <kbd>Esc</kbd> относится только к верхнему.
- Фокус переходит в окно (это отключается `autofocus={false}`), <kbd>Tab</kbd> перемещает его только по элементам окна, а после закрытия фокус возвращается туда, где был до открытия.
- Для программ чтения с экрана окна имеют роль `dialog` (подтверждение — `alertdialog`) и атрибут `aria-modal`, а заголовок окна связан с ним через `aria-labelledby`.
- Окно открывается и закрывается с анимацией. После закрытия содержимое остаётся в DOM ещё `destroyTimeout` миллисекунд, чтобы анимация успела закончиться.

## Переопределение

Каждый вид окна является составным и реализован при помощи следующих компонентов:

- `dialog`:
  - `<Overlay>` — затемнённый фон;
  - `<InnerContainer>` — слой поверх фона, который центрирует окно;
  - `<Inner>` — окно с содержимым;
- `confirm-box`, `message-box`, `drawer`:
  - `<Overlay>` — затемнённый фон;
  - `<Container>` — окно или панель;
  - `<Header>` — заголовок;
  - `<Content>` — содержимое;
  - `<Footer>` — кнопки или подвал.

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

Окно диалога удобнее оформлять через `InnerContainer`: замена `Inner` убирает разметку диалога для программ чтения с экрана (`role="dialog"`, `aria-modal`, связь с заголовком).

_Пример использования:_ размытый фон вместо затемнённого.

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Modal from '@via-profit/ui-kit/Modal';
import ModalOverlay from '@via-profit/ui-kit/Modal/BaseModal/ModalOverlay';

const Overlay = styled(ModalOverlay)`
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
`;

// Created once, outside of the component
const overrides = { Overlay };

const Example: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Modal variant="dialog" isOpen={isOpen} overrides={overrides} onRequestClose={() => setIsOpen(false)}>
      Фон за окном размыт, а не затемнён.
    </Modal>
  );
};

export default Example;
```

<ExampleModalOverrides />

## Свойства

### Общие свойства

#### `isOpen`
Если `true`, окно открыто.
- Тип: `boolean`
- Обязательное: **да**

#### `onRequestClose`
Вызывается, когда окно нужно закрыть: клавиша <kbd>Esc</kbd>, клик по фону, кнопка закрытия или отмены.
- Тип: `(event: React.MouseEvent | KeyboardEvent) => void`
- Обязательное: **да**

#### `variant`
Вид окна. Подробнее в разделе [Описание](#описание).
- Тип: `'dialog' | 'confirm-box' | 'message-box' | 'drawer'`
- По умолчанию: `'dialog'`
- Обязательное: нет

#### `children`
Содержимое окна.
- Тип: `React.ReactNode`
- Обязательное: **да**

#### `closeOnEscape`
Если `true`, клавиша <kbd>Esc</kbd> вызывает `onRequestClose`.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

#### `closeOnOverlayClick`
Если `true`, клик по затемнённому фону вызывает `onRequestClose`.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

#### `autofocus`
Если `true`, после открытия фокус переходит в окно, а после закрытия возвращается на прежнее место.
- Тип: `boolean`
- По умолчанию: `true`
- Обязательное: нет

#### `destroyTimeout`
Сколько миллисекунд содержимое остаётся в DOM после закрытия — на время анимации.
- Тип: `number`
- По умолчанию: `240`
- Обязательное: нет

### `confirm-box`

#### `header`
Заголовок окна.
- Тип: `string`
- Обязательное: **да**

#### `onRequestYes`
Вызывается при нажатии на кнопку подтверждения.
- Тип: `React.MouseEventHandler<HTMLButtonElement>`
- Обязательное: **да**

#### `confirmButtonLabel`
Подпись кнопки подтверждения.
- Тип: `React.ReactNode`
- По умолчанию: `'Confirm'`
- Обязательное: нет

#### `dismissButtonLabel`
Подпись кнопки отмены.
- Тип: `React.ReactNode`
- По умолчанию: `'Dismiss'`
- Обязательное: нет

### `message-box`

#### `header`
Заголовок окна.
- Тип: `React.ReactNode`
- Обязательное: **да**

#### `okButtonLabel`
Подпись кнопки.
- Тип: `React.ReactNode`
- По умолчанию: `'OK'`
- Обязательное: нет

### `drawer`

#### `anchor`
Край экрана, от которого выезжает панель.
- Тип: `'left' | 'right' | 'top' | 'bottom'`
- Обязательное: **да**

#### `header`
Заголовок панели.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `toolbar`
Элементы справа от заголовка.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `footer`
Нижняя часть панели.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

#### `showCloseButton`
Если `true`, в заголовке отображается кнопка закрытия.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `closeButtonLabel`
Подпись кнопки закрытия для программ чтения с экрана.
- Тип: `string`
- По умолчанию: `'Close'`
- Обязательное: нет

### `overrides`

Части окна, которые заменяют стандартные. Подробнее в разделе [Переопределение](#переопределение).

- `dialog`: `Overlay`, `InnerContainer`, `Inner`;
- `confirm-box`, `message-box`, `drawer`: `Overlay`, `Container`, `Header`, `Content`, `Footer`.
