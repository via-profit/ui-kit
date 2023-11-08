import React from 'react';

export interface ClickOutsideProps {
  readonly children: React.ReactElement;
  readonly onOutsideClick: OnOutsideClick;
  readonly mouseEvent?: OutsideMouseEventName | false;
}

type OutsideMouseEventName = 'onClick' | 'onMouseDown' | 'onMouseUp';

const mouseEventMap: Record<OutsideMouseEventName, 'click' | 'mousedown' | 'mouseup'> = {
  onClick: 'click',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
};

export type OnOutsideClick = (event?: React.MouseEvent<HTMLElement> | MouseEvent) => void;

const ClickOutside: React.FC<ClickOutsideProps> = props => {
  const { children, mouseEvent = 'onMouseDown', onOutsideClick } = props;
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const mouseDownEvent = (event: MouseEvent) => {
      let parentElem = event.target as Node;
      let needToClose = true;

      while (parentElem && 'parentNode' in parentElem) {
        if (parentElem === ref.current) {
          needToClose = false;
          break;
        }
        parentElem = parentElem.parentNode as Node;
      }

      if (needToClose) {
        onOutsideClick(event);
      }
    };

    if (mouseEvent) {
      window.document.addEventListener(mouseEventMap[mouseEvent], mouseDownEvent);
    }

    return () => {
      if (mouseEvent) {
        window.document.removeEventListener(mouseEventMap[mouseEvent], mouseDownEvent);
      }
    };
  }, [onOutsideClick, mouseEvent]);

  return <>{React.cloneElement(children, { ref })}</>;
};

export default ClickOutside;
