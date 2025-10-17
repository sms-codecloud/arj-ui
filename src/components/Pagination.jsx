const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  goToNextPage,
  goToPreviousPage,
}) => {
  if (totalPages === 0) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    if (
      i === 0 ||
      i === totalPages - 1 ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (
      (i === currentPage - 2 && i > 1) ||
      (i === currentPage + 2 && i < totalPages - 2)
    ) {
      pageNumbers.push("ellipsis-" + i);
    }
  }

  return (
    <div className="pagination-container">
      <button
        className="page-btn"
        onClick={() => goToPreviousPage()}
        disabled={currentPage === 0}
      >
        &lt;
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "string" ? (
          <span key={index} className="page-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        className="page-btn"
        onClick={() => goToNextPage()}
        disabled={currentPage + 1 >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
