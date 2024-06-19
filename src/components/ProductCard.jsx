// ProductCard.jsx
// import React, { useContext } from "react";
// import { BasketContext } from "../context/BasketContext";
// import { toast } from "react-toastify";
// import { getImageUrl } from "../utils/helpers";

// export const ProductCard = ({ selectedCategory, product }) => {
//   const { addToBasket, basket } = useContext(BasketContext);

//   const handleAddToBasket = (product) => {
//     if (product) {
//       const isProductInBasket = basket.some((item) => item.id === product.id);
//       if (!isProductInBasket) {
//         addToBasket(product);
//         toast.success("Продукт был добавлен в корзину");
//       } else {
//         toast.info("Продукт уже находится в корзине");
//       }
//     } else {
//       toast.error("Произошла ошибка, попробуйте еще раз");
//     }
//   };

//   if (!product) {
//     return (
//       <>
//         <div className="category_details">
//           {selectedCategory?.map((item) => (
//             <div className="category_details-card" key={item.id}>
//               <div className="products__box">
//                 <div>
//                   <div className="product_img">
//                     {item.image ? (
//                       <img src={getImageUrl(item.image)} alt={item.name} />
//                     ) : (
//                       <span className="no_img">Нет изображения</span>
//                     )}
//                   </div>
//                   <h4 className="product_name">{item.name}</h4>
//                   {item.description && (
//                     <p className="desc">
//                       {item.description?.length > 300
//                         ? `${item.description.slice(0, 300)}...`
//                         : item.description}
//                     </p>
//                   )}
//                 </div>
//                 <div className={`card_footer ${!item.description && "mt-5"}`}>
//                   {item.mass ? (
//                     <p className="product__weight">{item.mass}</p>
//                   ) : null}
//                   <div className={`right__box ${item.mass ? "" : "full"}`}>
//                     {item.price && <span className="price">{item.price} р</span>}
//                     <button
//                       className="add__cart-btn"
//                       onClick={() => handleAddToBasket(item)}
//                       disabled={basket.some((basketItem) => basketItem.id === item.id)}
//                     >
//                       В корзину
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }

//   return (
//     <>

//       <div className="category_details">
//         <div className="category_details-card" key={product.id}>
//           <div className="products__box">
//             <div>
//               <div className="product_img">
//                 {product.image ? (
//                   <img src={getImageUrl(product.image)} alt={product.name} />
//                 ) : (
//                   <span className="no_img">Нет изображения</span>
//                 )}
//               </div>
//               <h4 className="product_name">{product.name}</h4>
//               {product.description && (
//                 <p className="desc">
//                   {product.description?.length > 300
//                     ? `${product.description.slice(0, 300)}...`
//                     : product.description}
//                 </p>
//               )}
//             </div>
//             <div className={`card_footer ${!product.description && "mt-5"}`}>
//               {product.mass ? (
//                 <p className="product__weight">{product.mass}</p>
//               ) : null}
//               <div className={`right__box ${product.mass ? "" : "full"}`}>
//                 {product.price && <span className="price">{product.price} р</span>}
//                 <button
//                   className="add__cart-btn"
//                   onClick={() => handleAddToBasket(product)}
//                   disabled={basket.some((basketItem) => basketItem.id === product.id)}
//                 >
//                   {basket.some((basketItem) => basketItem.id === product.id)
//                     ? "В корзине"
//                     : "Корзину"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { toast } from "react-toastify";
import { getImageUrl } from "../utils/helpers";

export const ProductCard = ({ selectedCategory, product }) => {
  const { addToBasket, basket } = useContext(BasketContext);

  const handleAddToBasket = (product) => {
    if (product) {
      const isProductInBasket = basket.some((item) => item.id === product.id);
      if (!isProductInBasket) {
        addToBasket(product);
        toast.success("Продукт был добавлен в корзину");
      } else {
        toast.info("Продукт уже находится в корзине");
      }
    } else {
      toast.error("Произошла ошибка, попробуйте еще раз");
    }
  };

  if (!product) {
    return (
      <>
        <div className="category_details">
          {selectedCategory?.map((item) => (
            <div className="category_details-card" key={item.id}>
              <div className="products__box">
                <div>
                  <div className="product_img">
                    {item.image ? (
                      <img src={getImageUrl(item.image)} alt={item.name} />
                    ) : (
                      <span className="no_img">Нет изображения</span>
                    )}
                  </div>
                  <h4 className="product_name">{item.name}</h4>
                  {item.description && (
                    <p className="desc">
                      {item.description?.length > 300
                        ? `${item.description.slice(0, 300)}...`
                        : item.description}
                    </p>
                  )}
                </div>
                <div className={`card_footer ${!item.description && "mt-5"}`}>
                  {item.mass ? (
                    <p className="product__weight">{item.mass}</p>
                  ) : null}
                  <div className={`right__box ${item.mass ? "" : "full"}`}>
                    {item.price && <span className="price">{item.price} р</span>}
                    <button
                      className="add__cart-btn"
                      onClick={() => handleAddToBasket(item)}
                      disabled={basket.some((basketItem) => basketItem.id === item.id)}
                    >
                      {basket.some((basketItem) => basketItem.id === item.id)
                        ? "В корзине"
                        : "Добавить в корзину"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="category_details-card" key={product.id}>
        <div className="products__box">
          <div>
            {product.image && (
              <div className="product_img">
                <img src={getImageUrl(product.image)} alt={product.name} />
              </div>
            )}
            <h4 className="product_name">{product.name}</h4>
            {product.description && (
              <p className="desc">
                {product.description?.length > 300
                  ? `${product.description.slice(0, 300)}...`
                  : product.description}
              </p>
            )}
          </div>
          <div className={`card_footer ${!product.description && "mt-5"}`}>
            {product.mass ? (
              <p className="product__weight">{product.mass}</p>
            ) : null}
            <div className={`right__box ${product.mass ? "" : "full"}`}>
              {product.price && <span className="price">{product.price} р</span>}
              {/* <button
                className="add__cart-btn"
                onClick={() => handleAddToBasket(product)}
                disabled={basket.some((basketItem) => basketItem.id === product.id)}
              >
                {basket.some((basketItem) => basketItem.id === product.id)
                  ? "В корзине"
                  : "Добавить в корзину"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};