import React from 'react';
import Layout from '../../layout';
import Order from '../../components/order';
export default function OrderPage(props) {
  return (
    <Layout>
      <Order {...props} />
    </Layout>
  );
}
