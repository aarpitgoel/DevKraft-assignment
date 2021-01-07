import React, { useEffect, useState, useMemo } from "react";
import Paginate from "react-bootstrap/Pagination";
import "./styles.css";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Paginate.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Paginate.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage === 1) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === Math.ceil(total / itemsPerPage)) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  return (
    <Paginate>
      <Paginate.Prev onClick={handlePrev} disabled={currentPage === 1} />
      {paginationItems}

      <Paginate.Next
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </Paginate>
  );
};

export default PaginationComponent;
