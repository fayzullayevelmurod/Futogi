// import React, { useContext, useState } from "react";
// import { Modal } from "./Modal";
// import { BasketContext } from "../context/BasketContext";
// import { ToastContainer, toast } from "react-toastify";
// import { getImageUrl } from "../utils/helpers";

// export const ProductCard = ({ selectedCategory }) => {
//   const { addToBasket, basket } = useContext(BasketContext);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleOpenModal = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToBasket = (product) => {
//     if (product) {
//       const isProductInBasket = basket.some(item => item.id === product.id);
//       if (!isProductInBasket) {
//         addToBasket(product);
//         toast.success("Продукт был добавлен в корзину");
//       } else {
//         toast.info("Продукт уже находится в корзине");
//       }
//       setShowModal(false);
//     } else {
//       toast.error("Произошла ошибка, попробуйте еще раз");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Modal
//         showModal={showModal}
//         setShowModal={setShowModal}
//         product={selectedProduct}
//         handleAddToBasket={handleAddToBasket}
//       />
//       <div className="category_details">
//         {selectedCategory?.map((item) => (
//           <div className="category_details-card" key={item.id}>
//             <div className="products__box">
//               <div>
//                 <div onClick={() => handleOpenModal(item)} className="product_img">
//                   {item.image ? (
//                     <img
//                       src={getImageUrl(item.image)}
//                       alt={item.name}
//                     />
//                   ) : (
//                     <span className="no_img">Нет изображения</span>
//                   )}
//                 </div>
//                 <h4 className="product_name">{item.name}</h4>
//                 {item.description && <p className="desc">
//                   {item.description?.length > 300 ? `${item.description.slice(0, 300)}...` : item.description}
//                 </p>}
//               </div>
//               <div className={`card_footer ${!item.description && 'mt-5'}`}>
//                 {item.mass ? (
//                   <p p className="product__weight">{item.mass}</p>
//                 ) : null}
//                 <div className={`right__box ${item.mass ? "" : "full"}`}>
//                   {item.price && (
//                     <span className="price">{item.price} р</span>
//                   )}
//                   <button
//                     className="add__cart-btn"
//                     onClick={() => handleAddToBasket(item)}
//                     disabled={basket.some(basketItem => basketItem.id === item.id)}
//                   >
//                     {basket.some(basketItem => basketItem.id === item.id) ? "В корзину" : "В корзину"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {selectedCategory?.map((item) => (
//           item?.mods && item?.mods?.map((mod) => (
//             <div key={mod.id} className="products__box products__box-mods">
//               <div>
//                 <div className="product_img" onClick={() => handleOpenModal(mod)}>
//                   {mod.image ? (
//                     <img
//                       src={getImageUrl(mod.image)}
//                       alt={mod.name}
//                     />
//                   ) : (
//                     <span className="no_img">Нет изображения</span>
//                   )}
//                 </div>
//                 <h4 className="product_name">{mod.name}</h4>
//                 {mod.description ? <p className="desc">
//                   {mod.description?.length > 50 ? `${mod.description.slice(0, 50)}...` : mod.description}
//                 </p> : <p className="desc">Нетез описания</p>}
//               </div>
//               <div className="card_footer">
//                 {mod.mass ? (
//                   <p className="product__weight">{mod.mass}</p>
//                 ) : null}
//                 <div className={`right__box ${mod.mass ? "" : "full"}`}>
//                   {mod.price && (
//                     <span className="price">{mod.price} р</span>
//                   )}
//                   <button
//                     className="add__cart-btn"
//                     onClick={() => handleAddToBasket(mod)}
//                     disabled={basket.some(basketItem => basketItem.id === mod.id)}
//                   >
//                     {basket.some(basketItem => basketItem.id === mod.id) ? "В корзину" : "В корзину"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ))}
//       </div>
//     </>
//   );
// };

// ProductCard.jsx
// import React, { useContext, useState } from "react";
// import { Modal } from "./Modal";
// import { BasketContext } from "../context/BasketContext";
// import { ToastContainer, toast } from "react-toastify";
// import { getImageUrl } from "../utils/helpers";

// export const ProductCard = ({ selectedCategory }) => {
//   const { addToBasket, basket } = useContext(BasketContext);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedNoodle, setSelectedNoodle] = useState(null);
//   const [selectedSauce, setSelectedSauce] = useState(null);
//   const [step, setStep] = useState(1);

