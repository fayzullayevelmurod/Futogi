import { Link } from "react-router-dom";
import assets from "../assets";
import { useContext, useState } from "react";
import { Counter } from "../components";
import { BasketContext } from "../context/BasketContext";

export const Cart = () => {
  const [productCounts, setProductCounts] = useState({});
  const [personCount, setPersonCount] = useState(0);
  const pricePerUnit = 1000;
  const { basket } = useContext(BasketContext);

  const handleProductCountChange = (productId, newCount) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: newCount,
    }));
  };

  const getProductTotalPrice = (productId) => {
    const count = productCounts[productId] || 0;
    return count * pricePerUnit;
  };

  const handlePersonCountChange = (newCount) => {
    setPersonCount(newCount);
  };

  const totalProductPrice = Object.keys(productCounts).reduce(
    (total, productId) => {
      const count = productCounts[productId] || 0;
      return total + count * pricePerUnit;
    },
    0
  );

  return (
    <div className="basket__page">
      <div className="top__box">
        <div className="title__box">
          <h1>КОРЗИНА</h1>
          <Link className="blur__btn" to="/products">
            Назад к меню
          </Link>
        </div>
        <img src={assets.topGradient} alt="" />
      </div>
      <div className="backet_products">
        {basket?.map((item, index) => (
          <div key={`${item.id}-${index}`} className="backet_product-tr">
            <div className="backet_product">
              <div className="img_box">
                <img
                  className="product_img"
                  src={`https://api.futoji.ru${item.image}`}
                  alt=""
                />
                <h3 className="product_name">{item.name}</h3>
              </div>
              <div className="counter_box">
                {item?.mass && <span className="mass">{item?.mass}г</span>}
                <Counter
                  initialCount={productCounts[item.id] || 0}
                  onChange={(newCount) =>
                    handleProductCountChange(item.id, newCount)
                  }
                />
                <span className="price">{getProductTotalPrice(item.id)} р</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="number_person-tr">
        <div className="number_person">
          <div className="left_box">
            <h4>Количество персон</h4>
            <p>
              Укажите количество персон, на которых рассчитан заказ, и мы
              добавим вам все необходимое
            </p>
          </div>
          <div className="right_box">
            <p>Укажите количество персон </p>
            <Counter
              initialCount={personCount}
              onChange={handlePersonCountChange}
            />
          </div>
        </div>
      </div>
      <div className="total_box">
        <div className="total_price">
          <p>
            <span>Итого:</span> {totalProductPrice} р
          </p>
        </div>
        <div className="btn_box">
          <button className="blur__btn">Очистить корзину</button>
          <Link className="add__cart-btn">К оформлению</Link>
        </div>
      </div>
    </div>
  );
};
