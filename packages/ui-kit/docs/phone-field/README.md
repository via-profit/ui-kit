# Поле телефона

## Содержание

- [Описание](#описание)
- [Шаблоны](#шаблоны)
- [Значение и onChange](#значение-и-onchange)
- [Проверка заполненности](#проверка-заполненности)
- [Свои шаблоны](#свои-шаблоны)
- [Хук usePhoneUtils](#хук-usephoneutils)
- [Свойства](#свойства)

## Описание

Компонент `<PhoneField>` — поле [`<MaskedField>`](../masked-field/README.md) для ввода номера телефона. По первым цифрам он определяет страну, форматирует номер по шаблону этой страны и показывает её флаг. Вместе с отформатированным текстом `onChange` получает страну, код страны, номер без кода и признак того, что номер введён полностью.

_Пример использования:_

```tsx
import React from 'react';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/PhoneField';
import templates from '@via-profit/ui-kit/PhoneField/templates';

const Example: React.FC = () => {
  const [payload, setPayload] = React.useState<PhonePayload | null>(null);

  return (
    <PhoneField
      label="Телефон"
      templates={templates}
      value={payload?.value ?? ''}
      onChange={(event, newPayload) => setPayload(newPayload)}
    />
  );
};

export default Example;
```

Введите номер, например `89876543210`, `+375291234567` или `+12125550123`:

<ExamplePhoneFieldOverview />

## Шаблоны

Поле форматирует номер по одному из шаблонов из свойства `templates`. Набор шаблонов по умолчанию находится в модуле `@via-profit/ui-kit/PhoneField/templates`:

| Страна | Формат |
|--------|--------|
| Россия | `+7 (987) 654-32-10`, `8 (987) 654-32-10` |
| Казахстан | `+7 (700) 765-43-21`, `+997 (98) 765-43-21` |
| Беларусь | `+375 (98) 765-43-21` |
| Украина | `+380 (98) 765-4321` |
| Китай | `+86 (138) 0013-8000` |
| Япония | `+81 (90) 1234-5678` (мобильные), `+81 (98) 765-4321` |
| США | `+1 (987) 654-3210` |
| Израиль | `+972 50 432-10-01` (мобильные), `+972 3 432-1001` |

Как поле выбирает шаблон:

- из введённого текста остаются только цифры и `+`. `+` учитывается только в начале номера, в остальных местах он пропускается;
- шаблоны проверяются по порядку, выбирается первый, чьё регулярное выражение подходит под этот текст. Поэтому `+7` и `7` определяются как Россия, а `+77` и `+76` — как Казахстан;
- если не подошёл ни один шаблон, используется запасной шаблон `+x xxx xxx-xx-xx` без страны и с флагом-заглушкой. Его всегда добавляет само поле.

Номер, введённый с `8`, остаётся в формате `8 (xxx) xxx-xx-xx`: поле не заменяет `8` на `+7`. При этом `callingCode` и `number` в `onChange` такие же, как для `+7`.

Подсказка в поле (`placeholder`) по умолчанию берётся из выбранного шаблона и меняется вместе со страной. Если передать свойство `placeholder`, будет показан он.

Нажатие на флаг выделяет весь текст поля, чтобы номер было удобно заменить. Свойство `withoutCountryFlag` скрывает флаг.

## Значение и onChange

`onChange` вызывается при каждом изменении текста и получает два аргумента:

1. событие `change` поля ввода. К моменту вызова `event.currentTarget.value` уже содержит отформатированный текст;
2. объект с данными о номере:

| Поле | Описание | Пример |
|------|----------|--------|
| `value` | отформатированный текст | `'+7 (987) 654-32-10'` |
| `countryCode` | код страны ISO 3166-1 alpha-2 или `null` | `'RU'` |
| `callingCode` | телефонный код страны или `null` | `'7'` |
| `number` | номер без кода страны и разделителей | `'9876543210'` |
| `combined` | `callingCode` и `number` вместе — удобно для хранения | `'79876543210'` |
| `isValid` | введён ли номер полностью | `true` |
| `CountryFlag` | элемент флага страны или `null` | `<RU />` |
| `template` | шаблон, `x` — цифра | `'+7 (xxx) xxx-xx-xx'` |
| `placeholder` | подсказка шаблона | `'+7 (987) 654-32-10'` |

Как и [`<MaskedField>`](../masked-field/README.md#значение), поле хранит введённый текст само. Свойство `value` задаёт значение снаружи: при его изменении поле форматирует новое значение и показывает его. Поэтому можно передать номер в любом виде, например `'79876543210'`. Сохраняйте `payload.value` в состояние и передавайте его в `value` — иначе поле не заметит, что значение изменилось, и очистить его передачей `''` не получится.

## Проверка заполненности

`isValid` равно `true`, когда количество цифр совпадает с количеством цифр в шаблоне. Проверяется только длина, а не существование номера.

Для запасного шаблона без страны проверяется то же самое: 11 цифр. Поэтому номер неизвестной страны может получить `isValid: true`, хотя отформатирован неправильно. Если такие номера нужно отклонять, проверяйте ещё и `countryCode !== null`.

_Пример использования:_

```tsx
import React from 'react';
import PhoneField from '@via-profit/ui-kit/PhoneField';
import templates from '@via-profit/ui-kit/PhoneField/templates';

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  return (
    <PhoneField
      label="Телефон для связи"
      requiredAsterisk
      templates={templates}
      value={value}
      error={isTouched && !isValid}
      errorText="Введите номер полностью"
      onBlur={() => setIsTouched(true)}
      onChange={(event, payload) => {
        setValue(payload.value);
        setIsValid(payload.isValid);
      }}
    />
  );
};

export default Example;
```

<ExamplePhoneFieldValidation />

## Свои шаблоны

Шаблон — кортеж из шести элементов:

```ts
type PhoneTemplate = [
  countryCode: CountryCode | null, // 'RU'
  CountryFlag: JSX.Element | null, // <RU />
  callingCode: string | null, // '7'
  template: string, // '+7 (xxx) xxx-xx-xx', «x» — цифра, остальные символы вставляются как есть
  placeholder: string, // '+7 (987) 654-32-10'
  regexp: RegExp, // /^\+?7/ — проверяется на цифрах и «+», введённых пользователем
];
```

Флаг — любой элемент: своя иконка, картинка или `null`, если флаг не нужен. Флаги стран из набора по умолчанию можно взять из него же: `defaultTemplates.find(([code]) => code === 'RU')?.[1]`. Шаблоны проверяются по порядку, поэтому более конкретные ставьте раньше общих: например, мобильные номера Японии (`/^\+?81[789]0/`) идут перед остальными (`/^\+?81/`).

Чтобы оставить только нужные страны, отфильтруйте набор по умолчанию:

```tsx
import React from 'react';
import PhoneField from '@via-profit/ui-kit/PhoneField';
import defaultTemplates, { PhoneTemplate } from '@via-profit/ui-kit/PhoneField/templates';

const templates: PhoneTemplate[] = defaultTemplates.filter(
  ([countryCode]) => countryCode === 'RU' || countryCode === 'BY',
);

const Example: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <PhoneField
      label="Телефон (Россия или Беларусь)"
      templates={templates}
      value={value}
      onChange={(event, payload) => setValue(payload.value)}
    />
  );
};

export default Example;
```

Номер другой страны, например `+380…`, будет отформатирован по запасному шаблону:

<ExamplePhoneFieldTemplates />

## Хук usePhoneUtils

Функции, которые использует поле, доступны через хук `usePhoneUtils`. Он пригодится, чтобы отформатировать или проверить номер вне поля, например при выводе списка контактов:

```tsx
import React from 'react';
import { usePhoneUtils } from '@via-profit/ui-kit/PhoneField';
import templates from '@via-profit/ui-kit/PhoneField/templates';

const Phone: React.FC<{ readonly value: string }> = ({ value }) => {
  const { parseAndFormat } = usePhoneUtils({ templates });
  const { text, CountryFlag } = parseAndFormat(value);

  return (
    <span>
      {CountryFlag} {text}
    </span>
  );
};
```

<ExamplePhoneFieldFormat />

Хук принимает `{ templates }` и возвращает:

- `parseAndFormat(value, caret?)` — форматирует строку. Возвращает `{ text, caret, countryCode, CountryFlag, callingCode, number, template, placeholder, isValid }`;
- `parseAndValidate(value)` — возвращает `true`, если номер введён полностью;
- `getTemplateInfo(parsedValue)` — находит шаблон для строки из цифр и `+`. Возвращает `{ countryCode, CountryFlag, callingCode, template, placeholder, regexp }`;
- `parseInput(value, caret?)` — оставляет в строке только цифры и `+`. Возвращает `{ text, caret }`;
- `formatParsedInput(parsedValue, caret, defaultCountry?)` — форматирует результат `parseInput`. Возвращает то же, что `parseAndFormat`. Для пустой строки возвращает данные шаблона страны `defaultCountry` (или запасного шаблона);
- `validateParsedInput(value, template)` — сравнивает количество цифр в строке и в шаблоне.

## Свойства

Помимо перечисленных ниже, `<PhoneField>` принимает все свойства [`<TextField>`](../text-field/README.md#свойства). `startIcon` заменяет флаг страны. Передайте `type="tel"`, чтобы на телефонах открывалась цифровая клавиатура.

### `templates`
Шаблоны номеров. Подробнее в разделах [Шаблоны](#шаблоны) и [Свои шаблоны](#свои-шаблоны).
- Тип: `readonly PhoneTemplate[]`
- Обязательное: **да**

### `value`
Значение поля. При изменении форматируется и заменяет текст поля. Подробнее в разделе [Значение и onChange](#значение-и-onchange).
- Тип: `string`
- Обязательное: **да**

### `onChange`
Вызывается при каждом изменении текста пользователем.
- Тип: `(event: React.ChangeEvent<HTMLInputElement>, payload: PhonePayload) => void`
- Обязательное: **да**

### `withoutCountryFlag`
Если `true`, флаг страны не отображается.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `placeholder`
Подсказка в пустом поле. Если не передана, берётся из шаблона.
- Тип: `string`
- По умолчанию: `placeholder` текущего шаблона
- Обязательное: нет
