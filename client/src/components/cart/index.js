import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import cartEmpty from '../../assets/img/empty_cart.webp';
import { NavLink } from 'react-router-dom';
export default function Cart({ props }) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { history } = props;
  const dispatch = useDispatch();
  const quantityItem = (cart) => {
    let quantity = 0;
    for (let i = 0; i < cart.length; i++) {
      quantity = quantity + +cart[i].quantity;
    }
    return quantity;
  };
  const totalPriceItem = (product) => {
    let total = 0;
    total = product.price * +product.quantity;
    return total;
  };
  const totalPriceCart = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice = totalPrice + +totalPriceItem(cart[i]);
    }
    return totalPrice;
  };
  const handelOrder = () => {
    if (auth.authenticate === true) {
      history.push('/order');
    } else {
      history.push('/login');
    }
  };
  const handelDeleteCartItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };
  return (
    <div style={{ width: '100%', minHeight: '500px', marginTop: '100px' }}>
      {cart.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.title}>
              <div>Giỏ hàng</div>
              <div>({quantityItem(cart)} sản phẩm)</div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td className={styles.productGroup}>
                      <IoIosCloseCircleOutline
                        onClick={() => handelDeleteCartItem(cartItem.id)}
                      />
                      {cartItem.productImages && (
                        <img
                          className={styles.cartItemPicture}
                          alt=""
                          src={`http://localhost:4000/${cartItem.productImages[0].img}`}
                        />
                      )}
                      <div>{cartItem.name}</div>
                    </td>
                    <td>{cartItem.price.toLocaleString('vi-VI')}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{totalPriceItem(cartItem).toLocaleString('vi-VI')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.detail}>
            <div>Thông tin đơn hàng</div>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="nhập mã giảm giá " />
              <button>Áp dụng</button>
            </div>
            <div className={styles.total}>
              Tổng giá trị đơn hàng:
              <span>
                {totalPriceCart(cart).toLocaleString('vi-VI')}
                <sup style={{ textDecoration: 'underline' }}>đ</sup>
              </span>
            </div>
            <div onClick={handelOrder} className={styles.button}>
              Tiến hành đặt hàng
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <img src={cartEmpty} alt="" />
          <div>Chưa có sản phẩm nào trong giỏ hàng của bạn</div>
          <NavLink to="/">Tiếp tục mua hàng</NavLink>
        </div>
      )}
    </div>
  );
}
