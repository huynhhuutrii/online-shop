import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup.object().shape({
  receiver: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  province: yup.string().required(),
  district: yup.string().required(),
  ward: yup.string().required(),
  site: yup.string().required(),
  note: yup.string(),
});

export default function Order(props) {
  const cartItems = useSelector((state) => state.cart);
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
  const onSubmit = async (data) => {
    const {
      receiver,
      email,
      phone,
      province,
      district,
      ward,
      site,
      note,
    } = data;
    const address = `${site}, ${ward}, ${district}, ${province}`;
    const form = {
      receiver,
      email,
      phone,
      address,
      note,
      cartItems,
      totalPrice: totalPriceCart(cartItems),
    };
    localStorage.setItem('orderInfo', JSON.stringify(form));
    props.history.push('/payment');
  };
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.container}>
      <div className={styles.orderInfo}>
        <p>Thông tin giao hàng</p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              ref={register}
              name="receiver"
              type="text"
              placeholder="Nhập họ và tên người nhận"
            />
            {errors.receiver ? (
              <div className={styles.err}>Bạn chưa nhập tên người nhận</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={register}
              name="email"
              type="email"
              placeholder="Enter email"
            />
            {errors.email ? (
              <div className={styles.err}>Bạn chưa nhập email</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              ref={register}
              name="phone"
              type="text"
              placeholder="Nhập số điện thoại người nhận"
            />
            {errors.phone ? (
              <div className={styles.err}>Bạn chưa nhập số điện thoại</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Tỉnh/Thành phố</Form.Label>
            <Form.Control
              ref={register}
              name="province"
              type="text"
              placeholder="Nhập tỉnh thành phố"
            />
            {errors.province ? (
              <div className={styles.err}>Bạn chưa nhập thông tin</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Quận/Huyện</Form.Label>
            <Form.Control
              ref={register}
              name="district"
              type="text"
              placeholder="Nhập quận huyện"
            />
            {errors.district ? (
              <div className={styles.err}>Bạn chưa nhập thông tin</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Phường/Xã</Form.Label>
            <Form.Control
              ref={register}
              name="ward"
              type="text"
              placeholder="Nhập phường xã"
            />
            {errors.ward ? (
              <div className={styles.err}>Bạn chưa nhập thông tin</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              ref={register}
              name="site"
              type="text"
              placeholder="Nhập địa chỉ"
            />
            {errors.site ? (
              <div className={styles.err}>Bạn chưa nhập địa chỉ</div>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control ref={register} name="note" as="textarea" rows={1} />
          </Form.Group>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px',
            }}
          >
            <NavLink className={styles.link} to="/cart">
              <BsArrowLeftShort size="30" />
              <div>Quay lại trang trước</div>
            </NavLink>
            <Button variant="primary" type="submit">
              Tiếp theo
            </Button>
          </Row>
        </Form>
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
  );
}
