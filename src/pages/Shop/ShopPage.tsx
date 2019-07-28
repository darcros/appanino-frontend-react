import React from 'react';
import { PageContainer } from '../../components/PageContainer';
import { Box, Typography } from '@material-ui/core';

export const ShopPage: React.FC = () => {
  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shop
        </Typography>
      </Box>
    </PageContainer>
  );
};
