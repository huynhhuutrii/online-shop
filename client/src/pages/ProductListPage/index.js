import React from 'react';
import Layout from '../../layout';
import ProductList from '../../components/products';
export default function ProductListPage(props) {
  return (
    <Layout>
      <ProductList {...props} />
    </Layout>
  );
}
