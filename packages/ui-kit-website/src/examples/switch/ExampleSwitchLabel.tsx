import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchLabel: React.FC = () => (
  <>
    <Switch defaultChecked>Label</Switch>
    <Switch requiredAsterisk>Required</Switch>
    <Switch>Disabled</Switch>
  </>
);

export default ExampleSwitchLabel;
