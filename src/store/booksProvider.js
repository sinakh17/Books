import booksContext from "./books-context";
import { useEffect, useState } from "react";
const BooksProvider = (props) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const resolve = await fetch(
        "https://books-84b61-default-rtdb.firebaseio.com/books.json"
      );
      const data = await resolve.json();
      const loadedBooks = [];
      for (const key in data) {
        loadedBooks.push({
          id: key,
          name: data[key].name,
          author: data[key].author,
          pages: data[key].pages,
          title: data[key].title,
          image: data[key].image,
          summary: data[key].summary,
        });
      }
      setBooks(loadedBooks);
    };
    fetchBooks();
  }, []);
  const BooksContext = {
    items: books,
  };

  return (
    <booksContext.Provider value={BooksContext}>
      {props.children}
    </booksContext.Provider>
  );
};

export default BooksProvider;
