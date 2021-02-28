import React from 'react';
import styles from './styles.module.scss';
import logo from '../../assets/img/homelogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user.action';

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const logoutUser = () => {
    dispatch(logout());
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
        <img src={logo} alt="..." />
        <div className={styles.userGroup}>
          <FontAwesomeIcon icon={faUserAlt} size="1x" color="#5CC9F1" />
          {auth.authenticate ? (
            <div className={styles.isLogged}>
              <span>{auth.user.name}</span>
              <div className={styles.dropdownUser}>
                <div onClick={logoutUser}>Đăng xuất</div>
              </div>
            </div>
          ) : (
            <div className={styles.notLogin}>
              <NavLink to="/register" activeClassName={styles.navActive}>
                Đăng ký
              </NavLink>
              <div>|</div>
              <NavLink to="/login" activeClassName={styles.navActive}>
                Đăng nhập
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
