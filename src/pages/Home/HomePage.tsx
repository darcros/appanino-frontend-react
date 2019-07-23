import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const HomePage: React.FC = () => {
  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Homepage
      </Typography>
    </Box>
  );
};
