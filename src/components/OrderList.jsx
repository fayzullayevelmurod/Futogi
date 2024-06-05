import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { getImageUrl } from "../utils/helpers";

export const OrderList = () => {
  const { basket } = useContext(BasketContext);

  const handleCalculatePrice = () => {
    return basket.reduce((total, item) => {
      const count = item.count || 1;
      return total + count * item.price;
    }, 0);
  };

  const totalPrice = handleCalculatePrice();

  return (
    <div className="order_list">
      <div className="order_list-content">
        <h1 className="title">СОСТАВ ЗАКАЗА</h1>
        <div className="products_boxes">
          {basket.length > 0 ? (
            basket.map((item, index) => (
              <div key={`${item.id}-${index}`} className="product_box">
                <div className="product_left-box">
                  <img
                    className="product_img"
                    src={getImageUrl(item.image)}
                    alt="product img"
                  />
                  <div>
                    <p className="product_name">{item.name}</p>
                    <div className="flex_box">
                      {item.mass && <span className="mass">{item.mass}</span>}
                      <span className="quantity">{item.count || 1} шт</span>
                    </div>
                  </div>
                </div>
                <span className="price">{(item.count || 1) * item.price}Р</span>
              </div>
            ))
          ) : (
            <span style={{ textAlign: "center" }}>Корзина пуста</span>
          )}
        </div>
        <div className="delivery_box">
          <span>Доставка</span>
          <div className="delivery_location-box">
            <svg
              width="11"
              height="14"
              viewBox="0 0 32 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 16C0 7.1632 7.1632 0 16 0C24.8368 0 32 7.1632 32 16C32 20.4168 30.2104 24.416 27.316 27.3112C26.5605 28.0671 25.5376 28.9113 24.4313 29.8243C21.2982 32.41 17.4956 35.5482 17.2 38.8C17.14 39.4597 16.6624 40 16 40C15.3376 40 14.86 39.4597 14.8 38.8C14.5044 35.5482 10.7018 32.41 7.5687 29.8243C6.46238 28.9113 5.43953 28.0671 4.684 27.3112C1.7896 24.416 0 20.4168 0 16ZM21.5996 16.0012C21.5996 19.094 19.0925 21.6012 15.9997 21.6012C12.9069 21.6012 10.3997 19.094 10.3997 16.0012C10.3997 12.9084 12.9069 10.4012 15.9997 10.4012C19.0925 10.4012 21.5996 12.9084 21.5996 16.0012Z"
                fill="#FC3F1D"
              />
            </svg>
            <span>г. Владимир, ул. Пушкина, д. 8</span>
          </div>
          <div className="total_price">
            <span className="total">Итого к оплате:</span>
            <span className="price">{totalPrice} Р</span>
          </div>
        </div>
      </div>
    </div>
  );
};
