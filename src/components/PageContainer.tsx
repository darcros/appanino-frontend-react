import React from 'react';
import { Container } from '@material-ui/core';
import { ToolbarSpacer } from './ToolbarSpacer';

export const PageContainer: React.FC = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <ToolbarSpacer />
      {children}
    </Container>
  );
};
