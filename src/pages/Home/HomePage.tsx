import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { PageContainer } from '../../components/PageContainer';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('page.home.header')}
        </Typography>
        <Button component={RouterLink} to="/sign-up" variant="contained">
          {t('action.signUp')}
        </Button>
      </Box>
    </PageContainer>
  );
};
