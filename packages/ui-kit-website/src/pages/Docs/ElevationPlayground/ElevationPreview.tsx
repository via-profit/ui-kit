/* eslint-disable import/max-dependencies */
import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage, useIntl } from 'react-intl';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import Badge from '@via-profit/ui-kit/src/Badge';
import Button from '@via-profit/ui-kit/src/Button';
import Calendar from '@via-profit/ui-kit/src/Calendar';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import Modal from '@via-profit/ui-kit/src/Modal';
import Pagination from '@via-profit/ui-kit/src/Pagination';
import Radio from '@via-profit/ui-kit/src/Radio';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import Slider from '@via-profit/ui-kit/src/Slider';
import Stack from '@via-profit/ui-kit/src/Stack';
import Surface from '@via-profit/ui-kit/src/Surface';
import Switch from '@via-profit/ui-kit/src/Switch';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@via-profit/ui-kit/src/Table';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import TextField from '@via-profit/ui-kit/src/TextField';
import { toast } from '@via-profit/ui-kit/src/Toast';
import ToastCard from '@via-profit/ui-kit/src/Toast/ToastCard';
import Tooltip from '@via-profit/ui-kit/src/Tooltip';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';

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

const Card = styled(Surface)`
  max-width: 22em;
`;

const ElevationPreview: React.FC = () => {
  const intl = useIntl();
  const [country, setCountry] = React.useState<Country | null>(null);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [pickerDate, setPickerDate] = React.useState<Date | null>(null);
  const [modal, setModal] = React.useState<'dialog' | 'drawer' | 'confirm' | 'message' | null>(
    null,
  );
  const close = () => setModal(null);

  return (
    <>
      <Section>
        <SectionTitle>
          <FormattedMessage defaultMessage="Поверхности" /> <code>elevation.surface</code>
        </SectionTitle>
        <Stack direction="row" wrap gap="md" align="flex-start">
          <Card
            header={<FormattedMessage defaultMessage="Заказ №1042" />}
            footer={
              <Button color="primary">
                <FormattedMessage defaultMessage="Оплатить" />
              </Button>
            }
          >
            <Paragraph>
              <FormattedMessage defaultMessage="3 товара на сумму 4 590 ₽." />
            </Paragraph>
          </Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Номер" />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage defaultMessage="Сумма" />
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1042</TableCell>
                <TableCell>4 590 ₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1043</TableCell>
                <TableCell>12 300 ₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
        <Accordion
          defaultOpened
          header={intl.formatMessage({ defaultMessage: 'Доставка и оплата' })}
        >
          <FormattedMessage defaultMessage="Доставляем курьером за 1–2 дня." />
        </Accordion>
      </Section>

      <Section>
        <SectionTitle>
          <FormattedMessage defaultMessage="Всплывающие элементы" /> <code>elevation.popup</code>
        </SectionTitle>
        <Stack direction="row" wrap gap="md" align="flex-start">
          <Calendar
            value={date}
            onChange={setDate}
            locale={intl.locale}
            prevButtonLabel={intl.formatMessage({ defaultMessage: 'Назад' })}
            nextButtonLabel={intl.formatMessage({ defaultMessage: 'Вперёд' })}
          />
          <ToastCard type="success" position="top-right" isClosing={false}>
            <FormattedMessage defaultMessage="Заказ №1042 оплачен" />
          </ToastCard>
        </Stack>
        <Stack direction="row" wrap gap="md" align="flex-end">
          <Selectbox
            label={<FormattedMessage defaultMessage="Меню: селектбокс" />}
            notSetLabel={intl.formatMessage({ defaultMessage: 'Не выбрано' })}
            value={country}
            items={countries}
            isOpen={isSelectOpen}
            onRequestOpen={() => setIsSelectOpen(true)}
            onRequestClose={() => setIsSelectOpen(false)}
            onChange={setCountry}
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
            label={intl.formatMessage({ defaultMessage: 'Дейтпикер' })}
            template="dd.mm.yyyy"
            value={pickerDate}
            onChange={setPickerDate}
            locale={intl.locale}
            calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Открыть календарь' })}
          />
          <Tooltip title={intl.formatMessage({ defaultMessage: 'Подсказка' })}>
            <Button variant="outlined">
              <FormattedMessage defaultMessage="Наведите" />
            </Button>
          </Tooltip>
          <Button onClick={() => toast(intl.formatMessage({ defaultMessage: 'Уведомление' }))}>
            <FormattedMessage defaultMessage="Уведомление" />
          </Button>
        </Stack>
        <Stack direction="row" wrap gap="sm">
          <Button onClick={() => setModal('dialog')}>
            <FormattedMessage defaultMessage="Диалог" />
          </Button>
          <Button onClick={() => setModal('drawer')}>
            <FormattedMessage defaultMessage="Панель" />
          </Button>
          <Button onClick={() => setModal('confirm')}>
            <FormattedMessage defaultMessage="Подтверждение" />
          </Button>
          <Button onClick={() => setModal('message')}>
            <FormattedMessage defaultMessage="Сообщение" />
          </Button>
        </Stack>
      </Section>

      <Section>
        <SectionTitle>
          <FormattedMessage defaultMessage="Контролы и остальные компоненты" />{' '}
          <code>elevation.control</code>
        </SectionTitle>
        <Stack direction="row" wrap gap="md" align="center">
          <Button color="primary">standard</Button>
          <Button variant="outlined">outlined</Button>
          <Button variant="plain">plain</Button>
          <Switch defaultChecked>
            <FormattedMessage defaultMessage="Включено" />
          </Switch>
          <Switch>
            <FormattedMessage defaultMessage="Выключено" />
          </Switch>
          <Checkbox defaultChecked>
            <FormattedMessage defaultMessage="Чекбокс" />
          </Checkbox>
          <Radio defaultChecked name="elevation-radio" value="1">
            <FormattedMessage defaultMessage="Радио" />
          </Radio>
          <Badge>Badge</Badge>
          <Avatar variant="circular">ИП</Avatar>
        </Stack>
        <Stack direction="row" wrap gap="md" align="center">
          <TextField placeholder={intl.formatMessage({ defaultMessage: 'Текстовое поле' })} />
          <div style={{ width: '14em' }}>
            <Slider defaultValue={40} aria-label="Slider" />
          </div>
          <Pagination count={10} defaultPage={4} aria-label="Pagination" />
        </Stack>
        <Tabs defaultValue="a">
          <TabList aria-label="Tabs">
            <Tab value="a">
              <FormattedMessage defaultMessage="Вкладка" />
            </Tab>
            <Tab value="b">
              <FormattedMessage defaultMessage="Ещё вкладка" />
            </Tab>
          </TabList>
          <TabPanel value="a">—</TabPanel>
          <TabPanel value="b">—</TabPanel>
        </Tabs>
      </Section>

      <Modal variant="dialog" isOpen={modal === 'dialog'} onRequestClose={close}>
        <Paragraph>
          <FormattedMessage defaultMessage="Диалог" />
        </Paragraph>
      </Modal>
      <Modal
        variant="drawer"
        anchor="right"
        isOpen={modal === 'drawer'}
        header={<FormattedMessage defaultMessage="Панель" />}
        showCloseButton
        onRequestClose={close}
      >
        <Paragraph>
          <FormattedMessage defaultMessage="Боковая панель" />
        </Paragraph>
      </Modal>
      <Modal
        variant="confirm-box"
        isOpen={modal === 'confirm'}
        header={intl.formatMessage({ defaultMessage: 'Удалить заказ?' })}
        onRequestYes={close}
        onRequestClose={close}
      >
        <FormattedMessage defaultMessage="Подтверждение" />
      </Modal>
      <Modal
        variant="message-box"
        isOpen={modal === 'message'}
        header={intl.formatMessage({ defaultMessage: 'Готово' })}
        onRequestClose={close}
      >
        <FormattedMessage defaultMessage="Сообщение" />
      </Modal>
    </>
  );
};

export default ElevationPreview;
