/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductResultPage from './pages/ProductResultPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import OderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import ManagerOrder from './pages/ManagerOrder';
import RegisterPage from './pages/RegisterPage';
import ReviewPage from './pages/ReviewPage';
import AllProductPage from './pages/AllProductPage';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from './redux/actions/user.action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProduct } from './redux/actions/product.action';

const CartWatcher = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    const cartInStorage = localStorage.getItem('cart') || '[]';
    dispatch({ type: 'SET_CART', payload: JSON.parse(cartInStorage) });
  }, []);

  useEffect(() => {
    if (cart.length >= 0) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return <></>;
};

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
    if (!auth.authenticate) {
      dispatch(userLoggedIn());
    }
  }, []);

  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={(routeProps) => <HomePage {...routeProps} />}
        />

        <Route
          path="/register"
          exact
          render={(routeProps) => <RegisterPage {...routeProps} />}
        />

        <Route
          path="/login"
          exact
          render={(routeProps) => <LoginPage {...routeProps} />}
        />

        <Route path="/cart" exact component={CartPage} />
        <Route path="/order" exact component={OderPage} />
        <Route
          path="/payment"
          exact
          render={(routeProps) => <PaymentPage {...routeProps} />}
        />
        <Route
          path="/product/all"
          exact
          render={(routeProps) => <AllProductPage {...routeProps} />}
        />
        <Route
          path="/manager/order"
          exact
          render={(routeProps) => <ManagerOrder {...routeProps} />}
        />
        <Route
          path="/manager/review"
          exact
          render={(routeProps) => <ReviewPage {...routeProps} />}
        />
        <Route
          path="/product/search"
          exact
          render={(routeProps) => <ProductResultPage {...routeProps} />}
        />
        <Route
          path="/list/:name/:slug"
          exact
          render={() => <ProductListPage />}
        />
        <Route
          path="/:nameSlug/:id"
          exact
          render={(routeProps) => <ProductDetailPage {...routeProps} />}
        />
      </Switch>
      <CartWatcher />
      <ToastContainer />
    </>
  );
}

export default App;
