export const ProductCard = ({ selectedCategory = [] }) => {
  console.log(selectedCategory);
  return (
    <>
      {selectedCategory.data.map((subCategory) => (
        <div key={subCategory.id} className="products__box">
          <div>
            {subCategory.image ? (
              <img
                src={`https://api.futoji.ru${subCategory.image}`}
                alt={subCategory.name}
              />
            ) : (
              <span>No img</span>
            )}
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