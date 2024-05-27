import assets from "../assets";

export const Modal = ({
  showModal,
  setShowModal,
  product,
  handleAddToBasket,
}) => {
  if (!showModal) return null;

  const {
    image = "",
    name = "Product Name",
    ingredients = "No ingredients available",
    mass = "No mass available",
    price = "No price available",
  } = product || {};
console.log(product, 'modal product');
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
            <img src={`https://api.futoji.ru${image}`} alt={name} />
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
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
