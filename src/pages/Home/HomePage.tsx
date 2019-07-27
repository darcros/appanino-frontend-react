import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PageContainer } from '../../components/PageContainer';

export const HomePage: React.FC = () => {
  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homepage
        </Typography>
      </Box>
    </PageContainer>
  );
};
