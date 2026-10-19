import React from 'react';
import FileDropzone, { FileDropzoneRejectReason } from '@via-profit/ui-kit/src/FileDropzone';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleFileDropzoneReject: React.FC = () => {
  const intl = useIntl();
  const [file, setFile] = React.useState<File | null>(null);
  const [rejected, setRejected] = React.useState<FileDropzoneRejectReason | null>(null);

  return (
    <div style={{ maxWidth: '24em' }}>
      <FileDropzone
        value={file}
        onChange={next => {
          setRejected(null);
          setFile(next);
        }}
        accept="image/jpeg,image/png,application/pdf"
        maxSize={1000 * 1000}
        onReject={(_file, reason) => setRejected(reason)}
        label={<FormattedMessage defaultMessage="Прикрепить чек" />}
        hint={<FormattedMessage defaultMessage="JPG, PNG, PDF до 1 МБ" />}
        replaceLabel={<FormattedMessage defaultMessage="Заменить" />}
        removeLabel={intl.formatMessage({ defaultMessage: 'Удалить файл' })}
      />
      {rejected && (
        <p role="alert">
          {rejected === 'size' ? (
            <FormattedMessage defaultMessage="Файл больше 1 МБ" />
          ) : (
            <FormattedMessage defaultMessage="Можно только JPG, PNG или PDF" />
          )}
        </p>
      )}
    </div>
  );
};

export default ExampleFileDropzoneReject;
