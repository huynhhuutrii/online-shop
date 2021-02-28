import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from '../../components/dashboard';
import { getOrders, cancelOrder } from '../../redux/actions/order.action';
import { BsTrashFill } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
export default function ManagerOrder(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user._id) {
      dispatch(getOrders(user._id));
    }
  }, [user._id]);
  const orders = useSelector((state) => state.order.orders);
  const [show, setShow] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');
  const handleClose = () => setShow(false);
  const handelShowModal = (order) => {
    setShow(true);
    setCurrentOrder(order);
  };
  const handelCancelOrder = () => {
    dispatch(cancelOrder(currentOrder._id));
    setShow(false);
  };
  return (
    <Dashboard>
      <div className="mt-3 bg-light p-3 border rounded">
        <h6 className="text-uppercase">Quản lý đơn hàng</h6>
        <div className="ml-3 mr-4">
          <div className="row mb-3 ">
            <div className="col-2">Ngày mua</div>
            <div className="col-4">Sản phẩm: (SL)</div>
            <div className="col-3">Tổng tiền</div>
            <div className="col-2">Trạng thái</div>
            <div className="col-1"></div>
          </div>
          {orders.map((item, index) => {
            return (
              <div
                key={index}
                className="row border border-secondary mb-3 rounded"
              >
                <div className="col-2">
                  {moment(item.createAt).format('DD/MM/YYYY')}
                </div>
                <div className="col-4 ">
                  {item.cartItems.map((cartItem, _index) => {
                    return (
                      <div key={cartItem._id}>
                        {cartItem.name}: (
                        <p className="text-danger d-inline">
                          {cartItem.quantity}
                        </p>
                        )
                      </div>
                    );
                  })}
                </div>
                <div className="col-3">
                  {item.totalPrice.toLocaleString('vi-VI')} VNĐ
                </div>
                <div className="col-2">{item.status}</div>
                <div className="col-1 text-primary">
                  {item.status === 'Chưa thanh toán' && (
                    <BsTrashFill
                      onClick={() => handelShowModal(item)}
                      color="#D32F2F"
                      cursor="pointer"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn hủy đơn hàng này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handelCancelOrder}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Dashboard>
  );
}
