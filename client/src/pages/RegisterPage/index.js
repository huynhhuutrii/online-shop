import React from 'react';
import Layout from '../../layout';
import Register from '../../components/register';
export default function RegisterPage(props) {
  return (
    <Layout>
      <Register {...props} />
    </Layout>
  );
}
