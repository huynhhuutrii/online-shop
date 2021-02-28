import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import logo from '../../assets/img/homelogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  faSearch,
  faUserAlt,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user.action';
import { listProductSearch } from '../../redux/actions/product.action';
function Header(props) {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const logoutUser = () => {
    dispatch(logout());
    props.history.push('/');
  };

  useEffect(() => {
    if (key) {
      dispatch(listProductSearch(key));
    }
  }, [key]);
  const quantityItem = (cart) => {
    let quantity = 0;
    for (let i = 0; i < cart.length; i++) {
      quantity = quantity + +cart[i].quantity;
    }
    return quantity;
  };
  const handelLogin = () => {
    if (cart.length > 0) {
      props.history.push('/order');
    } else {
      props.history.push('/');
    }
  };
  const toOrder = () => {
    props.history.push('/manager/order');
  };
  const toReview = () => {
    props.history.push('/manager/review');
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nameTitle}>Sản phẩm nội thất</div>
        <div className={styles.nameTitle}>Dịch vụ nội thất</div>
        <div className={styles.nameTitle}>Thiết kế nhà đẹp</div>
        <div className={styles.nameTitle}>Doanh nghiệp nội thất</div>
        <div className={styles.nameTitle}>Tư vấn nội thất</div>
      </div>
      <div className={styles.title}>
        <NavLink to="/">
          <img src={logo} alt="..." />
        </NavLink>

        <div className={styles.groupSearch}>
          <FontAwesomeIcon icon={faSearch} size="1x" color="#00AEEF" />
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <NavLink to="/product/search" className={styles.labelSearch}>
            Tìm kiếm
          </NavLink>
        </div>
        <div className={styles.userGroup}>
          {auth.authenticate ? (
            <div className={styles.isLogged}>
              <FontAwesomeIcon icon={faUserAlt} size="1x" color="#5CC9F1" />
              <span>{auth.user.name}</span>
              <div className={styles.dropdownUser}>
                <div onClick={toOrder}>Xem đơn hàng</div>
                <div onClick={toReview}>Đánh giá sản phẩm</div>
                <div onClick={logoutUser}>Đăng xuất</div>
              </div>
            </div>
          ) : (
            <div className={styles.notLogin}>
              <NavLink to="/register" activeClassName={styles.navActive}>
                Đăng ký
              </NavLink>
              <div>|</div>
              <NavLink
                to="/login"
                onClick={handelLogin}
                activeClassName={styles.navActive}
              >
                Đăng nhập
              </NavLink>
            </div>
          )}
          <div className={styles.dropdownUser}>
            <div>Đăng xuất</div>
            <div>Xem giỏ hàng</div>
          </div>
        </div>
        <NavLink
          to="/cart"
          className={styles.carts}
          style={{ textDecoration: 'none' }}
        >
          <div className={styles.cartIcon}>
            <sub>{quantityItem(cart)}</sub>
            <FontAwesomeIcon icon={faCartPlus} color="#5CC9F1" />
          </div>
          <div>Giỏ hàng</div>
        </NavLink>
      </div>
    </div>
  );
}
export default withRouter(Header);
