import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page,setpage}) => {

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={1}
      totalItemsCount={1000}
      pageRangeDisplayed={8}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setpage}
    />
  );
};

export default Paging;