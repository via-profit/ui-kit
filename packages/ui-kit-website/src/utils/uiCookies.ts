import Cookie, { CookieAttributes } from 'js-cookie';

type UIState = ReduxStore['ui'];

const cookieOptions: CookieAttributes = {
  expires: 365,
  path: '/',
  secure: process.env.NODE_ENV !== 'development',
};

/**
 * Allowed values of every stored UI setting, unknown cookie values are ignored
 */
const allowedValues: { readonly [K in keyof UIState]: readonly UIState[K][] } = {
  theme: ['light', 'dark'],
  fontSize: ['small', 'normal', 'medium', 'large'],
  locale: ['ru-RU'],
  device: ['desktop', 'tablet', 'mobile'],
};

const keys = Object.keys(allowedValues) as (keyof UIState)[];

/**
 * Returns UI settings saved in cookies
 */
export const readUiCookies = (): Partial<UIState> => {
  const result: Partial<Record<keyof UIState, string>> = {};

  keys.forEach(key => {
    const value = Cookie.get(key);
    if (value && (allowedValues[key] as readonly string[]).includes(value)) {
      result[key] = value;
    }
  });

  return result as Partial<UIState>;
};

/**
 * Saves UI settings into cookies. Default values are removed from cookies
 */
export const writeUiCookies = (state: UIState, defaultState: UIState) => {
  keys.forEach(key => {
    if (state[key] === defaultState[key]) {
      Cookie.remove(key, { path: cookieOptions.path });
    } else {
      Cookie.set(key, state[key], cookieOptions);
    }
  });
};
