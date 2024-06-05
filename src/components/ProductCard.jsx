import React, { useContext, useState } from "react";
import { Modal } from "./Modal";
import { BasketContext } from "../context/BasketContext";
import { ToastContainer, toast } from "react-toastify";
import { getImageUrl } from "../utils/helpers";

export const ProductCard = ({ selectedCategory }) => {
  const { addToBasket } = useContext(BasketContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [basketItems, setBasketItems] = useState({});

  const hasMods = selectedCategory.some(
    (item) => item.mods && item.mods.length > 0
  );

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToBasket = (product) => {
    if (product) {
      addToBasket(product);
      setBasketItems((prevItems) => ({
        ...prevItems,
        [product.id]: true,
      }));
      setShowModal(false);
      toast.success("Продукт был добавлен в корзину");
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
      <div className={`category_details ${hasMods ? "full" : ""}`}>
        {selectedCategory?.map((item) => (
          <div className={`category_details-card ${hasMods && "pb" && !item.mods && "pb"}`} key={item.id}>
            {!item.mods && (
              <>
                <div className="products__box">
                  <div>
                    <div onClick={() => handleOpenModal(item)} className="product_img">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                        />
                      ) : (
                        <span className="no_img">No img</span>
                      )}
                    </div>
                    <h4 className="product_name">{item.name}</h4>
                    <p className="desc">{item.description}</p>
                  </div>
                  <div className="card_footer">
                    {item.mass ? (
                      <p className="product__weight">{item.mass}</p>
                    ) : null}
                    <div className={`right__box ${item.mass ? "" : "full"}`}>
                      {item.price && (
                        <span className="price">{item.price} р</span>
                      )}
                      <button
                        className="add__cart-btn"
                        onClick={() => handleAddToBasket(item)}
                        disabled={basketItems[item.id]}
                      >
                        {basketItems[item.id] ? "Продукт в корзине" : "В корзину"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={`category_details`}>
        {selectedCategory?.map((item) => (
          item.mods && item.mods.map((mod) => (
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
                <p className="desc">{mod.description}</p>
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
                    disabled={basketItems[mod.id]}
                  >
                    {basketItems[mod.id] ? "Продукт в корзине" : "В корзину"}
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
