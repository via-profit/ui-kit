import React from 'react';
import styled from '@emotion/styled';
import Pagination, {
  PaginationItemProps,
  PaginationOverrides,
} from '@via-profit/ui-kit/src/Pagination';
import { useIntl } from 'react-intl';

const Anchor = styled.a<{ $selected: boolean; $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4em;
  height: 2.4em;
  padding: 0 0.5em;
  box-sizing: border-box;
  border-radius: 0.5em;
  text-decoration: none;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $selected }) =>
    $selected
      ? theme.color.accentPrimaryContrast.toString()
      : theme.color.accentPrimary.toString()};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.color.accentPrimary.toString() : 'transparent'};
  opacity: ${({ $disabled }) => ($disabled ? 0.35 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    text-decoration: underline;
  }
`;

/**
 * The link instead of the button: the page can be opened in a new tab and the search engines follow it.
 * `kind` and `page` say where the link leads, `onClick` opens the page without the reload
 */
const LinkItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  const { page, kind, selected, disabled, onClick, children, ...rest } = props;

  return (
    <Anchor
      href={`?page=${page}`}
      aria-label={rest['aria-label']}
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      data-kind={kind}
      $selected={Boolean(selected)}
      $disabled={Boolean(disabled)}
      tabIndex={disabled ? -1 : undefined}
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      onClick={event => {
        // A plain click is handled by the application, Ctrl+click opens a new tab
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      }}
    >
      {children}
    </Anchor>
  );
});

LinkItem.displayName = 'LinkItem';

// Created once, outside of the component
const overrides: PaginationOverrides = { Item: LinkItem };

const ExamplePaginationLinks: React.FC = () => {
  const intl = useIntl();

  return (
    <Pagination
      count={12}
      defaultPage={4}
      overrides={overrides}
      aria-label={intl.formatMessage({ defaultMessage: 'Страницы статей' })}
    />
  );
};

export default ExamplePaginationLinks;
