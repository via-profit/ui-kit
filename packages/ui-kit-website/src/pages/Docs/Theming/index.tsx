import React from 'react';
import styled from '@emotion/styled';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import createTheme from '@via-profit/ui-kit/src/ThemeProvider/createTheme';
import Color from '@via-profit/ui-kit/src/Color';
import ThemeProvider from '@via-profit/ui-kit/src/ThemeProvider';
import Button from '@via-profit/ui-kit/src/Button';
import H2 from '@via-profit/ui-kit/src/Typography/H2';
import Typography from '@via-profit/ui-kit/src/Typography';
import content from '~/docs/theming/intruduction.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';

const Theming: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleThemeProvider }}>{content}</RenderMarkdown>
  </Surface>
);

export default Theming;
