import React from 'react';

import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Surface from '@via-profit/ui-kit/src/Surface';

const ExampleHighlightedOverrides: React.FC = () => (
  <Surface inline>
    <Highlighted
      text="Gold Cobra"
      highlight={['cob']}
      overrides={{
        Mark: React.forwardRef(function MyMark(props, ref) {
          return (
            <mark
              style={{
                backgroundColor: 'green',
                color: 'white',
                outline: '1px solid green',
                borderRadius: '4px',
              }}
              {...props}
              ref={ref}
            />
          );
        }),
      }}
    />
  </Surface>
);

export default ExampleHighlightedOverrides;
