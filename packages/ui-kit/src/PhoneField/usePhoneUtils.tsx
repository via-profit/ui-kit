import React from 'react';

import type { CountryCode, PhoneTemplate, CountryFlag } from './templates';
import UnknownFlag from './flags/Unknown';
import { Mask, useMasked } from '../MaskedField/useMasked';

export interface Formatted {
  readonly text: string;
  readonly caret: number;
  readonly countryCode: CountryCode | null;
  readonly CountryFlag: CountryFlag | null;
  readonly callingCode: string | null;
  readonly number: string;
  readonly template: string;
  readonly placeholder: string;
  readonly isValid: boolean;
}

type Parse = (
  text: string,
  caret?: number,
) => {
  readonly text: string;
  readonly caret: number;
};

type GetTemplateInfo = (parsedValue: string) => {
  readonly countryCode: CountryCode | null;
  readonly CountryFlag: CountryFlag | null;
  readonly callingCode: string | null;
  readonly template: string;
  readonly placeholder: string;
  readonly regexp: RegExp;
};

type Validate = (inputValue: string, template: string) => boolean;
type Format = (text: string, caret: number, defaultCountry?: string | null) => Formatted;
type ParseAndValidate = (inputValue: string) => boolean;
type ParseAndFormat = (inputValue: string, caret?: number) => Formatted;

/**
 * Converts a phone template to a mask: «x» is a digit, other chars are literals
 */
export const templateToMask = (template: string): Mask =>
  template.split('').map(char => (char === 'x' ? /\d/ : char));

/**
 * «+» is allowed only as the first char of a parsed phone, the other ones are dropped
 */
export const dropExtraPluses = (parsed: { readonly text: string; readonly caret: number }) => {
  const { text, caret } = parsed;
  const removedBeforeCaret = (text.slice(1, Math.max(caret, 1)).match(/\+/g) || []).length;

  return {
    text: text.charAt(0) + text.slice(1).replace(/\+/g, ''),
    caret: caret - removedBeforeCaret,
  };
};

export const usePhoneUtils = (params: { templates: readonly PhoneTemplate[] }) => {
  const { templates } = params;
  const masked = useMasked();
  const templatesList = React.useMemo(
    () =>
      templates.concat([
        [
          null,
          <UnknownFlag key="unknnown" />,
          null,
          '+x xxx xxx-xx-xx',
          '+7 987 654-32-10',
          /^\+{0,1}.*/,
        ],
      ]),
    [templates],
  );
  /**
   * Get template info by parset value
   */
  const getTemplateInfo: GetTemplateInfo = React.useCallback(
    parsedValue => {
      const [countryCode, CountryFlag, callingCode, template, placeholder, regexp] =
        templatesList.find(template => new RegExp(template[5]).test(parsedValue.trim())) ||
        templatesList[0];

      return {
        countryCode,
        CountryFlag,
        callingCode,
        template,
        placeholder,
        regexp,
      };
    },
    [templatesList],
  );

  /**
   * Get phone validation status
   */
  const validateParsedInput: Validate = React.useCallback((inputValue, template) => {
    const xLength = template.replace(/[^x\d]/g, '').split('').length;
    const digitLength = inputValue.replace(/[^\d]/g, '').split('').length;

    return xLength === digitLength;
  }, []);

  /**
   * Format phone string
   */
  const formatParsedInput: Format = React.useCallback(
    (inputValue, caret, defaultCountry) => {
      const defaultTemplateRecord = templatesList.find(t => t[0] === (defaultCountry || null));
      const [
        defaultCountryCode,
        DefaultCountryFlag,
        defaultCountryCalling,
        defaultTemplate,
        defaultPlaceholder,
      ] = defaultTemplateRecord || templatesList[templatesList.length - 1];

      const data = {
        text: '',
        caret,
        CountryFlag: DefaultCountryFlag,
        countryCode: defaultCountryCode,
        callingCode: defaultCountryCalling,
        template: defaultTemplate,
        placeholder: defaultPlaceholder,
        number: '',
        isValid: false,
      };

      if (inputValue === '') {
        return data;
      }

      // The mask engine is shared with <MaskedField>, only the template is phone-specific
      const normalized = dropExtraPluses({ text: inputValue, caret });
      const { countryCode, callingCode, CountryFlag, template, placeholder } = getTemplateInfo(
        normalized.text,
      );
      const formatted = masked.formatParsedInput(
        normalized.text,
        templateToMask(template),
        normalized.caret,
      );
      const number = formatted.text.replace(/[^0-9]/g, '').substring(callingCode?.length || 0);

      return {
        ...data,
        text: formatted.text,
        caret: formatted.caret,
        countryCode,
        callingCode,
        CountryFlag,
        template,
        placeholder,
        number,
        isValid: validateParsedInput(formatted.text, template),
      };
    },
    [getTemplateInfo, templatesList, validateParsedInput, masked],
  );

  /**
   * Parse phone string
   */
  const parseInput: Parse = React.useCallback((value: string, caret?: number) => {
    const data = {
      text: '',
      caret: 0,
    };

    value
      .trim()
      .split('')
      .forEach((character, charIndex) => {
        const isMatch = new RegExp(/[+0-9]/).test(character);
        if (isMatch) {
          data.text = `${data.text}${character}`;

          if (charIndex < (caret || 0)) {
            data.caret += 1;
          }
        }
      });

    return { ...data };
  }, []);

  const parseAndValidate: ParseAndValidate = React.useCallback(
    inputValue => {
      const { text } = parseInput(inputValue);
      const { template } = getTemplateInfo(text);

      return validateParsedInput(text, template);
    },
    [getTemplateInfo, parseInput, validateParsedInput],
  );

  const parseAndFormat: ParseAndFormat = React.useCallback(
    (inputValue, caret) => {
      const parsed = parseInput(inputValue, caret);

      return formatParsedInput(parsed.text, parsed.caret);
    },
    [formatParsedInput, parseInput],
  );

  return {
    /**
     * Validate parsed phone string by template\
     * ```js
     * // Example:
     * validateParsedInput('79129876543', '7 (xxx) xxx-xx-xx'); // true
     * validateParsedInput('79129876', '7 (xxx) xxx-xx-xx'); // false
     * ```
     */
    validateParsedInput,
    getTemplateInfo,

    /**
     * Parse plain phone string and validate result\
     * ```js
     * // Example:
     * parseAndValidate('+7 912 659-99-88'); // true
     * parseAndValidate('+7 912 659-99-'); // false
     * ```
     */
    parseAndValidate,

    parseAndFormat,

    /**
     * Format phone string by template\
     * ```js
     * // Example:
     * format('')
     * ```
     */
    formatParsedInput,

    /**
     * Parse input phone string\
     * ```js
     * // Example:
     * const { text, caret } = parseInput('+7 (912', 7); // { '7912', 4 }
     * ```
     */
    parseInput,
  };
};
