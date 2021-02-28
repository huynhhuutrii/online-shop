import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaginationCommon from '../../pagination';
import Layout from '../../layout';
import Rating from '../../common/rating';
export default function ProductResultPage(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const product = useSelector((state) => state.product);
  const currentProducts = product.productsSearch.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      {product.productsSearch.length > 0 ? (
        <div className={styles.boxProduct}>
          <div className={styles.header}>
            <div className={styles.title}>Kết quả tìm kiếm</div>
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
                      <Rating reviews={item.reviews} size={'15px'} />
                    </div>
                  </Link>
                );
              })}
          </div>
          <PaginationCommon
            activePage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={product.currentListProductByPrice.length}
            handelPageChange={paginate}
          />
        </div>
      ) : (
        <div style={{ marginTop: '100px' }}>Không tìm thấy kết quả phù hợp</div>
      )}
    </Layout>
  );
}
