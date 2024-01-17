import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleButtonColors: React.FC = () => {
  const [switchState, setSwitchState] = React.useState<number | null>(null);

  return (
    <>
      <Switch checked={switchState === 1} onChange={() => setSwitchState(1)}>
        One
      </Switch>
      <Switch checked={switchState === 2} onChange={() => setSwitchState(2)}>
        Two
      </Switch>
      <Switch checked={switchState === 3} onChange={() => setSwitchState(3)}>
        Three
      </Switch>
    </>
  );
};

export default ExampleButtonColors;
