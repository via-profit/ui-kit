/**
 * The file matches `accept` of the input: the MIME types (`image/png`), the groups (`image/*`)
 * and the extensions (`.pdf`). The empty `accept` takes any file
 */
export const isFileAccepted = (file: File, accept?: string): boolean => {
  if (!accept) {
    return true;
  }

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return accept
    .split(',')
    .map(item => item.trim().toLowerCase())
    .filter(Boolean)
    .some(item => {
      if (item.startsWith('.')) {
        return name.endsWith(item);
      }
      if (item.endsWith('/*')) {
        return type.startsWith(item.slice(0, -1));
      }

      return type === item;
    });
};

/**
 * «54.1 KB», «2.3 MB»: the decimal units, as the file managers show
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;

  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit += 1;
  }

  return `${unit === 0 ? value : value.toFixed(1).replace(/\.0$/, '')} ${units[unit]}`;
};
