import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/actions/user.action';
import { BsXSquare } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../../redux/actions/user.action';
import moment from 'moment';

export default function User() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handelShowModal = (user) => {
    setShow(true);
    setCurrentUser(user);
  };
  const handelDeleteUser = () => {
    dispatch(deleteUser(currentUser._id));
    setShow(false);
  };
  return (
    <div className={styles.container}>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">email</th>
            <th scope="col">Phân quyền</th>
            <th scope="col">Đăng ký</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                  <td>
                    {user.role === 'user' ? (
                      <BsXSquare
                        onClick={() => handelShowModal(user)}
                        color="#E64A19"
                        cursor="pointer"
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xóa tài khoản người dùng này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handelDeleteUser}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
