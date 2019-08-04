import React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';
import { ToolbarSpacer } from './ToolbarSpacer';
import { Breadcrumbs } from './Breadcrumbs';

interface PageContainerProps extends ContainerProps {
  breadcrumbs?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ breadcrumbs = false, children, ...props }) => {
  return (
    <Container {...props}>
      <ToolbarSpacer />
      {breadcrumbs && <Breadcrumbs />}
      {children}
    </Container>
  );
};
