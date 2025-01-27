import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <Fragment>
      <ReactPaginate
        nextLabel={<BiChevronRight />}
        pageCount={pageCount}
        breakLabel="..."
        previousLabel={<BiChevronLeft />}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active !text-c_BF642B"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName="pagination react-paginate w-fit mx-auto flex justify-center text-c_fff items-center gap-x-6 bg-c_fff/5 rounded-md py-2 px-3 my-8"
        onPageChange={onPageChange}
      />
    </Fragment>
  );
};

export default Pagination;
