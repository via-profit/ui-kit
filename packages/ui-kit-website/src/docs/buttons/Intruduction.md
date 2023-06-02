# Кнопки

Компонент `<Button>` создаёт кликабельную кнопку, которая может быть
использована в формах или в любом другом месте документа, который требует простой,
стандартной кнопки.

<ExampleOverview />

Компонент исполнен в различных стилях: `standard`;.

## Кнопка стиля «standard»

Данный стиль применяется в большинстве случаев и является стилем кнопки по умолчанию.

_Пример использования:_


```tsx
import React from 'react';
import Button from '@via-profit/ui-kit/Button';

const ButtonStandard: React.FC = () => (
  <Button variant="standard">Кнопка стиль «standard»</Button>
);

export default ButtonStandard;
```

<ExampleButtonStandard />