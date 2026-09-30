import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@via-profit/ui-kit/src/ThemeProvider';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13em, 1fr));
  gap: 0.5em;
`;

const Swatch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6em;
  font-size: 0.85em;
`;

const Sample = styled.span`
  flex: none;
  width: 2em;
  height: 2em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border: 1px solid ${({ theme }) => theme.color.textPrimary.alpha(0.2).toString()};
`;

const Code = styled.code`
  display: block;
  opacity: 0.7;
`;

const ExampleThemePalette: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid>
      {Object.entries(theme.color).map(([name, color]) => (
        <Swatch key={name}>
          <Sample style={{ backgroundColor: color.toString() }} />
          <span>
            {name}
            <Code>{color.toHexString()}</Code>
          </span>
        </Swatch>
      ))}
    </Grid>
  );
};

export default ExampleThemePalette;
