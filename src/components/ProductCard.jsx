export const ProductCard = ({ selectedCategory }) => {
  return (
    <>
      {selectedCategory.map((subCategory) => (
        <div key={subCategory.id} className="products__box">
          <div>
            <div className="product_img">
              {subCategory.image ? (
                <img
                  src={`https://api.futoji.ru${subCategory.image}`}
                  // alt={subCategory.name}
                />
              ) : (
                <span className="no_img">No img</span>
              )}
            </div>
            <h4 className="product_name">{subCategory.name}</h4>

            <p className="desc">{subCategory.description}</p>
          </div>
          <div className="card_footer">
            {subCategory.mass ? (
              <p className="product__weight">{subCategory.mass}</p>
            ) : null}
            <div className={`right__box ${subCategory.mass ? "" : "full"}`}>
              <span className="price">{subCategory.price} р</span>
              <button className="add__cart-btn">В корзину</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
