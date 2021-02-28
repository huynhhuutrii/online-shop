import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Layout from '../../layout';
import styles from './styles.module.scss';
import theme from '../../assets/img/theme.jpg';
import clsx from 'clsx';
import { ReactComponent as Arrow } from '../../assets/img/arrow.svg';
import { getCategory } from '../../redux/actions/category.action';
import {
  getRandomProducts,
  getNewProducts,
} from '../../redux/actions/product.action';
import RandomProducts from '../../components/random-product';
import NewProducts from '../../components/newproduct';

export default function HomePage(props) {
  const [hovered, setHovered] = useState(null);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getRandomProducts());
    dispatch(getNewProducts());
  }, []);
  const showCategory = (categories) => {
    let listCat = [];
    for (let category of categories) {
      listCat.push(
        <li key={category._id}>
          <NavLink
            to={`/list/${category.name}/${category.slug}`}
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              if (category?.parentID === undefined) e.preventDefault();
            }}
          >
            {category.parentID ? (
              <div>{category.name}</div>
            ) : (
              <div
                className={clsx(styles.category, {
                  [styles.hovered]: hovered === category._id,
                })}
                onMouseEnter={() => {
                  setHovered(category._id);
                }}
              >
                <img src={category.categoryImage} alt="" />
                <div>{category.name}</div>
                {/* <Arrow className={styles.arrow} /> */}
              </div>
            )}
          </NavLink>
          {category.children.length > 0 ? (
            <ul className={styles.catChildren} style={{ listStyle: 'none' }}>
              {showCategory(category.children)}
            </ul>
          ) : (
            ''
          )}
        </li>
      );
    }
    return listCat;
  };
  return (
    <Layout>
      <div className={styles.banner}>
        <div className={styles.list}>
          <div className={styles.listProduct}>Danh mục sản phẩm</div>
          <ul
            className={styles.categories}
            onMouseLeave={() => setHovered(null)}
          >
            {showCategory(category.categories)}
          </ul>
        </div>
        <img src={theme} alt="..." />
      </div>

      <NewProducts />
      <RandomProducts />
    </Layout>
  );
}
