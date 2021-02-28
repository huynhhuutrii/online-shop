import React from 'react'
import Layout from "../../layout";
import Category from "../../components/categrory";
import LayoutAdmin from "../../components/admin";

export default function CategoryPage() {
  return (
    <Layout>
      <LayoutAdmin>
        <Category />
      </LayoutAdmin>
    </Layout>
  )
}

