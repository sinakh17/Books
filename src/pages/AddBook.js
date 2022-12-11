import { useRef, useState } from "react";
import classes from "./AddBook.module.css";
import { CircleLoader } from "react-spinners";

const AddBook = () => {
  const nameInputRef = useRef();
  const authorInputRef = useRef();
  const titleInputRef = useRef();
  const pagesInputRef = useRef();
  const summaryInputRef = useRef();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredPages = pagesInputRef.current.value;
    const enteredSummary = summaryInputRef.current.value;
    const recBook = {
      name: enteredName,
      author: enteredAuthor,
      title: enteredTitle,
      pages: enteredPages,
      summary: enteredSummary,
    };
    setIsLoading(true);

    const response = await fetch(
      "https://books-84b61-default-rtdb.firebaseio.com/recomend.json",
      {
        method: "POST",
        body: JSON.stringify(recBook),
        headers: { "content-type": "application/json" },
      }
    );
    setIsLoading(false);
    if (response.ok) {
      const data = await response.json();
      setMessage(
        <p className={classes.success}>
          تشکر از مشارکت شما. کتاب پیشنهادی شما پس از تایید تیم پشتیبانی به لیست
          کتاب ها اضافه خواهد شد!
        </p>
      );
    } else {
      setMessage(
        <p className={classes.error}>
          خطایی رخ داده است. لطفا دوباره تلاش کنید!
        </p>
      );
    }
  };
  return (
    <div className={classes.bg}>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="نام کتاب را وارد کنید..."
            ref={nameInputRef}
          />
          <input
            type="text"
            placeholder="نام نویسنده را وارد کنید..."
            ref={authorInputRef}
          />
          <input
            type="text"
            placeholder="ژانر کتاب را وارد کنید..."
            ref={titleInputRef}
          />
          <input
            type="number"
            placeholder="تعداد صفحات کتاب را وارد کنید..."
            ref={pagesInputRef}
          />
          <input
            type="text"
            placeholder="خلاصه کتاب را وارد کنید..."
            ref={summaryInputRef}
          />
          <button type="submit">اضافه کن</button>
        </form>
        <CircleLoader
          color="black"
          loading={isLoading}
          cssOverride={{ display: "block", margin: "0 auto" }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {message && message}
      </div>
    </div>
  );
};

export default AddBook;
