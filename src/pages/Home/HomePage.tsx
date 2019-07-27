import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PageContainer } from '../../components/PageContainer';

import { IsLoggedInComponent } from '../../generated/graphql';

export const HomePage: React.FC = () => {
  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homepage
        </Typography>
        <IsLoggedInComponent>
          {({ data }) => {
            return data && <Typography>{data.isLoggedIn ? 'You are logged in' : 'You are not logged in'}</Typography>;
          }}
        </IsLoggedInComponent>
      </Box>
    </PageContainer>
  );
};
