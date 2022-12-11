import { Fragment, useState } from "react";
import classes from "./Pageination.module.css";
import { Link } from "react-router-dom";

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        {getPaginatedData().map((book, index) => {
          return (
            <Link to={`/book/${book.id}`} className={classes.book} key={index}>
              <img src={book.image} alt={book.name} />
              <div className={classes.body}>
                <h3>{book.name}</h3>
                <p>
                  {book.summary.length > 150
                    ? book.summary.substring(0, 149) + "..."
                    : book.summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={classes.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${classes.prev} ${
            currentPage === 1 ? classes.disabled : ""
          }`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`${classes.paginationItem} ${
              currentPage === item ? classes.active : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`${classes.next} ${
            currentPage === pages || currentPage === pageLimit
              ? classes.disabled
              : ""
          }`}
        >
          next
        </button>
      </div>
    </Fragment>
  );
}
export default Pagination;
