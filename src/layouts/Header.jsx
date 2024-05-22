import assets from "../assets";

export const Header = () => {
  return (
    <header>
      <div className="header_container">
        <button className="header_burger header_burger_btn">
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
          <span>10</span>
          <a href="#" className="header_shop_icon">
            <img src={assets.headerShop} alt="" />
          </a>
        </div>
        <div className="header_menu">
          <ul>
            <li>
              <a href="#!">ХОЛОДНЫЕ РОЛЛЫ</a>
            </li>
            <li>
              <a href="#!">ЗАПЕЧЁННЫЕ РОЛЛЫ</a>
            </li>
            <li>
              <a href="#!">ЖАРЕННЫЕ РОЛЛЫ</a>
            </li>
            <li>
              <a href="#!">СЯКИ МАКИ</a>
            </li>
            <li>
              <a href="#!">ВОК</a>
            </li>
            <li>
              <a href="#!">ПИЦЦА</a>
            </li>
            <li>
              <a href="#!">ФАСТФУД</a>
            </li>
            <li>
              <a href="#!">НАПИТКИ</a>
            </li>
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