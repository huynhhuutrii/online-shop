import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Rating from '../../common/rating';
export default function RandomProducts() {
  const product = useSelector((state) => state.product);
  return (
    <div className="all-product-list-wrapper">
      <div className="title">
        <div className="title__primary">
          <FontAwesomeIcon size="lg" icon={faBookOpen} color="#00315C" />
          <div to="/product/all" className="title__primary title--big">
            Tất cả sản phẩm
          </div>
        </div>
        <NavLink
          to="/product/all"
          className="title__primary title--nounderline"
        >
          Xem tất cả
        </NavLink>
      </div>
      <div className="product-list">
        {product.randomProducts &&
          product.randomProducts.map((product, index) => {
            return (
              <NavLink
                to={`/${product.slug}/${product._id}`}
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
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}
