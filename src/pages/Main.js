import classes from "./Main.module.css";
import { Link } from "react-router-dom";
import img1 from "../assets/9080717045301963.jpg";
import img2 from "../assets/1-min-1-2-3-4.jpg";
import img3 from "../assets/3ebe81d0c5ad9b687ffa4a8515678d7dd59b9ad4_1603886505.jpg";
import img4 from "../assets/3397925537325462.jpg";
import img5 from "../assets/مهره-حیاتی-1-min.jpg";

const Main = () => {
  const token = localStorage.getItem("token");
  return (
    <div className={classes.container}>
      <h1>کتاب، بزرگ‌ترین اختراع بشر است</h1>
      <p> اشتراک بهترین کتاب هایی که خوانده ایم برای تقسیم لذت کتابخوانی!</p>
      {token ? (
        <p className={classes.wellcome}>خوش آمدید</p>
      ) : (
        <Link to="/login" className={classes.btn}>
          {" "}
          به ما بپیوندید
        </Link>
      )}
      <div className={classes.cards}>
        <div className={`${classes.card1} ${classes.card}`}>
          <div className={classes.header}>
            <img src={img1} />
            <span>اثر مرکب</span>
          </div>
          <div className={classes.body}>
            <span> نویسنده: </span>
            <span>دارن هاردی</span>
          </div>
        </div>
        <div className={`${classes.card2} ${classes.card}`}>
          <div className={classes.header}>
            <img src={img2} />
            <span>ذهن حواس جمع</span>
          </div>
          <div className={classes.body}>
            <span> نویسنده: </span>
            <span>نیر ایال</span>
          </div>
        </div>
        <div className={`${classes.card3} ${classes.card}`}>
          <div className={classes.header}>
            <img src={img3} />
            <span>توپ های ماه اوت</span>
          </div>
          <div className={classes.body}>
            <span> نویسنده: </span>
            <span>باربارا تاکمن</span>
          </div>
        </div>
        <div className={`${classes.card4} ${classes.card}`}>
          <div className={classes.header}>
            <img src={img4} />
            <span>مرداب روح</span>
          </div>
          <div className={classes.body}>
            <span> نویسنده: </span>
            <span>جیمز هالیس</span>
          </div>
        </div>
        <div className={`${classes.card5} ${classes.card}`}>
          <div className={classes.header}>
            <img src={img5} />
            <span>مهره ی حیاتی</span>
          </div>
          <div className={classes.body}>
            <span> نویسنده: </span>
            <span>ست گادین</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
