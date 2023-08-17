import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import SurfaceContainer, {
  SurfaceContainerProps,
} from '@via-profit/ui-kit/src/Surface/SurfaceContainer';

const Container = styled(SurfaceContainer)`
  border-radius: 0;
  background-color: ${({ theme }) => theme.color.backgroundSecondary.toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
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

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, SurfaceContainerProps> = (
  props,
  ref,
) => {
  const { pathname } = useLocation();

  return (
    <Container noMargin {...props} ref={ref}>
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
        <Item $isActive={matchPath('/docs/selectbox/*', pathname) !== null} to="/docs/selectbox">
          SelectBox
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
      </ItemsList>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
