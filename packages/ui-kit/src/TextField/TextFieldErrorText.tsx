import * as React from 'react';
import styled from '@emotion/styled';

import NoSSR from '../NoSSR';

export interface TextFieldErrorTextProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly error?: boolean;
}

const ErrorTextContainer = styled.div<{ $maxHeight: 'initial' | number }>`
  margin-left: 0.5em;
  max-height: 0;
  max-height: ${({ $maxHeight }) =>
    typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight};
  transition: max-height 240ms cubic-bezier(0.22, 0.61, 0.36, 1);
  overflow: hidden;
`;

const ErrorTextInner = styled.div<{ $error: boolean }>`
  color: ${({ theme }) => theme.color.error.toString()};
  font-size: 0.8em;
  transform: translateY(${({ $error }) => ($error ? 0 : '0.2em')});
  opacity: ${({ $error }) => ($error ? 1 : 0)};
  transition: all 240ms 240ms ease-out;
`;

const TextFieldErrorText: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextFieldErrorTextProps
> = (props, ref) => {
  const { children, error, ...nativeProps } = props;

  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<'initial' | number>('initial');

  React.useEffect(() => {
    const updateMaxHeight = () => {
      if (innerRef.current && innerRef.current.getBoundingClientRect().height > 0) {
        setMaxHeight(innerRef.current.getBoundingClientRect().height);
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, [children]);

  return (
    <ErrorTextContainer {...nativeProps} $maxHeight={error ? maxHeight : 0} ref={ref}>
      <ErrorTextInner ref={innerRef} $error={Boolean(error)}>
        {children ? <NoSSR>{children}</NoSSR> : <>&nbsp;</>}
      </ErrorTextInner>
    </ErrorTextContainer>
  );
};

export default React.forwardRef(TextFieldErrorText);
