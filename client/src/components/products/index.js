import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../redux/actions/product.action';
import { Link, useParams } from 'react-router-dom';
import PaginationCommon from '../../pagination';
import Rating from '../../common/rating';
export default function ProductList(props) {
  const [priceRange, setPriceRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const path = useParams().slug;

  const name = useParams().name;

  useEffect(() => {
    if (path) {
      dispatch(getProductBySlug(path, priceRange));
    }
  }, [path, priceRange]);
  const currentProducts = product.currentListProductByPrice.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.boxProduct}>
      <div className={styles.header}>
        <div className={styles.title}>Sản phẩm theo danh mục {name}</div>
        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option value="all">Chọn mức giá</option>
          <option value="under10M">Dưới 10 triệu</option>
          <option value="under30M">Từ 10 đến 30 triệu</option>
          <option value="over30M">Trên 30 triệu</option>
        </select>
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
  );
}
