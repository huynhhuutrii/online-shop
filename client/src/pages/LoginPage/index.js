import React from 'react';
import Layout from '../../layout';
import Login from '../../components/login';

export default function LoginPage(props) {
  return (
    <Layout>
      <Login {...props} />
    </Layout>
  );
}
