import React from 'react'
import Layout from "../../layout";
import LayoutAdmin from "../../components/admin";
import Orders from "../../components/orders";
export default function OrderPage() {
  return (
    <Layout>
      <LayoutAdmin>
         <Orders/>
      </LayoutAdmin>
    </Layout>
  )
}
