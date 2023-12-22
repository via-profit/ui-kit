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
 *         window.document.addEventListener('keydown', keydown);
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

  getElementsList() {
    const { stackElement } = this.getTopOfTheStack();

    const universe = stackElement.container.querySelectorAll(
      'input, button, select, textarea, a[href]',
    );
    const list: HTMLElement[] = Array.prototype.filter.call(universe, function (item) {
      return item.tabIndex >= 0;
    });

    list.sort((a, b) => {
      if (a.tabIndex === 0) {
        return 1;
      }
      if (b.tabIndex === 0) {
        return -1;
      }

      if (a.tabIndex < b.tabIndex) {
        return -1;
      }
      if (a.tabIndex > b.tabIndex) {
        return 1;
      }

      return 0;
    });

    return list;
  }

  focusNext() {
    const { stackElement, stackIndex } = this.getTopOfTheStack();
    const list = this.getElementsList();

    const nextIndex = stackElement.lastIndex + 1;
    if (list[nextIndex]) {
      list[nextIndex].focus();
      this.#stack[stackIndex].lastIndex = nextIndex;

      return;
    }

    // Othrwise
    const nextEl = list[0];
    if (nextEl) {
      this.#stack[stackIndex].lastIndex = 0;

      nextEl.focus();

      return;
    }
  }

  focusPrev() {
    const { stackElement, stackIndex } = this.getTopOfTheStack();
    const list = this.getElementsList();
    const nextIndex = stackElement.lastIndex - 1;
    if (list[nextIndex]) {
      list[nextIndex].focus();
      this.#stack[stackIndex].lastIndex = nextIndex;

      return;
    }

    // Othrwise
    const nextEl = list[list.length - 1];
    if (nextEl) {
      this.#stack[stackIndex].lastIndex = list.length - 1;

      nextEl.focus();

      return;
    }
  }
}

const tabManager = new TabManager();

export default tabManager;
