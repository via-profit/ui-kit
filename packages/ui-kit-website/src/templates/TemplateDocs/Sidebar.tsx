import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundSecondary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  position: fixed;
  left: 0;
  bottom: 0;
  overflow-y: auto;
`;

const ItemsList = styled.nav`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 5rem;
`;

type ItemStyle = {
  readonly $isActive: boolean;
};

const Item = styled(Link, { shouldForwardProp: p => p.match(/^\$/) === null })<ItemStyle>`
  color: currentColor;
  text-decoration: none;
  padding: 1em 1.2em;
  &:hover {
    background-color: ${({ theme }) => theme.color.backgroundSecondary.lighten(15).toString()};
  }
  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      color: ${theme.color.accentPrimary.toString()};
    `};
`;

const Sidebar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = (props, ref) => {
  const { pathname } = useLocation();

  return (
    <Container {...props} ref={ref}>
      <ItemsList>
        <Item $isActive={matchPath('/docs/button/*', pathname) !== null} to="/docs/button">
          Button
        </Item>
        <Item $isActive={matchPath('/docs/text-field/*', pathname) !== null} to="/docs/text-field">
          TextField
        </Item>
        {/* <Item $isActive={matchPath('/docs/table/*', pathname) !== null} to="/docs/table">
          Tables
        </Item> */}
        <Item $isActive={matchPath('/docs/theming/*', pathname) !== null} to="/docs/theming">
          Theming
        </Item>
        <Item
          $isActive={matchPath('/docs/theming/color', pathname) !== null}
          to="/docs/theming/color"
        >
          &nbsp;&nbsp;&nbsp;Color
        </Item>
        <Item $isActive={matchPath('/docs/surface/*', pathname) !== null} to="/docs/surface">
          Surface
        </Item>
        <Item
          $isActive={matchPath('/docs/masked-field/*', pathname) !== null}
          to="/docs/masked-field"
        >
          MaskedField
        </Item>
        <Item $isActive={matchPath('/docs/typography/*', pathname) !== null} to="/docs/typography">
          Typography
        </Item>
        <Item
          $isActive={matchPath('/docs/phone-field/*', pathname) !== null}
          to="/docs/phone-field"
        >
          PhoneFieldOverview
        </Item>
        <Item $isActive={matchPath('/docs/menu/*', pathname) !== null} to="/docs/menu">
          Menu
        </Item>
        <Item
          $isActive={matchPath('/docs/autocomplete/*', pathname) !== null}
          to="/docs/autocomplete"
        >
          Autocomplete
        </Item>
        <Item
          $isActive={matchPath('/docs/country-flags/*', pathname) !== null}
          to="/docs/country-flags"
        >
          CountryFlagsOverview
        </Item>
        <Item $isActive={matchPath('/docs/modal/*', pathname) !== null} to="/docs/modal">
          Modal
        </Item>
        <Item $isActive={matchPath('/docs/calendar/*', pathname) !== null} to="/docs/calendar">
          Calendar
        </Item>
        <Item
          $isActive={matchPath('/docs/highlighted/*', pathname) !== null}
          to="/docs/highlighted"
        >
          Highlighted
        </Item>
        <Item
          $isActive={matchPath('/docs/loading-indicator/*', pathname) !== null}
          to="/docs/loading-indicator"
        >
          Loading indicator
        </Item>
        <Item $isActive={matchPath('/docs/badge/*', pathname) !== null} to="/docs/badge">
          Badge
        </Item>
        <Item $isActive={matchPath('/docs/popper/*', pathname) !== null} to="/docs/popper">
          Popper
        </Item>
      </ItemsList>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
