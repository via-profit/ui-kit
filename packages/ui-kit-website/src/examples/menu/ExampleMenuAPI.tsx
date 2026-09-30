import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Menu, { MenuRef } from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

type Item = {
  readonly id: number;
  readonly name: string;
};

const items: Item[] = [...new Array(20).keys()].map(i => ({ id: i, name: `Элемент ${i + 1}` }));

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 1em;
`;

const ExampleMenuAPI: React.FC = () => {
  const menuRef = React.useRef<MenuRef | null>(null);
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
  const [value, setValue] = React.useState<Item | null>(null);

  return (
    <>
      <Toolbar>
        <Button
          color="primary"
          onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
        >
          {anchorElement ? (
            <FormattedMessage defaultMessage="Закрыть меню" />
          ) : (
            <FormattedMessage defaultMessage="Открыть меню" />
          )}
        </Button>
        <Button disabled={!anchorElement} onClick={() => menuRef.current?.highlightPrevItem()}>
          highlightPrevItem()
        </Button>
        <Button disabled={!anchorElement} onClick={() => menuRef.current?.highlightNextItem()}>
          highlightNextItem()
        </Button>
        <Button disabled={!anchorElement} onClick={() => menuRef.current?.selectHighlightedItem()}>
          selectHighlightedItem()
        </Button>
      </Toolbar>
      <Paragraph>
        {value ? (
          <FormattedMessage defaultMessage="Выбрано: {name}" values={{ name: value.name }} />
        ) : (
          <FormattedMessage defaultMessage="Ничего не выбрано" />
        )}
      </Paragraph>
      <Menu
        ref={menuRef}
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-start"
        autofocus={false}
        closeOnSelect={false}
        closeOutsideClick={false}
        value={value}
        items={items}
        getOptionSelected={({ item, value }) => item.id === value.id}
        onSelectItem={item => setValue(item)}
        onRequestClose={() => setAnchorElement(null)}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ExampleMenuAPI;
