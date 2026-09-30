import React from 'react';
import styled from '@emotion/styled';
import Switch from '@via-profit/ui-kit/src/Switch';
import SwitchDot from '@via-profit/ui-kit/src/Switch/SwitchDot';
import SwitchTrack from '@via-profit/ui-kit/src/Switch/SwitchTrack';
import SwitchTextWrapper from '@via-profit/ui-kit/src/Switch/SwitchTextWrapper';
import { FormattedMessage } from 'react-intl';

// Defined once at module level, not during the render
const Dot = styled(SwitchDot)`
  & [data-switch-dot] {
    border-radius: 0.2rem;
  }
`;

const Track = styled(SwitchTrack)`
  border-radius: 0.2rem;
`;

const TextWrapper = styled(SwitchTextWrapper)`
  font-weight: 600;
`;

const overrides = { Dot, Track, TextWrapper };

const ExampleSwitchOverrides: React.FC = () => (
  <Switch defaultChecked color="secondary" overrides={overrides}>
    <FormattedMessage defaultMessage="Квадратный переключатель" />
  </Switch>
);

export default ExampleSwitchOverrides;
