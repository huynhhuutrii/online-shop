import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BeautyStars from 'beauty-stars';
import { currentProduct } from '../../redux/actions/product.action';
import { deleteReview } from '../../redux/actions/product.action';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'lodash';
import { toast } from 'react-toastify';
import { IoMdTrash } from 'react-icons/io';
import Rating from '../../common/rating';
export default function ProductDetail(props) {
  const detail = useSelector((state) => state.product.currentProduct);
  const auth = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const currentUser = auth.user._id;
  useEffect(() => {
    if (id) {
      dispatch(currentProduct(id));
    }
  }, [id]);

  const handelDeleteReview = (idReview) => {
    const data = { idProduct: id, idReview: idReview };
    dispatch(deleteReview(data));
  };

  const addCartItem = () => {
    if (quantity > detail.quantity) {
      return toast.error('Rất tiết, hàng đã hết!');
    }
    if (quantity < 1) {
      return toast.error('Hãy chọn số lượng');
    }
    dispatch({
      type: 'ADD_NEW_CART_ITEM',
      payload: {
        ...pick(detail, ['name', 'price', 'productImages']),
        quantity,
        id,
      },
    });
    return toast.success('Đã thêm sản phẩm vào giỏ hàng');
  };
  console.log(detail.reviews);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Carousel transitionTime="1000" className={styles.roll}>
          {detail.productImages &&
            detail.productImages.map((item, index) => {
              return (
                <div key={index} style={{ display: 'flex' }}>
                  <img src={`http://localhost:4000/${item.img}`} alt="" />
                </div>
              );
            })}
        </Carousel>

        <div className={styles.detail}>
          <div className={styles.nameProduct}>{detail.name}</div>
          <div className={styles.rating}>
            {detail.reviews && (
              <Rating reviews={detail.reviews} size={'18px'} />
            )}
          </div>
          <div className={styles.brand}>
            <div className={styles.nameBrand}></div>
          </div>
          <div className={styles.price}>
            Giá:
            <span>{detail.price?.toLocaleString('vi-VI')}</span>
            <sup style={{ color: '#d32f2f' }}>đ</sup>
          </div>
          <div className={styles.quantity}>
            Có sẵn : <span>{detail.quantity}</span>
          </div>
          <div className={styles.amount}>
            <label>Số lượng:</label>
            <div className={styles.inputGroup}>
              <input
                type="number"
                min="1"
                max={detail.quantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <button onClick={addCartItem}>Chọn mua</button>
        </div>
      </div>
      <div className={styles.description}>
        <label>Mô tả sản phẩm</label>
        <div className={styles.bodyDes}>{detail.description}</div>
      </div>
      <div className={styles.review}>
        <label>Đánh giá</label>
        <div className={styles.contentReview}>
          <div className={styles.listReview}>
            {detail.reviews && detail.reviews.length > 0 ? (
              detail.reviews.map((review, index) => {
                return (
                  <div key={index} className={styles.item}>
                    <div className={styles.box}>
                      <div className={styles.user}>
                        <div>{review.userID.name}</div>
                        <BeautyStars
                          className={styles.star}
                          size="18px"
                          value={review.rating}
                        />
                      </div>
                      {currentUser === review.userID._id ? (
                        <div className={styles.edit}>
                          <IoMdTrash
                            onClick={() => handelDeleteReview(review._id)}
                            color="red"
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.userComment}>{review.review}</div>
                  </div>
                );
              })
            ) : (
              <div>Chưa có đánh giá nào...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
