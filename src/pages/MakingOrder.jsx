// import React, { useState, useContext } from "react";
// import assets from "../assets";
// import { OrderList } from "../components";
// import {
//   Button,
//   CheckboxItem,
//   FormItem,
//   FormSection,
//   FormTextArea,
//   PhoneInput,
//   PromocodeInput,
//   RadioItem,
//   RadioItem2,
// } from "../components/Form";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BasketContext } from "../context/BasketContext";
// import { useLocation, useNavigate } from "react-router-dom";

// // Telefon raqamining tekshirilishi
// const isValidPhoneNumber = (phoneNumber) =>
//   phoneNumber && phoneNumber.length > 0;

// // Foydalanuvchi ismi uchun tekshirilishi
// const isValidUserName = (userName) => userName && userName.length > 0;

// // Yetkazib berish uchun manzil tekshirilishi
// const isValidAddress = (deliveryMethod, address, house, kvartira, etaj) =>
//   deliveryMethod !== "delivery" || (address && house && kvartira && etaj);

// // Yetkazib berish vaqti tekshirilishi
// const isValidDeliveryTime = (deliveryTime, selectedOption, options) =>
//   deliveryTime !== "pickup2" || options.includes(selectedOption);

// // Vaqt diapazonini vaqtga o'girish
// const convertTimeRangeToTime = (timeRange) => {
//   const [startTime] = timeRange.split(" - ");
//   return `${startTime}:00`;
// };

// export const MakingOrder = () => {
//   // Komponentdagi holatlar va ma'lumotlar
//   const [deliveryMethod, setDeliveryMethod] = useState("");
//   const [deliveryTime, setDeliveryTime] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [noChange, setNoChange] = useState(false);
//   const [showOrderList, setShowOrderList] = useState(true);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [userName, setUserName] = useState("");
//   const [address, setAddress] = useState("");
//   const [house, setHouse] = useState("");
//   const [kvartira, setKvartira] = useState("");
//   const [etaj, setEtaj] = useState("");
//   const [comment, setComment] = useState("");
//   const [promoCode, setPromoCode] = useState("");
//   const [changeAmount, setChangeAmount] = useState("");
//   const [selectedOption, setSelectedOption] = useState("Выберите время");
//   const [showOptions, setShowOptions] = useState(false);
//   const { basket } = useContext(BasketContext);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const { personCount } = location.state;
//   const navigate = useNavigate();

//   // Yetkazib berish vaqtlari
//   const options = [
//     "18:00 - 18:30",
//     "18:30 - 19:00",
//     "19:00 - 19:30",
//     "19:30 - 20:00",
//     "20:00 - 20:30",
//     "20:30 - 21:00",
//     "21:00 - 21:30",
//     "21:30 - 22:00",
//   ];

//   // Vaqt diapazonini tanlash
//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setShowOptions(false);
//   };

//   // Buyurtma ro'yxatini ko'rsatish
//   const handleShowOrderList = () => {
//     setShowOrderList(!showOrderList);
//   };

//   // Ma'lumotlarni tekshirish
//   const handleValidation = () => {
//     if (!isValidPhoneNumber(phoneNumber)) {
//       toast.error("Пожалуйста, введите ваш номер телефона.");
//       document.querySelector(".number-input").focus();
//       return false;
//     }
//     if (!isValidUserName(userName)) {
//       toast.error("Пожалуйста, введите ваше имя.");
//       document.querySelector("input[name='name']").focus();
//       return false;
//     }
//     if (!isValidAddress(deliveryMethod, address, house, kvartira, etaj)) {
//       toast.error("Пожалуйста, введите полный адрес.");
//       if (!address) document.querySelector("input[name='address']").focus();
//       else if (!house) document.querySelector(".house").focus();
//       else if (!kvartira) document.querySelector(".kvartira").focus();
//       else if (!etaj) document.querySelector(".etaj").focus();
//       return false;
//     }
//     if (!isValidDeliveryTime(deliveryTime, selectedOption, options)) {
//       toast.error("Выберите допустимое время.");
//       return false;
//     }
//     return true;
//   };

//   // Umumiy narxni hisoblash
//   const calculateTotalPrice = () => {
//     return basket.reduce((total, item) => {
//       const itemTotal = item.price * item.count;
//       const modsTotal = item.mods
//         ? item.mods.reduce((sum, mod) => sum + mod.price * (mod.count || 1), 0)
//         : 0;
//       return total + itemTotal + modsTotal;
//     }, 0);
//   };

