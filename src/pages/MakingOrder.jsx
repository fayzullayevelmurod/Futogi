// import { useState } from "react";
// import assets from "../assets";
// import { OrderList } from "../components";
// import {
//   Button,
//   CheckboxItem,
//   FormItem,
//   FormSection,
//   FormTextArea,
//   PromocodeInput,
//   RadioItem,
// } from "../components/Form";
// import { Link } from "react-router-dom";

// export const MakingOrder = () => {
//   const [deliveryMethod, setDeliveryMethod] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [noChange, setNoChange] = useState(false);
//   const [showOrderList, setShowOrderList] = useState(true);

//   const handleShowOrderList = () => {
//     setShowOrderList(!showOrderList);
//   };

//   const [selectedOption, setSelectedOption] = useState('Выберите время');
//   const [showOptions, setShowOptions] = useState(false);

//   const options = [
//     "22:00 - 22:30", "18:00 - 18:30", "18:00 - 18:30",
//     "18:00 - 18:30", "18:00 - 18:30", "18:00 - 18:30",
//     "18:00 - 18:30", "18:00 - 18:30", "22:00 - 23:00"
//   ];

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setShowOptions(false);
//   };

//   return (
//     <div className="making_order">
//       <div className="parent_sidebar">
//         <div className="title_box">
//           <h1 className="media_title title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
//           <div className="top_gradient">
//             <img src={assets.topGradient} alt="top gradient" />
//           </div>
//         </div>
//         <div className="sidebars">
//           <div className="left_box">
//             <div className="form_boxes">
//               <FormSection title="Персональные данные">
//                 <form className="form">
//                   <FormItem
//                     label="Номер телефона:"
//                     type="number"
//                     name="number"
//                   />
//                   <FormItem label="Ваше имя:" type="text" name="name" />
//                 </form>
//               </FormSection>
//               <FormSection title="Адрес получения">
//                 <form className="checked_box">
//                   <div className="form">
//                     <RadioItem
//                       id="delivery"
//                       name="deliveryMethod"
//                       label="Доставка"
//                       checked={deliveryMethod === "delivery"}
//                       onChange={() => setDeliveryMethod("delivery")}
//                     />
//                     <RadioItem
//                       id="pickup"
//                       name="deliveryMethod"
//                       label="Самовывоз"
//                       checked={deliveryMethod === "pickup"}
//                       onChange={() => setDeliveryMethod("pickup")}
//                     />
//                     {deliveryMethod === "delivery" && (
//                       <div className="top_child-form">
//                         <FormItem
//                           label="Населенный пункт, улица:"
//                           type="text"
//                           name="address"
//                           className="full"
//                         />
//                         <FormSection className="flex_box full">
//                           <FormItem label="Дом" type="text" className="house" />
//                           <FormItem
//                             label="Квартира/офис"
//                             type="text"
//                             className="kvartira"
//                           />
//                           <FormItem
//                             label="Этаж"
//                             type="number"
//                             className="etaj"
//                           />
//                         </FormSection>
//                       </div>
//                     )}
//                     {deliveryMethod === "pickup" && (
//                       <RadioItem
//                         id="vladimirAddress"
//                         label="г. Владимир, ул. Пушкина, д. 8"
//                         checked={true}
//                       />
//                     )}
//                   </div>
//                 </form>
//                 <Button className="add__cart-btn h-50" label="Подтвердить" />
//               </FormSection>
//               <FormSection>
//                 <div className="comments_box">
//                   <FormTextArea label="Комментарий курьеру:" />
//                 </div>
//               </FormSection>

//               <FormSection>
//                 <form className="form checked_box check_form-box">
//                   <RadioItem
//                     id="delivery2"
//                     name="deliveryTime"
//                     label="Как можно скорее"
//                     checked={deliveryTime === "delivery2"}
//                     onChange={() => setDeliveryTime("delivery2")}
//                   />
//                   <RadioItem
//                     id="pickup2"
//                     name="deliveryTime"
//                     label="К точному времени"
//                     checked={deliveryTime === "pickup2"}
//                     onChange={() => setDeliveryTime("pickup2")}
//                   />
//                   {deliveryTime === "pickup2" && (
//                     <FormSection className="delivery_time">
//                       <div className="form_item">
//                         <label className="form_label">Укажите время доставки</label>
//                         <div className="select__box">
//                           <input
//                             type="text"
//                             value={selectedOption}
//                             readOnly
//                             className="form_input select__input"
//                             onClick={() => setShowOptions(!showOptions)}
//                           />

//                           {showOptions && (
//                             <div className="option__box">
//                               {options.map((option, index) => (
//                                 <div
//                                   key={index}
//                                   className="option"
//                                   onClick={() => handleOptionClick(option)}
//                                 >
//                                   {option}
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </FormSection>
//                   )}
//                 </form>
//               </FormSection>

//               <div className="form_box promocode_box">
//                 <FormSection>
//                   <PromocodeInput />
//                 </FormSection>
//               </div>

