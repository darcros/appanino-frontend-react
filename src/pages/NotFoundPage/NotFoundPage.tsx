import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { PageContainer } from '../../components/PageContainer';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h1" align="center">
          404
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Page not found
        </Typography>
        <Button component={RouterLink} to="/" color="primary" fullWidth>
          Home
        </Button>
      </Box>
    </PageContainer>
  );
};
