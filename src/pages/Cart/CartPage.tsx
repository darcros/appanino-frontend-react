import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useCartQuery, usePlaceOrderMutation } from '../../generated/graphql';
import { PageContainer } from '../../components/PageContainer';
import { Center } from '../../components/Center';
import { LoadingButton } from '../../components/LoadingButton';
import { ProductList } from '../../components/ProductList/ProductList';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useCartQuery();
  const [placeOrderMutation, { loading, hasError }] = usePlaceOrderMutation();

  if (!data) {
    return (
      <PageContainer maxWidth="md">
        <Center>
          <CircularProgress />
        </Center>
      </PageContainer>
    );
  }

  const placeOrder = async () => {
    const items = data.cart.items.map(i => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));
    await placeOrderMutation({ variables: { items } });
    alert(t('page.cart.order-placed'));
  };

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

        <LoadingButton
          disabled={mappedProducts.length === 0}
          loading={loading}
          onClick={placeOrder}
          fullWidth
          variant="contained"
          color="primary"
        >
          {t('page.cart.place-order')}
        </LoadingButton>

        {hasError && (
          <Typography color="error" align="center" component="h3" variant="subtitle2">
            {t('error.cannot-place-order')}
          </Typography>
        )}
      </Box>
    </PageContainer>
  );
};
