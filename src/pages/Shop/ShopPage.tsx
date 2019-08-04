import React from 'react';
import { PageContainer } from '../../components/PageContainer';
import { List } from '@material-ui/core';

import { ProductListItem } from './components/ProductListItem';
import { ProductCategory } from './components/ProductCategorySublist';

// Mock product
const ProductItem: React.FC<{ title: string }> = ({ title }) => (
  <ProductListItem
    text={title}
    price={1.25}
    imageUrl="https://www.gustissimo.it/articoli/ricette/panini-e-tramezzini/panino-con-mortadella-e-provola-affumicata.jpg"
  />
);

export const ShopPage: React.FC = () => {
  return (
    <PageContainer breadcrumbs maxWidth="md">
      <List>
        <ProductCategory title="Panino">
          <ProductItem title="Cotto e fontina" />
          <ProductItem title="Salame" />
          <ProductItem title="Cotoletta" />
        </ProductCategory>
        <ProductCategory title="Cartoccio">
          <ProductItem title="Wurstel, patatine e ketchup" />
          <ProductItem title="Wurstel, patatine e maionese" />
          <ProductItem title="Wurstel, patatine" />
        </ProductCategory>
        <ProductCategory title="Pizzetta">
          <ProductItem title="Pizzetta piccola" />
          <ProductItem title="Pizzetta grande" />
        </ProductCategory>
        <ProductCategory title="Piadina">
          <ProductItem title="Cotto e fontina" />
          <ProductItem title="Salame" />
        </ProductCategory>
      </List>
    </PageContainer>
  );
};
