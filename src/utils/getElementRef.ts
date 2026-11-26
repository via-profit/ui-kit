import React from 'react';

/**
 * Returns the ref of the element.
 * React 19 keeps the ref in props and warns when `element.ref` is read,
 * React 18 keeps it outside of props
 */
const getElementRef = <T>(element: React.ReactElement): React.Ref<T> | undefined => {
  if (parseInt(React.version, 10) >= 19) {
    return (element.props as { ref?: React.Ref<T> }).ref;
  }

  return (element as unknown as { ref?: React.Ref<T> }).ref;
};

export default getElementRef;
