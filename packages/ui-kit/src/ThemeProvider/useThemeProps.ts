import React from 'react';
import { useTheme } from '@emotion/react';

import type { ThemeComponentName } from './components';

type WithOverrides = { readonly overrides?: object };

/**
 * Adds the `defaultProps` and the `overrides` of the theme to the props of the component.
 * The props passed explicitly win over `defaultProps`, the `overrides` of the instance win over the theme ones
 */
const useThemeProps = <P extends object>(name: ThemeComponentName, props: P): P => {
  const theme = useTheme();
  const config = theme.components?.[name];
  const defaultProps = config?.defaultProps as Partial<P> | undefined;
  const themeOverrides = config?.overrides;
  const { overrides } = props as WithOverrides;

  // A stable object: the components memoize the map of their parts by `overrides`
  const mergedOverrides = React.useMemo(
    () => (themeOverrides ? { ...themeOverrides, ...overrides } : overrides),
    [themeOverrides, overrides],
  );

  if (!defaultProps && !themeOverrides) {
    return props;
  }

  const merged: Record<string, unknown> = { ...props, overrides: mergedOverrides };
  if (defaultProps) {
    Object.entries(defaultProps).forEach(([key, value]) => {
      if (typeof merged[key] === 'undefined') {
        merged[key] = value;
      }
    });
  }

  return merged as P;
};

export default useThemeProps;
