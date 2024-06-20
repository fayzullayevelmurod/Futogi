import { Link, useNavigate } from "react-router-dom";
import assets from "../assets";
import { useContext, useState, useEffect } from "react";
import { Counter } from "../components";
import { BasketContext } from "../context/BasketContext";
import { getImageUrl } from "../utils/helpers";

export const Cart = () => {
  const [productCounts, setProductCounts] = useState({});
  const [personCount, setPersonCount] = useState(1);
  const { basket, clearBasket, updateProductCount, removeProduct } =
    useContext(BasketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCounts = localStorage.getItem("productCounts");
    if (savedCounts) {
      setProductCounts(JSON.parse(savedCounts));
    } else {
      const initialCounts = basket.reduce((acc, item) => {
        acc[
          `${item.id}-${item.mods ? item.mods.map((mod) => mod.id).join("-") : ""}`
        ] = item.count || 1;

        return acc;
      }, {});
      setProductCounts(initialCounts);
    }

    const savedPersonCount = localStorage.getItem("personCount");
    if (savedPersonCount) {
      setPersonCount(parseInt(savedPersonCount, 10));
    }
  }, [basket]);

  console.log(basket);
  const handleProductCountChange = (productId, mods = [], newCount) => {
    const key = `${productId}-${mods ? mods.map((mod) => mod.id).join("-") : ""}`;
    if (newCount === 0) {
      removeProduct(productId, mods);
      setProductCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts };
        delete updatedCounts[key];
        localStorage.setItem("productCounts", JSON.stringify(updatedCounts));
        return updatedCounts;
      });
    } else {
      updateProductCount(productId, mods, newCount);
      setProductCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts, [key]: newCount };
        localStorage.setItem("productCounts", JSON.stringify(updatedCounts));
        return updatedCounts;
      });
    }
  };

  const getProductTotalPrice = (productId, mods = [], price) => {
    const key = `${productId}-${mods ? mods.map((mod) => mod.id).join("-") : ""}`;
    const count = productCounts[key] || 1;
    return count * price;
  };

  const handlePersonCountChange = (newCount) => {
    setPersonCount(newCount);
    localStorage.setItem("personCount", newCount);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basket.forEach((item) => {
      const count = productCounts[item.id] || 1;
      totalPrice += count * item.price;
    });
    return totalPrice;
  };
  const totalProductPrice = calculateTotalPrice();

  const handleSubmit = () => {
    navigate("/making-an-order", { state: { personCount } });
  };

  return (
    <>
      <div className="basket__page">
        <div className="top_parent-box">
          <div className="top__box">
            <div className="title__box">
              <h1>КОРЗИНА</h1>
              <Link className="blur__btn" to="/products/Пицца">
                Назад к меню
              </Link>
            </div>
            <img src={assets.topGradient} alt="" />
          </div>
        </div>
        <div className="backet_products">
          {basket?.map((item, index) => (
            <div key={`${item.id}-${index}`} className="backet_product-tr">
              <div className="backet_product">
                <div className="img_box">
                  <img
                    className="product_img"
                    src={getImageUrl(item.image)}
                    alt=""
                  />
                  <div className="content">
                    <h3 className="product_name">{item.name}</h3>
                    {item.mass && (
                      <span className="media_mass">{item.mass}</span>
                    )}
                  </div>
                </div>
                <div className="counter_box">
                  {item?.mass && <span className="mass">{item?.mass}</span>}
                  <Counter
                    initialCount={
                      productCounts[
                        `${item.id}-${item.mods ? item.mods.map((mod) => mod.id).join("-") : ""}`
                      ] || 1
                    }
                    onChange={(newCount) =>
                      handleProductCountChange(item.id, item.mods, newCount)
                    }
                  />
                  <span className="price">{item.price} p</span>
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
              <span className="total">Итого:</span>{" "}
              <span>{totalProductPrice} р</span>
            </p>
          </div>
          <div className="btn_box">
            <button className="blur__btn" onClick={clearBasket}>
              Очистить корзину
            </button>
            <button onClick={handleSubmit} className="add__cart-btn">
              К оформлению
            </button>
          </div>
        </div>
        <img className="gradiend_img" src={assets.gradientBig} alt="" />
      </div>
    </>
  );
};
