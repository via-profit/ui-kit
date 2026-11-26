# Аккордеон

## Содержание

- [Описание](#описание)
- [Группа](#группа)
- [Контролируемый аккордеон](#контролируемый-аккордеон)
- [Переопределение](#переопределение)
- [Свойства](#свойства)

## Описание

Компонент `<Accordion>` — панель с заголовком, которая сворачивается и разворачивается по клику на заголовок. Весь заголовок — это кнопка: она работает с клавиатуры (Tab, Enter, пробел), а программы чтения с экрана сообщают, развёрнута панель или свёрнута. Свёрнутое содержимое недоступно для Tab.

В `header` передайте текст заголовка. Не кладите туда кнопки и ссылки: заголовок сам является кнопкой. Для кнопок действий есть свойство `actions` — они показываются внизу развёрнутой панели.

Без свойства `isOpen` аккордеон неконтролируемый: он сам хранит состояние, а начальное значение задаёт `defaultOpened`.

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/Accordion';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => (
  <Accordion
    header="Доставка и оплата"
    actions={
      <Button variant="outlined" color="primary">
        Все способы доставки
      </Button>
    }
  >
    Доставляем курьером за 1–2 дня или в пункт выдачи за 2–4 дня.
  </Accordion>
);

export default Example;
```

<ExampleAccordionBasic />

## Группа

Аккордеоны, которые идут подряд в одном родителе, визуально объединяются в группу: скругляются только верхние углы первого и нижние углы последнего. Каждый аккордеон в группе открывается независимо.

```tsx
<div>
  <Accordion defaultOpened header="Как оформить возврат?">
    Откройте заказ в личном кабинете и нажмите «Вернуть товар».
  </Accordion>
  <Accordion header="Сколько идут деньги при возврате?">
    Деньги вернутся на карту в течение 10 дней.
  </Accordion>
  <Accordion header="Можно ли изменить адрес доставки?">
    Да, пока заказ не передан в доставку.
  </Accordion>
</div>
```

<ExampleAccordionMultiple />

## Контролируемый аккордеон

Чтобы управлять состоянием самостоятельно, передайте `isOpen` и `onOpen`. `onOpen` вызывается при каждом клике по заголовку — и чтобы открыть, и чтобы закрыть — и получает новое состояние: `true` — открыть, `false` — закрыть.

`onOpen` можно передать и неконтролируемому аккордеону, чтобы узнавать об изменениях: состояние он продолжит хранить сам.

Так можно сделать группу, в которой одновременно открыт только один аккордеон:

_Пример использования:_

```tsx
import React from 'react';
import Accordion from '@via-profit/ui-kit/Accordion';

const steps = ['Контактные данные', 'Адрес доставки', 'Способ оплаты'];

const Example: React.FC = () => {
  const [openedStep, setOpenedStep] = React.useState<number | null>(0);

  return (
    <div>
      {steps.map((step, index) => (
        <Accordion
          key={step}
          header={step}
          isOpen={openedStep === index}
          onOpen={isOpen => setOpenedStep(isOpen ? index : null)}
        >
          …
        </Accordion>
      ))}
    </div>
  );
};

export default Example;
```

<ExampleAccordionControlled />

## Переопределение

Компонент `<Accordion>` является составным и реализован при помощи следующих компонентов:

- `<Container>` — корневой элемент; получает все атрибуты `<div>`, переданные в `<Accordion>`
- `<Header>` — заголовок; внутри него кнопка, которая сворачивает и разворачивает панель
- `<Content>` — содержимое, в том числе `actions`
- `<Actions>` — обёртка кнопок действий

Используйте свойство `overrides`, чтобы переопределить один или несколько компонентов. Проще всего расширить стандартный компонент с помощью `styled`. Создавайте переопределения один раз — вне компонента, а не при рендере.

_Пример использования:_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import Accordion from '@via-profit/ui-kit/Accordion';
import AccordionHeader from '@via-profit/ui-kit/Accordion/AccordionHeader';

const Header = styled(AccordionHeader)`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

// Created once, outside of the component
const overrides = { Header };

const Example: React.FC = () => (
  <Accordion header="Характеристики" overrides={overrides}>
    Вес 1,2 кг, размеры 30 × 20 × 5 см, гарантия 2 года.
  </Accordion>
);

export default Example;
```

<ExampleAccordionOverrides />

## Свойства

Помимо перечисленных ниже, `<Accordion>` принимает [стандартные атрибуты](https://developer.mozilla.org/ru/docs/Web/HTML/Element/div#атрибуты) элемента `<div>` и передаёт их в `<Container>`. `ref` указывает на этот же элемент.

### `children`
Содержимое, которое показывается в развёрнутом аккордеоне.
- Тип: `React.ReactNode`
- Обязательное: **да**

### `header`
Заголовок. Без него аккордеон нельзя открыть кликом, а в консоль выводится предупреждение.
- Тип: `JSX.Element | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `actions`
Кнопки действий внизу развёрнутого аккордеона, прижаты вправо.
- Тип: `JSX.Element | string`
- По умолчанию: `undefined`
- Обязательное: нет

### `defaultOpened`
Начальное состояние неконтролируемого аккордеона.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `isOpen`
Состояние контролируемого аккордеона. Передавайте вместе с `onOpen`.
- Тип: `boolean`
- По умолчанию: `undefined`
- Обязательное: нет

### `onOpen`
Вызывается при клике по заголовку и получает новое состояние.
- Тип: `(isOpen: boolean) => void`
- По умолчанию: `undefined`
- Обязательное: нет

### `noPadding`
Если `true`, у содержимого и кнопок действий нет внутренних отступов.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

### `overrides`
Объект для переопределения составных компонентов. Подробнее в разделе [Переопределение](#переопределение).
- Тип: `AccordionOverrides`
- По умолчанию: `undefined`
- Обязательное: нет
