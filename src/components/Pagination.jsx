// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center space-x-2">
      <button
        className="rounded-md border border-slate-300 py-2 px-3 transition-all shadow-sm hover:shadow-lg text-slate-600 hover:bg-slate-800 hover:text-white"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`rounded-md border border-slate-300 py-2 px-3 transition-all shadow-sm ${
            currentPage === index + 1
              ? "bg-slate-800 text-white"
              : "text-slate-600 hover:bg-slate-800 hover:text-white"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="rounded-md border border-slate-300 py-2 px-3 transition-all shadow-sm hover:shadow-lg text-slate-600 hover:bg-slate-800 hover:text-white"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
