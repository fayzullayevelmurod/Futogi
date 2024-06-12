import React, { useContext } from "react";
import assets from '../assets';
import { getImageUrl } from '../utils/helpers';
import { BasketContext } from '../context/BasketContext';

export const Modal = ({
  showModal,
  setShowModal,
  product,
  handleAddToBasket,
}) => {
  const { basket } = useContext(BasketContext);

  if (!showModal) return null;

  const {
    image = "",
    name = "Product Name",
    ingredients = "No ingredients available",
    mass = "No mass available",
    price = "No price available",
  } = product || {};

  const isProductInBasket = basket.some(item => item.id === product.id);

  return (
    <div className={`modal ${showModal && "show"}`}>
      <div className="modal_content">
        <button
          className="close_btn blur_btn"
          onClick={() => setShowModal(false)}
        >
          <img src={assets.closeIcon} alt="close icon" />
        </button>
        <div className="img_box">
          {image ? (
            <img src={getImageUrl(image)} alt={name} />
          ) : (
            <span>Нет изображения</span>
          )}
        </div>
        <div className="content_box">
          <h1 className="product_name">{name}</h1>

          {ingredients && (
            <p className="ingredients">
              <span>Состав:</span> <br />
              {ingredients}
            </p>
          )}
          <div className="modal_footer">
            {mass && <span className="mass">{mass} г</span>}
            <div className={`right_box ${!mass && "full"}`}>
              {price && <span className="price">{price} р</span>}
              <button
                className="add__cart-btn"
                onClick={() => handleAddToBasket(product)}
                disabled={isProductInBasket}
              >
                {isProductInBasket ? "Продукт в корзине" : "В корзину"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
