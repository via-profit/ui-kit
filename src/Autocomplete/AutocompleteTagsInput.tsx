import React from 'react';
import styled from '@emotion/styled';

import TextFieldInput, { TextFieldInputProps } from '../TextField/TextFieldInput';
import Badge from '../Badge';

export type AutocompleteTag = {
  readonly key: React.Key;
  readonly label: string;
  readonly onDelete: () => void;
};

/**
 * Selected items of the multiple <Autocomplete>.
 * The input override must keep its identity between renders (otherwise the input is remounted
 * and loses the focus), so the tags are passed through the context instead of the props
 */
export const AutocompleteTagsContext = React.createContext<readonly AutocompleteTag[]>([]);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  min-width: 0;
  cursor: text;
`;

const Tag = styled(Badge)`
  margin: 0.4em 0 0.4em 0.6em;
  max-width: 100%;
`;

const Input = styled(TextFieldInput)`
  flex: 1 1 6em;
  min-width: 6em;
  width: auto;
`;

const AutocompleteTagsInput = React.forwardRef(
  (props: TextFieldInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const tags = React.useContext(AutocompleteTagsContext);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const setRefs = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref],
    );

    // A click on the tags area puts the caret into the input, as a click on a plain field does
    const handleMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }, []);

    return (
      <Wrapper onMouseDown={handleMouseDown}>
        {tags.map(tag => (
          <Tag
            key={tag.key}
            variant="outlined"
            color="primary"
            onDelete={event => {
              // The input keeps the focus, so the menu is not closed by the blur
              event.preventDefault();
              tag.onDelete();
              inputRef.current?.focus();
            }}
          >
            {tag.label}
          </Tag>
        ))}
        <Input {...props} ref={setRefs} />
      </Wrapper>
    );
  },
);

AutocompleteTagsInput.displayName = 'AutocompleteTagsInput';

export default AutocompleteTagsInput;