//   // Buyurtmani yuborish
//   const handleSubmitOrder = async () => {
//     setLoading(true);

//     if (!handleValidation()) {
//       setLoading(false);
//       return;
//     }

//     const fullAddress =
//       deliveryMethod === "delivery"
//         ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
//         : "г. Владимир, ул. Пушкина, д. 8";

//     const totalPrice = calculateTotalPrice();

//     if (changeAmount && changeAmount < totalPrice) {
//       toast.error(`Сумма не может быть меньше ${totalPrice} штук.`);
//       setLoading(false);
//       return;
//     }

//     const nomenclature = basket.map((item) => ({
//       id: item.id,
//       count: item.count,
//       modifiers: item.mods
//         ? item.mods.map((mod) => ({
//             id: mod.id,
//             count: mod.count || 1,
//           }))
//         : [],
//     }));

//     const orderTime =
//       deliveryTime === "pickup2"
//         ? convertTimeRangeToTime(selectedOption)
//         : "now";

//     const orderData = {
//       name: userName,
//       lastName: userName,
//       adress: fullAddress,
//       paymentType: paymentMethod,
//       persons: personCount,
//       phone: phoneNumber,
//       nomenclature,
//       time: orderTime,
//       source: 1,
//       comment: comment,
//       promo: promoCode,
//     };

//     try {
//       const response = await fetch("https://api.futoji.ru/orders/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Order successfully created:", responseData);
//         toast.success("Заказ успешно создан!");

