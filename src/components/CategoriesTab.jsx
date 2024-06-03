// CategoriesTab.js
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";
import { TitleBox } from "./TitleBox";
import { getCategories, getCategoryById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { productName } = useParams();

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
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
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
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  return (
    <>
      {selectedCategory && (
        <TitleBox name={selectedCategory.name} />
      )}
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

      <div className="parent_box">
        <img className="gradient_big" src={assets.gradientBig} alt="" />
        <div className="main_container" style={{ textAlign: "center" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <ProductCard selectedCategory={selectedCategory?.products || []} />
          )}
        </div>
      </div>
    </>
  );
};
