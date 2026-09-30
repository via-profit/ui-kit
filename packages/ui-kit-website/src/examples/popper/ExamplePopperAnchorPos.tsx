import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Surface from '@via-profit/ui-kit/src/Surface';
import Popper, { AnchorPos } from '@via-profit/ui-kit/src/Popper';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const PLACEMENT_GROUPS: readonly (readonly AnchorPos[])[] = [
  ['top-start', 'top', 'top-end', 'top-fill'],
  ['bottom-start', 'bottom', 'bottom-end', 'bottom-fill'],
  ['left-top', 'left', 'left-bottom'],
  ['right-top', 'right', 'right-bottom'],
];

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 1em;
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Stage = styled.div`
  position: relative;
  height: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const Anchor = styled.div`
  width: 12em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.color.accentPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const ExamplePopperAnchorPos: React.FC = () => {
  const [anchorPos, setAnchorPos] = React.useState<AnchorPos>('bottom');
  const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <Controls>
        {PLACEMENT_GROUPS.map(group => (
          <Group key={group[0]}>
            {group.map(placement => (
              <Button
                key={placement}
                variant={placement === anchorPos ? 'standard' : 'outlined'}
                color={placement === anchorPos ? 'primary' : 'default'}
                onClick={() => setAnchorPos(placement)}
              >
                {placement}
              </Button>
            ))}
          </Group>
        ))}
      </Controls>

      <Stage>
        <Anchor ref={setAnchorElement}>
          <FormattedMessage defaultMessage="Анкор" />
        </Anchor>
        <Popper
          isOpen
          anchorElement={anchorElement}
          anchorPos={anchorPos}
          offset={8}
          positionStrategy="absolute"
        >
          <Surface>{anchorPos}</Surface>
        </Popper>
      </Stage>
    </>
  );
};

export default ExamplePopperAnchorPos;
