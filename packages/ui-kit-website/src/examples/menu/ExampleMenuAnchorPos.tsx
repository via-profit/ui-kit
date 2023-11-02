import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuAnchorPos } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import styled from '@emotion/styled';

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
  width: 20em;
  height: 20em;
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
  readonly value: MenuAnchorPos;
  readonly isActive: boolean;
  readonly onChange: (value: MenuAnchorPos) => void;
};

const AnchorButton: React.FC<AnchorButtonProps> = props => {
  const { isActive, value, onChange } = props;

  return (
    <Button
      color={isActive ? 'primary' : 'default'}
      variant="outlined"
      onClick={() => onChange(value)}
    >
      {value}
    </Button>
  );
};

const ExampleMenuAnchorPos: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [anchorPos, setAnchorPos] = React.useState<MenuAnchorPos>('left-bottom');
  const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <AnchorButton
        value="left-bottom"
        isActive={anchorPos === 'left-bottom'}
        onChange={() => setAnchorPos('left-bottom')}
      />
      <AnchorButton
        value="left-top"
        isActive={anchorPos === 'left-top'}
        onChange={() => setAnchorPos('left-top')}
      />
      <AnchorButton
        value="right-top"
        isActive={anchorPos === 'right-top'}
        onChange={() => setAnchorPos('right-top')}
      />
      <AnchorButton
        value="right-bottom"
        isActive={anchorPos === 'right-bottom'}
        onChange={() => setAnchorPos('right-bottom')}
      />
      <AnchorButton
        value="left-bottom-right"
        isActive={anchorPos === 'left-bottom-right'}
        onChange={() => setAnchorPos('left-bottom-right')}
      />
      <AnchorButton
        value="left-top-right"
        isActive={anchorPos === 'left-top-right'}
        onChange={() => setAnchorPos('left-top-right')}
      />

      <StyledAnchorContainer>
        <StyledAnchorElement ref={setAnchorElement}></StyledAnchorElement>
        <Menu
          isOpen
          anchorElement={anchorElement}
          anchorPos={anchorPos}
          disablePortal
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
    </>
  );
};

export default ExampleMenuAnchorPos;
