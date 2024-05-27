import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";
import { TitleBox } from "./TitleBox";
import { getCategories, getCategoryById, getImageById } from "../services/api";
import { getImageUrl } from "../utils/helpers";

export const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <ProductCard selectedCategory={selectedCategory} />
            )}
            {/* {isLoading ? (
              <Loader />
            ) : (
              <div className="category_details">
                {selectedCategory.map((item) => (
                  <div key={item.id}>
                    <ProductCard
                      selectedCategory={item}
                      image={`https://api.futoji.ru/${item.image}`}
                    />
                    {item.mods && item.mods.length > 0 && (
                      <div className="mods">
                        {item.mods.map((mod) => (
                          <ProductCard
                            key={mod.id}
                            selectedCategory={mod}
                            image={`https://api.futoji.ru/${mod.image}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )} */}
          </>
        </div>
      </div>
    </>
  );
};
