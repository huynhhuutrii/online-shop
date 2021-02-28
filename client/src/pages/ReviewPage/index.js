import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from '../../components/dashboard';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { getPurchasedProduct } from '../../redux/actions/order.action';
import BeautyStars from 'beauty-stars';
import { sendReviewAction } from '../../redux/actions/product.action';

export default function ManagerOrder(props) {
  const [show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  const handleClose = () => setShow(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.purchasedProduct);
  useEffect(() => {
    if (user) {
      dispatch(getPurchasedProduct(user._id));
    }
  }, [user]);

  const handleShowModal = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };
  const handleProductReview = () => {
    const id = currentProduct._id;
    const data = { id, comment, stars };
    if (comment === '') {
      return toast.warning('Bạn chưa viết đánh giá của mình');
    }
    dispatch(sendReviewAction(data));
    setShow(false);
  };
  return (
    <Dashboard>
      <div className={styles.title}>sản phẩm đã mua</div>
      {products.length > 0 ? (
        <div className={styles.box}>
          {products.map((product, index) => {
            return (
              <div key={index} className={styles.product}>
                <img
                  src={`http://localhost:4000/${product.productImages[0].img}`}
                  alt="..."
                />
                <div className={styles.name}>{product.name}</div>
                <button onClick={() => handleShowModal(product)}>
                  Viết nhận xét
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Chưa có sản phẩm để đánh giá...</div>
      )}
      <Modal show={show} onHide={handleClose}>
        <div className={styles.modalTitle}>Viết đánh giá sản phẩm</div>
        <div className={styles.modalBody}>
          <div className={styles.ratingStar}>
            <label>1. Đánh giá của bạn cho sản phẩm này:</label>
            <BeautyStars
              className={styles.star}
              size="20px"
              value={stars}
              onChange={(e) => setStars(e)}
            />
          </div>
          <label>2. Viết nhận xét của bạn về sản phẩm này:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            row={3}
            placeholder="Viết đánh giá của bạn"
          />
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleProductReview}>
            Gửi nhận xét
          </Button>
        </Modal.Footer>
      </Modal>
    </Dashboard>
  );
}
