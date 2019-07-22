import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';

export const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login page
        </Typography>
      </Box>
    </Container>
  );
};
