import React from 'react';
import Switch from '@via-profit/ui-kit/src/Switch';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
`;

const ExampleSwitchLabelPlacement: React.FC = () => (
  <Wrapper>
    <Switch defaultChecked labelPosition="start">
      Start
    </Switch>
    <Switch defaultChecked labelPosition="end">
      End
    </Switch>
    <Switch defaultChecked labelPosition="top">
      Top
    </Switch>
    <Switch defaultChecked labelPosition="bottom">
      Bottom
    </Switch>
  </Wrapper>
);

export default ExampleSwitchLabelPlacement;
