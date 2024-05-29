import { Link } from "react-router-dom";
import assets from "../assets";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../context/BasketContext";
const menuDB = [
  { name: "ХОЛОДНЫЕ РОЛЛЫ" },
  { name: "ЗАПЕЧЁННЫЕ РОЛЛЫ" },
  { name: "ЖАРЕННЫЕ РОЛЛЫ" },
  { name: "СЯКИ МАКИ" },
  { name: "ВОК" },
  { name: "ФАСТФУД" },
  { name: "НАПИТКИ" },
];
export const Header = () => {
  const { basket } = useContext(BasketContext);
  const [itemCount, setItemCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const calculateItemCount = () => {
    return basket.length;
  };

  useEffect(() => {
    setItemCount(calculateItemCount());
  }, [basket]);

  const handeShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="header_container">
        <button
          className="header_burger header_burger_btn"
          onClick={handeShowMenu}
        >
          <img src={assets.headerBurger} alt="header burder icon" />
        </button>
        <a href="/" className="header_logo">
          <img src={assets.headerLogo} alt="" />
        </a>
        <div className="header_search">
          <button>
            <img src={assets.headerSearch} alt="" />
          </button>
          <input type="search" placeholder="Введите название блюда" />
        </div>
        <a href="tel:+88005553535" className="header_phone">
          <img src={assets.headerPhone} alt="" />
          <span>8 (800) 555-35-35</span>
        </a>
        <div className="header_shop">
          <span>{itemCount}</span>
          <Link to="/cart" className="header_shop_icon">
            <img src={assets.headerShop} alt="" />
          </Link>
        </div>
        <div className={`header_menu ${showMenu ? "active" : ""}`}>
          <ul>
            {menuDB?.map((item, idx) => (
              <li key={idx}>
                <a href="#!">{item.name}</a>
              </li>
            ))}
          </ul>
          <div className="date">
            <span>Режим работы:</span>
            <p>
              Пн - Вс:
              <br />с <span>8.00</span> до <span>22.00</span>
            </p>
          </div>
          <a className="menu_phone" href="tel:+88005553535">
            <img src={assets.phoneMediaIcon} alt="" />
            <span>8 (800) 555-35-35</span>
          </a>
        </div>
      </div>
    </header>
  );
};
