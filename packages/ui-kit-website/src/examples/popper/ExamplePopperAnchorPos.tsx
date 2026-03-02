import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Surface from '@via-profit/ui-kit/src/Surface';
import Popper, { AnchorPos } from '@via-profit/ui-kit/src/Popper';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const StyledAnchorContainer = styled.div`
  width: 34em;
  height: 22em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const StyledAnchorElement = styled.div`
  width: 16em;
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

const ExamplePopperAnchorPos: React.FC = () => {
  const theme = useTheme();
  const [anchorPos, setAnchorPos] = React.useState<AnchorPos>('bottom');
  const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <div>
        <AnchorButton
          value="auto"
          isActive={anchorPos === 'auto'}
          onChange={() => setAnchorPos('auto')}
        />
      </div>

      <AnchorButton
        value="left"
        isActive={anchorPos === 'left'}
        onChange={() => setAnchorPos('left')}
      />
      <AnchorButton
        value="left-top"
        isActive={anchorPos === 'left-top'}
        onChange={() => setAnchorPos('left-top')}
      />

      <AnchorButton
        value="top-left"
        isActive={anchorPos === 'top-left'}
        onChange={() => setAnchorPos('top-left')}
      />
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
        value="top-fill"
        isActive={anchorPos === 'top-fill'}
        onChange={() => setAnchorPos('top-fill')}
      />
      <AnchorButton
        value="top-end"
        isActive={anchorPos === 'top-end'}
        onChange={() => setAnchorPos('top-end')}
      />
      <AnchorButton
        value="top-right"
        isActive={anchorPos === 'top-right'}
        onChange={() => setAnchorPos('top-right')}
      />

      <AnchorButton
        value="right-top"
        isActive={anchorPos === 'right-top'}
        onChange={() => setAnchorPos('right-top')}
      />
      <AnchorButton
        value="right"
        isActive={anchorPos === 'right'}
        onChange={() => setAnchorPos('right')}
      />

      <StyledAnchorContainer>
        <StyledAnchorElement ref={setAnchorElement} />
        <Popper
          anchorPos={anchorPos}
          positionStrategy="absolute"
          anchorElement={anchorElement}
          isOpen
          zIndex={theme.zIndex.header - 1}
        >
          <Surface>Popper content</Surface>
        </Popper>
      </StyledAnchorContainer>
      <AnchorButton
        value="left-bottom"
        isActive={anchorPos === 'left-bottom'}
        onChange={() => setAnchorPos('left-bottom')}
      />
      <AnchorButton
        value="bottom-left"
        isActive={anchorPos === 'bottom-left'}
        onChange={() => setAnchorPos('bottom-left')}
      />
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
        value="bottom-fill"
        isActive={anchorPos === 'bottom-fill'}
        onChange={() => setAnchorPos('bottom-fill')}
      />
      <AnchorButton
        value="bottom-end"
        isActive={anchorPos === 'bottom-end'}
        onChange={() => setAnchorPos('bottom-end')}
      />

      <AnchorButton
        value="bottom-right"
        isActive={anchorPos === 'bottom-right'}
        onChange={() => setAnchorPos('bottom-right')}
      />

      <AnchorButton
        value="right-bottom"
        isActive={anchorPos === 'right-bottom'}
        onChange={() => setAnchorPos('right-bottom')}
      />
    </>
  );
};

export default ExamplePopperAnchorPos;