//         localStorage.setItem("orderData", JSON.stringify(responseData));
//         navigate("/made-order", {
//           state: { deliveryAddress: fullAddress },
//         });
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData?.detail?.error?.message);
//       }
//     } catch (error) {
//       toast.error("Сетевая ошибка. Попробуйте еще раз.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className="making_order">
//         <div className="parent_sidebar">
//           <div className="title_box">
//             <h1 className="media_title title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
//             <div className="top_gradient">
//               <img src={assets.topGradient} alt="top gradient" />
//             </div>
//           </div>
//           <div className="sidebars">
//             <div className="left_box">
//               <div className="form_boxes">
//                 <FormSection title="Персональные данные">
//                   <form className="form first-form">
//                     <div className="form_item">
//                       <label className="form_label">Номер телефона:</label>
//                       <PhoneInput
//                         value={phoneNumber}
//                         onChange={setPhoneNumber}
//                         placeholder="+7 (___) ___-__-__"
//                       />
//                     </div>
//                     <FormItem
//                       label="Ваше имя:"
//                       type="text"
//                       name="name"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                     />
//                   </form>
//                 </FormSection>
//                 <FormSection title="Адрес получения">
//                   <form className="checked_box">
//                     <div className="form">
//                       <RadioItem
//                         id="delivery"
//                         name="deliveryMethod"
//                         label="Доставка"
//                         checked={deliveryMethod === "delivery"}
//                         onChange={() => setDeliveryMethod("delivery")}
//                       />
//                       <RadioItem
//                         id="pickup"
//                         name="deliveryMethod"
//                         label="Самовывоз"
//                         checked={deliveryMethod === "pickup"}
//                         onChange={() => setDeliveryMethod("pickup")}
//                       />
//                       {deliveryMethod === "delivery" && (
//                         <div className="top_child-form">
//                           <FormItem
//                             label="Населенный пункт, улица:"
//                             type="text"
//                             name="address"
//                             className="full"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                           />
//                           <FormSection className="flex_box full">
//                             <FormItem
//                               label="Дом"
//                               type="text"
//                               className="house"
//                               value={house}
//                               onChange={(e) => setHouse(e.target.value)}
//                             />
//                             <FormItem
//                               label="Квартира/офис"
//                               type="text"
//                               className="kvartira"
//                               value={kvartira}
//                               onChange={(e) => setKvartira(e.target.value)}
//                             />
//                             <FormItem
//                               label="Этаж"
//                               type="number"
//                               className="etaj"
//                               value={etaj}
//                               onChange={(e) => setEtaj(e.target.value)}
//                             />
//                           </FormSection>
//                         </div>
//                       )}
//                       {deliveryMethod === "pickup" && (
//                         <RadioItem2
//                           id="vladimirAddress"
//                           label="г. Владимир, ул. Пушкина, д. 8"
//                           checked={true}
//                         />
//                       )}
//                     </div>
//                   </form>
//                   <Button className="add__cart-btn h-50" label="Подтвердить" />
//                 </FormSection>
//                 <FormSection>
//                   <div className="comments_box">
//                     <FormTextArea
//                       label="Комментарий курьеру:"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     />
//                   </div>
//                 </FormSection>
//                 <FormSection>
//                   <form className="form checked_box check_form-box">
//                     <RadioItem
//                       id="delivery2"
//                       name="deliveryTime"
//                       label="Как можно скорее"
//                       checked={deliveryTime === "delivery2"}
//                       onChange={() => setDeliveryTime("delivery2")}
//                     />
//                     <RadioItem
//                       id="pickup2"
//                       name="deliveryTime"
//                       label="К точному времени"
//                       checked={deliveryTime === "pickup2"}
//                       onChange={() => setDeliveryTime("pickup2")}
//                     />
//                     {deliveryTime === "pickup2" && (
//                       <FormSection className="delivery_time">
//                         <div className="form_item">
//                           <label className="form_label">
//                             Укажите время доставки
//                           </label>
//                           <div className="select__box">
//                             <input
//                               type="text"
//                               value={selectedOption}
//                               readOnly
//                               className="form_input select__input"
//                               onClick={() => setShowOptions(!showOptions)}
//                             />
//                             {showOptions && (
//                               <div className="option__box">
//                                 {options.map((option, index) => (
//                                   <div
//                                     key={index}
//                                     className="option"
//                                     onClick={() => handleOptionClick(option)}
//                                   >
//                                     {option}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </FormSection>
//                     )}
//                   </form>
//                 </FormSection>
//                 <div className="form_box promocode_box">
//                   <FormSection>
//                     <PromocodeInput
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                     />
//                   </FormSection>
//                 </div>
//                 <div className="payment_method">
//                   <FormSection title="Способ оплаты">
//                     <form className="check_form-box">
//                       <div className="checked_box">
//                         <RadioItem
//                           id="cash"
//                           name="paymentMethod"
//                           label="Оплата наличными при получении"
//                           checked={paymentMethod === "cash"}
//                           onChange={() => setPaymentMethod("cash")}
//                         />
//                       </div>
//                       {paymentMethod === "cash" && (
//                         <div className="check_form-box checked_box sm-radio">
//                           <CheckboxItem
//                             id="noChange"
//                             label="Без сдачи"
//                             checked={noChange}
//                             onChange={() => setNoChange(!noChange)}
//                           />
//                         </div>
//                       )}
//                       {!noChange && paymentMethod === "cash" && (
//                         <div className="ways_pay">
//                           <FormItem
//                             label="Укажите с какой суммы подготовить сдачу"
//                             type="number"
//                             placeholder="1000Р"
//                             value={changeAmount}
//                             onChange={(e) => setChangeAmount(e.target.value)}
//                           />
//                           <div className="example_prices">
//                             <span onClick={() => setChangeAmount("1000")}>
//                               1000
//                             </span>
//                             <span onClick={() => setChangeAmount("2000")}>
//                               2000
//                             </span>
//                             <span onClick={() => setChangeAmount("5000")}>
//                               5000
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                       <div className="checked_box">
//                         <RadioItem
//                           id="card"
//                           name="paymentMethod"
//                           label="Оплата картой при получении"
//                           checked={paymentMethod === "card"}
//                           onChange={() => setPaymentMethod("card")}
//                         />
//                       </div>
//                     </form>
//                   </FormSection>
//                 </div>
//                 <Button
//                   label={`${loading ? "Загрузка..." : "Оформить заказ"}`}
//                   className="send_btn add__cart-btn"
//                   onClick={handleSubmitOrder}
//                 />
//               </div>
//             </div>
//             <div className="right_box">
//               <button className="show_order" onClick={handleShowOrderList}>
//                 Показать заказ
//               </button>
//               <div className="desktop_order-list">
//                 <OrderList
//                   deliveryAddress={
//                     deliveryMethod === "delivery"
//                       ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
//                       : "г. Владимир, ул. Пушкина, д. 8"
//                   }
//                 />
//               </div>
//               <div
//                 className={`media_order-list ${showOrderList ? "show" : ""}`}
//               >
//                 <OrderList
//                   deliveryAddress={
//                     deliveryMethod === "delivery"
//                       ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
//                       : "г. Владимир, ул. Пушкина, д. 8"
//                   }
//                 />
//               </div>
//               <Button
//                 label={`${loading ? "Загрузка..." : "Оформить заказ"}`}
//                 className="button send_btn add__cart-btn"
//                 onClick={handleSubmitOrder}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="bottom_gradient">
//           <img src={assets.gradientBig} alt="top gradient" />
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useContext } from "react";
import assets from "../assets";
import { OrderList } from "../components";
import {
  Button,
  CheckboxItem,
  FormItem,
  FormItem2,
  FormSection,
  FormTextArea,
  PhoneInput,
  PromocodeInput,
  RadioItem,
  RadioItem2,
} from "../components/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BasketContext } from "../context/BasketContext";
import { useLocation, useNavigate } from "react-router-dom";

