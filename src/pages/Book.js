import classes from "./Book.module.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import booksContext from "../store/books-context";

const Book = () => {
  const params = useParams().bookId;
  const books = useContext(booksContext).items;
  const book = books.filter((book) => book.id === params)[0];
  return (
    <div className={classes.bg}>
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <img src={book.image} alt={book.name} />
        </div>
        <h2>{book.name}</h2>
        <span className={classes.title}>نویسنده :</span>
        <span> {book.author}</span>
        <br />
        <span className={classes.title}>ژانر : </span>
        <span>{book.title}</span>
        <br />
        <span className={classes.title}>تعداد صفحات : </span>
        <span>{book.pages}</span>
        <br />
        <span className={classes.title}>خلاصه کتاب :</span>
        <p>{book.summary}</p>
      </div>
    </div>
  );
};

export default Book;
