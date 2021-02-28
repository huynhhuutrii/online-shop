import React from 'react';
import Layout from '../../layout';
import ProductDetail from '../../components/product-detail';
export default function ProductDetailPage(props) {
  return (
    <Layout>
      <ProductDetail {...props} />
    </Layout>
  );
}
