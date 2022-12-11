import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const Navigation = (props) => {
  const authctx = useContext(AuthContext);
  const exitHandler = () => {
    authctx.logout();
    props.onclose();
  };
  return (
    <div className={classes.container}>
      <ul>
        <li>
          <NavLink
            to="/main"
            onClick={props.onclose}
            className={(navData) =>
              navData.isActive ? `${classes.active}` : ""
            }
          >
            صفحه اصلی
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            onClick={props.onclose}
            className={(navData) =>
              navData.isActive ? `${classes.active}` : ""
            }
          >
            کتاب ها
          </NavLink>
        </li>
        {!authctx.isLoggedIn && (
          <li>
            <NavLink
              to="/login"
              onClick={props.onclose}
              className={(navData) =>
                navData.isActive ? `${classes.active}` : ""
              }
            >
              ورود / ثبت نام
            </NavLink>
          </li>
        )}
        {authctx.isLoggedIn && (
          <li>
            <NavLink
              to="/add"
              onClick={props.onclose}
              className={(navData) =>
                navData.isActive ? `${classes.active}` : ""
              }
            >
              افزودن کتاب
            </NavLink>
          </li>
        )}
        {authctx.isLoggedIn && (
          <li>
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive ? `${classes.active}` : ""
              }
              onClick={exitHandler}
            >
              خروج
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
