import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
function Layout(props) {
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
export default Layout;
