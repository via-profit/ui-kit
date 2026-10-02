import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Menu from '@via-profit/ui-kit/src/Menu';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';

import PaletteIcon from '~/components/Icons/PaletteOutline';
import { uiActions } from '~/redux/ui';
import IconButton from './IconButton';

type ThemeStyle = ReduxStore['ui']['themeStyle'];

type Option = {
  readonly id: ThemeStyle;
  readonly label: string;
};

/**
 * The choice of the theme style. The light or dark mode is switched separately by the ThemeSwitcher
 */
const ThemeStylePicker: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const themeStyle = useSelector((store: ReduxStore) => store.ui.themeStyle);
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  const options: Option[] = React.useMemo(
    () => [
      { id: 'default', label: intl.formatMessage({ defaultMessage: 'Стандартная' }) },
      { id: 'windows11', label: 'Windows 11' },
      { id: 'macos', label: 'macOS' },
      { id: 'material', label: 'Material Design' },
    ],
    [intl],
  );
  const value = options.find(option => option.id === themeStyle) || options[0];
  const title = intl.formatMessage({ defaultMessage: 'Стиль темы: {name}' }, { name: value.label });

  return (
    <>
      <IconButton
        type="button"
        title={title}
        aria-label={title}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorElement)}
        onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        anchorElement={anchorElement}
        isOpen={Boolean(anchorElement)}
        anchorPos="bottom-end"
        offset={6}
        value={value}
        items={options}
        getOptionSelected={({ item, value: selected }) => item.id === selected.id}
        onRequestClose={() => setAnchorElement(null)}
        onSelectItem={option => {
          dispatch(uiActions.themeStyle(option.id));
          setAnchorElement(null);
        }}
      >
        {({ item }, itemProps) => (
          <MenuItem {...itemProps} key={item.id}>
            {item.label}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ThemeStylePicker;
