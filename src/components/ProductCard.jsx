import React, { useContext, useState } from "react";
import { Modal } from "./Modal";
import { BasketContext } from "../context/BasketContext";
import { ToastContainer, toast } from "react-toastify";
import { getImageUrl } from "../utils/helpers";

export const ProductCard = ({ selectedCategory }) => {
  const { addToBasket, basket } = useContext(BasketContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToBasket = (product) => {
    if (product) {
      const isProductInBasket = basket.some(item => item.id === product.id);
      if (!isProductInBasket) {
        addToBasket(product);
        toast.success("Продукт был добавлен в корзину");
      } else {
        toast.info("Продукт уже находится в корзине");
      }
      setShowModal(false);
    } else {
      toast.error("Произошла ошибка, попробуйте еще раз");
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        product={selectedProduct}
        handleAddToBasket={handleAddToBasket}
      />
      <div className="category_details">
        {selectedCategory?.map((item) => (
          <div className="category_details-card" key={item.id}>
            <div className="products__box">
              <div>
                <div onClick={() => handleOpenModal(item)} className="product_img">
                  {item.image ? (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                    />
                  ) : (
                    <span className="no_img">Нет изображения</span>
                  )}
                </div>
                <h4 className="product_name">{item.name}</h4>
                {item.description && <p className="desc">
                  {item.description?.length > 300 ? `${item.description.slice(0, 300)}...` : item.description}
                </p>}
              </div>
              <div className={`card_footer ${!item.description && 'mt-5'}`}>
                {item.mass ? (
                  <p p className="product__weight">{item.mass}</p>
                ) : null}
                <div className={`right__box ${item.mass ? "" : "full"}`}>
                  {item.price && (
                    <span className="price">{item.price} р</span>
                  )}
                  <button
                    className="add__cart-btn"
                    onClick={() => handleAddToBasket(item)}
                    disabled={basket.some(basketItem => basketItem.id === item.id)}
                  >
                    {basket.some(basketItem => basketItem.id === item.id) ? "В корзину" : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {selectedCategory?.map((item) => (
          item?.mods && item?.mods?.map((mod) => (
            <div key={mod.id} className="products__box products__box-mods">
              <div>
                <div className="product_img" onClick={() => handleOpenModal(mod)}>
                  {mod.image ? (
                    <img
                      src={getImageUrl(mod.image)}
                      alt={mod.name}
                    />
                  ) : (
                    <span className="no_img">Нет изображения</span>
                  )}
                </div>
                <h4 className="product_name">{mod.name}</h4>
                {mod.description ? <p className="desc">
                  {mod.description?.length > 50 ? `${mod.description.slice(0, 50)}...` : mod.description}
                </p> : <p className="desc">Нетез описания</p>}
              </div>
              <div className="card_footer">
                {mod.mass ? (
                  <p className="product__weight">{mod.mass}</p>
                ) : null}
                <div className={`right__box ${mod.mass ? "" : "full"}`}>
                  {mod.price && (
                    <span className="price">{mod.price} р</span>
                  )}
                  <button
                    className="add__cart-btn"
                    onClick={() => handleAddToBasket(mod)}
                    disabled={basket.some(basketItem => basketItem.id === mod.id)}
                  >
                    {basket.some(basketItem => basketItem.id === mod.id) ? "В корзину" : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </>
  );
};