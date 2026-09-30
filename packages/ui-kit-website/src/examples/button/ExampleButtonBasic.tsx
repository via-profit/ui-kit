import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const ExampleButtonBasic: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <Button onClick={() => setCount(value => value + 1)}>
      <FormattedMessage defaultMessage="Нажато: {count}" values={{ count }} />
    </Button>
  );
};

export default ExampleButtonBasic;
