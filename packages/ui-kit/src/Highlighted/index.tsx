/* eslint-disable react/no-array-index-key */
import React from 'react';

import Container, { HighlightedContainerProps } from './HighlightedContainer';
import Mark, { HighlightedMarkProps } from './HighlightedMark';
import Text, { HighlightedTextProps } from './HighlightedText';

export interface HighlightedProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text\
   * \
   * Example:
   * ```tsx
   * <Highlighted text="Lorem ipsum" highlight="ips" />
   * ```
   */
  readonly text: string;

  /**
   * Highlighted text
   * \
   * Example:
   * ```tsx
   * <Highlighted text="Lorem ipsum" highlight="ips" />
   * <Highlighted text="Lorem ipsum" highlight={['lo', 'ip']} />
   * ```
   */
  readonly highlight: string | readonly string[];

  /**
   * Case sensitive\
   * **Default:** `false`
   *
   */
  readonly caseSensitive?: boolean;

  /**
   * Disable highlighting and show the plain text\
   * **Default:** `false`
   */
  readonly disabledHighlighting?: boolean;

  /**
   * Overridable components map
   */
  readonly overrides?: HighlightedOverrides;
}

export interface HighlightedOverrides {
  /**
   * Container element
   */
  readonly Container?: React.ForwardRefExoticComponent<
    HighlightedContainerProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Mark element (HTML <mark>)
   */
  readonly Mark?: React.ForwardRefExoticComponent<
    HighlightedMarkProps & React.RefAttributes<HTMLElement>
  >;

  /**
   * Text element (HTML <span>)regex
   */
  readonly Text?: React.ForwardRefExoticComponent<
    HighlightedTextProps & React.RefAttributes<HTMLSpanElement>
  >;
}

export const escapeRegex = (pattern: string) => pattern.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * The component allows you to highlight text matches in a string
 */
const Highlighted: React.ForwardRefRenderFunction<HTMLSpanElement, HighlightedProps> = (
  props,
  ref,
) => {
  const {
    text,
    highlight,
    overrides,
    disabledHighlighting = false,
    caseSensitive = false,
    ...nativeProps
  } = props;

  const patterns = React.useMemo(
    () =>
      (typeof highlight === 'string' ? [highlight] : highlight)
        .filter(h => h.trim() !== '')
        .map(escapeRegex),
    [highlight],
  );

  const regex = React.useMemo(
    () => new RegExp(`(${patterns.join('|')})`, caseSensitive ? 'g' : 'gi'),
    [patterns, caseSensitive],
  );

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Mark: overrides?.Mark || Mark,
      Text: overrides?.Text || Text,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} ref={ref}>
      {disabledHighlighting && <overridesMap.Text>{text}</overridesMap.Text>}
      {!disabledHighlighting && patterns.length === 0 && (
        <overridesMap.Text>{text}</overridesMap.Text>
      )}
      {!disabledHighlighting &&
        patterns.length > 0 &&
        text
          .split(regex)
          .map((part, i) =>
            regex.test(part) ? (
              <overridesMap.Mark key={i}>{part}</overridesMap.Mark>
            ) : (
              <overridesMap.Text key={i}>{part}</overridesMap.Text>
            ),
          )}
    </overridesMap.Container>
  );
};

export default React.forwardRef(Highlighted);
