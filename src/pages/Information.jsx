import { Link } from "react-router-dom";
import assets from "../assets";

export const Information = () => {
  return (
    <div className="information_page basket__page">
      <div className="parent_relative">
        <div className="top__box">
          <div className="title__box">
            <h1>ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ</h1>
            <Link className="blur__btn" to="/products">
              Назад к меню
            </Link>
          </div>
        </div>
        <img src={assets.topGradient} alt="" />
      </div>
      <div className="information_links">
        <Link>Условия оплаты, доставки</Link>
        <Link>Договор оферты</Link>
        <Link>Пользовательское соглашение</Link>
      </div>
      <div className="bottom_gradient">
        <img src={assets.gradientBig} alt="" />
      </div>
    </div>
  );
};
