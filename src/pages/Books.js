import { useContext } from "react";
import booksContext from "../store/books-context";
import Pageination from "../components/Pageination";
import { CircleLoader } from "react-spinners";
import { Fragment } from "react";

const Books = () => {
  const books = useContext(booksContext);
  return (
    <Fragment>
      {books.items.length > 0 ? (
        <>
          <Pageination
            data={books.items}
            RenderComponent={Books}
            title="Books"
            pageLimit={Math.ceil(books.items.length / 8)}
            dataLimit={8}
          />
        </>
      ) : (
        <CircleLoader
          color="black"
          loading={books}
          cssOverride={{ display: "block", margin: "0 auto" }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </Fragment>
  );
};

export default Books;
