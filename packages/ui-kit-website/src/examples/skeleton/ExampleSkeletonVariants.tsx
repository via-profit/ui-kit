import React from 'react';
import Skeleton from '@via-profit/ui-kit/src/Skeleton';
import Stack from '@via-profit/ui-kit/src/Stack';

const ExampleSkeletonVariants: React.FC = () => (
  <Stack direction="row" gap="md" align="center" wrap>
    <Skeleton variant="circle" />
    <Skeleton variant="rect" width={6} />
    <Skeleton variant="pill" width={5} />
    <Skeleton width={8} />
  </Stack>
);

export default ExampleSkeletonVariants;
