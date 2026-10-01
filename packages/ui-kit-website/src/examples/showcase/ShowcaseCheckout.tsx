import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import Stack from '@via-profit/ui-kit/src/Stack';
import Grid from '@via-profit/ui-kit/src/Grid';
import TextField from '@via-profit/ui-kit/src/TextField';
import TextArea from '@via-profit/ui-kit/src/TextArea';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';
import phoneTemplates from '@via-profit/ui-kit/src/PhoneField/templates';
import Selectbox, { SelectboxItem } from '@via-profit/ui-kit/src/Selectbox';
import RadioGroup from '@via-profit/ui-kit/src/RadioGroup';
import Radio from '@via-profit/ui-kit/src/Radio';
import DatePicker from '@via-profit/ui-kit/src/DatePicker';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';
import Button from '@via-profit/ui-kit/src/Button';
import Spinner from '@via-profit/ui-kit/src/LoadingIndicator';
import { Table, TableBody, TableFooter, TableRow, TableCell } from '@via-profit/ui-kit/src/Table';
import { FormattedMessage, useIntl } from 'react-intl';

type Delivery = 'courier' | 'pickup';

type Errors = Partial<Record<'name' | 'phone' | 'city' | 'address' | 'date' | 'agree', string>>;

// Two columns: the form and the order. On a narrow screen the order goes under the form
const Layout = styled(Grid)`
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Numeric = styled(TableCell)`
  text-align: right;
  white-space: nowrap;
