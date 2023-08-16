# Флаги стран

## Содержание

- [Описание](#описание)
- [Свойства](#свойства)

## Описание

По адресу `@via-profit/ui-kit/CountryFlags/<ISO_CODE>` содержутся **svg** версии флагов стран в соотношении 3:2.

По умолчанию, каждый флаг имеет заданые атрибуты ширины `1.5em` и высоты `1em`.

_Пример использования:_

```tsx
import React from 'react';
import BR from '@via-profit/ui-kit/CountryFlags/BR';
import RU from '@via-profit/ui-kit/CountryFlags/RU';
import IN from '@via-profit/ui-kit/CountryFlags/IN';
import CN from '@via-profit/ui-kit/CountryFlags/CN';
import ZA from '@via-profit/ui-kit/CountryFlags/ZA';

const Example: React.FC = () => (
  <>
    <BR />
    <RU />
    <IN />
    <CN />
    <ZA />
  </>
);

export default Example;
```

_Результат:_

<ExampleCountryFlagsOverview />
&nbsp;
&nbsp;

## Свойства

Компонент использует нативный SVG элемент в своём составе и принимает [стандартные аттрибуты](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute) HTML элемента `<svg>`
