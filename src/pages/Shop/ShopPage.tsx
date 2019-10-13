import React from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { GetShopProductsComponent } from '../../generated/graphql';

import { PageContainer } from '../../components/PageContainer';
import { Center } from '../../components/Center';
import { ProductList } from './components/ProductList';

export const ShopPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer breadcrumbs maxWidth="md">
      <GetShopProductsComponent>
        {({ data, error, loading, refetch }) => {
          if (error) {
            return (
              <Center>
                <Typography variant="h6" color="error">
                  {t('error.generic')}
                </Typography>
                <Button onClick={() => refetch()} color="primary">
                  {t('action.retry')}
                </Button>
              </Center>
            );
          }

          if (loading || !data) {
            return (
              <Center>
                <CircularProgress />
              </Center>
            );
          }

          const mappedProducts = data.self.school.products.map(p => ({
            id: p.id,
            name: p.name,
            categoryName: p.category.name,
            price: p.price,
          }));
          return <ProductList products={mappedProducts} />;
        }}
      </GetShopProductsComponent>
    </PageContainer>
  );
};
