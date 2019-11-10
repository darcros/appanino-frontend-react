import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';

import { useCartQuery } from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { Center } from '../../components/Center';
import { ProductList } from '../../components/ProductList/ProductList';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useCartQuery();

  if (!data) {
    return (
      <PageContainer maxWidth="md">
        <Center>
          <CircularProgress />
        </Center>
      </PageContainer>
    );
  }

  const mappedProducts = data.cart.items.map(({ product }) => ({
    id: product.id,
    name: product.name,
    categoryName: product.category.name,
    price: product.price,
  }));

  return (
    <PageContainer maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          {t('page.cart.header')}
        </Typography>

        <ProductList products={mappedProducts} />
      </Box>
    </PageContainer>
  );
};
