# Текстовое поле

## Содержание

- [Описание](#описание)
- [Ошибка и обязательное поле](#ошибка-и-обязательное-поле)
- [Иконки](#иконки)
- [Состояния](#состояния)
- [Подсказки браузера](#подсказки-браузера)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<TextField>` — поле ввода на основе элемента `<input>` с подписью, иконками и текстом ошибки. На нём построены [`<MaskedField>`](../masked-field/README.md), [`<PhoneField>`](../phone-field/README.md) и [`<Autocomplete>`](../autocomplete/README.md).

Поле работает как обычный `<input>`: все его атрибуты (`value`, `onChange`, `type`, `name`, `placeholder`, `disabled` и другие) передаются элементу `<input>`. Исключения — `className` и `style`: они применяются к корневому элементу, чтобы поле можно было разместить в сетке или задать ему ширину.

_Пример использования:_

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/TextField';

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      label="Имя"
      placeholder="Иван Петров"
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
    />
  );
};

export default Example;
```

<ExampleTextFieldOverview />

Подпись связана с полем: нажатие на неё переводит фокус в поле. Идентификатор поля генерируется автоматически и совпадает при серверном рендеринге. Если нужен свой, передайте `id`.

## Ошибка и обязательное поле

- `requiredAsterisk` добавляет к подписи звёздочку. Можно передать свой элемент вместо `*`. Звёздочка только показывает, что поле обязательное: чтобы браузер проверял заполнение, передайте ещё и `required`;
- `error` выделяет поле цветом ошибки и показывает `errorText` под ним. Текст появляется и скрывается плавно.

Проверку значения поле не выполняет: решите сами, когда показывать ошибку. Обычно — после того как пользователь покинул поле.

_Пример использования:_

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/TextField';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <TextField
      type="email"
      label="E-mail"
      requiredAsterisk
      placeholder="name@example.com"
      value={value}
      error={isTouched && !isEmail(value)}
      errorText={value === '' ? 'Укажите адрес электронной почты' : 'Адрес указан неверно'}
      onChange={event => setValue(event.currentTarget.value)}
      onBlur={() => setIsTouched(true)}
    />
  );
};

export default Example;
```

Введите неверный адрес и уберите фокус с поля:

<ExampleTextFieldValidation />

## Иконки

Свойства `startIcon` и `endIcon` добавляют элемент перед полем и после него. Передавайте элемент (`<SearchIcon />`), а не компонент (`SearchIcon`).

В `endIcon` можно поместить кнопку, например для показа пароля. Кнопка растягивается на всю высоту поля. Укажите ей `type="button"`, чтобы нажатие не отправляло форму, и `aria-label`, если в ней только иконка.

_Пример использования:_

```tsx
import React from 'react';
import TextField from '@via-profit/ui-kit/TextField';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <>
      <TextField type="search" label="Поиск" placeholder="Найти…" startIcon={<SearchIcon />} />
      <TextField
        type={isPasswordVisible ? 'text' : 'password'}
        label="Пароль"
        endIcon={
          <Button
            iconOnly
            variant="plain"
            type="button"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            onClick={() => setIsPasswordVisible(visible => !visible)}
          >
            <EyeIcon crossed={isPasswordVisible} />
          </Button>
        }
      />
    </>
  );
};

export default Example;
```

<ExampleTextFieldIcons />

## Состояния

- `disabled` — поле недоступно для ввода и не получает фокус;
- `readOnly` — значение нельзя изменить, но его можно выделить и скопировать;
- `fullWidth` — поле занимает всю ширину родителя. Без него ширина не больше `16em`.

<ExampleTextFieldStates />

## Подсказки браузера

Браузер предлагает под полем ранее введённые значения и данные автозаполнения. Этим управляет стандартный атрибут `autoComplete`, отдельного свойства у `<TextField>` нет:

- `autoComplete="off"` — не показывать подсказки, например для промокода или поиска с собственным списком;
- `autoComplete="email"`, `"tel"`, `"name"`, `"street-address"` и [другие значения](https://developer.mozilla.org/ru/docs/Web/HTML/Attributes/autocomplete) — подставлять сохранённые данные пользователя. Для таких полей подсказки полезны, отключать их не стоит;
- `autoComplete="new-password"` — для поля нового пароля: браузер предложит сгенерировать пароль, а не подставит сохранённый.

Chrome игнорирует `autoComplete="off"` для полей, которые считает логином, адресом или данными карты — он определяет их по `name`, `id` и подписи. Если подсказки всё равно появляются, дайте полю нестандартный `name`.

```tsx
<TextField label="Промокод" name="promo-code" autoComplete="off" />
<TextField type="email" label="E-mail" autoComplete="email" />
```

[`<Autocomplete>`](../autocomplete/README.md) отключает подсказки браузера сам: иначе они отображались бы поверх его списка.

## Переопределение

Компонент `<TextField>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент; получает `className` и `style`
- `<Label>` — подпись `<label>`
- `<Asterisk>` — звёздочка обязательного поля
- `<InputWrapper>` — рамка вокруг поля и иконок
- `<IconWrapper>` — обёртка `startIcon` и `endIcon`
- `<Input>` — элемент `<input>`
- `<ErrorText>` — текст ошибки

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента: компонент, созданный прямо при рендере, React считает новым на каждом рендере, и поле теряет фокус при вводе.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/TextField';
import TextFieldInputWrapper from '@via-profit/ui-kit/TextField/TextFieldInputWrapper';

const InputWrapper = styled(TextFieldInputWrapper)`
  border-radius: 2em;
  border-width: 2px;
`;

// Created once, outside of the component
const overrides = { InputWrapper };

const Example: React.FC = () => <TextField label="Имя" overrides={overrides} />;

export default Example;
```

<ExampleTextFieldOverrides />

## Свойства

Помимо перечисленных ниже, `<TextField>` принимает [атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/input#атрибуты) элемента `<input>` и передаёт их полю ввода, кроме `className` и `style` — они применяются к корневому элементу. `ref` указывает на корневой элемент, для доступа к `<input>` используйте `inputRef`.

### `label`
Подпись над полем.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `requiredAsterisk`
Если `true`, к подписи добавляется `*`. Можно передать свой элемент.
- Тип: `boolean | React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `error`
Если `true`, поле отображается с ошибкой и показывается `errorText`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `errorText`
Текст ошибки под полем. Отображается, только когда `error` равно `true`.
- Тип: `React.ReactNode`
- По умолчанию: `undefined`
- Обязательное: нет

### `startIcon`
Элемент перед полем ввода.
- Тип: `React.ReactElement`
- По умолчанию: `undefined`
- Обязательное: нет

### `endIcon`
Элемент после поля ввода.
- Тип: `React.ReactElement`
- По умолчанию: `undefined`
- Обязательное: нет

### `fullWidth`
Если `true`, поле занимает всю ширину родителя.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `inputRef`
`ref` элемента `<input>`.
- Тип: `React.MutableRefObject<HTMLInputElement | null> | React.RefCallback<HTMLInputElement | null>`
- По умолчанию: `undefined`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `TextFieldOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
