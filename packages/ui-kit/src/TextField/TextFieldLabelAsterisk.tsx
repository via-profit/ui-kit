import * as React from 'react';
import styled from '@emotion/styled';

export interface TextFieldLabelAsteriskProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * If true, the asterisk will be set the error color
   */
  readonly error?: boolean;

  /**
   * Not used
   */
  readonly focused?: boolean;
}

const Asterisk = styled.span<{ $error?: boolean; $focused?: boolean }>`
  font-size: 0.8em;
  margin-left: 0.2em;
  color: ${({ theme }) => theme.color.error.toString()};
`;

export const TextFieldLabelAsterisk = React.forwardRef(
  (props: TextFieldLabelAsteriskProps, ref: React.ForwardedRef<HTMLSpanElement>) => {
    const { children, error, focused, ...nativeProps } = props;

    return (
      <Asterisk {...nativeProps} $error={error} $focused={focused} ref={ref}>
        {children}
      </Asterisk>
    );
  },
);

TextFieldLabelAsterisk.displayName = 'TextFieldLabelAsterisk';

export default TextFieldLabelAsterisk;
