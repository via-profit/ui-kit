import React from 'react';
import styled from '@emotion/styled';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Surface from '@via-profit/ui-kit/src/Surface';
import Typography from '@via-profit/ui-kit/src/Typography';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';

const Content = styled.div`
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

const ExampleModalDrawerOverview: React.FC = () => {
  const [isOpen, setOpenState] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpenState(true)}>Open drawer</Button>

      <Modal
        variant="drawer"
        showCloseButton
        isOpen={isOpen}
        title="Dialog title"
        toolbar={
          <Toolbar>
            <ToolbarTitle>Toolbar</ToolbarTitle>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </Toolbar>
        }
        onRequestClose={() => setOpenState(false)}
        footer={
          <FooterText>
            <Strong>Footer:</Strong> Voluptate magna culpa pariatur cillum incididunt cupidatat ullamco minim.
          </FooterText>
        }
      >
        <Content>
          {[...new Array(80).keys()].map(key => (
            <Dummy key={key}>
              <Strong>Lorem ipsum</Strong>
              <CardText noMargin>
                Pariatur sint commodo commodo enim adipisicing irure proident cillum sint.
              </CardText>
            </Dummy>
          ))}
        </Content>
      </Modal>
    </>
  );
};

export default ExampleModalDrawerOverview;
