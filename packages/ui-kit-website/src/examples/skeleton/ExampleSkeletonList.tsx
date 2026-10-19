import React from 'react';
import Skeleton from '@via-profit/ui-kit/src/Skeleton';
import Stack from '@via-profit/ui-kit/src/Stack';

const RowSkeleton: React.FC = () => (
  <Stack direction="row" gap="md">
    <Skeleton variant="circle" />
    <Stack gap="xs" style={{ flex: 1 }}>
      <Skeleton width="40%" />
      <Skeleton width="70%" />
    </Stack>
    <Skeleton variant="pill" width={6} />
  </Stack>
);

const ExampleSkeletonList: React.FC = () => (
  <Stack gap="lg" style={{ maxWidth: '32em' }} aria-busy="true">
    <RowSkeleton />
    <RowSkeleton />
    <RowSkeleton />
  </Stack>
);

export default ExampleSkeletonList;
