type Stack = {
  container: HTMLElement;
  lastIndex: number;
  lastFocused: HTMLElement | Element | null;
}[];

/**
 * How to use:
 * ```tsx
 * const MyComponent: React.FC = () => {
 *   const container = React.useRef<HTMLElement | null>(null);
 *
 *   React.useEffect(() => {
 *      const keydown = (event: KeyboardEvent) => {
 *        if (
 *          event.key.toLowerCase() !== 'tab' ||
 *          !TabManager.isCurrentContainer(containerRef.current)
 *        ) {
 *          return;
 *        }
 *
 *        event.preventDefault();
 *
 *        if (event.shiftKey) {
 *          TabManager.focusPrev();
 *        } else {
 *          TabManager.focusNext();
 *        }
 *      };
 *
 *     window.document.addEventListener('keydown', keydown);
 *
 *      return () => {
 *         window.document.removeEventListener('keydown', keydown);
 *      }
 *   }, []);
 *
 *   return (
 *     <div ref={container} onKeyDown>
 *      ...
 *     </div>
 *   )
 * }
 * ```
 */
class TabManager {
  #stack: Stack = [];

  isCurrentContainer(elem: HTMLElement | null) {
    const lastof = this.getTopOfTheStack()?.stackElement?.container;

    return lastof && elem && lastof === elem;
  }

  getTopOfTheStack() {
    const stackIndex = this.#stack.length - 1;

    return {
      stackElement: this.#stack[stackIndex],
      stackIndex,
    };
  }

  registerContainer(container: HTMLElement) {
    this.#stack.push({
      container,
      lastIndex: -1,
      lastFocused: document.activeElement,
    });
  }

  unregisterContainer(container: HTMLElement, revertBackFocus?: boolean) {
    this.#stack = this.#stack.filter(stackElem => {
      const founded = stackElem.container === container;
      if (founded && revertBackFocus && stackElem.lastFocused instanceof HTMLElement) {
        stackElem.lastFocused.focus();
      }

      return !founded;
    });
  }

  getElementsList(): HTMLElement[] {
    const { stackElement } = this.getTopOfTheStack();

    if (!stackElement) {
      return [];
    }

    const universe = stackElement.container.querySelectorAll<HTMLElement>(
      'input, button, select, textarea, a[href], [tabindex]',
    );
    const list = Array.prototype.filter.call(
      universe,
      (item: HTMLElement) =>
        item.tabIndex >= 0 &&
        !(item as HTMLButtonElement).disabled &&
        item !== stackElement.container,
    ) as HTMLElement[];

    // Positive tabIndex goes first (ascending), then tabIndex=0 in the DOM order.
    // Array.prototype.sort is stable, so equal keys keep the DOM order
    const sortKey = (el: HTMLElement) =>
      el.tabIndex === 0 ? Number.MAX_SAFE_INTEGER : el.tabIndex;
    list.sort((a, b) => sortKey(a) - sortKey(b));

    return list;
  }

  /**
   * Index of the currently focused element in the list.
   * Uses the real focus, so a focus set by mouse is taken into account
   */
  getCurrentIndex(list: readonly HTMLElement[]): number {
    const { stackElement } = this.getTopOfTheStack();
    const activeIndex = list.findIndex(el => el === document.activeElement);

    if (activeIndex !== -1) {
      return activeIndex;
    }

    return stackElement ? stackElement.lastIndex : -1;
  }

  focusByIndex(list: readonly HTMLElement[], index: number) {
    const { stackElement } = this.getTopOfTheStack();
    const el = list[index];

    if (!stackElement || !el) {
      return;
    }

    stackElement.lastIndex = index;
    el.focus();
  }

  focusNext() {
    const list = this.getElementsList();

    if (list.length === 0) {
      return;
    }

    const nextIndex = this.getCurrentIndex(list) + 1;
    this.focusByIndex(list, nextIndex < list.length ? nextIndex : 0);
  }

  focusPrev() {
    const list = this.getElementsList();

    if (list.length === 0) {
      return;
    }

    const prevIndex = this.getCurrentIndex(list) - 1;
    this.focusByIndex(list, prevIndex >= 0 ? prevIndex : list.length - 1);
  }
}

const tabManager = new TabManager();

export default tabManager;