// Telefon raqamining tekshirilishi
const isValidPhoneNumber = (phoneNumber) =>
  phoneNumber && phoneNumber.length > 0;

// Foydalanuvchi ismi uchun tekshirilishi
const isValidUserName = (userName) => userName && userName.length > 0;

// Yetkazib berish uchun manzil tekshirilishi
const isValidAddress = (deliveryMethod, address, house, kvartira, etaj) =>
  deliveryMethod !== "delivery" || (address && house && kvartira && etaj);

// Yetkazib berish vaqti tekshirilishi
const isValidDeliveryTime = (deliveryTime, selectedOption, options) =>
  deliveryTime !== "pickup2" || options.includes(selectedOption);

// Vaqt diapazonini vaqtga o'girish
const convertTimeRangeToTime = (timeRange) => {
  const [startTime] = timeRange.split(" - ");
  return `${startTime}:00`;
};

export const MakingOrder = () => {
  // Komponentdagi holatlar va ma'lumotlar
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [noChange, setNoChange] = useState(false);
  const [showOrderList, setShowOrderList] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [kvartira, setKvartira] = useState("");
  const [etaj, setEtaj] = useState("");
  const [comment, setComment] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [changeAmount, setChangeAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("Выберите время");
  const [showOptions, setShowOptions] = useState(false);
  const { basket } = useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { personCount } = location.state;
  const navigate = useNavigate();
  const [changeAmount2, setChangeAmount2] = useState();

  // Function to handle updating the changeAmount state
  const handlePriceClick = (amount) => {
    setChangeAmount2(amount);
    console.log("salom");
  };

  // Yetkazib berish vaqtlari
  const options = [
    "18:00 - 18:30",
    "18:30 - 19:00",
    "19:00 - 19:30",
    "19:30 - 20:00",
    "20:00 - 20:30",
    "20:30 - 21:00",
    "21:00 - 21:30",
    "21:30 - 22:00",
  ];

  // Vaqt diapazonini tanlash
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  // Buyurtma ro'yxatini ko'rsatish
  const handleShowOrderList = () => {
    setShowOrderList(!showOrderList);
  };

  // Ma'lumotlarni tekshirish
  const handleValidation = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Пожалуйста, введите ваш номер телефона.");
      document.querySelector(".number-input").focus();
      return false;
    }
    if (!isValidUserName(userName)) {
      toast.error("Пожалуйста, введите ваше имя.");
      document.querySelector("input[name='name']").focus();
      return false;
    }
    if (!isValidAddress(deliveryMethod, address, house, kvartira, etaj)) {
      toast.error("Пожалуйста, введите полный адрес.");
      if (!address) document.querySelector("input[name='address']").focus();
      else if (!house) document.querySelector(".house").focus();
      else if (!kvartira) document.querySelector(".kvartira").focus();
      else if (!etaj) document.querySelector(".etaj").focus();
      return false;
    }
    if (!isValidDeliveryTime(deliveryTime, selectedOption, options)) {
      toast.error("Выберите допустимое время.");
      return false;
    }

    const totalPrice = calculateTotalPrice();
    if (changeAmount && parseFloat(changeAmount) < totalPrice) {
      toast.error(`Сумма не может быть меньше ${totalPrice} штук.`);
      document.querySelector("input[name='changeAmount']").focus();
      return false;
    }

    return true;
  };

  // Umumiy narxni hisoblash
  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => {
      const itemTotal = item.price * item.count;
      const modsTotal = item.mods
        ? item.mods.reduce((sum, mod) => sum + mod.price * (mod.count || 1), 0)
        : 0;
      return total + itemTotal + modsTotal;
    }, 0);
  };

  // Buyurtmani yuborish
  const handleSubmitOrder = async () => {
    setLoading(true);

    if (!handleValidation()) {
      setLoading(false);
      return;
    }

    // Umumiy narxni hisoblash va kiritish
    const totalPrice = calculateTotalPrice();

    // Change the address and isPickup fields based on the delivery method
    const fullAddress =
      deliveryMethod === "delivery"
        ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
        : null;

    const orderData = {
      name: userName,
      lastName: userName,
      adress: fullAddress,
      paymentType: paymentMethod,
      persons: personCount,
      phone: phoneNumber,
      nomenclature: basket.map((item) => ({
        id: item.id,
        count: item.count,
        modifiers: item.mods
          ? item.mods.map((mod) => ({
              id: mod.id,
              count: mod.count || 1,
            }))
          : [],
      })),
      time:
        deliveryTime === "pickup2"
          ? convertTimeRangeToTime(selectedOption)
          : "now",
      source: 1,
      comment: comment,
      promo: promoCode,
      isPickup: deliveryMethod === "pickup",
      totalSum: totalPrice,
      changeAmount: paymentMethod === "cash" ? changeAmount2 : null, // Add changeAmount if payment method is cash
    };

    try {
      const response = await fetch("https://api.futoji.ru/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Order successfully created:", responseData);
        toast.success("Заказ успешно создан!");

        localStorage.setItem("orderData", JSON.stringify(responseData));
        navigate("/made-order", {
          state: { deliveryAddress: fullAddress },
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData?.detail?.error?.message);
      }
    } catch (error) {
      toast.error("Сетевая ошибка. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                  <form className="form first-form">
                    <div className="form_item">
                      <label className="form_label">Номер телефона:</label>
                      <PhoneInput
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
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
                            <FormItem
                              label="Дом"
                              type="text"
                              className="house"
                              value={house}
                              onChange={(e) => setHouse(e.target.value)}
                            />
                            <FormItem
                              label="Квартира/офис"
                              type="text"
                              className="kvartira"
                              value={kvartira}
                              onChange={(e) => setKvartira(e.target.value)}
                            />
                            <FormItem
                              label="Этаж"
                              type="number"
                              className="etaj"
                              value={etaj}
                              onChange={(e) => setEtaj(e.target.value)}
                            />
                          </FormSection>
                        </div>
                      )}
                      {deliveryMethod === "pickup" && (
                        <RadioItem2
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
                          <label className="form_label">
                            Укажите время доставки
                          </label>
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
                          <FormItem2
                            label="Укажите с какой суммы подготовить сдачу"
                            type="text"
                            placeholder="1000Р"
                            name="changeAmount"
                            value={changeAmount2}
                            onChange={(e) => setChangeAmount2(e.target.value)} // Pass onChange handler
                          />
                          <div className="example_prices">
                            <span onClick={() => handlePriceClick("1000")}>
                              1000
                            </span>
                            <span onClick={() => handlePriceClick("2000")}>
                              2000
                            </span>
                            <span onClick={() => handlePriceClick("5000")}>
                              5000
                            </span>
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
                  label={`${loading ? "Загрузка..." : "Оформить заказ"}`}
                  className="send_btn add__cart-btn"
                  onClick={handleSubmitOrder}
                />
              </div>
            </div>
            <div className="right_box">
              <button className="show_order" onClick={handleShowOrderList}>
                Показать заказ
              </button>
              <div className="desktop_order-list">
                <OrderList
                  deliveryAddress={
                    deliveryMethod === "delivery"
                      ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
                      : "г. Владимир, ул. Пушкина, д. 8"
                  }
                />
              </div>
              <div
                className={`media_order-list ${showOrderList ? "show" : ""}`}
              >
                <OrderList
                  deliveryAddress={
                    deliveryMethod === "delivery"
                      ? `${address}, дом ${house}, квартира/офис ${kvartira}, этаж ${etaj}`
                      : "г. Владимир, ул. Пушкина, д. 8"
                  }
                />
              </div>
              <Button
                label={`${loading ? "Загрузка..." : "Оформить заказ"}`}
                className="button send_btn add__cart-btn"
                onClick={handleSubmitOrder}
              />
            </div>
          </div>
        </div>
        <div className="bottom_gradient">
          <img src={assets.gradientBig} alt="top gradient" />
        </div>
      </div>
    </>
  );
};
