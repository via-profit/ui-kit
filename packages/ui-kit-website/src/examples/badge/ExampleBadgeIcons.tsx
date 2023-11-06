import React from 'react';
import Badge from '@via-profit/ui-kit/src/Badge';
import Modal from '@via-profit/ui-kit/src/Modal';
import styled from '@emotion/styled';

const BadgeGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleBadgeIcons: React.FC = () => {
  const [dialogisOpen, setDialogOpen] = React.useState(false);

  return (
    <BadgeGroup>
      <Badge
        variant="outlined"
        color="secondary"
        onDelete={() => setDialogOpen(true)}
        startIcon={
          <svg
            version="1.1"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m258.9 48c-116.98-1.58-212.48 93.921-210.9 210.9 1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.901 210.88-210.88-1.54-112.21-92.89-203.56-205.08-205.12zm-3.3301 32c97.35-0.24 176.43 78.81 176.43 176a175.32 175.32 0 0 1-46.68 119.25 4 4 0 0 1-6.1406-0.32031 124.27 124.27 0 0 0-32.35-29.59c-25.46-16.34-57.72-25.34-90.83-25.34s-65.37 8.9999-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.1406 0.32031 175.32 175.32 0 0 1-46.68-116.24c-1.63-97.31 78.22-178.76 175.57-179zm0.42969 64c-19.72 0-37.551 7.3903-50.221 20.82-12.67 13.43-18.998 32-17.568 51.93 2.9 39.25 33.309 71.25 67.789 71.25s64.829-32 67.789-71.24c1.48-19.74-4.7997-38.14-17.68-51.82-12.72-13.5-30.519-20.939-50.109-20.939z"
            />
          </svg>
        }
      >
        Oleg Dolgoperedryagov
      </Badge>
      <Badge
        variant="outlined"
        color="primary"
        onDelete={() => setDialogOpen(true)}
        startIcon={
          <svg
            version="1.1"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m258.9 48c-116.98-1.58-212.48 93.921-210.9 210.9 1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.901 210.88-210.88-1.54-112.21-92.89-203.56-205.08-205.12zm-3.3301 32c97.35-0.24 176.43 78.81 176.43 176a175.32 175.32 0 0 1-46.68 119.25 4 4 0 0 1-6.1406-0.32031 124.27 124.27 0 0 0-32.35-29.59c-25.46-16.34-57.72-25.34-90.83-25.34s-65.37 8.9999-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.1406 0.32031 175.32 175.32 0 0 1-46.68-116.24c-1.63-97.31 78.22-178.76 175.57-179zm0.42969 64c-19.72 0-37.551 7.3903-50.221 20.82-12.67 13.43-18.998 32-17.568 51.93 2.9 39.25 33.309 71.25 67.789 71.25s64.829-32 67.789-71.24c1.48-19.74-4.7997-38.14-17.68-51.82-12.72-13.5-30.519-20.939-50.109-20.939z"
            />
          </svg>
        }
      >
        Oleg Dolgoperedryagov
      </Badge>
      <Badge
        variant="standard"
        color="primary"
        onDelete={() => setDialogOpen(true)}
        startIcon={
          <svg
            version="1.1"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m258.9 48c-116.98-1.58-212.48 93.921-210.9 210.9 1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.901 210.88-210.88-1.54-112.21-92.89-203.56-205.08-205.12zm-3.3301 32c97.35-0.24 176.43 78.81 176.43 176a175.32 175.32 0 0 1-46.68 119.25 4 4 0 0 1-6.1406-0.32031 124.27 124.27 0 0 0-32.35-29.59c-25.46-16.34-57.72-25.34-90.83-25.34s-65.37 8.9999-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.1406 0.32031 175.32 175.32 0 0 1-46.68-116.24c-1.63-97.31 78.22-178.76 175.57-179zm0.42969 64c-19.72 0-37.551 7.3903-50.221 20.82-12.67 13.43-18.998 32-17.568 51.93 2.9 39.25 33.309 71.25 67.789 71.25s64.829-32 67.789-71.24c1.48-19.74-4.7997-38.14-17.68-51.82-12.72-13.5-30.519-20.939-50.109-20.939z"
            />
          </svg>
        }
      >
        Oleg Dolgoperedryagov
      </Badge>
      <Modal
        isOpen={dialogisOpen}
        variant="message-box"
        onRequestClose={() => setDialogOpen(false)}
      >
        Delete button has been pushed
      </Modal>
    </BadgeGroup>
  );
};

export default ExampleBadgeIcons;
