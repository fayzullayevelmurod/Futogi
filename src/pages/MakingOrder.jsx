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
                  <input className="form_input" type="tel" name="number" />
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
          </div>
        </div>
        <div className="right_box"></div>
      </div>
    </div>
  );
};
