import { Link } from "react-router-dom";
import assets from "../assets";

export const Cart = () => {
  return (
    <>
      <div className="basket__page">
        <div className="top__box">
          <div className="title__box">
            <h1>КОРЗИНА</h1>
            <Link className="blur__btn" to="/rolls">Назад к меню</Link>
          </div>
          <img src={assets.topGradient} alt="" />
        </div>
      </div>
    </>
  );
};
