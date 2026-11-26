import React from 'react';
import Skeleton from '@via-profit/ui-kit/Skeleton';
import Stack from '@via-profit/ui-kit/Stack';

const ExampleSkeletonBasic: React.FC = () => (
  <Stack gap="sm" style={{ maxWidth: '24em' }}>
    <Skeleton width="60%" height={1.2} />
    <Skeleton />
    <Skeleton width="80%" />
  </Stack>
);

export default ExampleSkeletonBasic;
