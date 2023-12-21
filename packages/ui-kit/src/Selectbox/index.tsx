import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../Button';
import IconShow from './IconShow';
import Autocomplete, { AutocompleteProps, AutocompleteRef } from '../Autocomplete';
import SelectboxItem from '../Menu/MenuItem';
import TextField from '../TextField';

export * from '../Autocomplete/AutocompleteContainer';
export { SelectboxItem };

const StyledTextField = styled(TextField)`
  ${({ readOnly, disabled }) =>
    readOnly &&
    !disabled &&
    css`
      & input {
        cursor: pointer;
      }
    `}
`;

const Selectbox = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: AutocompleteProps<T, Multiple>,
    ref: React.Ref<AutocompleteRef>,
  ) => {
    const { children, onRequestOpen, onRequestClose, isOpen, ...restProps } = props;

    const toggle = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (isOpen) {
          onRequestClose && onRequestClose(e);
        } else {
          onRequestOpen && onRequestOpen(e);
        }
      },
      [onRequestOpen, onRequestClose, isOpen],
    );

    return (
      <Autocomplete
        clearable={false}
        endIcon={
          <Button onClick={toggle} iconOnly>
            <IconShow />
          </Button>
        }
        overrides={{
          TextField: React.forwardRef(function TextFieldOverride(p, r) {
            return <StyledTextField onClick={toggle} readOnly {...p} ref={r} />;
          }),
        }}
        {...restProps}
        ref={ref}
        onRequestOpen={onRequestOpen}
        onRequestClose={onRequestClose}
        isOpen={isOpen}
      >
        {children}
      </Autocomplete>
    );
  },
);

Selectbox.displayName = 'Selectbox';

export default Selectbox as <T, Multiple extends boolean | undefined = undefined>(
  props: AutocompleteProps<T, Multiple> & { ref?: React.Ref<AutocompleteRef> },
) => JSX.Element;
