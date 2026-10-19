import React from 'react';
import FileDropzone from '@via-profit/ui-kit/src/FileDropzone';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleFileDropzoneBasic: React.FC = () => {
  const intl = useIntl();
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div style={{ maxWidth: '24em' }}>
      <FileDropzone
        value={file}
        onChange={setFile}
        label={<FormattedMessage defaultMessage="Прикрепить чек" />}
        hint={<FormattedMessage defaultMessage="JPG, PNG, PDF до 10 МБ" />}
        replaceLabel={<FormattedMessage defaultMessage="Заменить" />}
        removeLabel={intl.formatMessage({ defaultMessage: 'Удалить файл' })}
      />
    </div>
  );
};

export default ExampleFileDropzoneBasic;
