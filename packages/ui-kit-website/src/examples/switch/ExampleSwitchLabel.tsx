import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchLabel: React.FC = () => (
  <>
    <Switch defaultChecked>Label</Switch>
    <Switch requiredAsterisk errorText="This field is required" error>
      Required
    </Switch>
    <Switch>Disabled</Switch>
  </>
);

export default ExampleSwitchLabel;