`;

const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

const ShowcaseCheckout: React.FC = () => {
  const intl = useIntl();
  const money = (value: number) =>
    intl.formatNumber(value, { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

  const cart = [
    { id: 1, name: intl.formatMessage({ defaultMessage: 'Кофе в зёрнах, 1 кг' }), price: 1890 },
    { id: 2, name: intl.formatMessage({ defaultMessage: 'Френч-пресс' }), price: 1450 },
  ];
  const cities = [
    intl.formatMessage({ defaultMessage: 'Москва' }),
    intl.formatMessage({ defaultMessage: 'Санкт-Петербург' }),
    intl.formatMessage({ defaultMessage: 'Екатеринбург' }),
  ];

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState<PhonePayload | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [isCityOpen, setIsCityOpen] = React.useState(false);
  const [delivery, setDelivery] = React.useState<Delivery>('courier');
  const [address, setAddress] = React.useState('');
  const [date, setDate] = React.useState<Date | null>(null);
  const [comment, setComment] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [isSending, setIsSending] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const deliveryPrice = delivery === 'courier' ? 300 : 0;
  const total = cart.reduce((sum, item) => sum + item.price, 0) + deliveryPrice;

  const validate = (): Errors => {
    const result: Errors = {};
    const required = intl.formatMessage({ defaultMessage: 'Обязательное поле' });

    if (name.trim() === '') result.name = required;
    if (!phone?.isValid) {
      result.phone = intl.formatMessage({ defaultMessage: 'Введите номер полностью' });
    }
    if (!city) result.city = required;
    if (delivery === 'courier' && address.trim() === '') result.address = required;
    if (delivery === 'courier' && !date) result.date = required;
    if (!agree) {
      result.agree = intl.formatMessage({ defaultMessage: 'Без согласия оформить заказ нельзя' });
    }

    return result;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // The request to the server
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsDone(true);
      }, 1500);
    }
  };

  const summary = (
    <Surface header={intl.formatMessage({ defaultMessage: 'Ваш заказ' })}>
      <Table fullWidth>
        <TableBody>
          {cart.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <Numeric>{money(item.price)}</Numeric>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <FormattedMessage defaultMessage="Доставка" />
            </TableCell>
            <Numeric>
              {deliveryPrice ? (
                money(deliveryPrice)
              ) : (
                <FormattedMessage defaultMessage="Бесплатно" />
              )}
            </Numeric>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <FormattedMessage defaultMessage="Итого" />
            </TableCell>
            <Numeric>{money(total)}</Numeric>
          </TableRow>
        </TableFooter>
      </Table>
    </Surface>
  );

  if (isDone) {
    return (
      <Layout columns="minmax(0, 2fr) minmax(16em, 1fr)" gap="lg" align="start">
        <Surface header={intl.formatMessage({ defaultMessage: 'Заказ оформлен' })}>
          <Stack align="flex-start">
            <FormattedMessage
              defaultMessage="Спасибо, {name}! Мы позвоним по номеру {phone}, чтобы подтвердить заказ."
              values={{ name, phone: phone?.value }}
            />
            <Button onClick={() => setIsDone(false)}>
              <FormattedMessage defaultMessage="Вернуться к заказу" />
            </Button>
          </Stack>
        </Surface>
        {summary}
      </Layout>
    );
  }

  return (
    <Layout columns="minmax(0, 2fr) minmax(16em, 1fr)" gap="lg" align="start">
      <Surface header={intl.formatMessage({ defaultMessage: 'Оформление заказа' })}>
        <form noValidate onSubmit={handleSubmit}>
          <Stack gap="lg">
            <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
              <TextField
                fullWidth
                requiredAsterisk
                autoComplete="name"
                label={<FormattedMessage defaultMessage="Имя и фамилия" />}
                value={name}
                onChange={event => setName(event.currentTarget.value)}
                error={Boolean(errors.name)}
                errorText={errors.name}
              />
              <PhoneField
                fullWidth
                requiredAsterisk
                label={<FormattedMessage defaultMessage="Телефон" />}
                templates={phoneTemplates}
                value={phone?.value ?? ''}
                onChange={(_event, payload) => setPhone(payload)}
                error={Boolean(errors.phone)}
                errorText={errors.phone}
              />
            </Grid>

            <Selectbox
              fullWidth
              requiredAsterisk
              label={<FormattedMessage defaultMessage="Город" />}
              notSetLabel={intl.formatMessage({ defaultMessage: 'Выберите город' })}
              value={city}
              items={cities}
              isOpen={isCityOpen}
              onRequestOpen={() => setIsCityOpen(true)}
              onRequestClose={() => setIsCityOpen(false)}
              onChange={setCity}
              getOptionSelected={({ item, value }) => item === value}
              selectedItemToString={item => item}
              error={Boolean(errors.city)}
              errorText={errors.city}
            >
              {({ item }, itemProps) => (
                <SelectboxItem {...itemProps} key={item}>
                  {item}
                </SelectboxItem>
              )}
            </Selectbox>

            <RadioGroup
              orientation="horizontal"
              label={<FormattedMessage defaultMessage="Способ получения" />}
              value={delivery}
              onChange={value => setDelivery(value as Delivery)}
            >
              <Radio value="courier">
                <FormattedMessage
                  defaultMessage="Курьером — {price}"
                  values={{ price: money(300) }}
                />
              </Radio>
              <Radio value="pickup">
                <FormattedMessage defaultMessage="Самовывоз — бесплатно" />
              </Radio>
            </RadioGroup>

            {delivery === 'courier' && (
              <Grid minColumnWidth="14em" gap="lg" rowGap="sm">
                <TextField
                  fullWidth
                  requiredAsterisk
                  autoComplete="street-address"
                  label={<FormattedMessage defaultMessage="Адрес" />}
                  value={address}
                  onChange={event => setAddress(event.currentTarget.value)}
                  error={Boolean(errors.address)}
                  errorText={errors.address}
                />
                <DatePicker
                  fullWidth
                  readOnly
                  requiredAsterisk
                  label={<FormattedMessage defaultMessage="Дата доставки" />}
                  template="dd.mm.yyyy"
                  value={date}
                  onChange={setDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  locale={intl.locale}
                  calendarButtonTooltip={intl.formatMessage({ defaultMessage: 'Выбрать дату' })}
                  error={Boolean(errors.date)}
                  errorText={errors.date}
                />
              </Grid>
            )}

            <TextArea
              fullWidth
              rows={3}
              label={<FormattedMessage defaultMessage="Комментарий к заказу" />}
              value={comment}
              onChange={event => setComment(event.currentTarget.value)}
            />

            <Checkbox
              checked={agree}
              onChange={event => setAgree(event.currentTarget.checked)}
              requiredAsterisk
              error={Boolean(errors.agree)}
              errorText={errors.agree}
            >
              <FormattedMessage defaultMessage="Я согласен с условиями доставки" />
            </Checkbox>

            <div>
              <Button
                type="submit"
                color="primary"
                disabled={isSending}
                startIcon={isSending ? <Spinner size="1.2em" fill={false} /> : undefined}
              >
                {isSending ? (
                  <FormattedMessage defaultMessage="Отправляем…" />
                ) : (
                  <FormattedMessage
                    defaultMessage="Оформить заказ на {total}"
                    values={{ total: money(total) }}
                  />
                )}
              </Button>
            </div>
          </Stack>
        </form>
      </Surface>
      {summary}
    </Layout>
  );
};

export default ShowcaseCheckout;
