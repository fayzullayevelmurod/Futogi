import { Link } from "react-router-dom";
import assets from "../assets";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import { Search } from "../components";
const menuDB = [
  { name: "ХОЛОДНЫЕ РОЛЛЫ", link: '/products/Холодные%20роллы' },
  { name: "ЗАПЕЧЁННЫЕ РОЛЛЫ", link: '/products/Горячие%20роллы' },
  { name: "ЖАРЕННЫЕ РОЛЛЫ", link: '#!' },
  { name: "СЯКИ МАКИ", link: '/products/Сяке%20маки' },
  { name: "ВОК", link: '/products/WOK' },
  { name: "ФАСТФУД", link: '/products/Фаст%20Фуд' },
  { name: "НАПИТКИ", link: '/products/' },
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
          className={`header_burger header_burger_btn ${showMenu ? 'active' : ''}`}
          onClick={handeShowMenu}
        >
          <img src={assets.headerBurger} alt="header burder icon" />
        </button>
        <a href="/" className="header_logo">
          <img src={assets.headerLogo} alt="" />
        </a>
        <div className="header_search">
          <Search />
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
                <Link to={item.link}>{item.name}</Link>
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
            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0496 6.49975L7.52562 2.43204C7.11937 1.96329 6.37457 1.96537 5.9027 2.43829L3.00478 5.34141C2.14228 6.20495 1.89541 7.48725 2.39437 8.51537C5.37522 14.6872 10.3527 19.6717 16.5204 22.6612C17.5475 23.1602 18.8287 22.9133 19.6912 22.0497L22.6162 19.1195C23.0902 18.6456 23.0912 17.8966 22.6183 17.4904L18.535 13.9852C18.1079 13.6185 17.4444 13.6664 17.0162 14.0956L15.5954 15.5185C15.5227 15.5947 15.4269 15.645 15.3229 15.6615C15.2188 15.6781 15.1122 15.6601 15.0194 15.6102C12.6969 14.2728 10.7704 12.3437 9.43603 10.0195C9.38606 9.92657 9.36797 9.81978 9.38452 9.71553C9.40108 9.61129 9.45138 9.51536 9.5277 9.44245L10.9444 8.02475C11.3735 7.5935 11.4204 6.92787 11.0496 6.49975Z" stroke="#0E1018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>8 (800) 555-35-35</span>
          </a>
        </div>
      </div>
    </header>
  );
};
