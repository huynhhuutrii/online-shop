import React, { useState } from 'react';
import styles from './styles.module.scss';
import logo from '../../assets/img/logo.jpg';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../redux/actions/user.action';
import ModalError from '../../common/error';
function equalTo(ref, msg) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().equalTo(yup.ref('password')),
});

function Register(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    dispatch(clearError());
  };
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const auth = useSelector((state) => state.authReducer);
  const handleRegister = (data) => {
    const { name, username, email, password } = data;
    dispatch(registerUser({ name, username, email, password }));
    if (auth.error.errors !== '') {
      setShow(true);
    }
  };
  if (auth.authenticate === true) {
    return <Redirect to="/" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>Đăng ký cùng</div>
        <img src={logo} alt="..." />
      </div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className={styles.group}>
          <span>Tên người dùng</span>
          <input
            ref={register}
            type="text"
            name="name"
            placeholder="Nhập đăng nhập"
          />
          {errors.name ? <div className={styles.err}>Chưa nhập tên</div> : null}
        </div>
        <div className={styles.group}>
          <span>Tên đăng nhập</span>
          <input
            ref={register}
            type="text"
            name="username"
            placeholder="Nhập đăng nhập"
          />
          {errors.username ? (
            <div className={styles.err}>Chưa nhập tên đăng nhập</div>
          ) : null}
        </div>
        <div className={styles.group}>
          <span>Email</span>
          <input
            ref={register}
            type="email"
            name="email"
            placeholder="Nhập email"
          />
          {errors.email ? (
            <div className={styles.err}>Chưa nhập email</div>
          ) : null}
        </div>
        <div className={styles.group}>
          <span>Mật khẩu</span>
          <input
            ref={register}
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
          />
          {errors.password ? (
            <div className={styles.err}>Chưa nhập mật khẩu</div>
          ) : null}
        </div>
        <div className={styles.group}>
          <span>Xác nhận mật khẩu</span>
          <input
            ref={register}
            name="passwordConfirm"
            type="password"
            placeholder="Nhập mật khẩu xác nhận"
          />
          {errors.passwordConfirm ? (
            <div className={styles.err}>Xác nhận mật khẩu không đúng</div>
          ) : null}
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <div className={styles.policy}>
        Khi bạn nhấn Đăng ký, bạn đã đồng ý thực hiện mọi giao dịch mua bán theo{' '}
        <span>điều kiện sử dụng và chính sách của HTSHOP.vn</span>
      </div>
      {auth.error ? (
        <ModalError
          handleClose={handleClose}
          show={show}
          error={auth.error.errors}
        />
      ) : null}
    </div>
  );
}

export default Register;
