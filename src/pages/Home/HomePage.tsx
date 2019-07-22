import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { ToolbarSpacer } from '../../components/ToolbarSpacer';

export const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <ToolbarSpacer />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homepage
        </Typography>
      </Box>
    </Container>
  );
};
