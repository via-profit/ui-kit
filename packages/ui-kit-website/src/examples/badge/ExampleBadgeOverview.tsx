import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';

const BadgeGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleBadgeOverview: React.FC = () => (
  <>
    <BadgeGroup>
      <Badge>Standard</Badge>
      <Badge color="primary" onDelete={() => console.log('delete')}>
        Standard primary
      </Badge>
      <Badge color="secondary">Standard secondary</Badge>
    </BadgeGroup>
    <BadgeGroup>
      <Badge variant="outlined">Outlined</Badge>
      <Badge variant="outlined" color="primary" onDelete={() => console.log('delete')}>
        Outlined primary
      </Badge>
      <Badge variant="outlined" color="secondary">
        Outlined secondary
      </Badge>
    </BadgeGroup>

    <BadgeGroup>
      <Badge
        variant="outlined"
        onDelete={() => console.log('delete')}
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0.9em"
            height="1em"
            fill="none"
            viewBox="0 0 19 22"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.575 2.384C6.928 1.204 7.965 0 9.501 0c1.536 0 2.572 1.204 2.928 2.382a.155.155 0 0 0 .03.028l.01.006c.895.366 1.947.95 2.77 2.02.83 1.08 1.369 2.577 1.369 4.666 0 2.083.221 3.225.547 4.01.285.687.66 1.139 1.194 1.782l.245.295c.984 1.199.055 2.882-1.461 2.882h-3.68a3.917 3.917 0 0 1-1.158 2.778A3.964 3.964 0 0 1 9.501 22a3.964 3.964 0 0 1-2.794-1.15 3.917 3.917 0 0 1-1.158-2.779H1.874c-1.513 0-2.458-1.674-1.466-2.882l.245-.295c.534-.643.91-1.095 1.195-1.783.326-.784.547-1.926.548-4.009m4.734 8.97c0 .625.25 1.224.694 1.666a2.379 2.379 0 0 0 3.354 0 2.35 2.35 0 0 0 .694-1.667H7.13zM1.874 16.5c-.162 0-.235-.074-.265-.131a.169.169 0 0 1-.02-.092.168.168 0 0 1 .043-.094l.23-.277c.53-.635 1.064-1.274 1.447-2.195.44-1.058.667-2.436.668-4.609 0-1.81.461-2.954 1.044-3.712.589-.766 1.36-1.211 2.116-1.52.402-.165.804-.532.949-1.023v-.002c.225-.77.806-1.274 1.415-1.274s1.19.504 1.418 1.275v.002c.144.483.542.855.949 1.021.753.309 1.525.756 2.115 1.522.583.758 1.044 1.903 1.044 3.711 0 2.172.227 3.55.666 4.609.383.92.917 1.56 1.447 2.195l.23.277c.05.06.053.123.021.186-.03.06-.102.131-.258.131H1.874zM6.575 2.384a.152.152 0 0 1-.028.025l-.012.007c-.894.366-1.947.95-2.77 2.02-.83 1.078-1.368 2.575-1.369 4.666"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Bell
      </Badge>
      <Badge
        variant="outlined"
        color="primary"
        startIcon={
          <svg width="1em" height="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m258.9 48c-116.98-1.58-212.48 93.921-210.9 210.9 1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.901 210.88-210.88-1.54-112.21-92.89-203.56-205.08-205.12zm-3.3301 32c97.35-0.24 176.43 78.81 176.43 176a175.32 175.32 0 0 1-46.68 119.25 4 4 0 0 1-6.1406-0.32031 124.27 124.27 0 0 0-32.35-29.59c-25.46-16.34-57.72-25.34-90.83-25.34s-65.37 8.9999-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.1406 0.32031 175.32 175.32 0 0 1-46.68-116.24c-1.63-97.31 78.22-178.76 175.57-179zm0.42969 64c-19.72 0-37.551 7.3903-50.221 20.82-12.67 13.43-18.998 32-17.568 51.93 2.9 39.25 33.309 71.25 67.789 71.25s64.829-32 67.789-71.24c1.48-19.74-4.7997-38.14-17.68-51.82-12.72-13.5-30.519-20.939-50.109-20.939z"
            />
          </svg>
        }
      >
        Outlined primary
      </Badge>
      <Badge variant="outlined" color="secondary">
        Outlined secondary
      </Badge>
    </BadgeGroup>
  </>
);

export default ExampleBadgeOverview;
