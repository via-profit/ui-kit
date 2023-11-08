import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { AnchorPos } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Orange' },
  { id: 3, name: 'Tomato' },
];

const StyledAnchorContainer = styled.div`
  width: 22em;
  height: 22em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const StyledAnchorElement = styled.div`
  width: 8em;
  height: 8em;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.accentPrimary.darken(6).toString()};
`;

type AnchorButtonProps = {
  readonly value: AnchorPos;
  readonly isActive: boolean;
  readonly onChange: (value: AnchorPos) => void;
};

const AnchorButton: React.FC<AnchorButtonProps> = props => {
  const { isActive, value, onChange } = props;

  return (
    <Button
      color={isActive ? 'primary' : 'default'}
      variant="plain"
      onClick={() => onChange(value)}
    >
      {value}
    </Button>
  );
};

const ExampleMenuAnchorPos: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [anchorPos, setAnchorPos] = React.useState<AnchorPos>('auto-start-end');
  const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);
  const theme = useTheme();

  return (
    <>
      <div>
        <AnchorButton
          value="auto"
          isActive={anchorPos === 'auto'}
          onChange={() => setAnchorPos('auto')}
        />
        <AnchorButton
          value="auto-start-end"
          isActive={anchorPos === 'auto-start-end'}
          onChange={() => setAnchorPos('auto-start-end')}
        />
      </div>
      <AnchorButton
        value="top-start"
        isActive={anchorPos === 'top-start'}
        onChange={() => setAnchorPos('top-start')}
      />
      <AnchorButton
        value="top"
        isActive={anchorPos === 'top'}
        onChange={() => setAnchorPos('top')}
      />
      <AnchorButton
        value="top-start-end"
        isActive={anchorPos === 'top-start-end'}
        onChange={() => setAnchorPos('top-start-end')}
      />
      <AnchorButton
        value="top-end"
        isActive={anchorPos === 'top-end'}
        onChange={() => setAnchorPos('top-end')}
      />

      <StyledAnchorContainer>
        <StyledAnchorElement ref={setAnchorElement}></StyledAnchorElement>
        <Menu
          isOpen
          anchorElement={anchorElement}
          anchorPos={anchorPos}
          disablePortal
          zIndex={theme.zIndex.header - 1}
          value={value}
          items={items}
          getOptionSelected={({ item, value }) => item.id === value.id}
          onSelectItem={item => setValue(item)}
        >
          {({ item }, itemProps) => (
            <MenuItem {...itemProps} key={item.id}>
              {item.name}
            </MenuItem>
          )}
        </Menu>
      </StyledAnchorContainer>

      <AnchorButton
        value="bottom-start"
        isActive={anchorPos === 'bottom-start'}
        onChange={() => setAnchorPos('bottom-start')}
      />
      <AnchorButton
        value="bottom"
        isActive={anchorPos === 'bottom'}
        onChange={() => setAnchorPos('bottom')}
      />
      <AnchorButton
        value="bottom-start-end"
        isActive={anchorPos === 'bottom-start-end'}
        onChange={() => setAnchorPos('bottom-start-end')}
      />
      <AnchorButton
        value="bottom-end"
        isActive={anchorPos === 'bottom-end'}
        onChange={() => setAnchorPos('bottom-end')}
      />
    </>
  );
};

export default ExampleMenuAnchorPos;
