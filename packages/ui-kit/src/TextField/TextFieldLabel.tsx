import * as React from 'react';
import styled from '@emotion/styled';

import { CLASSNAME_PREFIX } from '../constants';

export interface TextFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  readonly error?: boolean;
  readonly focused?: boolean;
}

const Label = styled.label<{ $error?: boolean; $focused?: boolean }>`
  font-size: 0.8em;
  margin-bottom: 0.2em;
`;

const TextFieldLabel: React.ForwardRefRenderFunction<HTMLLabelElement, TextFieldLabelProps> = (
  props,
  ref,
) => {
  const { children, error, focused, ...nativeProps } = props;

  return (
    <Label
      {...nativeProps}
      className={`${CLASSNAME_PREFIX} text-field-label ${nativeProps.className || ''}`.trim()}
      $error={error}
      $focused={focused}
      ref={ref}
    >
      {children}
    </Label>
  );
};

export default React.forwardRef(TextFieldLabel);
