import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions/category.action';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Tree from '../tree';
const schema = yup.object().shape({
  categoryName: yup.string().required(),
});
export default function Category() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoryReducer);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [parentID, setParentID] = useState('');

  const handleAddCategory = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentID', parentID);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentID('');
    setCategoryImage('');
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (!category) continue;
      options.push({
        value: category._id,
        name: category.name,
        parentID: category.parentID,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handelCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const renderAddCategoryModel = () => {
    return (
      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <div className={styles.titleModal}>
            <div>Thêm mới danh mục sản phẩm</div>
          </div>
          <Modal.Body>
            {errors.categoryName && (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Chưa nhập tên danh mục
              </div>
            )}
            <input
              ref={register}
              name="categoryName"
              className="form-control mb-3"
              type="text"
              placeholder="Tên danh mục"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <select
              ref={register}
              name="parentID"
              className="form-control mb-3"
              value={parentID}
              onChange={(e) => setParentID(e.target.value)}
            >
              <option>Chọn danh mục</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              className={styles.file}
              type="file"
              name="categoryImage"
              onChange={handelCategoryImage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Danh mục sản phẩm</div>
        <Button onClick={handleShow}>Thêm</Button>
      </div>
      <div className={styles.body}>
        <Tree cats={category?.categories || []} />
      </div>
      {renderAddCategoryModel()}
    </div>
  );
}
