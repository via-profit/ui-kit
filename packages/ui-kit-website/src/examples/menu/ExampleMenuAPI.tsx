import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import IconRight from '~/components/Icons/ChevronRightOutline';
import IconLeft from '~/components/Icons/ChevronLeftOutline';
import ClickOutside from '@via-profit/ui-kit/dist/ClickOutside';
import styled from '@emotion/styled';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(30).keys()].map(i => ({
  id: i,
  name: i % 3 === 0 ? `Item ${i} Eiusmod enim labore reprehenderit` : `Item ${i}`,
}));

const Container = styled.div`
  display: inline-flex;
  padding: 1em;
  border: 1px solid ${({ theme }) => theme.color.textSecondary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const ExampleMenuAPI: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const menuRef = React.useRef<MenuRef | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <Container>
        <Button
          variant="standard"
          onClick={el => setAnchorEl(el.currentTarget)}
        >
          Open
        </Button>
        <Button
          variant="standard"
          onClick={el => {
            menuRef.current?.focus();
          }}
        >
          Focus
        </Button>
        <Button
          variant="standard"
          onClick={el => {
            menuRef.current?.setPlacement('right')
          }}
        >
          Random pos
        </Button>
        <Button variant="standard" iconOnly onClick={() => menuRef.current?.highlightPrevItem()}>
          <IconLeft />
        </Button>
        <Button variant="standard" iconOnly onClick={() => menuRef.current?.highlightNextItem()}>
          <IconRight />
        </Button>

        <Button variant="standard" onClick={() => menuRef.current?.selectHighlightedItem()}>
          Select highlighted item in list
        </Button>

        <Button
          variant="standard"
          onClick={() => setAnchorEl(null)}
        >
          Close
        </Button>

        <div>{!value ? <>Value is null</> : <>Selected value is «{value.name}»</>}</div>
        <Menu
          ref={menuRef}
          isOpen={Boolean(anchorEl)}
          anchorElement={anchorEl}
          anchorPos="bottom"
          autofocus={false}
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
      </Container>
    </>
  );
};

export default ExampleMenuAPI;
