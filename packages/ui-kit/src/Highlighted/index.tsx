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
   * Text element (HTML <span>)
   */
  readonly Text?: React.ForwardRefExoticComponent<
    HighlightedTextProps & React.RefAttributes<HTMLSpanElement>
  >;
}
/**
 * The component allows you to highlight text matches in a string
 */
const Highlighted: React.ForwardRefRenderFunction<HTMLSpanElement, HighlightedProps> = (
  props,
  ref,
) => {
  const { text, highlight, overrides, ...nativeProps } = props;
  const regex = React.useMemo(() => {
    const patterns = typeof highlight === 'string' ? [highlight] : highlight;

    return new RegExp(`(${patterns.join('|')})`, 'gi');
  }, [highlight]);

  const overridesMap = React.useMemo(
    () => ({
      Container,
      Mark,
      Text,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <overridesMap.Container {...nativeProps} ref={ref}>
      {text
        .split(regex)
        .filter(part => part)
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
