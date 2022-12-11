import { useContext, useRef, useState } from "react";
import classes from "./Log.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { CircleLoader } from "react-spinners";

const Log = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errMessage, setErrMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rePasswordRef = useRef();
  const authctx = useContext(AuthContext);

  const loginChangeHandler = () => {
    setIsLogin((prev) => !prev);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passwordInputRef.current.value;
    const enteredRePass = !isLogin ? rePasswordRef.current.value : "";

    if (!isLogin && enteredPass !== enteredRePass) {
      setErrMessage("تکرار رمز عبور اشتباه است!");
      return;
    }
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqvC0orGpNhTlMMp-Q6UL46TxRoRj1_7w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqvC0orGpNhTlMMp-Q6UL46TxRoRj1_7w";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json((data) => {
            throw new Error();
          });
        }
      })
      .then((data) => {
        if (data.error) {
          switch (data.error.message) {
            case "EMAIL_NOT_FOUND":
              setErrMessage("ایمیل وارد شده اشتباه است!");
              break;
            case "INVALID_PASSWORD":
              setErrMessage("رمز عبور وارد شده اشتباه است!");
              break;
            case "EMAIL_EXISTS":
              setErrMessage("با ایمیل وارد شده قبلا ثبت نام شده است!");
          }
        } else {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authctx.login(data.idToken, expirationTime.toISOString());
          navigate("/");
        }
      });
  };
  return (
    <div className={classes.bg}>
      <div className={classes.container}>
        {isLogin && (
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="ایمیل خود را وارد نمایید..."
              ref={emailInputRef}
            />
            <input
              type="password"
              placeholder="رمز عبور خود را وارد نمایید..."
              ref={passwordInputRef}
            />
            <button type="submit">ورود</button>
            <button onClick={loginChangeHandler}>ثبت نام</button>
          </form>
        )}
        {!isLogin && (
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="ایمیل خود را وارد نمایید..."
              ref={emailInputRef}
            />

            <input
              type="password"
              placeholder="رمز عبور خود را وارد نمایید..."
              ref={passwordInputRef}
            />
            <input
              type="password"
              placeholder="رمز عبور خود را مجدد وارد نمایید..."
              ref={rePasswordRef}
            />
            <button type="submit">ثبت نام</button>
            <button onClick={loginChangeHandler}>ورود</button>
          </form>
        )}
        {errMessage && <p className={classes.error}>{errMessage}</p>}
        <CircleLoader
          color="black"
          loading={isLoading}
          cssOverride={{ display: "block", margin: "0 auto" }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Log;
