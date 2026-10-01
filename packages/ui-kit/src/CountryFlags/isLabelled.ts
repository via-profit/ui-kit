import type * as React from 'react';

/**
 * A flag is decorative (hidden from screen readers) until it gets a label
 */
const isLabelled = (props: React.SVGProps<SVGSVGElement>) =>
  Boolean(props['aria-label'] || props['aria-labelledby']);

export default isLabelled;
