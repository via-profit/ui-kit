import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Logo from '~/components/Logo';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.mainSidebar.toString()};
  color: ${({ theme }) => theme.color.mainSidebarContrast.toString()};
  z-index: ${({ theme }) => theme.zIndex.header};
  position: fixed;
`;

const ItemsList = styled.nav`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: sticky;
  top: 0;
  max-height: 100vh;
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

const LogoBlock = styled.div`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  font-size: 1.8em;
`;

const Sidebar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = (props, ref) => {
  const { pathname } = useLocation();

  return (
    <Container {...props} ref={ref}>
      <LogoBlock>
        <StyledLogo />
      </LogoBlock>
      <ItemsList>
        <Item $isActive={matchPath('/docs/button/*', pathname) !== null} to="/docs/button">
          <FormattedMessage defaultMessage="Кнопка" />
        </Item>
        <Item $isActive={matchPath('/docs/text-field/*', pathname) !== null} to="/docs/text-field">
          <FormattedMessage defaultMessage="Текстовое поле" />
        </Item>
        <Item $isActive={matchPath('/docs/text-area/*', pathname) !== null} to="/docs/text-area">
          <FormattedMessage defaultMessage="Текстовое поле textarea" />
        </Item>
        <Item $isActive={matchPath('/docs/table/*', pathname) !== null} to="/docs/table">
          <FormattedMessage defaultMessage="Таблица" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/theming/*', pathname) !== null} to="/docs/theming">
          <FormattedMessage defaultMessage="Темы оформления" />
        </Item>
        <Item $isActive={matchPath('/docs/color', pathname) !== null} to="/docs/color">
          <FormattedMessage defaultMessage="Цвета" />
        </Item>
        <Item $isActive={matchPath('/docs/surface/*', pathname) !== null} to="/docs/surface">
          <FormattedMessage defaultMessage="Поверхность" />
        </Item>
        <Item
          $isActive={matchPath('/docs/masked-field/*', pathname) !== null}
          to="/docs/masked-field"
        >
          <FormattedMessage defaultMessage="Маскированное поле" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/typography/*', pathname) !== null} to="/docs/typography">
          <FormattedMessage defaultMessage="Типографика" /> Draft
        </Item>
        <Item
          $isActive={matchPath('/docs/phone-field/*', pathname) !== null}
          to="/docs/phone-field"
        >
          <FormattedMessage defaultMessage="Поле ввода телефона" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/menu/*', pathname) !== null} to="/docs/menu">
          <FormattedMessage defaultMessage="Меню" />
        </Item>
        <Item
          $isActive={matchPath('/docs/autocomplete/*', pathname) !== null}
          to="/docs/autocomplete"
        >
          <FormattedMessage defaultMessage="Автокомплит" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/selectbox/*', pathname) !== null} to="/docs/selectbox">
          <FormattedMessage defaultMessage="Селектбокс" /> Draft
        </Item>
        <Item
          $isActive={matchPath('/docs/country-flags/*', pathname) !== null}
          to="/docs/country-flags"
        >
          <FormattedMessage defaultMessage="Флаги стран" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/modal/*', pathname) !== null} to="/docs/modal">
          <FormattedMessage defaultMessage="Модальные окна" />
        </Item>
        <Item $isActive={matchPath('/docs/calendar/*', pathname) !== null} to="/docs/calendar">
          <FormattedMessage defaultMessage="Календарь" /> Draft
        </Item>
        <Item
          $isActive={matchPath('/docs/highlighted/*', pathname) !== null}
          to="/docs/highlighted"
        >
          <FormattedMessage defaultMessage="Подсветка подстроки" />
        </Item>
        <Item
          $isActive={matchPath('/docs/loading-indicator/*', pathname) !== null}
          to="/docs/loading-indicator"
        >
          <FormattedMessage defaultMessage="Индикатор загрузки" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/badge/*', pathname) !== null} to="/docs/badge">
          <FormattedMessage defaultMessage="Бейдж" /> Draft
        </Item>
        <Item $isActive={matchPath('/docs/popper/*', pathname) !== null} to="/docs/popper">
          <FormattedMessage defaultMessage="Popper" />
        </Item>
        <Item
          $isActive={matchPath('/docs/click-outside/*', pathname) !== null}
          to="/docs/click-outside"
        >
          <FormattedMessage defaultMessage="Click outside" />
        </Item>
      </ItemsList>
    </Container>
  );
};

export default React.forwardRef(Sidebar);
