import React from 'react'
import Layout from '../../layout';
import LayoutAdmin from '../../components/admin';
import Products from "../../components/products";
export default function ProductPage() {
  return (
    <Layout>
      <LayoutAdmin>
        <Products />
      </LayoutAdmin>
    </Layout>
  )
}
