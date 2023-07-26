import React from 'react';
import styled from '@emotion/styled';

import UnknownFlag from './UnknownFlag';

export interface CountryFlagComponentProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly flag: JSX.Element | null;
}

const CountryFlagContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  border-radius: 100%;
  overflow: hidden;
  margin-left: 0.5em;
  margin-right: 0.5em;
  position: relative;
  width: 1em;
  height: 1em;
  border: 1px solid ${({ theme }) => theme.color.textPrimary.alpha(0.5).toString()};
  & > svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CountryFlagComponent: React.FC<CountryFlagComponentProps> = props => {
  const { flag, ...otherProps } = props;

  return (
    <CountryFlagContainer {...otherProps}>
      {typeof flag === 'undefined' || flag === null ? <UnknownFlag /> : flag}
    </CountryFlagContainer>
  );
};

export default CountryFlagComponent;
