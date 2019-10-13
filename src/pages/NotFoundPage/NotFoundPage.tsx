import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { PageContainer } from '../../components/PageContainer';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer maxWidth="xl">
      <Box my={4}>
        <Typography variant="h1" align="center">
          {
            // eslint-disable-next-line i18next/no-literal-string
          }
          404
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          {t('page.not-found.page-not-found')}
        </Typography>
        <Button component={RouterLink} to="/" color="primary" fullWidth>
          {t('page.home.breadcrumb')}
        </Button>
      </Box>
    </PageContainer>
  );
};
