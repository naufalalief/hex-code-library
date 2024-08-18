import React from "react";

function Pagination({ currentPage, totalPages, onPageChange, onNext, onPrev }) {
  return (
    <div className="pagination flex justify-center items-center mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <input
        type="number"
        value={currentPage}
        onChange={(e) => onPageChange(parseInt(e.target.value, 10))}
        className="mx-4 px-2 py-1 border rounded text-center w-max"
        min="1"
        max={totalPages}
      />
      <span>/ {totalPages}</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
