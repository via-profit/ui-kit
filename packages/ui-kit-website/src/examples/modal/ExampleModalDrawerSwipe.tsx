import React from 'react';
import styled from '@emotion/styled';
import Modal, { AnchorVariant } from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Text = styled.div`
  max-width: 40em;
  padding: 0 1em 1em;
  line-height: 1.5;
`;

const anchors: AnchorVariant[] = ['bottom', 'left', 'right', 'top'];

/**
 * The text is longer than the drawer: the swipe first scrolls it, then closes the drawer
 */
const ExampleModalDrawerSwipe: React.FC = () => {
  const [anchor, setAnchor] = React.useState<AnchorVariant>('bottom');
  const [isOpen, setIsOpen] = React.useState(false);

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
        swipeToClose
        isOpen={isOpen}
        header={<FormattedMessage defaultMessage="Политика конфиденциальности" />}
        showCloseButton
        onRequestClose={() => setIsOpen(false)}
      >
        <Text>
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index}>
              <FormattedMessage defaultMessage="Смахните панель к её краю, чтобы закрыть. Пока текст не прокручен до начала, свайп прокручивает его. Короткий свайп возвращает панель на место. Мышью панель перетаскивается за полоску-ручку." />
            </p>
          ))}
        </Text>
      </Modal>
    </>
  );
};

export default ExampleModalDrawerSwipe;
