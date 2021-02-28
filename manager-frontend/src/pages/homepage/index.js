import React, { useEffect } from 'react';
import Layout from '../../layout';
import LayoutAdmin from '../../components/admin';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ListSvg } from '../../assets/img/list.svg';
import { ReactComponent as ProductSvg } from '../../assets/img/product.svg';
import { ReactComponent as OrderSvg } from '../../assets/img/order.svg';
import { ReactComponent as UserSvg } from '../../assets/img/customer.svg';
import { getHomeData } from '../../redux/actions/initialData.action';
import styles from './styles.module.scss';

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeData());
  }, []);
  const data = useSelector((state) => state.homeReducer.homeData);
  return (
    <Layout>
      <LayoutAdmin>
        <div className={styles.title}>
          Chào mừng đến với trang quản lý của website bán hàng nội thất
        </div>
        <div className={styles.row}>
          <div className={styles.block}>
            <ListSvg />
            <div className={styles.count}>{data.categories}</div>
            <label>Danh mục</label>
          </div>
          <div className={styles.block} style={{ backgroundColor: '#FF5252' }}>
            <ProductSvg />
            <div className={styles.count}>{data.products}</div>
            <label>Sản phẩm</label>
          </div>
          <div className={styles.block} style={{ backgroundColor: '#FBC02D' }}>
            <UserSvg />
            <div className={styles.count}>{data.users}</div>
            <label>Người đăng ký</label>
          </div>
          <div className={styles.block} style={{ backgroundColor: '#536DFE' }}>
            <OrderSvg />
            <div className={styles.count}>{data.orders}</div>
            <label>Đơn hàng</label>
          </div>
        </div>
      </LayoutAdmin>
    </Layout>
  );
}
