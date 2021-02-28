import React, { useEffect, useState } from 'react';
import Layout from '../../layout';
import LayoutAdmin from '../../components/admin';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReview, deleteReview } from '../../redux/actions/product.action';
import { BsXSquare } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
export default function ProductPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReview());
  }, []);
  const reviews = useSelector((state) => state.productReducer.reviews);
  const [currentReview, setCurrentReview] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handelShowModal = (review) => {
    setShow(true);
    setCurrentReview(review);
  };
  const handelDeleteReview = () => {
    setShow(false);
    if (currentReview) {
      dispatch(
        deleteReview(currentReview.userReview._id, currentReview.productID)
      );
    }
  };
  return (
    <Layout>
      <LayoutAdmin>
        <div
          style={{
            margin: '10px 0px 0px 50px',
            fontSize: '20px',
            color: '#00315C',
          }}
        >
          ĐÁNH GIÁ SẢN PHẨM
        </div>
        <table className="table mt-2 ml-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Đánh giá</th>
              <th scope="col">Số sao</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Khách hàng</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 &&
              reviews.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.userReview.review}</td>
                    <td>{item.userReview.rating}</td>
                    <td>{item.productName}</td>
                    <td>{item.categoryName}</td>
                    <td>
                      {item.userReview.userID
                        ? item.userReview.userID.name
                        : 'Tài khoản bị xóa'}
                    </td>
                    <td>
                      <BsXSquare
                        onClick={() => handelShowModal(item)}
                        color="red"
                        cursor="pointer"
                      />
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
          <Modal.Body>Bạn muốn xóa đánh giá này?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handelDeleteReview}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </LayoutAdmin>
    </Layout>
  );
}
