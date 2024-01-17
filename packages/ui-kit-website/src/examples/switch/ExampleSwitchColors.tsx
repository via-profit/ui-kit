import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchColors: React.FC = () => (
  <>
    <Switch defaultChecked color="default">
      Standard default
    </Switch>
    <Switch defaultChecked color="primary">
      Standard primary
    </Switch>
    <Switch defaultChecked color="secondary">
      Standard secondary
    </Switch>
    <Switch defaultChecked color="#308dfc">
      Standard #308dfc
    </Switch>
    <Switch defaultChecked color="lightpink">
      Standard lightpink
    </Switch>
  </>
);

export default ExampleSwitchColors;
