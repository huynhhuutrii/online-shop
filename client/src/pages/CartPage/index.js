import React from 'react'
import Layout from "../../layout";
import Cart from "../../components/cart";
export default function CartPage(props) {
  return (
    <Layout>
      <Cart props={props} />
    </Layout>
  )
}
