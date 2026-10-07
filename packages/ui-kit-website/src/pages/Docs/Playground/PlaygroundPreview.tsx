/* eslint-disable import/max-dependencies */
import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage, useIntl } from 'react-intl';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Autocomplete, { AutocompleteItem, FilterItems } from '@via-profit/ui-kit/src/Autocomplete';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import MenuItem from '@via-profit/ui-kit/src/Menu/MenuItem';
import Modal from '@via-profit/ui-kit/src/Modal';
import Pagination from '@via-profit/ui-kit/src/Pagination';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Stack from '@via-profit/ui-kit/src/Stack';
import Surface from '@via-profit/ui-kit/src/Surface';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import TextField from '@via-profit/ui-kit/src/TextField';
import ToastCard from '@via-profit/ui-kit/src/Toast/ToastCard';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';

import PlusIcon from '~/components/Icons/PlusOutline';
import ShowcaseOrders from '~/examples/showcase/ShowcaseOrders';
import countries from '~/examples/selectbox/countries.json';

type Country = (typeof countries)[0];

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1.5em;
  border-top: 1px solid ${({ theme }) => theme.color.border.toString()};

  &:first-of-type {
    border-top: 0;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;

  & code {
    font-size: 0.85em;
    font-weight: 400;
    color: ${({ theme }) => theme.color.textSecondary.toString()};
  }
`;

const MenuBox = styled.div`
  width: 16em;
  padding: 0.4em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  border: 1px solid ${({ theme }) => theme.color.border.toString()};
  background-color: ${({ theme }) => theme.color.surface.toString()};
`;

const Card = styled(Surface)`
  max-width: 26em;
`;

const Grow = styled.div`
  flex: 1 1 14em;
  min-width: 0;
`;

const Controls: React.FC = () => {
  const intl = useIntl();
  const [city, setCity] = React.useState<Country | null>(null);
  const [isCityOpen, setIsCityOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | null>(null);
  const [country, setCountry] = React.useState<Country | null>(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = React.useState(false);
  const filterCountries: FilterItems<Country> = React.useCallback(
    (items, { query }) => items.filter(item => item.name.toLocaleLowerCase().includes(query)),
    [],
  );

  return (
    <>
      <Stack direction="row" wrap gap="md" align="flex-end">
        <TextField
          label={<FormattedMessage defaultMessage="Имя" />}
          placeholder={intl.formatMessage({ defaultMessage: 'Иван Петров' })}
        />
        <Selectbox
          label={<FormattedMessage defaultMessage="Страна" />}
          notSetLabel={intl.formatMessage({ defaultMessage: 'Не выбрано' })}
          value={city}
          items={countries}
          isOpen={isCityOpen}
          onRequestOpen={() => setIsCityOpen(true)}
          onRequestClose={() => setIsCityOpen(false)}
          onChange={setCity}
          getOptionSelected={({ item, value }) => item.code === value.code}
          selectedItemToString={item => item.name}
        >
          {({ item }, itemProps) => (
            <SelectboxItem {...itemProps} key={item.code}>
              {item.name}
            </SelectboxItem>
          )}
        </Selectbox>
        <DatePicker
          label={intl.formatMessage({ defaultMessage: 'Дата доставки' })}
          placeholder={intl.formatMessage({ defaultMessage: 'дд.мм.гггг' })}
          template="dd.mm.yyyy"
          value={date}
          onChange={setDate}
          locale={intl.locale}
          calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Открыть календарь' })}
          prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
          nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
        />
        <Button color="primary">
          <FormattedMessage defaultMessage="Сохранить" />
        </Button>
      </Stack>

      <Stack direction="row" wrap gap="sm" align="center">
        <Button>
          <FormattedMessage defaultMessage="Обычная" />
        </Button>
        <Button variant="outlined">
          <FormattedMessage defaultMessage="Контурная" />
        </Button>
        <Button variant="plain">
          <FormattedMessage defaultMessage="Простая" />
        </Button>
        <Button iconOnly aria-label={intl.formatMessage({ defaultMessage: 'Добавить' })}>
          <PlusIcon />
        </Button>
        <ButtonGroup
          defaultValue="week"
          aria-label={intl.formatMessage({ defaultMessage: 'Период' })}
        >
          <Button value="day">
            <FormattedMessage defaultMessage="День" />
          </Button>
          <Button value="week">
            <FormattedMessage defaultMessage="Неделя" />
          </Button>
          <Button value="month">
            <FormattedMessage defaultMessage="Месяц" />
          </Button>
        </ButtonGroup>
      </Stack>

      <Pagination
        count={20}
        defaultPage={10}
        aria-label={intl.formatMessage({ defaultMessage: 'Страницы заказов' })}
      />

      <Stack direction="row" wrap gap="md" align="flex-start">
        <Grow>
          <Autocomplete
            fullWidth
            label={<FormattedMessage defaultMessage="Страна доставки" />}
            value={country}
            items={countries}
            openOnFocus={false}
            isOpen={isCountryOpen}
            onRequestOpen={() => setIsCountryOpen(true)}
            onRequestClose={() => setIsCountryOpen(false)}
            onChange={setCountry}
            selectedItemToString={item => item.name}
            filterItems={filterCountries}
          >
            {({ item }, itemProps) => (
              <AutocompleteItem {...itemProps} key={item.code}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </Grow>
        <Grow>
          <TextArea
            fullWidth
            rows={3}
            label={<FormattedMessage defaultMessage="Комментарий" />}
            placeholder={intl.formatMessage({ defaultMessage: 'Позвонить за час до доставки' })}
          />
        </Grow>
      </Stack>
    </>
  );
};

const Items: React.FC = () => {
  const intl = useIntl();
  const rows = [
    [1042, intl.formatMessage({ defaultMessage: 'Иван Петров' }), '4 590 ₽'],
    [1043, intl.formatMessage({ defaultMessage: 'Анна Смирнова' }), '12 300 ₽'],
    [1044, intl.formatMessage({ defaultMessage: 'Олег Кузнецов' }), '870 ₽'],
  ];
  const menuItems = [
    intl.formatMessage({ defaultMessage: 'Открыть' }),
    intl.formatMessage({ defaultMessage: 'Переименовать' }),
    intl.formatMessage({ defaultMessage: 'Дублировать' }),
    intl.formatMessage({ defaultMessage: 'Удалить' }),
  ];
  const [menuValue, setMenuValue] = React.useState(menuItems[0]);

  return (
    <>
      <Tabs defaultValue="info">
        <TabList aria-label={intl.formatMessage({ defaultMessage: 'Карточка клиента' })}>
          <Tab value="info">
            <FormattedMessage defaultMessage="Информация" />
          </Tab>
          <Tab value="deals">
            <FormattedMessage defaultMessage="Сделки" />
          </Tab>
          <Tab value="history">
            <FormattedMessage defaultMessage="История" />
          </Tab>
        </TabList>
        <TabPanel value="info">
          <FormattedMessage defaultMessage="ООО «Ромашка», менеджер — Анна Смирнова." />
        </TabPanel>
        <TabPanel value="deals">
          <FormattedMessage defaultMessage="Три открытые сделки." />
        </TabPanel>
        <TabPanel value="history">
          <FormattedMessage defaultMessage="Последний звонок — вчера в 15:40." />
        </TabPanel>
      </Tabs>

      <Stack direction="row" wrap gap="md" align="flex-start">
        <Grow>
          <Table fullWidth>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Номер" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Покупатель" />
                </TableHeaderCell>
                <TableHeaderCell style={{ textAlign: 'right' }}>
                  <FormattedMessage defaultMessage="Сумма" />
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(([id, customer, amount]) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{customer}</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grow>
        <MenuBox role="listbox" aria-label={intl.formatMessage({ defaultMessage: 'Действия' })}>
          {menuItems.map(item => (
            <MenuItem
              key={item}
              role="option"
              aria-selected={item === menuValue}
              selected={item === menuValue}
              hovered={false}
              onClick={() => setMenuValue(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuBox>
      </Stack>
    </>
  );
};

const Containers: React.FC = () => {
  const intl = useIntl();
  const [modal, setModal] = React.useState<'dialog' | 'drawer' | 'confirm' | null>(null);
  const close = () => setModal(null);

  return (
    <>
      <Stack direction="row" wrap gap="md" align="flex-start">
        <Card
          header={<FormattedMessage defaultMessage="Заказ №1042" />}
          subheader={<FormattedMessage defaultMessage="Оформлен 30 сентября" />}
          footer={
            <Stack direction="row" gap="sm">
              <Button>
                <FormattedMessage defaultMessage="Отменить" />
              </Button>
              <Button color="primary">
                <FormattedMessage defaultMessage="Оплатить" />
              </Button>
            </Stack>
          }
        >
          <Paragraph>
            <FormattedMessage defaultMessage="3 товара на сумму 4 590 ₽. Доставка курьером, 2–3 дня." />
          </Paragraph>
        </Card>
        <ToastCard type="success" position="top-right" isClosing={false}>
          <FormattedMessage defaultMessage="Заказ №1042 оплачен" />
        </ToastCard>
      </Stack>

      <Accordion
        defaultOpened
        header={intl.formatMessage({ defaultMessage: 'Доставка и оплата' })}
        actions={
          <Button variant="outlined" color="primary">
            <FormattedMessage defaultMessage="Все способы доставки" />
          </Button>
        }
      >
        <FormattedMessage defaultMessage="Доставляем курьером за 1–2 дня или в пункт выдачи за 2–4 дня." />
      </Accordion>

      <Stack direction="row" wrap gap="sm">
        <Button onClick={() => setModal('dialog')}>
          <FormattedMessage defaultMessage="Открыть диалог" />
        </Button>
        <Button onClick={() => setModal('drawer')}>
          <FormattedMessage defaultMessage="Открыть панель" />
        </Button>
        <Button onClick={() => setModal('confirm')}>
          <FormattedMessage defaultMessage="Открыть подтверждение" />
        </Button>
      </Stack>

      <Modal variant="dialog" isOpen={modal === 'dialog'} onRequestClose={close}>
        <Paragraph>
          <FormattedMessage defaultMessage="Отступы окна берутся из padding.container." />
        </Paragraph>
        <Button color="primary" onClick={close}>
          <FormattedMessage defaultMessage="Понятно" />
        </Button>
      </Modal>
      <Modal
        variant="drawer"
        anchor="right"
        isOpen={modal === 'drawer'}
        header={<FormattedMessage defaultMessage="Фильтры" />}
        footer={<FormattedMessage defaultMessage="Найдено 12 заказов" />}
        showCloseButton
        onRequestClose={close}
      >
        <Paragraph>
          <FormattedMessage defaultMessage="Заголовок, содержимое и подвал панели." />
        </Paragraph>
      </Modal>
      <Modal
        variant="confirm-box"
        isOpen={modal === 'confirm'}
        header={intl.formatMessage({ defaultMessage: 'Удалить заказ?' })}
        confirmButtonLabel={<FormattedMessage defaultMessage="Удалить" />}
        dismissButtonLabel={<FormattedMessage defaultMessage="Отмена" />}
        onRequestYes={close}
        onRequestClose={close}
      >
        <FormattedMessage defaultMessage="Заказ №1042 будет удалён без возможности восстановления." />
      </Modal>
    </>
  );
};

/**
 * The components grouped by the padding classes, and a whole screen at the end
 */
const PlaygroundPreview: React.FC = () => (
  <>
    <Section>
      <SectionTitle>
        <FormattedMessage defaultMessage="Контролы" /> <code>padding.control</code>
      </SectionTitle>
      <Controls />
    </Section>
    <Section>
      <SectionTitle>
        <FormattedMessage defaultMessage="Строки" /> <code>padding.item</code>
      </SectionTitle>
      <Items />
    </Section>
    <Section>
      <SectionTitle>
        <FormattedMessage defaultMessage="Панели" /> <code>padding.container</code>
      </SectionTitle>
      <Containers />
    </Section>
    <Section>
      <SectionTitle>
        <FormattedMessage defaultMessage="Экран целиком" />
      </SectionTitle>
      <ShowcaseOrders />
    </Section>
  </>
);

export default PlaygroundPreview;
