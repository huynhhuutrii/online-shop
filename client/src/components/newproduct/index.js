import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Rating from '../../common/rating';
export default function RandomProducts() {
  const product = useSelector((state) => state.product);
  return (
    <div className="all-product-list-wrapper">
      <div className="title">
        <div className="title__primary">
          <FontAwesomeIcon size="lg" icon={faLeaf} color="#00315C" />
          <div className="title__primary title--big">Sản phẩm mới</div>
        </div>
      </div>
      <div className="product-list">
        {product.newProducts &&
          product.newProducts.map((product, index) => {
            return (
              <Link
                to={`${product.slug}/${product._id}`}
                className="product"
                key={index}
              >
                <div
                  style={{
                    backgroundImage: `url(http://localhost:4000/${product.productImages[0].img})`,
                  }}
                  className="product__bgImage"
                >
                  <img
                    src={`http://localhost:4000/${product.productImages[0].img}`}
                    alt="..."
                    className="product__image"
                  />
                </div>

                <div className="product__content">
                  <div className="product__name">{product.name}</div>
                  <div className="product__price">
                    {product.price.toLocaleString('vi-VI')}
                    <sup>đ</sup>
                  </div>
                  <div className="product__rating">
                    <Rating reviews={product.reviews} size={'13px'} />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
