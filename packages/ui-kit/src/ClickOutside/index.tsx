import React from 'react';

export interface ClickOutsideProps {
  /**
   * React Element\
   * **WAttention**: Do not use fragment as a child. use `<div>` instead
   */
  readonly children: React.ReactElement;

  /**
   * Callback function that will be called when the required event occurs
   */
  readonly onOutsideClick: OnOutsideClick;

  /**
   * Mouse event. Use `false` to disable all\
   * \
   * **Default**: `onMouseDown`
   */
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
