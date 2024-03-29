import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';

const ExampleSwitchBasic: React.FC = () => (
  <>
    <Switch defaultChecked />
    <Switch />
    <Switch defaultChecked disabled />
    <Switch disabled />
  </>
);

export default ExampleSwitchBasic;
