# @via-profit/ui-kit

## Компоненты

- [Кнопка](./button/README.md)
- [Текстовое поле](./text-field/README.md)
- [Поверхность](./surface/README.md)
- [Темы оформления](./theming/README.md)
- [Флаги стран](./country-flags/README.md)
- [Маскированное поле](./masked-field/README.md)
- [Меню](./menu/README.md)
- [Поле для ввода телефона](./phone-field/README.md)
- [Таблица](./table/README.md)
- [Типографика](./typography/README.md)
- [Модальные окна](./modal/README.md)
- [Календарь](./calendar/README.md)
- [Подсветка подстроки](./highlighted/README.md)
- [Бейдж](./badge/README.md)
- [Popper](./popper/README.md)
- [Индикатор загрузки](./loading-indicator/README.md)
- [Click outside](./click-outside/README.md)

## Как использовать

Данный ui kit **не следует** использовать напрямую. Это значит, что вы должны избегать прямого импорта компонентов в своём коде. Вместо этого вы должны создавать свои собственные компоненты, которые будут основываться на этом ui kit. Чтобы было понятнее, рассмотрим пример. Предположим, ваш проект должен содержать такой компонент как [Кнопка](./button/README.md).

_Как делать не следует:_

> В данном примере компонент «Button» импортируется из ui-kit и используется в каком-то ином компоненте. Ошибка заключается в том, что если вам потребуется изменить стиль отображения всех кнопок, то придется модифицировать/стиллизовать кнопку в каждом компоненте по отдельности.

```tsx
import Button from '@via-profit/ui-kit/Button';

// ❌ Неверное решение
const App: React.FC = () => (
  <div>
    <AnyComponent />
    <Button>Push me</Button>
  </div>
);
```

_Как правильно:_

> Правильный подход заключается в том, что вы создаёте компонент «Button», который использует кнопку из ui-kit и как-то её стиллизует (необязательно). А в других участках вашего приложения, вы используете свой же компонент «Button», который основывается на кнопке из ui-kit. При таком подходе, в случае, если вам потребуется изменить стиль отображения всех кнопок, вы меняете его только в одном своём компоненте «Button», в отличии от предыдущего примера, в котором вам потребуется стиллизовать все кнопки в вашем приложении по отдельности.

_src/components/Button.tsx_

```tsx
import Button from '@via-profit/ui-kit/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  background-color: red;
`;

export default StyledButton;
```

_src/index.ts_

```tsx
import Button from 'src/components/Button';

✅ // Верный подход
const App: React.FC = () => (
  <div>
    <AnyComponent />
    <Button>Push me</Button>
  </div>
);
```
