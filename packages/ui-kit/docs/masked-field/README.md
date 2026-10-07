# Поле с маской ввода

## Содержание

- [Описание](#описание)
- [Маска](#маска)
- [Проверка заполненности](#проверка-заполненности)
- [Значение](#значение)
- [Динамическая маска](#динамическая-маска)
- [Преобразование значения](#преобразование-значения)
- [Готовые маски](#готовые-маски)
- [Собственный разбор ввода](#собственный-разбор-ввода)
- [Хук useMasked](#хук-usemasked)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<MaskedField>` — текстовое поле [`<TextField>`](../text-field/README.md), которое форматирует ввод по маске: пропускает только допустимые символы и само расставляет разделители. Подходит для телефонов, дат, номеров документов и карт.

_Пример использования:_

```tsx
import React from 'react';
import MaskedField, { FormatParsedPayload, Mask } from '@via-profit/ui-kit/MaskedField';

const phoneMask: Mask = [
  '+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,
];

const Example: React.FC = () => {
  const [payload, setPayload] = React.useState<FormatParsedPayload | null>(null);

  return (
    <>
      <MaskedField
        label="Телефон"
        placeholder="+7 (999) 123-45-67"
        mask={phoneMask}
        value={payload?.text ?? ''}
        onChange={setPayload}
      />
      <p>
        text: «{payload?.text}», isValid: {String(payload?.isValid ?? false)}
      </p>
    </>
  );
};

export default Example;
```

<ExampleMaskedFieldOverview />

## Маска

Маска — массив, каждый элемент которого описывает один символ значения:

- **строка** — постоянный символ: `'+'`, `'('`, `' '`, `'-'` и т. д. Такие символы поле вставляет само;
- **регулярное выражение** — символ, который вводит пользователь. Например, `/\d/` — любая цифра, `/[А-Я]/i` — буква кириллицы.

```ts
import { Mask } from '@via-profit/ui-kit/MaskedField';

// 12.03.1990
const dateMask: Mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
```

Как поле обрабатывает ввод:

- символы, которые не подходят ни под один элемент маски, отбрасываются, как и пробелы;
- постоянные символы добавляются по мере ввода: разделитель появляется, только когда введён следующий за ним символ. Шаблон целиком (`+7 (___) ___-__-__`) не показывается — используйте для подсказки `placeholder`;
- если пользователь сам вводит постоянный символ, например `7` в начале телефона, он занимает своё место и не считается введённой цифрой;
- символы сверх длины маски отбрасываются;
- курсор перешагивает через постоянные символы, а удаление постоянного символа ничего не меняет.

## Проверка заполненности

Функция `onChange` получает объект с полем `isValid`. Оно равно `true`, когда заполнены все позиции маски, заданные регулярными выражениями. Проверяется только заполненность, а не смысл: `99.99.9999` для маски даты — допустимое значение.

_Пример использования:_

```tsx
import React from 'react';
import MaskedField, { Mask } from '@via-profit/ui-kit/MaskedField';

const dateMask: Mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <MaskedField
      label="Дата рождения"
      placeholder="ДД.ММ.ГГГГ"
      mask={dateMask}
      value={value}
      error={isTouched && value !== '' && !isValid}
      errorText="Введите дату полностью"
      onBlur={() => setIsTouched(true)}
      onChange={payload => {
        setValue(payload.text);
        setIsValid(payload.isValid);
      }}
    />
  );
};

export default Example;
```

Введите часть даты и уберите фокус с поля:

<ExampleMaskedFieldValidation />

## Значение

Поле хранит введённый текст само и не ждёт, пока родитель передаст его обратно в `value`. Свойство `value` нужно, чтобы задать значение снаружи: при каждом его изменении поле форматирует новое значение по маске и показывает его. Поэтому значение можно передать без разделителей, например `'79161234567'`.

Сохраняйте `text` из `onChange` в состояние и передавайте его в `value`. Иначе поле не заметит, что значение изменилось: если `value` всё время равно `''`, передать `''` ещё раз, чтобы очистить поле, не получится.

_Пример использования:_

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import MaskedField from '@via-profit/ui-kit/MaskedField';

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <MaskedField
        label="Телефон"
        mask={phoneMask}
        value={value}
        onChange={({ text }) => setValue(text)}
      />
      <Button onClick={() => setValue('79161234567')}>Подставить номер</Button>
      <Button onClick={() => setValue('')}>Очистить</Button>
    </>
  );
};

export default Example;
```

<ExampleMaskedFieldValue />

## Динамическая маска

Вместо массива в `mask` можно передать функцию. Она вызывается при каждом изменении с текущим текстом поля и возвращает маску для него.

Например, номера карт American Express начинаются с `34` или `37` и группируются как 4-6-5, а остальные — как 4-4-4-4:

```tsx
import React from 'react';
import MaskedField, { GetMask, Mask } from '@via-profit/ui-kit/MaskedField';

const d = /\d/;
const cardMask: Mask = [d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d, ' ', d, d, d, d];
const amexMask: Mask = [d, d, d, d, ' ', d, d, d, d, d, d, ' ', d, d, d, d, d];

const getMask: GetMask = input => (/^3[47]/.test(input) ? amexMask : cardMask);

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedField
      label="Номер карты"
      placeholder="0000 0000 0000 0000"
      mask={getMask}
      value={value}
      onChange={({ text }) => setValue(text)}
    />
  );
};

export default Example;
```

Введите номер, начинающийся с `37`, а затем с `42`:

<ExampleMaskedFieldDynamic />

## Преобразование значения

Функция `transform` получает отформатированный текст и возвращает новый. Результат и отображается в поле, и передаётся в `onChange`. Поэтому результат должен по-прежнему подходить под маску: `transform` подходит, например, чтобы перевести буквы в верхний регистр.

`transform` применяется только к вводу пользователя. К значению, переданному в `value`, он не применяется: передавайте его уже в нужном виде.

Если нужно значение без разделителей, например только цифры телефона, не используйте `transform`: поле тоже потеряет разделители. Получите такое значение из `text` в `onChange`: `text.replace(/\D/g, '')`.

_Пример использования:_

```tsx
import React from 'react';
import MaskedField from '@via-profit/ui-kit/MaskedField';
import { vin } from '@via-profit/ui-kit/MaskedField/templates';

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <MaskedField
      label="VIN"
      placeholder="XTA-21099043-465234"
      mask={vin}
      value={value}
      transform={text => text.toUpperCase()}
      onChange={({ text }) => setValue(text)}
    />
  );
};

export default Example;
```

<ExampleMaskedFieldTransform />

## Готовые маски

Модуль `@via-profit/ui-kit/MaskedField/templates` содержит маски для распространённых форматов:

| Маска | Формат | Пример |
|-------|--------|--------|
| `kpp` | КПП, 9 цифр | `7707-01-001` |
| `snils` | СНИЛС, 11 цифр | `112-233-445-95` |
| `ogrn` | ОГРН, 13 цифр, первая не 0 | `102-77-00-132195` |
| `ogrnip` | ОГРНИП, 15 цифр, первая не 0 | `304-500116000157` |
| `vin` | VIN, 17 символов: латинские буквы без I, O, Q и цифры, последние 4 — цифры | `XTA-21099043-465234` |

```ts
import { snils } from '@via-profit/ui-kit/MaskedField/templates';

<MaskedField mask={snils} value={value} onChange={({ text }) => setValue(text)} />;
```

## Собственный разбор ввода

Поле обрабатывает ввод в два шага:

1. `parseInput(value, mask, caret)` оставляет из введённого текста только символы, которые подходят под маску, и пересчитывает позицию курсора;
2. результат форматируется по маске: расставляются постоянные символы.

Свойство `parseInput` заменяет первый шаг. Функция получает текст поля, маску и позицию курсора и должна вернуть `{ text, caret }` — символы для подстановки в маску и позицию курсора среди них:

```ts
import { ParseInput } from '@via-profit/ui-kit/MaskedField';

// Принимает только цифры
const parseDigits: ParseInput = (value, mask, caret = 0) => {
  const text = value.replace(/\D/g, '');
  const digitsBeforeCaret = value.slice(0, caret).replace(/\D/g, '').length;

  return { text, caret: digitsBeforeCaret };
};
```

## Хук useMasked

Функции, которые использует поле, доступны через хук `useMasked`. Он пригодится, чтобы отформатировать значение вне поля, например для вывода в таблице:

```tsx
import React from 'react';
import { useMasked } from '@via-profit/ui-kit/MaskedField';

const Phone: React.FC<{ readonly value: string }> = ({ value }) => {
  const { parseAndFormat } = useMasked();

  return <span>{parseAndFormat(value, phoneMask).text}</span>;
};
```

Хук возвращает:

- `parseInput(value, mask, caret?)` — первый шаг: оставляет символы, подходящие под маску. Возвращает `{ text, caret }`;
- `formatParsedInput(parsedValue, mask, caret)` — второй шаг: расставляет постоянные символы. Возвращает `{ text, caret, isValid }`;
- `parseAndFormat(value, mask, caret?)` — оба шага сразу. Возвращает `{ text, caret, isValid }`.

## Переопределение

`<MaskedField>` построен на [`<TextField>`](../text-field/README.md#переопределение) и состоит из тех же компонентов:

- `<Container>` — корневой элемент; получает `className` и `style`
- `<Label>` — подпись `<label>`
- `<Asterisk>` — звёздочка обязательного поля
- `<InputWrapper>` — рамка вокруг поля и иконок
- `<IconWrapper>` — обёртка `startIcon` и `endIcon`
- `<Input>` — элемент `<input>`
- `<ErrorText>` — текст ошибки

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента: компонент, созданный прямо при рендере, React считает новым на каждом рендере, и поле теряет фокус при вводе.

_Пример использования:_ моноширинные цифры, чтобы группы номера карты стояли ровно.

```tsx
import React from 'react';
import styled from '@emotion/styled';
import MaskedField, { FormatParsedPayload, Mask } from '@via-profit/ui-kit/MaskedField';
import TextFieldInput from '@via-profit/ui-kit/TextField/TextFieldInput';

const digits = [/\d/, /\d/, /\d/, /\d/];
const cardMask: Mask = [...digits, ' ', ...digits, ' ', ...digits, ' ', ...digits];

const Input = styled(TextFieldInput)`
  font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
`;

// Created once, outside of the component
const overrides = { Input };

const Example: React.FC = () => {
  const [payload, setPayload] = React.useState<FormatParsedPayload | null>(null);

  return (
    <MaskedField
      label="Номер карты"
      placeholder="0000 0000 0000 0000"
      mask={cardMask}
      value={payload?.text ?? ''}
      overrides={overrides}
      onChange={setPayload}
    />
  );
};

export default Example;
```

<ExampleMaskedFieldOverrides />

## Свойства

Помимо перечисленных ниже, `<MaskedField>` принимает все свойства [`<TextField>`](../text-field/README.md#свойства). Из значений `type` поддерживается только `tel` (он показывает на телефонах цифровую клавиатуру), остальные заменяются на `text`: в полях других типов нельзя управлять положением курсора.

### `mask`
Маска или функция, возвращающая маску для текущего текста. Подробнее в разделах [Маска](#маска) и [Динамическая маска](#динамическая-маска).
- Тип: `Mask | ((input: string) => Mask)`, где `Mask = (RegExp | string)[]`
- Обязательное: **да**

### `value`
Значение поля. При изменении форматируется по маске и заменяет текст поля. Подробнее в разделе [Значение](#значение).
- Тип: `string | null`
- Обязательное: **да**

### `onChange`
Вызывается при каждом изменении текста пользователем.
- Тип: `(payload: { text: string; caret: number; isValid: boolean }, event: React.ChangeEvent<HTMLInputElement>) => void`
  - `text` — отформатированный текст (после `transform`, если он задан)
  - `caret` — позиция курсора
  - `isValid` — заполнены ли все позиции маски
  - `event` — событие `change` поля ввода; `event.currentTarget.value` уже содержит `text`
- Обязательное: **да**

### `transform`
Преобразует отформатированный ввод пользователя. Результат отображается в поле и передаётся в `onChange`. К значению из `value` не применяется. Подробнее в разделе [Преобразование значения](#преобразование-значения).
- Тип: `(value: string) => string`
- По умолчанию: `undefined`
- Обязательное: нет

### `parseInput`
Заменяет разбор ввода. Подробнее в разделе [Собственный разбор ввода](#собственный-разбор-ввода).
- Тип: `(value: string, mask: Mask, caret?: number) => { text: string; caret: number }`
- По умолчанию: `useMasked().parseInput`
- Обязательное: нет
