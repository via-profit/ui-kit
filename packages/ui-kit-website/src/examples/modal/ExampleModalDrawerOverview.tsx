import React from 'react';
import styled from '@emotion/styled';
import { ClassNames } from '@emotion/react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Surface from '@via-profit/ui-kit/src/Surface';
import Typography from '@via-profit/ui-kit/src/Typography';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';

const DummyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  & > button {
    margin-left: 0.5em;
  }
`;

const ToolbarTitle = styled(Strong)`
  margin-right: 0.5em;
`;

const Dummy = styled(Surface)`
  width: 15em;
  flex-basis: calc(25% - 1em);
  margin: 0.5em;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
`;

const CardText = styled(Typography)`
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  margin-top: 1em;
`;

const FooterText = styled(Typography)`
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  font-size: 0.9em;
`;

const Title: React.FC = () => <>Title</>;

const ExampleModalDrawerOverview: React.FC = () => {
  const [isOpenDrawer1, setOpenDrawer1] = React.useState(false);
  const [isOpenDrawerLeft, setOpenDrawerLeft] = React.useState(false);
  const [isOpenDrawerTop, setOpenDrawerTop] = React.useState(false);
  const [isOpenDrawerBottom, setOpenDrawerBottom] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpenDrawer1(true)}>Open large drawer </Button>
      <Button onClick={() => setOpenDrawerBottom(true)}>Open drawer bottom</Button>
      <Button onClick={() => setOpenDrawerLeft(true)}>Open drawer left</Button>
      <Button onClick={() => setOpenDrawerTop(true)}>Open drawer top</Button>

      <Modal
        variant="drawer"
        anchor="bottom"
        showCloseButton
        isOpen={isOpenDrawer1}
        header={<Title />}
        toolbar={
          <Toolbar>
            <ToolbarTitle>Toolbar</ToolbarTitle>
            <Button onClick={() => setOpenDrawerLeft(true)}>Open simple drawer</Button>
          </Toolbar>
        }
        onRequestClose={() => setOpenDrawer1(false)}
        footer={
          <FooterText>
            <Strong>Footer:</Strong> Voluptate magna culpa pariatur cillum incididunt cupidatat
            ullamco minim.
          </FooterText>
        }
      >
        <DummyWrapper>
          {[...new Array(80).keys()].map(key => (
            <Dummy key={key}>
              <Strong>Lorem ipsum</Strong>
              <CardText noMargin>
                Pariatur sint commodo commodo enim adipisicing irure proident cillum sint.
              </CardText>
            </Dummy>
          ))}
        </DummyWrapper>
      </Modal>

      <Modal
        variant="drawer"
        anchor="top"
        isOpen={isOpenDrawerTop}
        onRequestClose={() => setOpenDrawerTop(false)}
      >
        <ClassNames>
          {({ css }) => (
            <Dummy
              className={css`
                flex-basis: initial;
              `}
            >
              <Strong>Lorem ipsum</Strong>
              <CardText noMargin>
                Pariatur sint commodo commodo enim adipisicing irure proident cillum sint.
              </CardText>
            </Dummy>
          )}
        </ClassNames>
      </Modal>

      <Modal
        variant="drawer"
        anchor="left"
        isOpen={isOpenDrawerLeft}
        onRequestClose={() => setOpenDrawerLeft(false)}
      >
        <ClassNames>
          {({ css }) => (
            <Dummy
              className={css`
                flex-basis: initial;
              `}
            >
              <Strong>Lorem ipsum</Strong>
              <CardText noMargin>
                Pariatur sint commodo commodo enim adipisicing irure proident cillum sint.
              </CardText>
            </Dummy>
          )}
        </ClassNames>
      </Modal>
      <Modal
        variant="drawer"
        anchor="bottom"
        isOpen={isOpenDrawerBottom}
        onRequestClose={() => setOpenDrawerBottom(false)}
      >
        <ClassNames>
          {({ css }) => (
            <Dummy
              className={css`
                flex-basis: initial;
              `}
            >
              <Strong>Lorem ipsum</Strong>
              <CardText noMargin>
                Pariatur sint commodo commodo enim adipisicing irure proident cillum sint.
              </CardText>
            </Dummy>
          )}
        </ClassNames>
      </Modal>
    </>
  );
};

export default ExampleModalDrawerOverview;
