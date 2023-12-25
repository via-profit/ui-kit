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
    () => ['y', 'Y', 'yy', 'yyyy', 'd', 'dd', 'D', 'm', 'mm', 'M'],
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
        if (['m', 'M', 'd', 'D', 'y', 'Y'].includes(char)) {
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

      const data: { days: string[]; monthes: string[]; years: string[] } = {
        days: [],
        monthes: [],
        years: [],
      };
      template.split('').forEach((char, charIndex) => {
        switch (char) {
          case 'y':
            data.years.push(input[charIndex]);
            break;
          case 'm':
            data.monthes.push(input[charIndex]);
            break;
          case 'd':
            data.days.push(input[charIndex]);
            break;

          default:
            // do nothing
            break;
        }
      });

      return new Date(
        parseInt(data.years.join(''), 10),
        parseInt(data.monthes.join(''), 10) - 1, // Fucking month indexes
        parseInt(data.days.join(''), 10),
      );
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
          // mm or M - month with leading zero
          // m - month without leading zero
          .replace(/(m{1,2}|M{1,2})/, entries => {
            const month = `${date.getMonth() + 1}`;

            if (['MM', 'M', 'mm'].includes(entries)) {
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
