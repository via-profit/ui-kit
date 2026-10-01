# Флаги стран

## Содержание

- [Описание](#описание)
- [Размер и оформление](#размер-и-оформление)
- [Флаг по коду страны](#флаг-по-коду-страны)
- [Все флаги](#все-флаги)
- [Доступность](#доступность)
- [Свойства](#свойства)

## Описание

256 флагов стран и территорий в виде SVG-компонентов в пропорции 3:2. Каждый флаг лежит в отдельном файле и называется по коду страны [ISO 3166-1 alpha-2](https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2): `RU`, `KZ`, `BR` и так далее. Есть и флаги территорий без собственного кода: `GEAB` — Абхазия, `GEOS` — Южная Осетия, `XK` — Косово, `AC` — остров Вознесения.

Импортируйте флаги по отдельности, чтобы в сборку попали только нужные:

```tsx
import React from 'react';
import RU from '@via-profit/ui-kit/CountryFlags/RU';
import KZ from '@via-profit/ui-kit/CountryFlags/KZ';
import BY from '@via-profit/ui-kit/CountryFlags/BY';

const Example: React.FC = () => (
  <ul>
    <li>
      <RU /> Россия
    </li>
    <li>
      <KZ /> Казахстан
    </li>
    <li>
      <BY /> Беларусь
    </li>
  </ul>
);

export default Example;
```

<ExampleCountryFlagsBasic />

## Размер и оформление

Флаг имеет размер `1.5em` × `1em` — по высоте строки текста рядом с ним. Поэтому проще всего менять размер через `font-size`. Можно и задать `width` и `height` напрямую.

Флаг — обычный SVG-элемент, его можно оформить с помощью `styled`. Например, у флагов с белыми полосами на белом фоне не видно краёв — помогут тонкая рамка и скругление.

```tsx
import styled from '@emotion/styled';
import BR from '@via-profit/ui-kit/CountryFlags/BR';

const Flag = styled(BR)`
  border-radius: 0.15em;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
`;

<Flag />
<Flag style={{ fontSize: '2em' }} />
<Flag width="6em" height="4em" />
```

<ExampleCountryFlagsSize />

## Флаг по коду страны

Если код страны известен только во время работы, например приходит с сервера, импортируйте все флаги из `@via-profit/ui-kit/CountryFlags` и выберите нужный по коду. Для неизвестного кода есть заглушка `Unknown` того же размера, что и флаги.

Так в сборку попадают все флаги — используйте этот способ, только когда код действительно заранее неизвестен.

```tsx
import * as flags from '@via-profit/ui-kit/CountryFlags';

type FlagCode = keyof typeof flags;

const CountryFlag: React.FC<{ code: string }> = ({ code }) => {
  const key = code.toUpperCase() as FlagCode;
  const Flag = key in flags ? flags[key] : flags.Unknown;

  return <Flag />;
};
```

<ExampleCountryFlagsByCode />

## Все флаги

Названия стран в примере получены из [`Intl.DisplayNames`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) на языке страницы.

<ExampleCountryFlagsGallery />

## Доступность

По умолчанию флаг считается украшением: у него `aria-hidden`, и программы чтения с экрана его пропускают. Обычно рядом с флагом есть название страны, и озвучивать флаг ещё раз не нужно.

Если флаг показывается без названия, передайте `aria-label`. Тогда флаг получит роль `img` и будет озвучен.

```tsx
<RU aria-label="Россия" />
```

## Свойства

Флаги принимают [атрибуты](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute) элемента `<svg>`. `ref` указывает на этот же элемент.

### `width`, `height`
Размер флага.
- Тип: `string | number`
- По умолчанию: `'1.5em'`, `'1em'`
- Обязательное: нет

### `aria-label`
Название страны для программ чтения с экрана. Без него флаг скрыт от них.
- Тип: `string`
- По умолчанию: `undefined`
- Обязательное: нет
