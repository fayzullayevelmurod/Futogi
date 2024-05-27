export const ProductCard = ({ selectedCategory }) => {
  const hasMods = selectedCategory.some(
    (item) => item.mods && item.mods.length > 0
  );
  return (
    <div className={`category_details ${hasMods ? "full" : ""}`}>
      {selectedCategory?.map((item) => (
        <div className={`category_details-card ${hasMods ? "pb" : ""}`} key={item.id}>
          {!item.mods && (
            <div className="products__box">
              <div>
                <div className="product_img">
                  {item.image ? (
                    <img
                      src={`https://api.futoji.ru${item.image}`}
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
                  {item.price && <span className="price">{item.price} р</span>}
                  <button className="add__cart-btn">В корзину</button>
                </div>
              </div>
            </div>
          )}
          <>
            {item?.mods && item?.mods?.length > 0 && (
              <>
                <h1 className="modes_title">{item.name}</h1>
                <div className="mods_boxes">
                  {item.mods?.map((mod) => (
                    <div key={mod.id} className="products__box">
                      <div>
                        <div className="product_img">
                          {mod.image ? (
                            <img
                              src={`https://api.futoji.ru${mod.image}`}
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
                          <button className="add__cart-btn">В корзину</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
      ))}
    </div>
  );
};
