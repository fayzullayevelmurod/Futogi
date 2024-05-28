import { OrderList } from "../components";

export const MakingOrder = () => {
  return (
    <div className="making_order">
      <div className="sidebars">
        <div className="left_box">
          <div className="form_boxes">
            <div className="form_box">
              <h1 className="form_title">Персональные данные</h1>
              <form className="top_form">
                <div>
                  <label className="form_name">Номер телефона:</label>
                  <input className="form_input" type="number" name="number" />
                </div>
                <div>
                  <label className="form_name">Ваше имя:</label>
                  <input className="form_input" type="text" name="name" />
                </div>
              </form>
            </div>
            <div className="form_box">
              <h1 className="form_title">Адрес получения</h1>
              <form className="top_form">
                <div className="checked_box">
                  <input type="radio" id="one" name="one" />
                  <label htmlFor="one">Доставка</label>
                </div>
                <div className="checked_box">
                  <input checked type="radio" id="two" name="one" />
                  <label htmlFor="two">Самовывоз</label>
                </div>
              </form>
              <div className="checked_box location_box">
                <input checked type="radio" id="three" />
                <label htmlFor="three">г. Владимир, ул. Пушкина, д. 8</label>
              </div>
              <button className="add__cart-btn">Подвтердить</button>
            </div>
            <div className="form_box comments_box">
              <label className="form_name">Комментарий курьеру:</label>
              <textarea className="form_input"></textarea>
            </div>
            <div className="form_box check_form-box">
              <div className="checked_box">
                <input type="radio" id="five" name="five" />
                <label htmlFor="five">Доставка</label>
              </div>
              <div className="checked_box">
                <input checked type="radio" id="six" name="five" />
                <label htmlFor="six">Самовывоз</label>
              </div>
            </div>
            <div className="form_box promocode_box">
              <p>
                Введите <span>ПРОМОКОД:</span>
              </p>
              <input className="form_input" type="text" />
              <button className="add__cart-btn">Применить</button>
            </div>
            <div className="payment_method">
              <h1 className="form_title">Способ оплаты</h1>
              <div className="check_form-box">
                <div className="checked_box">
                  <input type="radio" id="seven" name="seven" />
                  <label htmlFor="seven">Оплата наличными при получении</label>
                </div>
                <div className="checked_box">
                  <input checked type="checkbox" id="eightt" name="seve" />
                  <label className="disabled" htmlFor="eightt">
                    Без сдачи
                  </label>
                </div>
                <div className="checked_box">
                  <input type="radio" id="eight" name="seven" />
                  <label htmlFor="eight">Оплата картой при получении</label>
                </div>
              </div>
            </div>
            <button className="send_btn add__cart-btn">Оформить заказ</button>
          </div>
        </div>
        <div className="right_box">
          <OrderList />
        </div>
      </div>
    </div>
  );
};
