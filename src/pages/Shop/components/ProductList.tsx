import React from 'react';
import groupBy from 'lodash.groupby';
import List from '@material-ui/core/List';

import { ProductCategory } from './ProductCategorySublist';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  products: {
    id: string;
    name: string;
    categoryName: string;
    price: number;
  }[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const groups = groupBy(products, p => p.categoryName);

  const categories = Object.entries(groups).map(([categoryName, products], i) => {
    const productItems = products.map(({ id, name, price }) => (
      <ProductListItem
        key={id}
        text={name}
        price={price}
        // TODO: get image from API or remove image completely
        // eslint-disable-next-line i18next/no-literal-string
        imageUrl="https://www.gustissimo.it/articoli/ricette/panini-e-tramezzini/panino-con-mortadella-e-provola-affumicata.jpg"
      />
    ));

    return (
      <ProductCategory key={i} title={categoryName}>
        {productItems}
      </ProductCategory>
    );
  });

  return <List>{categories}</List>;
};
