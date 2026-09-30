## Клик вне элемента

## Содержание

- [Описание](#описание)
- [Исключение элементов](#исключение-элементов)
- [Свойства](#свойства)

## Описание

Компонент `<ClickOutside>` позволяет отслеживать событие клика мыши за пределами вашего компонента. Применяется в [`<Menu>`](../menu/README.md) и [`<Autocomplete>`](../autocomplete/README.md) позволяя реагировать на клик мыши за пределами списков в тот момент, когда они открыты и закрывать их.

_Пример использования:_

```tsx
import React from 'react';
import ClickOutside from '@via-profit/ui-kit/ClickOutside';
import Paragraph from '@via-profit/ui-kit/Typography/Paragraph';

const Example: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <ClickOutside onOutsideClick={() => setCounter(c => c + 1)}>
      <Paragraph>Clicked: {counter}</Paragraph>
    </ClickOutside>
  );
};
export default Example;
```

<ExampleClickOutsideOverview />

## Исключение элементов

Иногда клик за пределами компонента не должен считаться кликом снаружи. Типичный случай — кнопка, которая открывает и закрывает выпадающий элемент: без исключения нажатие на неё сначала вызовет `onOutsideClick` и закроет элемент, а затем обработчик кнопки сразу откроет его снова.

Передайте такие элементы в свойство `ignoreElements`. Клики по ним и по их потомкам не вызывают `onOutsideClick`. Значения `null` и `undefined` пропускаются, поэтому можно передать элемент, который ещё не отрисован:

```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';
import Popper from '@via-profit/ui-kit/Popper';
import Surface from '@via-profit/ui-kit/Surface';
import ClickOutside from '@via-profit/ui-kit/ClickOutside';

const Example: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}>
        Открыть
      </Button>

      <ClickOutside ignoreElements={[anchorElement]} onOutsideClick={() => setAnchorElement(null)}>
        <Popper anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
          <Surface>Содержимое</Surface>
        </Popper>
      </ClickOutside>
    </>
  );
};

export default Example;
```

Живой пример есть в документации [`<Popper>`](../popper/README.md#закрытие-по-клику-снаружи).

## Свойства

### `children`
React-элемент, клики за пределами которого отслеживаются. Элемент должен передавать `ref` в DOM-элемент.
**Важно: не используйте фрагмент в качестве дочернего элемента.**
- Тип: `React.ReactElement`
- Обязательное: **да**

### `onOutsideClick`
Функция, которая вызывается при клике за пределами элемента.
- Тип: `(event?: React.MouseEvent<HTMLElement> | MouseEvent) => void`
- Обязательное: **да**

### `mouseEvent`
Событие мыши, на которое реагирует компонент. `false` отключает отслеживание.
- Тип: `'onClick' | 'onMouseDown' | 'onMouseUp' | false`
- По умолчанию: `'onMouseDown'`
- Обязательное: нет

### `ignoreElements`
Элементы, клики по которым (и по их потомкам) не считаются кликами снаружи. Значения `null` и `undefined` пропускаются.
- Тип: `readonly (Element | null | undefined)[]`
- По умолчанию: `undefined`
- Обязательное: нет
