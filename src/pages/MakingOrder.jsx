import { useState } from "react";
import assets from "../assets";
import { OrderList } from "../components";
import {
  Button,
  CheckboxItem,
  FormItem,
  FormSection,
  FormTextArea,
  PromocodeInput,
  RadioItem,
} from "../components/Form";
import { Link } from "react-router-dom";

export const MakingOrder = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [noChange, setNoChange] = useState(false);
  const [showOrderList, setShowOrderList] = useState(true);

  const handleShowOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  return (
    <div className="making_order">
      <div className="parent_sidebar">
        <div className="title_box">
          <h1 className="media_title title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
          <div className="top_gradient">
            <img src={assets.topGradient} alt="top gradient" />
          </div>
        </div>
        <div className="sidebars">
          <div className="left_box">
            <div className="form_boxes">
              <FormSection title="Персональные данные">
                <form className="form">
                  <FormItem
                    label="Номер телефона:"
                    type="number"
                    name="number"
                  />
                  <FormItem label="Ваше имя:" type="text" name="name" />
                </form>
              </FormSection>
              <FormSection title="Адрес получения">
                <form className="checked_box">
                  <div className="form">
                    <RadioItem
                      id="delivery"
                      name="deliveryMethod"
                      label="Доставка"
                      checked={deliveryMethod === "delivery"}
                      onChange={() => setDeliveryMethod("delivery")}
                    />
                    <RadioItem
                      id="pickup"
                      name="deliveryMethod"
                      label="Самовывоз"
                      checked={deliveryMethod === "pickup"}
                      onChange={() => setDeliveryMethod("pickup")}
                    />
                    {deliveryMethod === "delivery" && (
                      <div className="top_child-form">
                        <FormItem
                          label="Населенный пункт, улица:"
                          type="text"
                          name="address"
                          className="full"
                        />
                        <FormSection className="flex_box full">
                          <FormItem label="Дом" type="text" className="house" />
                          <FormItem
                            label="Квартира/офис"
                            type="text"
                            className="kvartira"
                          />
                          <FormItem
                            label="Этаж"
                            type="number"
                            className="etaj"
                          />
                        </FormSection>
                      </div>
                    )}
                    {deliveryMethod === "pickup" && (
                      <RadioItem
                        id="vladimirAddress"
                        label="г. Владимир, ул. Пушкина, д. 8"
                        checked={true}
                      />
                    )}
                  </div>
                </form>
                <Button className="add__cart-btn h-50" label="Подтвердить" />
              </FormSection>
              <FormSection>
                <div className="comments_box">
                  <FormTextArea label="Комментарий курьеру:" />
                </div>
              </FormSection>

              <FormSection>
                <form className="form checked_box check_form-box">
                  <RadioItem
                    id="delivery2"
                    name="deliveryTime"
                    label="Как можно скорее"
                    checked={deliveryTime === "delivery2"}
                    onChange={() => setDeliveryTime("delivery2")}
                  />
                  <RadioItem
                    id="pickup2"
                    name="deliveryTime"
                    label="К точному времени"
                    checked={deliveryTime === "pickup2"}
                    onChange={() => setDeliveryTime("pickup2")}
                  />
                  {deliveryTime === "pickup2" && (
                    <FormSection className="delivery_time">
                      <FormItem type="number" label="Укажите время доставки" />
                    </FormSection>
                  )}
                </form>
              </FormSection>

              {deliveryTime === "delivery2" && (
                <div className="form_box promocode_box">
                  <FormSection>
                    <PromocodeInput />
                  </FormSection>
                </div>
              )}

              <div className="payment_method">
                <FormSection title="Способ оплаты">
                  <form className="check_form-box">
                    <div className="checked_box">
                      <RadioItem
                        id="cash"
                        name="paymentMethod"
                        label="Оплата наличными при получении"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                      />
                    </div>
                    {paymentMethod === "cash" && (
                      <div className="check_form-box checked_box sm-radio">
                        <CheckboxItem
                          id="noChange"
                          label="Без сдачи"
                          checked={noChange}
                          onChange={() => setNoChange(!noChange)}
                        />
                      </div>
                    )}
                    {!noChange && paymentMethod === "cash" && (
                      <div className="ways_pay">
                        <FormItem
                          label="Укажите с какой суммы подготовить сдачу"
                          type="number"
                          placeholder="1000Р"
                        />
                        <div className="example_prices">
                          <span>1000</span>
                          <span>2000</span>
                          <span>5000</span>
                        </div>
                      </div>
                    )}
                    <div className="checked_box">
                      <RadioItem
                        id="card"
                        name="paymentMethod"
                        label="Оплата картой при получении"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                    </div>
                  </form>
                </FormSection>
              </div>
              <Button
                label="Оформить заказ"
                className="send_btn add__cart-btn"
              />
            </div>
          </div>
          <div className="right_box">
            <button className="show_order" onClick={handleShowOrderList}>
              Показать заказ
            </button>
            <div className="desktop_order-list">
              <OrderList />
            </div>
            <div className={`media_order-list ${showOrderList ? "show" : ""}`}>
              <OrderList />
            </div>
            <Link className="button send_btn add__cart-btn">
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom_gradient">
        <img src={assets.gradientBig} alt="top gradient" />
      </div>
    </div>
  );
};
