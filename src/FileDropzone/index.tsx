import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';
import Area, { FileDropzoneAreaProps } from './FileDropzoneArea';
import { formatFileSize, isFileAccepted } from './utils';

export { formatFileSize, isFileAccepted };

export type FileDropzoneRejectReason = 'type' | 'size';

export type FileDropzoneProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /**
   * The chosen file, `null` — no file
   */
  readonly value: File | null;

  /**
   * Called with the chosen file or `null` when the file is removed
   */
  readonly onChange: (file: File | null) => void;

  /**
   * The types of the files, as `accept` of the input: `image/png`, `image/*`, `.pdf`
   */
  readonly accept?: string;

  /**
   * The maximum size of the file in bytes
   */
  readonly maxSize?: number;

  /**
   * The file is not taken: the type is not in `accept` or it is larger than `maxSize`
   */
  readonly onReject?: (file: File, reason: FileDropzoneRejectReason) => void;

  /**
   * The line of the empty area
   * Default: `Choose a file`
   */
  readonly label?: React.ReactNode;

  /**
   * The second line of the empty area: the types and the size
   */
  readonly hint?: React.ReactNode;

  /**
   * Default: `Replace`
   */
  readonly replaceLabel?: React.ReactNode;

  /**
   * The name of the delete button for the screen readers and its tooltip
   * Default: `Remove the file`
   */
  readonly removeLabel?: string;

  /**
   * The size of the chosen file
   * Default: `formatFileSize` — «54.1 KB»
   */
  readonly formatSize?: (bytes: number) => React.ReactNode;

  readonly disabled?: boolean;

  readonly overrides?: FileDropzoneOverrides;
};

export interface FileDropzoneOverrides {
  /**
   * The area with the border: without the file and with it (`filled`)
   */
  readonly Area?: React.ComponentType<FileDropzoneAreaProps & React.RefAttributes<HTMLDivElement>>;
}

const Icon = styled.span`
  flex: none;
  display: inline-flex;
  font-size: 1.5em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const Label = styled.span`
  font-size: 0.875em;
  font-weight: 600;
`;

const Hint = styled.span`
  font-size: 0.75em;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

const FileText = styled.span`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15em;
  text-align: left;
`;

/**
 * The long name in one line: the whole name is in the tooltip
 */
const FileName = styled(Label)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Path = styled.path`
  fill: currentColor;
`;

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden>
    <Path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z" />
  </svg>
);

const FileIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden>
    <Path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-6h8v2H8zm0 3h5v2H8z" />
  </svg>
);

const TrashIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden>
    <Path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
  </svg>
);

/**
 * The file by the click or by the drop: one area with the dashed border. The chosen file
 * is the row with its name and size, «Replace» and the delete button; a new file can be
 * dropped onto it too
 */
const FileDropzone: React.ForwardRefRenderFunction<HTMLDivElement, FileDropzoneProps> = (
  props,
  ref,
) => {
  const {
    value,
    onChange,
    accept,
    maxSize,
    onReject,
    label = 'Choose a file',
    hint,
    replaceLabel = 'Replace',
    removeLabel = 'Remove the file',
    formatSize = formatFileSize,
    disabled = false,
    overrides,
    ...nativeProps
  } = props;

  const AreaComponent = overrides?.Area || Area;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  // dragenter/dragleave fire on every child: the counter keeps the highlight steady
  const dragDepthRef = React.useRef(0);
  const [isDragActive, setDragActive] = React.useState(false);

  const take = (file: File | undefined) => {
    if (!file) {
      return;
    }
    if (!isFileAccepted(file, accept)) {
      onReject?.(file, 'type');

      return;
    }
    if (typeof maxSize === 'number' && file.size > maxSize) {
      onReject?.(file, 'size');

      return;
    }
    onChange(file);
  };

  const choose = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const dropHandlers = disabled
    ? {}
    : {
        onDragEnter: (event: React.DragEvent) => {
          event.preventDefault();
          dragDepthRef.current += 1;
          setDragActive(true);
        },
        onDragOver: (event: React.DragEvent) => {
          event.preventDefault();
        },
        onDragLeave: () => {
          dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
          if (dragDepthRef.current === 0) {
            setDragActive(false);
          }
        },
        onDrop: (event: React.DragEvent) => {
          event.preventDefault();
          dragDepthRef.current = 0;
          setDragActive(false);
          take(event.dataTransfer.files?.[0]);
        },
      };

  const input = (
    <input
      hidden
      ref={inputRef}
      type="file"
      accept={accept}
      disabled={disabled}
      // the input is inside the area: its click must not reach the area and open the dialog again
      onClick={event => event.stopPropagation()}
      onChange={event => {
        const file = event.currentTarget.files?.[0];
        // the same file can be chosen again after the removal
        event.currentTarget.value = '';
        take(file);
      }}
    />
  );

  if (value) {
    return (
      <AreaComponent
        {...nativeProps}
        {...dropHandlers}
        active={isDragActive}
        filled
        disabled={disabled}
        ref={ref}
      >
        {input}
        <Icon>
          <FileIcon />
        </Icon>
        <FileText>
          <FileName title={value.name}>{value.name}</FileName>
          <Hint>{formatSize(value.size)}</Hint>
        </FileText>
        <Button type="button" variant="plain" disabled={disabled} onClick={choose}>
          {replaceLabel}
        </Button>
        <Button
          type="button"
          variant="plain"
          color="error"
          iconOnly
          disabled={disabled}
          title={removeLabel}
          aria-label={removeLabel}
          onClick={() => onChange(null)}
        >
          <TrashIcon />
        </Button>
      </AreaComponent>
    );
  }

  return (
    <AreaComponent
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      {...nativeProps}
      {...dropHandlers}
      active={isDragActive}
      filled={false}
      disabled={disabled}
      onClick={choose}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          choose();
        }
      }}
      ref={ref}
    >
      {input}
      <Icon>
        <UploadIcon />
      </Icon>
      <Label>{label}</Label>
      {hint && <Hint>{hint}</Hint>}
    </AreaComponent>
  );
};

export * from './FileDropzoneArea';

export default React.forwardRef(FileDropzone);