//   const handleOpenModal = (product) => {
//     console.log("Opening modal for product:", product);
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToBasket = (product) => {
//     if (product) {
//       const isProductInBasket = basket.some(item => item.id === product.id);
//       if (!isProductInBasket) {
//         addToBasket(product);
//         toast.success("Продукт был добавлен в корзину");
//       } else {
//         toast.info("Продукт уже находится в корзине");
//       }
//       setShowModal(false);
//     } else {
//       toast.error("Произошла ошибка, попробуйте еще раз");
//     }
//   };

//   const handleNextStep = () => {
//     if (step === 1 && selectedProduct) {
//       console.log("Moving to step 2 with product:", selectedProduct);
//       setStep(2);
//     } else if (step === 2 && selectedNoodle) {
//       console.log("Moving to step 3 with noodle:", selectedNoodle);
//       setStep(3);
//     } else if (step === 3 && selectedSauce) {
//       console.log("Adding to basket with sauce:", selectedSauce);
//       handleAddToBasket({
//         ...selectedProduct,
//         mods: [selectedNoodle, selectedSauce],
//       });
//       setStep(1);
//       setSelectedProduct(null);
//       setSelectedNoodle(null);
//       setSelectedSauce(null);
//     }
//   };

//   const renderProductSelection = () => (
//     <>
//       {selectedCategory?.map((item) => (
//         <div className="category_details-card" key={item.id}>
//           <div className="products__box">
//             <div>
//               <div onClick={() => handleOpenModal(item)} className="product_img">
//                 {item.image ? (
//                   <img
//                     src={getImageUrl(item.image)}
//                     alt={item.name}
//                   />
//                 ) : (
//                   <span className="no_img">Нет изображения</span>
//                 )}
//               </div>
//               <h4 className="product_name">{item.name}</h4>
//               {item.description && <p className="desc">
//                 {item.description?.length > 300 ? `${item.description.slice(0, 300)}...` : item.description}
//               </p>}
//             </div>
//             <div className={`card_footer ${!item.description && 'mt-5'}`}>
//               {item.mass ? (
//                 <p p className="product__weight">{item.mass}</p>
//               ) : null}
//               <div className={`right__box ${item.mass ? "" : "full"}`}>
//                 {item.price && (
//                   <span className="price">{item.price} р</span>
//                 )}
//                 <button
//                   className="add__cart-btn"
//                   onClick={() => setSelectedProduct(item)}
//                   disabled={basket.some(basketItem => basketItem.id === item.id)}
//                 >
//                   {basket.some(basketItem => basketItem.id === item.id) ? "В корзину" : "Выбрать"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );

//   const renderNoodleSelection = () => (
//     <>
//       <h4>Выберите лапшу</h4>
//       {selectedProduct?.mods?.filter(mod => mod.name.includes('Лапша')).map((noodle) => (
//         <div key={noodle.id} className="products__box">
//           <div onClick={() => setSelectedNoodle(noodle)}>
//             <h4 className="product_name">{noodle.name}</h4>
//           </div>
//         </div>
//       ))}
//     </>
//   );

//   const renderSauceSelection = () => (
//     <>
//       <h4>Выберите соус</h4>
//       {selectedProduct?.mods?.filter(mod => mod.name.includes('Соус')).map((sauce) => (
//         <div key={sauce.id} className="products__box">
//           <div onClick={() => setSelectedSauce(sauce)}>
//             <h4 className="product_name">{sauce.name}</h4>
//           </div>
//         </div>
//       ))}
//     </>
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Modal
//         showModal={showModal}
//         setShowModal={setShowModal}
//         product={selectedProduct}
//         handleAddToBasket={handleAddToBasket}
//       />
//       <div className="category_details">
//         {step === 1 && renderProductSelection()}
//         {step === 2 && renderNoodleSelection()}
//         {step === 3 && renderSauceSelection()}
//       </div>
//       {console.log(selectedProduct)}
//       {(selectedProduct) && (
//         <button className="add__cart-btn" onClick={handleNextStep}>
//           {step === 3 ? "Добавить в корзину" : "Далее"}
//         </button>
//       )}
//     </>
//   );
// };


// 2
// ProductCard.jsx
// import React, { useContext, useState } from "react";
// import { BasketContext } from "../context/BasketContext";
// import { ToastContainer, toast } from "react-toastify";
// import { getImageUrl } from "../utils/helpers";

// export const ProductCard = ({ product }) => {
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

//   return (
//     <>
//       <ToastContainer />
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
//                     : "Добавить в корзину"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// ProductCard.jsx
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
    
      <div className="category_details">
        <div className="category_details-card" key={product.id}>
          <div className="products__box">
            <div>
              <div className="product_img">
                {product.image ? (
                  <img src={getImageUrl(product.image)} alt={product.name} />
                ) : (
                  <span className="no_img">Нет изображения</span>
                )}
              </div>
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
                <button
                  className="add__cart-btn"
                  onClick={() => handleAddToBasket(product)}
                  disabled={basket.some((basketItem) => basketItem.id === product.id)}
                >
                  {basket.some((basketItem) => basketItem.id === product.id)
                    ? "В корзине"
                    : "Добавить в корзину"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
