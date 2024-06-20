import { useContext, useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";
import { getCategories, getCategoryById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import { toast } from "react-toastify";

export const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNoodle, setSelectedNoodle] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { productName } = useParams();

  const prevCategoryName = useRef(productName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data.data;
        setCategories(categoriesData);

        if (categoriesData.length > 0) {
          const initialCategory = productName
            ? categoriesData.find((cat) => cat.name === productName)
            : categoriesData[0];

          if (initialCategory) {
            const categoryDetails = await getCategoryById(initialCategory.id);
            setSelectedCategory({
              name: initialCategory.name,
              products: categoryDetails.data.data,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productName]);

  useEffect(() => {
    if (prevCategoryName.current !== productName && productName === "WOK") {
      setSelectedProduct(null);
      setSelectedNoodle(null);
      setSelectedSauce(null);
    }
    prevCategoryName.current = productName;
  }, [productName]);

  const handleCategoryClick = async (category) => {
    if (category.name === productName) {
      return;
    }
    navigate(`/products/${category.name}`);
    try {
      const categoryDetails = await getCategoryById(category.id);
      setSelectedCategory({
        name: category.name,
        products: categoryDetails.data.data,
      });
      setSelectedProduct(null);
      setSelectedNoodle(null);
      setSelectedSauce(null);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = selectedCategory.products.find((prod) => prod.id === parseInt(productId));
    setSelectedProduct(product);
    setSelectedNoodle(null);
    setSelectedSauce(null);
  };

  const handleNoodleChange = (event) => {
    const noodleId = event.target.value;
    const noodle = selectedProduct.mods.find((mod) => mod.id === parseInt(noodleId));
    setSelectedNoodle(noodle);
  };

  const handleSauceChange = (event) => {
    const sauceId = event.target.value;
    const sauce = selectedProduct.mods.find((mod) => mod.id === parseInt(sauceId));
    setSelectedSauce(sauce);
  };

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

  return (
    <>
      <div className="categories__tabs">
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={productName === category.name ? "active" : ""}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedCategory && (
        <div className="parent_box">
          <img className="gradient_big" src={assets.gradientBig} alt="" />
          <div className="main_container" style={{ textAlign: "center" }}>
            {isLoading ? (
              <Loader />
            ) : selectedCategory.name === "WOK" ? (
              <div className="parent__select">
                <div className="all__filter-select">
                  <select className="select__product" onChange={handleProductChange}>
                    <option value="">Выберите продукт</option>
                    {selectedCategory.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>

                  {selectedProduct && (
                    <select className="select__product" onChange={handleNoodleChange}>
                      <option value="">Выберите лапшу</option>
                      {selectedProduct.mods
                        .filter((mod) => mod.name.includes("Лапша"))
                        .map((noodle) => (
                          <option key={noodle.id} value={noodle.id}>
                            {noodle.name}
                          </option>
                        ))}
                    </select>
                  )}

                  {selectedNoodle && (
                    <select className="select__product" onChange={handleSauceChange}>
                      <option value="">Выберите соус</option>
                      {selectedProduct.mods
                        .filter((mod) => mod.name.includes("Соус"))
                        .map((sauce) => (
                          <option key={sauce.id} value={sauce.id}>
                            {sauce.name}
                          </option>
                        ))}
                    </select>
                  )}

                  {selectedSauce && (
                    <button
                      className="add__cart-btn"
                      onClick={() =>
                        handleAddToBasket({
                          ...selectedProduct,
                          mods: [selectedNoodle, selectedSauce],
                        })
                      }
                      disabled={!selectedProduct || !selectedNoodle || !selectedSauce}
                    >
                      Добавить в корзину
                    </button>
                  )}
                </div>

                <div className="category_details no-stretch">
                  {selectedProduct && <ProductCard product={selectedProduct} />}
                  {selectedNoodle && <ProductCard product={selectedNoodle} />}
                  {selectedSauce && <ProductCard product={selectedSauce} />}
                </div>
              </div>
            ) : (
              <ProductCard selectedCategory={selectedCategory.products} />
            )}
          </div>
        </div>
      )}
    </>
  );
};