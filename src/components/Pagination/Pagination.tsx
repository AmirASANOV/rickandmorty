import React from "react";
import s from "./Pagination.module.scss";

interface IPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.wrapper}>
      {pageNumbers.map((number, i) => (
        <button className={s.button} onClick={() => paginate(number)} key={i}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
