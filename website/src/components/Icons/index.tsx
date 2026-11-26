import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * Outline icon 24×24, which takes the size of the font and the text color
 */
const outline = (displayName: string, children: React.ReactNode) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      ref={ref}
    >
      {children}
    </svg>
  ));
  Icon.displayName = displayName;

  return Icon;
};

export const CopyIcon = outline(
  'CopyIcon',
  <>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </>,
);

export const CheckIcon = outline('CheckIcon', <path d="m5 12.5 4.5 4.5L19 7.5" />);

export const MenuIcon = outline('MenuIcon', <path d="M4 7h16M4 12h16M4 17h16" />);

export const SunIcon = outline(
  'SunIcon',
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
);

export const MoonIcon = outline('MoonIcon', <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />);

export const ChevronRightIcon = outline('ChevronRightIcon', <path d="m9 6 6 6-6 6" />);

export const ChevronLeftIcon = outline('ChevronLeftIcon', <path d="m15 6-6 6 6 6" />);

export const OpenIcon = outline(
  'OpenIcon',
  <>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </>,
);

export const SearchIcon = outline(
  'SearchIcon',
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </>,
);

export const PlusIcon = outline('PlusIcon', <path d="M12 5v14M5 12h14" />);

export const BellIcon = outline(
  'BellIcon',
  <>
    <path d="M18 9a6 6 0 0 0-12 0c0 5-2 6-2 6h16s-2-1-2-6Z" />
    <path d="M10.3 19a2 2 0 0 0 3.4 0" />
  </>,
);

export const EditIcon = outline(
  'EditIcon',
  <>
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </>,
);

export const GithubIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
    ref={ref}
  >
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
));
GithubIcon.displayName = 'GithubIcon';
