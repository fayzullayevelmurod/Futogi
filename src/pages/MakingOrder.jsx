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

export const MakingOrder = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectCheckbox, setSelectCheckbox] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCheckboxChange = () => {
    setSelectCheckbox(!selectCheckbox);
  };

  return (
    <div className="making_order">
      <div className="parent_sidebar">
        <div className="top_gradient">
          <img src={assets.topGradient} alt="top gradient" />
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
                      checked={selectedOption === "delivery"}
                      onChange={() => handleOptionChange("delivery")}
                    />
                    <RadioItem
                      id="pickup"
                      name="deliveryMethod"
                      label="Самовывоз"
                      checked={selectedOption === "pickup"}
                      onChange={() => handleOptionChange("pickup")}
                    />
                    {selectedOption === "delivery" && (
                      <div className="top_child-form">
                        <FormItem
                          label="Населенный пункт, улица:"
                          type="text"
                          name="name"
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
                    {selectedOption === "pickup" && (
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
                    name="deliveryMethod2"
                    label="Как можно скорее"
                    checked={selectedOption === "delivery2"}
                    onChange={() => handleOptionChange("delivery2")}
                  />
                  <RadioItem
                    id="pickup2"
                    name="deliveryMethod2"
                    label="К точному времени"
                    checked={selectedOption === "pickup2"}
                    onChange={() => handleOptionChange("pickup2")}
                  />
                  {selectedOption === "delivery2" && (
                    <FormSection className="delivery_time">
                      <FormItem type="number" label="Укажите время доставки" />
                    </FormSection>
                  )}
                </form>
              </FormSection>

              {selectedOption === "pickup2" && (
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
                        checked={selectedOption === "cash"}
                        onChange={() => handleOptionChange("cash")}
                      />
                    </div>
                    {selectedOption === "cash" && (
                      <div className="check_form-box checked_box">
                        <CheckboxItem
                          id="noChange"
                          label="Без сдачи"
                          checked={selectCheckbox}
                          onChange={handleCheckboxChange}
                        />
                      </div>
                    )}
                    {!selectCheckbox && selectedOption !== "card" && (
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
                        checked={selectedOption === "card"}
                        onChange={() => handleOptionChange("card")}
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
            <OrderList />
          </div>
        </div>
      </div>
      <div className="bottom_gradient">
        <img src={assets.gradientBig} alt="top gradient" />
      </div>
    </div>
  );
};
