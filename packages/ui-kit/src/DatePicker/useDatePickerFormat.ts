import React from 'react';

export type UseDatePickerFormatPayload = {
  /**
   * Returns `true` if template are valid
   */
  readonly isValidTemplate: (template: string) => boolean;

  /**
   * Validate template and throw exception if template is not valid
   */
  readonly validateTemplate: (template: string) => void | never;

  /**
   * Returns validation mask (array of RegExp or/and string) by template
   */
  readonly getMaskByTemplate: (template: string) => (string | RegExp)[];

  /**
   * parse the input string according to the template and returns the date if it was recognized or null in other cases
   */
  readonly parseInputByTemplate: (input: string, template: string) => Date | null;

  /**
   * Format date to string by template
   */
  readonly formatInputByTemplate: (date: Date, template: string) => string;

  /**
   * Returns template valid characters list
   */
  readonly templateValidChars: readonly string[];
};

export const useDatePickerFormat = (): UseDatePickerFormatPayload => {
  const templateValidChars = React.useMemo(
    () => ['y', 'Y', 'yy', 'yyyy', 'YYYY', 'd', 'dd', 'D', 'DD', 'm', 'mm'],
    [],
  );

  const isValidTemplate = React.useCallback(
    (template: string): boolean => {
      const matches = template.match(/[yYmMdD]+/g);

      if (!matches) {
        return false;
      }

      return matches.every(char => templateValidChars.includes(char));
    },
    [templateValidChars],
  );

  const validateTemplate = React.useCallback(
    (template: string) => {
      if (!isValidTemplate(template)) {
        throw new Error(
          `The template «${template}» is not valid. Check the posibility chars: [${templateValidChars.join(
            ', ',
          )}]`,
        );
      }
    },
    [isValidTemplate, templateValidChars],
  );

  /**
   * Generate the array of RegExp by template string
   */
  const getMaskByTemplate = React.useCallback(
    (template: string) => {
      validateTemplate(template);

      return template.split('').map(char => {
        if (['m', 'd', 'D', 'y', 'Y'].includes(char)) {
          return /\d/;
        }

        return char;
      });
    },

    [validateTemplate],
  );

  /**
   * Parse input string ny template
   * @returns Date
   */
  const parseInputByTemplate = React.useCallback(
    (input: string, template: string) => {
      validateTemplate(template);

      if (input.length !== template.length) {
        return null;
      }

      const data: { days: string[]; months: string[]; years: string[] } = {
        days: [],
        months: [],
        years: [],
      };
      template.split('').forEach((char, charIndex) => {
        switch (char) {
          case 'y':
          case 'Y':
            data.years.push(input[charIndex]);
            break;
          case 'm':
            data.months.push(input[charIndex]);
            break;
          case 'd':
          case 'D':
            data.days.push(input[charIndex]);
            break;

          default:
            // do nothing
            break;
        }
      });

      let year = parseInt(data.years.join(''), 10);
      const month = parseInt(data.months.join(''), 10) - 1; // Fucking month indexes
      const day = parseInt(data.days.join(''), 10);

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return null;
      }

      // Two-digit year means the current century (new Date() maps 0-99 to 1900-1999)
      if (data.years.length <= 2) {
        year += 2000;
      }

      const date = new Date(year, month, day);
      date.setFullYear(year);

      // Reject overflowed dates like 31.02 instead of silently moving them to March
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
      }

      return date;
    },
    [validateTemplate],
  );

  /**
   * Format date to string by template
   */
  const formatInputByTemplate = React.useCallback(
    (date: Date, template: string) => {
      validateTemplate(template);

      return (
        template
          .replace(/(d{1,2}|D{1,2})/, entries => {
            const day = `${date.getDate()}`;

            if (['DD', 'D', 'dd'].includes(entries)) {
              const str = `0${day}`;

              return str.substring(str.length - entries.length);
            }

            return day;
          })
          // mm - month with leading zero
          // m - month without leading zero
          .replace(/(m{1,2})/, entries => {
            const month = `${date.getMonth() + 1}`;

            if (['mm'].includes(entries)) {
              const str = `0${month}`;

              return str.substring(str.length - entries.length);
            }

            return month;
          })

          // yyyy or Y - full year
          // yy or y - last two digits
          .replace(/(y{4}|y{1,2}|Y{1,2})/, entries => {
            const str = `${date.getFullYear()}`;
            if (['YY', 'Y'].includes(entries)) {
              return str;
            }

            return str.substring(str.length - entries.length);
          })
      );
    },
    [validateTemplate],
  );

  return {
    templateValidChars,
    isValidTemplate,
    validateTemplate,
    getMaskByTemplate,
    parseInputByTemplate,
    formatInputByTemplate,
  };
};

export default useDatePickerFormat;
