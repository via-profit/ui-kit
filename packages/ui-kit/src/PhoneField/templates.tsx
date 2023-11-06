import React from 'react';

// import UnknownFlag from './UnknownFlag';
import RU from '../CountryFlags/RU';
import BY from '../CountryFlags/BY';
import KZ from '../CountryFlags/KZ';
import UA from '../CountryFlags/UA';
import JP from '../CountryFlags/JP';
import US from '../CountryFlags/US';
import IL from '../CountryFlags/IL';

export type CallingCode = string;

/**
 * Template mask - is a string with chars:\
 * x - digit
 * any - hardcoded symbols\
 * Example (third index in array - is a template mask):
 * ```tsx
 * <PhoneField
      templates={[
        [
          'RU',
          <RU key="ru" />,
          '7',
          '+x (xxx) xxx-xx-xx', // <-- Template mask
          '+7 (987) 654-32-10',
          /^\+$/,
        ],
      ]}
      ...
    />
 * ```
 */
export type TemplateMask = string;

/**
 * Input placeholder
 * Example (fourth index in array - is a placeholer):
 * ```tsx
 * <PhoneField
      templates={[
        [
          'RU',
          <RU key="ru" />,
          '7',
          '+x (xxx) xxx-xx-xx',
          '+7 (987) 654-32-10', // <-- Placeholder
          /^\+$/,
        ],
      ]}
      ...
    />
 * ```
 */
export type Placeholder = string;

/**
 * RegEx for template detection
 * Example (fifth index in array - is a RegEx):
 * ```tsx
 * <PhoneField
      templates={[
        [
          'RU',
          <RU key="ru" />,
          '7',
          '+x (xxx) xxx-xx-xx',
          '+7 (987) 654-32-10',
          /^\+$/, // <-- RegEx. All input starts «+» will be deteced as current (RU) template
        ],
      ]}
      ...
    />
 * ```
 */
export type RegExpDetect = RegExp;

/**
 * JSX Element for display Country Flag
 */
export type CountryFlag = JSX.Element;

/**
 * Country ISO-2 code
 */
export type CountryCode =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'EU'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GEAB'
  | 'GEOS'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'IC'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

export type PhoneTemplate = [
  CountryCode | null,
  CountryFlag | null,
  CallingCode | null,
  TemplateMask,
  Placeholder,
  RegExpDetect,
];

export const templates: PhoneTemplate[] = [
  // Russian template
  ['RU', <RU key="ru-1" />, '7', '+x (xxx) xxx-xx-xx', '+7 (987) 654-32-10', /^\+$/], // must be at first (Default RU)
  ['RU', <RU key="ru-2" />, '7', '8 (xxx) xxx-xx-xx', '8 (987) 654-32-10', /^8[^1]{0,}/], // 8912...
  // ['RU', '7', '+7 (xxx) xxx-xx-xx', '+7 (987) 654-32-10', /^\+{0,1}7{0,1}9/], // 912...
  [
    'RU',
    <RU key="ru-3" />,
    '7',
    '+7 (xxx) xxx-xx-xx',
    '+7 (987) 654-32-10',
    /^\+{0,1}7([0-5]|[8-9])[0-9][0-9]/,
  ], // +79...

  // Other fucking countries
  ['BY', <BY key="by" />, '375', '+375 (xx) xxx-xx-xx', '+375 (98) 765-43-21', /^\+{0,1}375/],
  ['KZ', <KZ key="kz-1" />, '7', '+997 (xx) xxx-xx-xx', '+997 (98) 765-43-21', /^\+{0,1}997/],
  [
    'KZ',
    <KZ key="kz-2" />,
    '7',
    '+7 (xxx) xxx-xx-xx',
    '+7 (600) 765-43-21',
    /^\+{0,1}7[6-7][0-9][0-9]/,
  ], // +7600 - +7700
  ['UA', <UA key="ua" />, '380', '+380 (xx) xxx-xxxx', '+380 (98) 765-4321', /^\+{0,1}380/],
  ['JP', <JP key="jp" />, '81', '+81 (xx) xxx-xxxx', '+81 (98) 765-4321', /^\+{0,1}81/],
  ['US', <US key="us" />, '1', '+1 xxx xxx-xx-xx', '+1 987 654-32-10', /^\+{0,1}1/],

  ['IL', <IL key="il" />, '972', '+972 xx xxx-xx-xx', '+972 65 432-10-01', /^\+972/],
];

export default templates;
