import classes from "./App.module.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Main from "./pages/Main";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Log from "./pages/Log";
import AddBook from "./pages/AddBook";
import BooksProvider from "./store/booksProvider";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import Sidebar from "./components/sidebar";

function App() {
  const authctx = useContext(AuthContext);
  const isMobile = window.innerWidth < 600;

  return (
    <BooksProvider>
      <div className={classes.container} id="outer-container">
        {isMobile && (
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            right
          />
        )}
        {!isMobile && <Navigation />}
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/main" replace id="page-wrap" />}
          />
          <Route path="/main" element={<Main />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:bookId" element={<Book />} />
          {!authctx.isLoggedIn && <Route path="/login" element={<Log />} />}
          {authctx.isLoggedIn && <Route path="/add" element={<AddBook />} />}
        </Routes>
      </div>
    </BooksProvider>
  );
}

export default App;
