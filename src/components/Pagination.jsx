import React from "react";

const Pagination = ({
  goToNextPage,
  goToPreviousPage,
  currentPage,
  noOfPages,
}) => {
  return (
    <div className="page-container">
      <button
        disabled={currentPage === 0}
        onClick={() => goToPreviousPage()}
        className="page-btn"
      >
        &lt;
      </button>

      <span className="page-info">
        Page {currentPage + 1} of {noOfPages}
      </span>

      <button
        disabled={currentPage + 1 >= noOfPages}
        onClick={() => goToNextPage()}
        className="page-btn"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
