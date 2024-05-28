import { OrderList } from "../components";
import { Button, CheckboxItem, FormItem, FormSection, FormTextArea, PromocodeInput, RadioItem } from "../components/Form";

export const MakingOrder = () => {
  return (
    <div className="making_order">
      <div className="sidebars">
        <div className="left_box">
          <div className="form_boxes">
            <FormSection title="Персональные данные">
              <form className="form">
                <FormItem label="Номер телефона:" type="number" name="number" />
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
                  />
                  <RadioItem
                    id="pickup"
                    name="deliveryMethod"
                    label="Самовывоз"
                  />
                  <RadioItem
                    id="vladimirAddress"
                    label="г. Владимир, ул. Пушкина, д. 8"
                  />
                </div>
              </form>
              <Button className="add__cart-btn" label="Подтвердить" />
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
                />
                <RadioItem
                  id="pickup2"
                  name="deliveryMethod2"
                  label="К точному времени"
                  checked
                />
              </form>
            </FormSection>

            <div className="form_box promocode_box">
              <FormSection>
                <PromocodeInput />
              </FormSection>
            </div>
            <div className="payment_method">
              <FormSection title="Способ оплаты">
                <form className="check_form-box">
                  <div className="checked_box">
                    <RadioItem
                      id="cash"
                      name="paymentMethod"
                      label="Оплата наличными при получении"
                    />
                  </div>
                  <div className="checked_box">
                    <CheckboxItem id="noChange" label="Без сдачи" />
                  </div>
                  <div className="checked_box">
                    <RadioItem
                      id="card"
                      name="paymentMethod"
                      label="Оплата картой при получении"
                    />
                  </div>
                </form>
              </FormSection>
            </div>
            <Button label="Оформить заказ" className="send_btn add__cart-btn" />
          </div>
        </div>
        <div className="right_box">
          <OrderList />
        </div>
      </div>
    </div>
  );
};


