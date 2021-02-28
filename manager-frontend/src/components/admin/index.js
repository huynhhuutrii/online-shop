import React from 'react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import {
  BsFillGridFill,
  BsFillCalendarFill,
  BsFillBriefcaseFill,
  BsFillGiftFill,
  BsFillReplyAllFill,
} from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

export default function Admin(props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/home"
        >
          <BsFillGridFill />
          Home
        </NavLink>
        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/category"
        >
          <BsFillCalendarFill />
          Categories
        </NavLink>

        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/products"
        >
          <BsFillBriefcaseFill />
          Products
        </NavLink>

        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/orders"
        >
          <BsFillGiftFill />
          Orders
        </NavLink>
        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/users"
        >
          <FaUser />
          Users
        </NavLink>
        <NavLink
          style={{ display: 'flex', alignItems: 'center' }}
          activeClassName={styles.active}
          to="/review"
        >
          <BsFillReplyAllFill />
          Reviews
        </NavLink>
      </div>
      <div className={styles.right}>{props.children}</div>
    </div>
  );
}
