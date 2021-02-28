import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Layout from '../../layout';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.css';
import { sendOrder } from '../../redux/actions/order.action';

export default function Payment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
    const cartItems = orderInfo.cartItems;
    const paypalOrderItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      unit_amount: {
        currency_code: 'USD',
        value: (item.price / 23000).toFixed(2).toString(),
      },
    }));
    const total = paypalOrderItems
      .reduce((prevItem, currItem) => {
        return (
          prevItem +
          parseFloat(currItem.unit_amount.value) * parseInt(currItem.quantity)
        );
      }, 0)
      .toFixed(2)
      .toString();
    const paypalTotal = {
      value: total,
      breakdown: {
        item_total: {
          currency_code: 'USD',
          value: total,
        },
      },
    };
    const userShippingAddess = {
      name: {
        full_name: orderInfo.receiver,
      },
      address: {
        address_line_1: orderInfo.address,
        country_code: 'VN',
        admin_area_1: orderInfo.address,
        admin_area_2: orderInfo.address,
      },
    };

    const paypalOptions = {
      purchase_units: [
        {
          intent: 'ORDER',
          amount: paypalTotal,
          items: paypalOrderItems,
          shipping: userShippingAddess,
        },
      ],
    };

    console.log(paypalOptions);
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: function (data, actions) {
          // Set up the transaction
          return actions.order.create(paypalOptions);
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            console.log('thanh toan thanh cong', details);
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      })
      .render('#paypal-button-container');
  }, []);

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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.history.push('/');
  };

  const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
  const cartItems = orderInfo.cartItems;

  const handelOrder = () => {
    dispatch(sendOrder(orderInfo));
    setShow(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.infoDelivery}>
          <div className={styles.label}>Thông tin giao hàng</div>
          <div className={styles.content}>
            <table>
              <thead>
                <tr>
                  <th>{orderInfo.receiver}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{orderInfo.email}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>
                  <td>{orderInfo.phone}</td>
                </tr>
                <tr>
                  <td>Địa chỉ nhận</td>
                  <td>{orderInfo.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.methodPayment}>
            <div className={styles.label}>Chọn phương thức thanh toán</div>
            <button className={styles.paymentButton} onClick={handelOrder}>
              Thanh toán khi giao hàng
            </button>
            <div id="paypal-button-container"></div>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
              }}
            >
              <NavLink className={styles.link} to="/order">
                <BsArrowLeftShort size="30" />
                <div>Quay lại trang trước</div>
              </NavLink>
            </Row>
          </div>
        </div>
        <div className={styles.cartInfo}>
          <h6>Thông tin giỏ hàng</h6>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => {
              return (
                <div className={styles.item} key={index}>
                  <img
                    src={`http://localhost:4000/${item.productImages[0].img}`}
                    alt=""
                  />
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.price}>
                      <div>
                        Số lượng: <span>{item.quantity}</span>
                      </div>
                      <div>
                        {totalPriceItem(item).toLocaleString('vi-Vi')}
                        <sup>đ</sup>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.payment}>
            <span>TẠM TÍNH</span>
            <span>
              {totalPriceCart(cartItems).toLocaleString('vi-VI')}
              <sup>đ</sup>
            </span>
          </div>
          <div className={styles.payment}>
            <span>GIẢM GIÁ</span>
            <span>
              0<sup>đ</sup>
            </span>
          </div>
          <div className={styles.payment}>
            <span>PHÍ GIAO HÀNG</span>
            <span>Miễn phí</span>
          </div>
          <div className={styles.payment}>
            <span>TỔNG THANH TOÁN</span>
            <span>
              {totalPriceCart(cartItems).toLocaleString('vi-VI')}
              <sup>đ</sup>
            </span>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className={styles.header}>
          <div className={styles.title}>Thông báo</div>
        </div>
        <div className={styles.body}>Đã đặt hàng!!</div>
        <div className={styles.footer}>
          <Button variant="primary" onClick={handleClose}>
            Trở về trang chủ
          </Button>
        </div>
      </Modal>
    </Layout>
  );
}
