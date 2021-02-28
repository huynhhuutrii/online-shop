import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaginationCommon from '../../pagination';
import Layout from '../../layout';
import Rating from '../../common/rating';
export default function AllProductPage(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const product = useSelector((state) => state.product);

  const currentProducts = product.products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );
  useEffect(() => {
    try {
      window.location({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, []);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className={styles.boxProduct}>
        <div className={styles.header}>
          <div className={styles.title}>Tất cả sản phẩm</div>
        </div>
        <div className={styles.listProduct}>
          {currentProducts &&
            currentProducts.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/${item.slug}/${item._id}`}
                  className={styles.product}
                >
                  <img
                    src={`http://localhost:4000/${item.productImages[0].img}`}
                    alt="..."
                  />
                  <div className={styles.name}>{item.name}</div>

                  <div className={styles.price}>
                    {item.price.toLocaleString('vi-VI')}
                    <sup>đ</sup>
                  </div>
                  <div className={styles.star}>
                    <Rating size={'15px'} reviews={item.reviews} />
                  </div>
                </Link>
              );
            })}
        </div>
        <PaginationCommon
          activePage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={product.products.length}
          handelPageChange={paginate}
        />
      </div>
    </Layout>
  );
}
