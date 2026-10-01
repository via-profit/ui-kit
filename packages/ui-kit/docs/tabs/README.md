# Вкладки

## Содержание

- [Описание](#описание)
- [Контролируемые вкладки](#контролируемые-вкладки)
- [Вертикальные вкладки и цвет](#вертикальные-вкладки-и-цвет)
- [Много вкладок](#много-вкладок)
- [Оформление](#оформление)
- [Клавиатура и доступность](#клавиатура-и-доступность)
- [Свойства](#свойства)

## Описание

Вкладки делят содержимое на разделы, из которых виден один: например, карточка клиента с информацией, сделками и историей.

Вкладки собираются из четырёх компонентов:

- `<Tabs>` — хранит выбранную вкладку и связывает остальные части;
- `<TabList>` — ряд вкладок. Назовите его через `aria-label`: программа чтения с экрана объявит название при переходе к вкладкам;
- `<Tab>` — вкладка со значением `value`;
- `<TabPanel>` — содержимое вкладки с тем же `value`.

Без свойства `value` вкладки неконтролируемые: начальную вкладку задаёт `defaultValue`, а без него выбирается первая доступная. Скрытые панели по умолчанию удаляются из DOM.

_Пример использования:_

```tsx
import React from 'react';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/Tabs';

const Example: React.FC = () => (
  <Tabs defaultValue="info">
    <TabList aria-label="Карточка клиента">
      <Tab value="info">Информация</Tab>
      <Tab value="deals">Сделки</Tab>
      <Tab value="history">История</Tab>
      <Tab value="documents" disabled>
        Документы
      </Tab>
    </TabList>
    <TabPanel value="info">ООО «Ромашка», ИНН 7700000000</TabPanel>
    <TabPanel value="deals">Три открытые сделки</TabPanel>
    <TabPanel value="history">Последний звонок — вчера</TabPanel>
  </Tabs>
);

export default Example;
```

<ExampleTabsBasic />

## Контролируемые вкладки

Чтобы управлять выбором самостоятельно, передайте `value` и `onChange`. `onChange(value, event)` вызывается, когда пользователь выбирает вкладку. Внутри `<Tabs>` можно размещать не только вкладки и панели: например, кнопки «Назад» и «Далее».

`fullWidth` растягивает вкладки на всю ширину ряда поровну.

```tsx
const [step, setStep] = React.useState('contacts');

<Tabs value={step} onChange={setStep} fullWidth>
  <TabList aria-label="Оформление заказа">
    <Tab value="contacts">1. Контакты</Tab>
    <Tab value="delivery">2. Доставка</Tab>
    <Tab value="payment">3. Оплата</Tab>
  </TabList>
  <TabPanel value="contacts">...</TabPanel>
  <TabPanel value="delivery">...</TabPanel>
  <TabPanel value="payment">...</TabPanel>
  <Button onClick={() => setStep('delivery')}>Далее</Button>
</Tabs>;
```

<ExampleTabsControlled />

## Вертикальные вкладки и цвет

- `orientation="vertical"` — вкладки стоят столбцом слева от панели, между ними переходят стрелками ↑/↓;
- `color` — цвет выбранной вкладки и её индикатора: `default`, `primary`, `secondary` или любой цвет CSS.

```tsx
<Tabs orientation="vertical" defaultValue="profile" color="secondary">
  <TabList aria-label="Настройки">
    <Tab value="profile">Профиль</Tab>
    <Tab value="notifications">Уведомления</Tab>
    <Tab value="security">Безопасность</Tab>
  </TabList>
  <TabPanel value="profile">...</TabPanel>
  <TabPanel value="notifications">...</TabPanel>
  <TabPanel value="security">...</TabPanel>
</Tabs>
```

<ExampleTabsVertical />

## Много вкладок

Если вкладки не помещаются в ширину, ряд прокручивается, а выбранная вкладка сама прокручивается в видимую часть.

По умолчанию стрелки сразу выбирают вкладку (`activation="auto"`). Если панель загружается долго, например с сервера, передайте `activation="manual"`: стрелки будут только переводить фокус, а выбирать вкладку — Enter или пробел.

```tsx
<Tabs defaultValue="0" activation="manual">
  <TabList aria-label="Месяц отчёта">
    {months.map((month, index) => (
      <Tab key={month} value={String(index)}>
        {month}
      </Tab>
    ))}
  </TabList>
  ...
</Tabs>
```

<ExampleTabsScroll />

## Оформление

Части вкладок вы выводите сами, поэтому свойства `overrides` у них нет: оформите нужную часть через `styled`, `className` или `style`. Выбранная вкладка отмечена атрибутом `aria-selected="true"`, её индикатор — псевдоэлемент `::after`.

_Пример использования:_ переключатель периода в виде «таблеток».

```tsx
import styled from '@emotion/styled';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/Tabs';

const PillList = styled(TabList)`
  display: inline-flex;
  gap: 0.25em;
  padding: 0.25em;
  border: 0;
  border-radius: 2em;
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.06).toString()};
`;

const Pill = styled(Tab)`
  border-radius: 2em;

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.color.surface.toString()};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  &::after {
    display: none;
  }
`;
```

<ExampleTabsStyled />

## Клавиатура и доступность

- Tab попадает в ряд вкладок один раз — на выбранную вкладку, следующий Tab переходит в панель;
- стрелки ←/→ (↑/↓ у вертикальных вкладок) переходят между вкладками по кругу, Home и End — к первой и последней. Отключённые вкладки пропускаются;
- ряд получает роль `tablist`, вкладки — `tab` с `aria-selected` и `aria-controls`, панели — `tabpanel` с `aria-labelledby`. Связь задаётся автоматически по `value`;
- панель доступна с клавиатуры (`tabIndex={0}`), даже если внутри нет полей и кнопок.

## Свойства

### Tabs

Помимо перечисленных ниже, `<Tabs>` принимает атрибуты элемента `<div>`. `ref` указывает на этот же элемент.

#### `value`
Выбранная вкладка контролируемых вкладок. `null` — ничего не выбрано.
- Тип: `string | null`
- По умолчанию: `undefined`
- Обязательное: нет

#### `defaultValue`
Начальная вкладка неконтролируемых вкладок.
- Тип: `string`
- По умолчанию: первая доступная вкладка
- Обязательное: нет

#### `onChange`
Вызывается при выборе вкладки.
- Тип: `(value: string, event: React.SyntheticEvent) => void`
- По умолчанию: `undefined`
- Обязательное: нет

#### `orientation`
Расположение вкладок.
- Тип: `'horizontal' | 'vertical'`
- По умолчанию: `'horizontal'`
- Обязательное: нет

#### `activation`
`auto` — стрелки сразу выбирают вкладку, `manual` — только переводят фокус.
- Тип: `'auto' | 'manual'`
- По умолчанию: `'auto'`
- Обязательное: нет

#### `fullWidth`
Если `true`, вкладки делят ширину ряда поровну.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет

#### `color`
Цвет выбранной вкладки.
- Тип: `'default' | 'primary' | 'secondary' | string`
- По умолчанию: `'default'`
- Обязательное: нет

### TabList

Принимает атрибуты элемента `<div>`, `ref` указывает на этот же элемент. Назовите ряд через `aria-label` или `aria-labelledby`.

### Tab

Принимает атрибуты элемента `<button>` (`disabled`, `onClick` и другие), `ref` указывает на этот же элемент.

#### `value`
Значение вкладки.
- Тип: `string`
- Обязательное: **да**

### TabPanel

Принимает атрибуты элемента `<div>`, `ref` указывает на этот же элемент.

#### `value`
Значение вкладки, к которой относится панель.
- Тип: `string`
- Обязательное: **да**

#### `keepMounted`
Если `true`, скрытая панель остаётся в DOM — например, чтобы не терять состояние формы внутри неё.
- Тип: `boolean`
- По умолчанию: `false`
- Обязательное: нет
