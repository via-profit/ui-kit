import React from 'react';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const ExampleAvatarClickable: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  return (
    <Avatar
      src={[{ srcSet: 'https://i.pravatar.cc/150?img=47', type: 'image/jpeg' }]}
      alt="Елена Козлова"
      isOnline={isOnline}
      onClick={() => setIsOnline(value => !value)}
    />
  );
};

export default ExampleAvatarClickable;
