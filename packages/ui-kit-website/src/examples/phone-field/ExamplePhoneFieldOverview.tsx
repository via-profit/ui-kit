import React from 'react';
import PhoneField, { PhonePayload } from '@via-profit/ui-kit/src/PhoneField';
import templates from '@via-profit/ui-kit/src/PhoneField/templates';
import { Table, TableBody, TableRow, TableCell } from '@via-profit/ui-kit/src/Table';
import { FormattedMessage } from 'react-intl';

const ExamplePhoneFieldOverview: React.FC = () => {
  const [payload, setPayload] = React.useState<PhonePayload | null>(null);

  const rows: [keyof PhonePayload, string][] = [
    ['value', payload?.value ?? ''],
    ['countryCode', String(payload?.countryCode ?? null)],
    ['callingCode', String(payload?.callingCode ?? null)],
    ['number', payload?.number ?? ''],
    ['combined', payload?.combined ?? ''],
    ['isValid', String(payload?.isValid ?? false)],
  ];

  return (
    <>
      <PhoneField
        label={<FormattedMessage defaultMessage="Телефон" />}
        templates={templates}
        value={payload?.value ?? ''}
        onChange={(_event, newPayload) => setPayload(newPayload)}
      />
      <Table>
        <TableBody>
          {rows.map(([name, value]) => (
            <TableRow key={name}>
              <TableCell>
                <code>{name}</code>
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ExamplePhoneFieldOverview;
