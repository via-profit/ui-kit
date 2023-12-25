import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';

export interface CalendarYearCellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If year selected, then property will be true
   */
  readonly isSelected?: boolean;
  readonly accentColor?: 'primary' | 'secondary' | string;
}

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  margin: 0;
  min-width: 0;
  outline: none;
  flex-basis: 33%;
`;

const CalendarYearCell: React.ForwardRefRenderFunction<HTMLButtonElement, CalendarYearCellProps> = (
  props,
  ref,
) => {
  const { children, isSelected, accentColor, ...restProps } = props;
  const myRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (isSelected && myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [isSelected]);

  return (
    <Btn
      {...restProps}
      type="button"
      variant={isSelected ? 'standard' : 'plain'}
      color={isSelected ? accentColor : 'default'}
      ref={el => {
        if (typeof ref === 'function') {
          ref(el);
        }

        if (ref && typeof ref === 'object') {
          ref.current = el;
        }

        myRef.current = el;
      }}
    >
      {children}
    </Btn>
  );
};

export default React.forwardRef(CalendarYearCell);
