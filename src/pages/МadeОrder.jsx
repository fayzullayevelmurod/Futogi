import { Link } from "react-router-dom";
import assets from "../assets";
import { OrderList } from "../components";
import { useState } from "react";

export const МadeОrder = () => {
  const [showOrderList, setShowOrderList] = useState(false);

  const handleShowOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  return (
    <div className="madeorder_page basket__page">
      <div className="top__box">
        <div className="title__box">
          <h1>ВАШ ЗАКАЗ ОФОРМЛЕН</h1>
        </div>
        <img src={assets.topGradient} alt="top gradient" />
      </div>
      <div className="btns">
        <button className="blur__btn" onClick={handleShowOrderList}>
          Посмотреть заказ
        </button>
        {showOrderList && <OrderList />}
        <Link className="add__cart-btn" to="/products">
          Назад к меню
        </Link>
      </div>
      <div className="bottom_gradient">
        <img src={assets.gradientBig} alt="" />
      </div>
    </div>
  );
};
