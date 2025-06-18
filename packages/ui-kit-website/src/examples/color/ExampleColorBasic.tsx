import React from 'react';
import Color from '@via-profit/ui-kit/src/Color';
import styled from '@emotion/styled';

type Styles = {
  readonly background: string;
  readonly foreground: string;
};

const Badge = styled.span<Styles>`
  background-color: ${({ background }) => background};
  color: ${({ foreground }) => foreground};
  padding: 1em;
`;

const ExampleColorBasic: React.FC = () => {
  const background = React.useMemo(() => new Color('red').darken(50).luminance(0.5).hexString(), []);
  const foreground = React.useMemo(() => new Color('red').lighten(200).hexString(), []);

  return (
    <Badge background={background} foreground={foreground}>
      Lorem ipsum
    </Badge>
  );
};

export default ExampleColorBasic;
