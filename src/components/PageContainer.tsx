import React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';
import { ToolbarSpacer } from './ToolbarSpacer';

export const PageContainer: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <ToolbarSpacer />
      {children}
    </Container>
  );
};
