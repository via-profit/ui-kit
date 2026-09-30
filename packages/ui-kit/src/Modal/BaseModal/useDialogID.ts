import React from 'react';

/**
 * Unique and SSR-stable id of a modal, used to link its title and content by aria attributes.
 * The colons of React.useId are removed, so the id can be used in CSS selectors too
 */
const useDialogID = (prefix: string) => `${prefix}-${React.useId().replace(/:/g, '')}`;

export default useDialogID;
