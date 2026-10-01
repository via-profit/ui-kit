# @via-profit/ui-kit

Набор React-компонентов для интерфейсов: поля ввода, кнопки, календарь, меню, модальные окна и другие. Компоненты оформлены по теме, которую вы задаёте один раз для всего приложения. Каждый компонент можно расширить с помощью `styled` или заменить его части через `overrides`.

## Содержание

- [Установка](#установка)
- [Тема оформления](#тема-оформления)
- [Импорт компонентов](#импорт-компонентов)
- [Компоновка](#компоновка)
- [Общие принципы](#общие-принципы)
- [Свои компоненты на основе ui-kit](#свои-компоненты-на-основе-ui-kit)
- [Компоненты](#компоненты)

## Установка

Пакету нужны React 18 и [Emotion](https://emotion.sh) — они указаны как peer-зависимости, поэтому установите их вместе с ui-kit:

```bash
npm install @via-profit/ui-kit @emotion/react @emotion/styled react react-dom
```

- `react`, `react-dom` — версии 18.2 и новее;
- `@emotion/react`, `@emotion/styled` — версии 11.10.6 и новее.

## Тема оформления

Компоненты берут цвета, скругления и `z-index` из темы, поэтому оберните приложение в `<ThemeProvider>`. Без него компоненты не отобразятся. Тема создаётся функцией `createTheme`. Её параметры, тёмная тема и переключение тем описаны в разделе [Темы оформления](./theming/README.md).

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProvider, { createTheme } from '@via-profit/ui-kit/ThemeProvider';

import App from './App';

// Created once, outside of the component
const theme = createTheme({
  color: {
    accentPrimary: '#0b6bcb',
  },
});

createRoot(document.getElementById('app')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);
```

### Типы темы для TypeScript

Чтобы TypeScript знал поля темы в `styled` и `useTheme`, добавьте в проект файл объявлений, например `src/emotion.d.ts`:

```ts
import '@emotion/react';
import type { UITheme } from '@via-profit/ui-kit/ThemeProvider';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
```

После этого `theme.color.accentPrimary` и другие поля темы будут типизированы:

```tsx
const Title = styled.h2`
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;
```

## Импорт компонентов

Каждый компонент импортируется по своему пути: в сборку попадают только используемые компоненты.

```tsx
import Button from '@via-profit/ui-kit/Button';
import TextField from '@via-profit/ui-kit/TextField';
import { H1, Paragraph } from '@via-profit/ui-kit/Typography';
```

Составные части компонентов, нужные для переопределения, лежат рядом: `@via-profit/ui-kit/Button/ButtonTextWrapper`, `@via-profit/ui-kit/Surface/SurfaceHeader` и так далее.

## Компоновка

Для раскладки элементов есть два компонента, и обоим не нужны обёртки вокруг каждого элемента:

- [`<Stack>`](./stack/README.md) — элементы в столбец или в строку с одинаковым отступом: поля формы, разделы карточки, кнопки в панели;
- [`<Grid>`](./grid/README.md) — элементы в колонках. С `minColumnWidth` колонки сами перестраиваются по ширине экрана, без брейкпоинтов.

Отступы `gap` берутся из шкалы темы: `xs`, `sm`, `md`, `lg`, `xl`. Её же можно использовать в своих `styled` через `theme.spacing`.

```tsx
import Stack from '@via-profit/ui-kit/Stack';
import Grid from '@via-profit/ui-kit/Grid';

<Stack gap="lg">
  <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
    <TextField fullWidth label="Имя" />
    <TextField fullWidth label="Телефон" />
  </Grid>
  <Checkbox>Я согласен с условиями</Checkbox>
  <Stack direction="row" justify="flex-end" gap="sm">
    <Button>Отмена</Button>
    <Button color="primary">Отправить</Button>
  </Stack>
</Stack>
```

Как компоненты выглядят и работают вместе, показано на странице [Примеры использования](/docs/showcase) сайта документации.

## Общие принципы

Компоненты устроены одинаково, поэтому, разобравшись с одним, легко работать с остальными.

- **Атрибуты и `ref`.** Компонент принимает атрибуты своего основного HTML-элемента: `<Button>` — атрибуты `<button>`, `<TextField>` — атрибуты `<input>`. `ref` указывает на этот же элемент. Какой элемент основной, написано в разделе «Свойства» каждого компонента.
- **Контролируемые и неконтролируемые компоненты.** Передайте `value` (или `checked`) вместе с `onChange`, чтобы управлять состоянием самостоятельно, или `defaultValue` (`defaultChecked`), чтобы компонент хранил состояние сам.
- **Цвета.** Свойство `color` обычно принимает `'default'`, `'primary'`, `'secondary'` — цвета темы — или любой цвет CSS: `'#e0435f'`, `'rgb(48, 141, 252)'`, `'lightpink'`.
- **Переопределение частей.** Компоненты состоят из частей, например у кнопки это `Container`, `IconWrapper` и `TextWrapper`. Свойство `overrides` заменяет любые из них. Проще всего расширить стандартную часть с помощью `styled`. Создавайте объект `overrides` один раз — вне компонента, а не при рендере: иначе части будут создаваться заново и, например, поле ввода потеряет фокус.
- **Доступность.** Компоненты работают с клавиатуры и размечены для программ чтения с экрана. Подписи служебных кнопок по умолчанию на английском: `closeButtonLabel` у боковой панели, `prevButtonLabel` и `nextButtonLabel` у календаря, `calendarButtonTooltip` у дейтпикера и другие. Передавайте их на языке вашего интерфейса. Кнопкам без текста (`iconOnly`) добавляйте `aria-label`.

```tsx
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/Button';
import ButtonTextWrapper from '@via-profit/ui-kit/Button/ButtonTextWrapper';

const TextWrapper = styled(ButtonTextWrapper)`
  text-transform: uppercase;
`;

// Created once, outside of the component
const overrides = { TextWrapper };

const BuyButton: React.FC = () => (
  <Button color="primary" overrides={overrides}>
    Купить
  </Button>
);
```

## Свои компоненты на основе ui-kit

Не импортируйте компоненты ui-kit напрямую по всему приложению. Сделайте свои компоненты-обёртки и используйте их. Тогда оформление, подписи и поведение по умолчанию задаются в одном месте, а замена или обновление ui-kit затронут только обёртки.

_Как делать не следует:_ каждый экран импортирует кнопку из ui-kit. Чтобы изменить вид всех кнопок, придётся править каждый экран.

```tsx
import Button from '@via-profit/ui-kit/Button';

// ❌ The ui-kit button is used directly
const ProfilePage: React.FC = () => (
  <div>
    <Button>Сохранить</Button>
  </div>
);
```

_Как правильно:_ кнопка из ui-kit используется только в вашем компоненте `Button`, а все экраны импортируют его.

_src/components/Button.tsx_

```tsx
import React from 'react';
import styled from '@emotion/styled';
import UIButton, { ButtonProps } from '@via-profit/ui-kit/Button';

const StyledButton = styled(UIButton)`
  font-weight: 600;
`;

// The project defaults are set in one place
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <StyledButton color="primary" {...props} ref={ref} />
));

Button.displayName = 'Button';

export default Button;
```

_src/pages/ProfilePage.tsx_

```tsx
import Button from '~/components/Button';

// ✅ The own component based on the ui-kit button
const ProfilePage: React.FC = () => (
  <div>
    <Button>Сохранить</Button>
  </div>
);
```

## Компоненты

Компоненты сгруппированы по назначению, внутри группы — по алфавиту.

- Основы
  - [Темы оформления](./theming/README.md) — тема приложения: цвета, скругления, тёмная тема
  - [Типографика](./typography/README.md) — заголовки, абзацы, списки и цитаты
  - [Цвета](./color/README.md) — работа с цветом: контраст, затемнение, генерация палитр
- Кнопки
  - [Группа кнопок](./button-group/README.md) — кнопки одним блоком и переключатель вариантов
  - [Кнопка](./button/README.md) — кнопки трёх видов, с иконками и в виде иконки
- Поля ввода
  - [Дейтпикер](./date-picker/README.md) — поле даты с календарём
  - [Маскированное поле](./masked-field/README.md) — ввод по маске: номера, коды, даты
  - [Многострочное поле](./text-area/README.md) — поле для длинного текста
  - [Поле телефона](./phone-field/README.md) — номер телефона: страна определяется по первым цифрам
  - [Текстовое поле](./text-field/README.md) — однострочное поле ввода
- Выбор
  - [Автокомплит](./autocomplete/README.md) — поле с подсказками и множественным выбором
  - [Календарь](./calendar/README.md) — выбор даты, периода, месяца, года или недели
  - [Переключатель](./switch/README.md) — переключатель вкл/выкл
  - [Радиокнопка](./radio/README.md) — выбор одного варианта из нескольких
  - [Селектбокс](./selectbox/README.md) — выбор из списка
  - [Чекбокс](./checkbox/README.md) — флажок, в том числе с промежуточным состоянием
- Отображение данных
  - [Аватар](./avatar/README.md) — фото или инициалы пользователя
  - [Бейдж](./badge/README.md) — метки, теги и фильтры
  - [Индикатор загрузки](./loading-indicator/README.md) — спиннер и слой загрузки
  - [Таблица](./table/README.md) — таблицы с оформлением темы
  - [Флаги стран](./country-flags/README.md) — иконки флагов
- Компоновка
  - [Аккордеон](./accordion/README.md) — сворачиваемые панели
  - [Поверхность](./surface/README.md) — карточки и панели
  - [Свайпер](./swiper/README.md) — карусель слайдов
  - [Сетка](./grid/README.md) — элементы в колонках, которые сами перестраиваются по ширине
  - [Стек](./stack/README.md) — элементы в столбец или строку с одинаковым отступом
- Всплывающие элементы
  - [Меню](./menu/README.md) — выпадающий список действий или вариантов
  - [Модальные окна](./modal/README.md) — диалоги, подтверждения и боковые панели
  - [Popper](./popper/README.md) — всплывающий элемент, привязанный к другому
- Утилиты
  - [Клик вне области](./click-outside/README.md) — реакция на клик за пределами элемента
  - [Подсветка подстроки](./highlighted/README.md) — выделение найденного текста
