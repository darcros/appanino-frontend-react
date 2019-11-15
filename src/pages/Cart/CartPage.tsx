import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { usePlaceOrderMutation } from '../../generated/graphql';
import { Cart } from '../../context/cart';

import { PageContainer } from '../../components/PageContainer';
import { LoadingButton } from '../../components/LoadingButton';
import { ProductList } from '../../components/ProductList/ProductList';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const [placeOrderMutation, { loading, hasError }] = usePlaceOrderMutation();

  const { items } = Cart.useContainer();

  const categoryName = t('page.cart.header');
  const mappedProducts = items.map(({ product }) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    categoryName,
  }));

  const placeOrder = async () => {
    const orderItems = items.map(i => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));
    await placeOrderMutation({ variables: { items: orderItems } });
    alert(t('page.cart.order-placed'));
  };

  return (
    <PageContainer maxWidth="md">
      <Box my={4}>
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
