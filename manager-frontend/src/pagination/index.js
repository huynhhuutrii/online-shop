import React from 'react';
import Pagination from 'react-js-pagination';
export default function PaginationCommon({
  productsPerPage,
  totalProducts,
  handelPageChange,
  activePage,
}) {
  return (
    <div className="d-flex justify-content-center">
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={activePage}
        itemsCountPerPage={productsPerPage}
        totalItemsCount={totalProducts}
        pageRangeDisplayed={4}
        onChange={handelPageChange}
      />
    </div>
  );
}
