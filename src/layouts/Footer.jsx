import assets from "../assets";

export const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_logo_block">
            <a className="footer_logo" href="/">
              <img src={assets.footerLogoDesktop} alt="" />
            </a>
            <div className="footer_about">
              <h6>О нас</h6>
              <p>
                Футоджи - ресторан восточной кухни с доставкой по Владимирской
                области. А дальше вставьте свой текст о вашей прекрасной
                компании с прекрасным дизайном сайта.
              </p>
            </div>
          </div>
          <ul className="footer_link">
            <li>
              <h6>Покупателям</h6>
            </li>
            <li>
              <a href="#">Меню</a>
            </li>
            <li>
              <a href="#">Акции</a>
            </li>
            <li>
              <a href="#">Новости</a>
            </li>
          </ul>
          <div className="footer_block">
            <h6>Информация</h6>
            <span>Режим работы:</span>
            <h5>
              Пн - Вс: <br />с <span>8.00</span> до <span>22.00</span>
            </h5>
            <span>Адрес заведения:</span>
            <address>
              г. Лакинск, ул.
              <br /> Парижской Комунны,
              <br /> д. 24
            </address>
          </div>
          <div className="footer_block footer_block_end">
            <p>
              Доставка <span>во Владимире</span>
            </p>
            <a href="tel:+88005553535">8 (800) 555-35-35</a>
            <ul className="social_media">
              <li>
                <a href="#">
                  <img src={assets.mapIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={assets.telegramIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={assets.vkIcon} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a className="policy_link" href="#">
          Юридическая информация
        </a>
        <div className="footer_media">
          <a className="footer_media_logo" href="/">
            <img src={assets.footerMediaLogo} alt="" />
          </a>
          <div className="footer_media_block">
            <p>
              Доставка <span>во Владимире</span>
            </p>
            <a href="tel:+88005553535">8 (800) 555-35-35</a>
            <ul className="social_media">
              <li>
                <a href="#">
                  <img src={assets.mapIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={assets.telegramIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={assets.vkIcon} alt="" />
                </a>
              </li>
            </ul>
          </div>
          <button className="list_btn footer_link_btn_one">
            <span>Информация</span>
            <img src={assets.downIcon} alt="" />
          </button>
          <div className="list_links list_links_one">
            <span>Режим работы:</span>
            <p>
              Пн - Вс:
              <br /> с <span>8.00</span> до <span>22.00</span>
            </p>
          </div>
          <button className="list_btn footer_link_btn_two">
            <span>Покупателям</span>
            <img src={assets.downIcon} alt="" />
          </button>
          <ul className="list_links list_links_two">
            <li className="one_link">
              <a href="#">Меню</a>
            </li>
            <li>
              <a href="#">Акции</a>
            </li>
            <li>
              <a href="#">Новости</a>
            </li>
          </ul>
          <a className="footer_media_policy_link" href="#">
            Юридическая информация
          </a>
        </div>
      </div>
      <ul className="footer_bottom">
        <div className="footer_container">
          <li>
            <a href="#">
              <img src={assets.footerLogo1} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
						<img src={assets.footerLogo2} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
						<img src={assets.footerLogo3} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
						<img src={assets.footerLogo4} alt="" />
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
};
