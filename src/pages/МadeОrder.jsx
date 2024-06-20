import { Link, useLocation } from "react-router-dom";
import assets from "../assets";
import { OrderList } from "../components";
import { useState } from "react";

export const МadeОrder = () => {
  const [showOrderList, setShowOrderList] = useState(false);
  const location = useLocation();
  // const { deliveryAddress } = location.state;

  const handleShowOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  return (
    <div className="madeorder_page information_page basket__page">
      <div className="parent_relative">
        <div className="top__box">
          <div className="title__box">
            <h1>ВАШ ЗАКАЗ ОФОРМЛЕН</h1>
          </div>
        </div>
        <img src={assets.topGradient} alt="" />
      </div>
      <div className="btns">
        <button className="blur__btn" onClick={handleShowOrderList}>
          Посмотреть заказ
        </button>
        {showOrderList && <OrderList />}
        <Link className="add__cart-btn" to="/products/Пицца">
          Назад к меню
        </Link>
      </div>
      <div className={`bottom_gradient ${showOrderList ? "show" : "hide"}`}>
        <img src={assets.gradientBig} alt="" />
      </div>
    </div>
  );
};
