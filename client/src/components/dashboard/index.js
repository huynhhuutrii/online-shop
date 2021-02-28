import React from 'react';
import Layout from '../../layout';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { ReactComponent as UserIcon } from '../../assets/img/user.svg';
import { NavLink } from 'react-router-dom';
import { FaUserAlt, FaRegListAlt } from 'react-icons/fa';
import { BsCheckBox } from 'react-icons/bs';
export default function Dashboard(props) {
  const auth = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.dashboard}>
          <div className={styles.user}>
            <UserIcon />
            <div>
              <div>Tài khoản của</div>
              <div className={styles.name}>{auth.user.name}</div>
            </div>
          </div>
          <div className={styles.list}>
            <NavLink to="/manager/order" activeClassName={styles.active}>
              <FaRegListAlt />
              <div>Quản lý đơn hàng</div>
            </NavLink>
            <NavLink to="/manager/review" activeClassName={styles.active}>
              <BsCheckBox />
              <div>Đánh giá sản phẩm</div>
            </NavLink>
          </div>
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </Layout>
  );
}
