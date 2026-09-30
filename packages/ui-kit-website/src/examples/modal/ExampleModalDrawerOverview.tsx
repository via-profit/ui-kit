import React from 'react';
import styled from '@emotion/styled';
import Modal, { AnchorVariant } from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import { MenuItem } from '@via-profit/ui-kit/src/Menu';
import { FormattedMessage } from 'react-intl';

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Nav = styled.nav`
  min-width: 16em;
  padding: 0 0.5em;
`;

const anchors: AnchorVariant[] = ['left', 'right', 'top', 'bottom'];
const sections = ['Главная', 'Каталог', 'Корзина', 'Профиль', 'Настройки'];

const ExampleModalDrawerOverview: React.FC = () => {
  const [anchor, setAnchor] = React.useState<AnchorVariant>('left');
  const [isOpen, setIsOpen] = React.useState(false);
  const [section, setSection] = React.useState(sections[0]);

  return (
    <>
      <Buttons>
        {anchors.map(value => (
          <Button
            key={value}
            onClick={() => {
              setAnchor(value);
              setIsOpen(true);
            }}
          >
            anchor=&quot;{value}&quot;
          </Button>
        ))}
      </Buttons>

      <Modal
        variant="drawer"
        anchor={anchor}
        isOpen={isOpen}
        header={<FormattedMessage defaultMessage="Навигация" />}
        showCloseButton
        footer={<FormattedMessage defaultMessage="Версия 1.0" />}
        onRequestClose={() => setIsOpen(false)}
      >
        <Nav>
          {sections.map(item => (
            <MenuItem
              key={item}
              selected={item === section}
              hovered={false}
              onClick={() => {
                setSection(item);
                setIsOpen(false);
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Nav>
      </Modal>
    </>
  );
};

export default ExampleModalDrawerOverview;
