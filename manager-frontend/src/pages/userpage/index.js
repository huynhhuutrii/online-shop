import React from 'react';
import Layout from '../../layout';
import LayoutAdmin from '../../components/admin';
import User from '../../components/user';
export default function UserPage() {
  return (
    <Layout>
      <LayoutAdmin>
        <User />
      </LayoutAdmin>
    </Layout>
  );
}
