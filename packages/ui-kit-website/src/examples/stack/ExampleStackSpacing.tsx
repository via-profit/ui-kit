import React from 'react';
import styled from '@emotion/styled';
import Stack from '@via-profit/ui-kit/src/Stack';

const Box = styled.span`
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.4em;
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.6).toString()};
`;

const Label = styled.code`
  width: 3em;
`;

const steps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const ExampleStackSpacing: React.FC = () => (
  <Stack gap="sm">
    {steps.map(step => (
      <Stack key={step} direction="row" gap="md">
        <Label>{step}</Label>
        <Stack direction="row" gap={step}>
          <Box />
          <Box />
          <Box />
        </Stack>
      </Stack>
    ))}
  </Stack>
);

export default ExampleStackSpacing;