//               <div className="payment_method">
//                 <FormSection title="Способ оплаты">
//                   <form className="check_form-box">
//                     <div className="checked_box">
//                       <RadioItem
//                         id="cash"
//                         name="paymentMethod"
//                         label="Оплата наличными при получении"
//                         checked={paymentMethod === "cash"}
//                         onChange={() => setPaymentMethod("cash")}
//                       />
//                     </div>
//                     {paymentMethod === "cash" && (
//                       <div className="check_form-box checked_box sm-radio">
//                         <CheckboxItem
//                           id="noChange"
//                           label="Без сдачи"
//                           checked={noChange}
//                           onChange={() => setNoChange(!noChange)}
//                         />
//                       </div>
//                     )}
//                     {!noChange && paymentMethod === "cash" && (
//                       <div className="ways_pay">
//                         <FormItem
//                           label="Укажите с какой суммы подготовить сдачу"
//                           type="number"
//                           placeholder="1000Р"
//                         />
//                         <div className="example_prices">
//                           <span>1000</span>
//                           <span>2000</span>
//                           <span>5000</span>
//                         </div>
//                       </div>
//                     )}
//                     <div className="checked_box">
//                       <RadioItem
//                         id="card"
//                         name="paymentMethod"
//                         label="Оплата картой при получении"
//                         checked={paymentMethod === "card"}
//                         onChange={() => setPaymentMethod("card")}
//                       />
//                     </div>
//                   </form>
//                 </FormSection>
//               </div>
//               <Button
//                 label="Оформить заказ"
//                 className="send_btn add__cart-btn"
//               />
//             </div>
//           </div>
//           <div className="right_box">
//             <button className="show_order" onClick={handleShowOrderList}>
//               Показать заказ
//             </button>
//             <div className="desktop_order-list">
//               <OrderList />
//             </div>
//             <div className={`media_order-list ${showOrderList ? "show" : ""}`}>
//               <OrderList />
//             </div>
//             <Link className="button send_btn add__cart-btn">
//               Оформить заказ
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="bottom_gradient">
//         <img src={assets.gradientBig} alt="top gradient" />
//       </div>
//     </div>
//   );
// };


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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const MakingOrder = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [noChange, setNoChange] = useState(false);
  const [showOrderList, setShowOrderList] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [changeAmount, setChangeAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState('Выберите время');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const options = [
    "22:00 - 22:30", "18:00 - 18:30", "18:00 - 18:30",
    "18:00 - 18:30", "18:00 - 18:30", "18:00 - 18:30",
    "18:00 - 18:30", "18:00 - 18:30", "22:00 - 23:00"
  ];


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleShowOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  const handleSubmitOrder = async () => {
    if (!phoneNumber || !userName) {
      toast.error('Пожалуйста, введите ваш номер телефона и имя.');
      return;
    }

    const orderData = {
      name: userName,
      lastName: userName,
      changeAmount: noChange ? 0 : parseFloat(changeAmount),
      phone: phoneNumber,
      time: selectedOption,
      nomenclature: ["example_product_id"],
      comment: comment,
      adress: deliveryMethod === "delivery" ? address : "г. Владимир, ул. Пушкина, д. 8",
      persons: 1,
      paymentType: paymentMethod,
      source: 1,
      promo: promoCode,
    };
    console.log(userName, 'mame');

    try {
      const response = await fetch('https://api.futoji.ru/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Order successfully created:', responseData);
        toast.success('Заказ успешно создан!');
        navigate("/order-success");
      } else {
        const errorData = await response.json();
        console.error('Error creating order:', errorData);
        toast.error('Произошла ошибка при создании заказа.');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Сетевая ошибка. Попробуйте еще раз.');
    }
  };


  return (
    <>
      <ToastContainer />
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
                      type="text"
                      name="number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormItem
                      label="Ваше имя:"
                      type="text"
                      name="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                    <FormTextArea
                      label="Комментарий курьеру:"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
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
                        <div className="form_item">
                          <label className="form_label">Укажите время доставки</label>
                          <div className="select__box">
                            <input
                              type="text"
                              value={selectedOption}
                              readOnly
                              className="form_input select__input"
                              onClick={() => setShowOptions(!showOptions)}
                            />

                            {showOptions && (
                              <div className="option__box">
                                {options.map((option, index) => (
                                  <div
                                    key={index}
                                    className="option"
                                    onClick={() => handleOptionClick(option)}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </FormSection>
                    )}
                  </form>
                </FormSection>

                <div className="form_box promocode_box">
                  <FormSection>
                    <PromocodeInput
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </FormSection>
                </div>

                <div className="payment_method">
                  <FormSection title="Способ оплаты">
                    <form className="check_form-box">
                      <div className="checked_box">
                        <RadioItem
                          id="cash"
                          name="paymentMethod"
                          value='Оплата наличными при получении'
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
                            value={changeAmount}
                            onChange={(e) => setChangeAmount(e.target.value)}
                          />
                          <div className="example_prices">
                            <span onClick={() => setChangeAmount("1000")}>1000</span>
                            <span onClick={() => setChangeAmount("2000")}>2000</span>
                            <span onClick={() => setChangeAmount("5000")}>5000</span>
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
                  onClick={() => console.log(handleSubmitOrder)}
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
              <Button label='Оформить заказ' className="button send_btn add__cart-btn" onClick={handleSubmitOrder} />
            </div>
          </div>
          <button> salom</button>
        </div>
        <div className="bottom_gradient">
          <img src={assets.gradientBig} alt="top gradient" />
        </div>
      </div>
    </>
  );
};