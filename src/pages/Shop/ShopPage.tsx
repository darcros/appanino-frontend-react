import React from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';

import { GetShopProductsComponent } from '../../generated/graphql';

import { PageContainer } from '../../components/PageContainer';
import { ProductList } from './components/ProductList';
import { Center } from './components/Center';

export const ShopPage: React.FC = () => {
  return (
    <PageContainer breadcrumbs maxWidth="md">
      <GetShopProductsComponent>
        {({ data, error, loading }) => {
          if (error) {
            return (
              <Center>
                <Typography variant="h6" color="error">
                  Error. Retry Later.
                </Typography>
                <Button color="primary">Retry</Button>
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
