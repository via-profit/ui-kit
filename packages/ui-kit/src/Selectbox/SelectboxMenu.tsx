import * as React from 'react';

import Menu, { MenuProps, MenuRef, OnRequestClose, Value } from '../Menu';
import { AnchorPos } from '../Popper';
import OverrideMenuList from '../Autocomplete/OverrideMenuList';
import { OnChange } from 'Selectbox';

export interface SelectbosMenuProps<T, Multiple extends boolean | undefined = undefined>
  extends MenuProps<T, Multiple> {
  readonly actualPlacement: AnchorPos;
  readonly onChange?: OnChange<T, Multiple>;
}

const SelectboxMenu = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: SelectbosMenuProps<T, Multiple>,
    ref: React.ForwardedRef<MenuRef>,
  ) => {
    const {
      actualPlacement,
      multiple,
      items,
      value,
      isOpen,
      anchorElement,
      getOptionSelected,
      onChange,
      onRequestClose,
      children,
      onAnchorPosChanged,
    } = props;
    const handleSelectItem = React.useCallback(
      (item: Value<T, Multiple>) => {
        onChange?.(item);
      },
      [onChange],
    );

    const handleRequestClose: OnRequestClose = React.useCallback(
      evt => {
        if (evt?.target !== anchorElement) {
          if (onRequestClose) {
            onRequestClose(evt);
          }
          anchorElement?.focus();
        }
      },
      [onRequestClose, anchorElement],
    );

    return (
      <Menu
        ref={ref}
        offset={0}
        anchorPos={actualPlacement}
        onAnchorPosChanged={onAnchorPosChanged}
        multiple={multiple}
        items={items as T[]}
        value={value}
        isOpen={isOpen && items.length > 0}
        autofocus
        anchorElement={anchorElement}
        closeOutsideClick={false}
        getOptionSelected={getOptionSelected}
        onSelectItem={handleSelectItem}
        overrides={{
          List: OverrideMenuList,
        }}
        closeOnSelect={!multiple}
        onRequestClose={handleRequestClose}
      >
        {({ index, item }, itemProps) => children({ index, item: item as T }, itemProps)}
      </Menu>
    );
  },
);
SelectboxMenu.displayName = 'SelectboxMenu';

export default React.memo(SelectboxMenu) as <T, Multiple extends boolean | undefined = undefined>(
  props: SelectbosMenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
