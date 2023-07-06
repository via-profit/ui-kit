import React from 'react';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import H1 from '@via-profit/ui-kit/src/Typography/H1';
import H2 from '@via-profit/ui-kit/src/Typography/H2';
import H3 from '@via-profit/ui-kit/src/Typography/H3';
import H4 from '@via-profit/ui-kit/src/Typography/H4';
import { Li, Ol, Ul } from '@via-profit/ui-kit/src/Typography/List';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import Em from '@via-profit/ui-kit/src/Typography/Em';
import Del from '@via-profit/ui-kit/src/Typography/Del';
import SectionDescription from '@via-profit/ui-kit/src/Typography/SectionDescription';
import Blockquote from '@via-profit/ui-kit/src/Typography/Blockquote';
import Base from '@via-profit/ui-kit/src/Typography/Base';
import U from '@via-profit/ui-kit/src/Typography/U';

const ExampleTypographyOverview: React.FC = () => (
  <>
    <Paragraph>
      <Base>
        Base. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam.
      </Base>
    </Paragraph>
    <Paragraph>
      <Strong>
        Strong. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam
      </Strong>
    </Paragraph>
    <Paragraph>
      <Em>Em. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam</Em>
    </Paragraph>
    <Paragraph>
      <Del>
        Del. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam
      </Del>
    </Paragraph>
    <Paragraph>
      <U>U. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam</U>
    </Paragraph>
    <Paragraph>
      Paragraph. Lorem ipsum minim esse ut cillum cupidatat velit reprehenderit laborum in veniam
    </Paragraph>
    <H1>H1 Header. Elit adipisicing esse enim voluptate ullamco laboris incididunt non irure.</H1>
    <H2>H2 Header. Qui laboris adipisicing aute mollit sint.</H2>
    <H3>H3 Header. Sunt ut ea anim consequat aute magna ad anim qui.</H3>
    <H4>H4 Header. Reprehenderit id cillum consequat duis dolor sint ad sunt fugiat mollit.</H4>
    <SectionDescription>
      SectionDescription. Proident est ea dolor exercitation ut deserunt eiusmod aute culpa eu.
    </SectionDescription>
    <Blockquote>
      Blockquote. Proident officia eiusmod elit ea aliqua veniam eu ad est tempor in Lorem
      incididunt.
    </Blockquote>
    <Ul>
      <Li>List li item</Li>
      <Li>Eu pariatur cupidatat irure non eu ea cillum consectetur.</Li>
      <Li>Velit eiusmod ex aliqua deserunt sunt officia sint.</Li>
    </Ul>
    <Ol>
      <Li>List ol item</Li>
      <Li>Eu pariatur cupidatat irure non eu ea cillum consectetur.</Li>
      <Li>Velit eiusmod ex aliqua deserunt sunt officia sint.</Li>
    </Ol>
  </>
);

export default ExampleTypographyOverview;
