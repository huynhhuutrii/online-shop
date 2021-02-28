import React, { useState } from 'react';
import styles from './styles.module.scss';
import logoLogin from '../../assets/img/logosigin.png';
import { ReactComponent as FaIcon } from '../../assets/img/facebook.svg';
import { login, clearError } from '../../redux/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ModalError from '../../common/error';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
    if (auth.error.errors !== '') {
      setShow(true);
    }
  };
  if (auth.authenticate === true) {
    return <Redirect to="/" />;
  }
  const handleClose = () => {
    setShow(false);
    dispatch(clearError());
  };
  return (
    <div className={styles.containerLogin}>
      <div className={styles.title}>
        <div>Đăng nhập cùng</div>
        <img src={logoLogin} alt="..." />
      </div>
      <form onSubmit={userLogin}>
        <div className={styles.group}>
          <span>Tài khoản</span>
          <input
            type="text"
            placeholder="Điền email/số điện thoại tại đây"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <span>Mật khẩu</span>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.forgetPass}>Quên mật khẩu?</div>
        <button type="submit">Đăng nhập</button>
        <div></div>
        <div className={styles.loginFace}>
          <span>Hoặc đăng nhập bằng</span>
          <button>
            <FaIcon />
            Đăng nhập bằng Facebook
          </button>
        </div>
      </form>
      {auth.error ? (
        <ModalError
          handleClose={handleClose}
          error={auth.error.errors}
          show={show}
        />
      ) : null}
    </div>
  );
}
