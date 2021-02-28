import React, { useState } from 'react';
import { Modal, Button, Table, Row, Col } from 'react-bootstrap';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
} from '../../redux/actions/product.action';

import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import { AiFillFileImage } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import PaginationCommon from '../../pagination';
const schema = yup.object().shape({
  name: yup.string().required(),
  categoryID: yup.string().required(),
  price: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.string().required(),
  productImages: yup.mixed().required(),
});

export default function Product() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [name, setName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);

  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [nameEdit, setNameEdit] = useState('');
  const [priceEdit, setPriceEdit] = useState('');
  const [quantityEdit, setQuantityEdit] = useState('');

  const [descriptionEdit, setDescriptionEdit] = useState('');

  const [imagesEdit, setImagesEdit] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [keySearch, setkeySearch] = useState('');
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;

  const product = useSelector((state) => state.productReducer);
  const mycategory = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const handleAddProduct = (data) => {
    const form = new FormData();

    form.append('name', name);
    form.append('category', categoryID);
    form.append('price', price);
    form.append('description', description);
    form.append('quantity', quantity);
    for (let item of productImages) {
      form.append('productImage', item);
    }
    dispatch(addProduct(form));
    setName('');
    setCategoryID('');
    setPrice('');
    setDescription('');
    setQuantity('');
    setProductImages([]);
    setShow(false);
  };
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const handleCloseUpdateProduct = () => setShowUpdateModal(false);
  const handleShowUpdateProduct = (product) => {
    setProductDetail(product);
    setNameEdit(product.name);
    setPriceEdit(product.price);
    setQuantityEdit(product.quantity);
    setDescriptionEdit(product.description);
    setProductDetail(product);
    setShowUpdateModal(true);
  };
  const handleUpdateProduct = () => {
    const form = new FormData();
    form.append('_id', productDetail ? productDetail._id : '');
    form.append('name', nameEdit);
    form.append('category', categoryID);
    form.append('price', priceEdit);
    form.append('description', descriptionEdit);
    form.append('quantity', quantityEdit);
    for (let item of imagesEdit) {
      form.append('productImage', item);
    }
    dispatch(updateProduct(form));
    setShowUpdateModal(false);
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handelPicture = (e) => {
    setProductImages([...productImages, e.target.files[0]]);
  };
  const handelPictureEdit = (e) => {
    setImagesEdit([...imagesEdit, e.target.files[0]]);
  };

  const handelDelete = (item) => {
    // dispatch(deleteProduct(id));
    setProductDetail(item);
    setShowAlert(true);
  };
  const onDeleteProduct = () => {
    if (productDetail) {
      dispatch(deleteProduct(productDetail._id));
    }
    setShowAlert(false);
  };
  const deleteImageFromList = (index) => {
    const newImages = [...productImages];
    newImages.splice(index, 1);
    setProductImages(newImages);
  };
  const currentProducts = product.products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handelSearch = () => {
    dispatch(searchProduct(keySearch));
  };
  const showProducts = () => {
    return (
      <div>
        {currentProducts.length > 0 ? (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phầm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Danh mục</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((item, index) => {
                return (
                  <tr key={index} style={{ cursor: 'pointer' }}>
                    <td>{index + 1}</td>
                    <td onClick={() => handelShowProductDetail(item)}>
                      {item.name}
                    </td>
                    <td>{item.price.toLocaleString('vi-VI')}</td>

                    <td>{item.quantity}</td>
                    <td>{item.category.name}</td>
                    <td>
                      <BsPencilSquare
                        onClick={() => handleShowUpdateProduct(item)}
                        color="#303F9F"
                        style={{ marginRight: '10px' }}
                      />
                      <BsFillTrashFill
                        onClick={() => handelDelete(item)}
                        color="#D32F2F"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              marginTop: '50px',
            }}
          >
            Không tìm thấy kết quả phù hợp
          </div>
        )}
      </div>
    );
  };
  const addProductModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className={styles.titleModal}>
            <div>Thêm mới sản phẩm</div>
          </div>
          <Modal.Body>
            {errors.name && (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Nhập tên sản phẩm
              </div>
            )}
            <input
              ref={register}
              name="name"
              className="form-control mb-3"
              type="text"
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.price ? (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Nhập giá
              </div>
            ) : null}
            <input
              ref={register}
              name="price"
              className="form-control mb-3"
              type="text"
              placeholder="Giá sản phẩm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.description ? (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Nhập mô tả sản phẩm
              </div>
            ) : null}
            <input
              ref={register}
              name="description"
              className="form-control mb-3"
              type="text"
              placeholder="Mô tả sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.quantity ? (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Nhập số lượng sản phẩm
              </div>
            ) : null}
            <input
              ref={register}
              name="quantity"
              className="form-control mb-3"
              type="text"
              placeholder="Số lượng sản phẩm"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.categoryID ? (
              <div
                style={{
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'red',
                }}
              >
                Chưa chọn danh mục
              </div>
            ) : null}
            <select
              ref={register}
              name="categoryID"
              className="form-control mb-3"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            >
              <option>Chọn danh mục</option>
              {createCategoryList(mycategory.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            <input
              ref={register}
              type="file"
              id="file"
              name="productImages"
              className={styles.fileInput}
              onChange={handelPicture}
            />
            {errors.productImages ? (
              <div>Chưa chọn ảnh cho sản phẩm</div>
            ) : null}
            <label className={styles.fileLabel} htmlFor="file">
              <AiFillFileImage />
              <div>Chọn ảnh</div>
            </label>
            <div className={styles.imgList}>
              {productImages.length > 0
                ? productImages.map((pic, index) => {
                    return (
                      <div key={index} className={styles.boxImg}>
                        <img src={URL.createObjectURL(pic)} alt="" />
                        <IoIosCloseCircleOutline
                          onClick={() => deleteImageFromList(index)}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button type="submit" variant="primary">
              Thêm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };
  const handelCloseProductDetailModal = () => {
    setShowProductDetailModal(false);
  };
  const handelShowProductDetail = (product) => {
    setProductDetail(product);
    setShowProductDetailModal(true);
  };
  const updateProductModal = () => {
    return (
      <Modal size="lg" show={showUpdateModal} onHide={handleCloseUpdateProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="2">
              <p>Tên sản phẩm</p>
            </Col>
            <Col md="10">
              <input
                className="form-control"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p>Giá</p>
            </Col>
            <Col md="10">
              <input
                className="form-control"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p>Số lượng</p>
            </Col>
            <Col md="10">
              <input
                className="form-control"
                value={quantityEdit}
                onChange={(e) => setQuantityEdit(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p>Mô tả</p>
            </Col>
            <Col md="10">
              <textarea
                className="form-control"
                rows={2}
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p>Danh mục</p>
            </Col>
            <Col md="10">
              <select
                className="form-control"
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
              >
                <option>Chọn danh mục</option>
                {createCategoryList(mycategory.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <input type="file" name="imagesEdit" onChange={handelPictureEdit} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateProduct}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const productDetailModal = () => {
    if (!productDetail) {
      return null;
    }
    return (
      <Modal
        size="lg"
        show={showProductDetailModal}
        onHide={handelCloseProductDetailModal}
      >
        <Modal.Header closeButton>
          <h5>Chi tiết sản phẩm</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Tên sản phẩm</p>
            </Col>
            <Col md="10">
              <p>{productDetail.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Giá</p>
            </Col>
            <Col md="10">
              <p>{productDetail.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Số lượng</p>
            </Col>
            <Col md="10">
              <p>{productDetail.quantity}</p>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Danh mục</p>
            </Col>
            <Col md="10">
              <p>{productDetail.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Mô tả</p>
            </Col>
            <Col md="10">
              <p>{productDetail.description}</p>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <p className={styles.prop}>Hình ảnh</p>
            </Col>
            <Col md="10" className={styles.picBox}>
              {productDetail.productImages.map((pic) => (
                <div key={pic._id}>
                  <img src={`http://localhost:4000/${pic.img}`} alt="" />
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelCloseProductDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleCloseAlert = () => setShowAlert(false);
  const alertModal = () => {
    return (
      <Modal show={showAlert} onHide={handleCloseAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có thật sự muốn xóa sản phẩm này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlert}>
            Đóng
          </Button>
          <Button variant="primary" onClick={onDeleteProduct}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.title}>Quản lý sản phẩm</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: '10px',
              minWidth: '800px',
            }}
          >
            <div className={styles.search}>
              <input
                placeholder="Nhập tên sản phẩm"
                value={keySearch}
                onChange={(e) => {
                  setkeySearch(e.target.value);
                }}
              />
              <div onClick={handelSearch}>Tìm kiếm</div>
            </div>
            <Button className={styles.button} onClick={handleShow}>
              Thêm sản phẩm
            </Button>
          </div>
        </div>

        {showProducts()}
        {addProductModal()}
        {productDetailModal()}
        {updateProductModal()}
        {alertModal()}
      </div>

      {currentProducts.length > 0 ? (
        <PaginationCommon
          activePage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={product.products.length}
          handelPageChange={paginate}
          className={styles}
        />
      ) : null}
    </div>
  );
}
