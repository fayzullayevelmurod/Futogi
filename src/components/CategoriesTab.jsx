import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";
import { TitleBox } from "./TitleBox";
import {
  getCategories,
  getCategoryById,
  getProductByName,
} from "../services/api";

export const CategoriesTab = ({ allChildCategories }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allSubCategories, setAllSubCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data.data;
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          const categoryDetails = await getCategoryById(firstCategory.id);
          setSelectedCategory(categoryDetails.data.data);
          setSelectedCategoryId(firstCategory.id);
        }
        if (allChildCategories && allSubCategories.length) {
          const getAllSubCategories = await getProductByName(
            categoriesData[0].name
          );
          console.log(getAllSubCategories, 'all sub categories');
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = async (category) => {
    if (category.id === selectedCategoryId) {
      return;
    }
    try {
      const categoryDetails = await getCategoryById(category.id);
      setSelectedCategory(categoryDetails.data.data);
      setSelectedCategoryId(category.id);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  return (
    <>
      {categories.length > 0 && selectedCategory?.length > 0 && (
        <TitleBox name={selectedCategory[0].name} />
      )}
      <div className="categories__tabs">
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategoryId === category.id ? "active" : ""}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="parent_box ">
        <img className="gradient_big" src={assets.gradientBig} alt="" />
        <div className="main_container" style={{ textAlign: "center" }}>
          <div className="category_details">
            {isLoading ? (
              <Loader />
            ) : selectedCategory?.length > 0 ? (
              <ProductCard selectedCategory={selectedCategory} />
            ) : (
              <span className="no_data">No data</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
