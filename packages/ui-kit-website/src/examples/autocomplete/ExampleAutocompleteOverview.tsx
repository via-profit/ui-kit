import React from 'react';
import styled from '@emotion/styled';
import Autocomplete, { AutocompleteRef } from '@via-profit/ui-kit/src/Autocomplete';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Button from '@via-profit/ui-kit/src/Button';
import TextField from '@via-profit/ui-kit/src/TextField';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const ChipBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  margin: 0.43em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
  border: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [anchorElem, setAnchorElem] = React.useState<HTMLDivElement | null>(null);
  const autocompleteRef = React.useRef<AutocompleteRef | null>(null);

  return (
    <>
      nop
    </>
  );
};

export default ExampleAutocompleteOverview;
