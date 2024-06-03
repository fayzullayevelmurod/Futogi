// import { Link, useNavigate } from "react-router-dom";
// import assets from "../assets";
// import { useContext, useState, useEffect } from "react";
// import { Counter } from "../components";
// import { BasketContext } from "../context/BasketContext";
// import { getImageUrl } from "../utils/helpers";

// export const Cart = () => {
//   const [productCounts, setProductCounts] = useState({});
//   const [personCount, setPersonCount] = useState(1);
//   const { basket, clearBasket, updateProductCount } = useContext(BasketContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCounts = localStorage.getItem("productCounts");
//     if (savedCounts) {
//       setProductCounts(JSON.parse(savedCounts));
//     } else {
//       const initialCounts = basket.reduce((acc, item) => {
//         acc[item.id] = item.count || 1;
//         return acc;
//       }, {});
//       setProductCounts(initialCounts);
//     }
//   }, [basket]);

//   const handleProductCountChange = (productId, newCount) => {
//     updateProductCount(productId, newCount);
//     setProductCounts((prevCounts) => {
//       const updatedCounts = { ...prevCounts, [productId]: newCount };
//       localStorage.setItem("productCounts", JSON.stringify(updatedCounts));
//       return updatedCounts;
//     });
//   };

//   const getProductTotalPrice = (productId, price) => {
//     const count = productCounts[productId] || 1;
//     return count * price;
//   };

//   const handlePersonCountChange = (newCount) => {
//     setPersonCount(newCount);
//   };

//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     basket.forEach((item) => {
//       const count = productCounts[item.id] || 1;
//       totalPrice += count * item.price;
//     });
//     return totalPrice;
//   };

//   const totalProductPrice = calculateTotalPrice();

//   const handleSubmit = () => {
//     navigate("/making-an-order");
//   };

//   return (
//     <>
//       <div className="basket__page">
//         <div className="top_parent-box">
//           <div className="top__box">
//             <div className="title__box">
//               <h1>КОРЗИНА</h1>
//               <Link className="blur__btn" to="/products">
//                 Назад к меню
//               </Link>
//             </div>
//             <img src={assets.topGradient} alt="" />
//           </div>
//         </div>
//         <div className="backet_products">
//           {basket?.map((item, index) => (
//             <div key={`${item.id}-${index}`} className="backet_product-tr">
//               <div className="backet_product">
//                 <div className="img_box">
//                   <img
//                     className="product_img"
//                     src={getImageUrl(item.image)}
//                     alt=""
//                   />
//                   <div className="content">
//                     <h3 className="product_name">{item.name}</h3>
//                     {item.mass && (
//                       <span className="media_mass">{item.mass}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="counter_box">
//                   {item?.mass && <span className="mass">{item?.mass}</span>}
//                   <Counter
//                     initialCount={1}
//                     productCounts={productCounts[item.id]}
//                     onChange={(newCount) =>
//                       handleProductCountChange(item.id, newCount)
//                     }
//                   />
//                   <span className="price">
//                     {getProductTotalPrice(item.id, item.price)} р
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="number_person-tr">
//           <div className="number_person">
//             <div className="left_box">
//               <h4>Количество персон</h4>
//               <p>
//                 Укажите количество персон, на которых рассчитан заказ, и мы
//                 добавим вам все необходимое
//               </p>
//             </div>
//             <div className="right_box">
//               <p>Укажите количество персон </p>
//               <Counter
//                 initialCount={personCount}
//                 onChange={handlePersonCountChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="total_box">
//           <div className="total_price">
//             <p>
//               <span className="total">Итого:</span>{" "}
//               <span>{totalProductPrice} р</span>
//             </p>
//           </div>
//           <div className="btn_box">
//             <button className="blur__btn" onClick={clearBasket}>
//               Очистить корзину
//             </button>
//             <button onClick={handleSubmit} className="add__cart-btn">
//               К оформлению
//             </button>
//           </div>
//         </div>
//         <img className="gradiend_img" src={assets.gradientBig} alt="" />
//       </div>
//     </>
//   );
// };

import { Link, useNavigate } from "react-router-dom";
import assets from "../assets";
import { useContext, useState, useEffect } from "react";
import { Counter } from "../components";
import { BasketContext } from "../context/BasketContext";
import { getImageUrl } from "../utils/helpers";

export const Cart = () => {
  const [productCounts, setProductCounts] = useState({});
  const [personCount, setPersonCount] = useState(1);
  const { basket, clearBasket, updateProductCount, removeProduct } = useContext(BasketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCounts = localStorage.getItem("productCounts");
    if (savedCounts) {
      setProductCounts(JSON.parse(savedCounts));
    } else {
      const initialCounts = basket.reduce((acc, item) => {
        acc[item.id] = item.count || 1;
        return acc;
      }, {});
      setProductCounts(initialCounts);
    }
  }, [basket]);

  const handleProductCountChange = (productId, newCount) => {
    if (newCount === 0) {
      removeProduct(productId);
      setProductCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts };
        delete updatedCounts[productId];
        localStorage.setItem("productCounts", JSON.stringify(updatedCounts));
        return updatedCounts;
      });
    } else {
      updateProductCount(productId, newCount);
      setProductCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts, [productId]: newCount };
        localStorage.setItem("productCounts", JSON.stringify(updatedCounts));
        return updatedCounts;
      });
    }
  };

  const getProductTotalPrice = (productId, price) => {
    const count = productCounts[productId] || 1;
    return count * price;
  };

  const handlePersonCountChange = (newCount) => {
    setPersonCount(newCount);
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
    navigate("/making-an-order");
  };

  return (
    <>
      <div className="basket__page">
        <div className="top_parent-box">
          <div className="top__box">
            <div className="title__box">
              <h1>КОРЗИНА</h1>
              <Link className="blur__btn" to="/products">
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
                    initialCount={1}
                    productCounts={productCounts[item.id]}
                    onChange={(newCount) =>
                      handleProductCountChange(item.id, newCount)
                    }
                  />
                  <span className="price">
                    {getProductTotalPrice(item.id, item.price)} р
                  </span>
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