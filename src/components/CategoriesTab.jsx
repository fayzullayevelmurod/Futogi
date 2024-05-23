// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ProductCard } from "./ProductCard";
// import assets from "../assets";

// export const CategoriesTab = () => {
//   const API_URL = "https://api.futoji.ru";
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiClient = axios.create({
//     baseURL: API_URL,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await apiClient.get("/categories");
//       setCategories(response.data.data);
//     } catch (error) {
//       setError(`Error fetching categories: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCategoryById = async (id) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await apiClient.get(`/categories/getById?q=${id}`);
//       setSelectedCategory(response.data);
//     } catch (error) {
//       setError(`Error fetching category by ID: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = async (category) => {
//     const subCategories = category.subCategories;
//     if (subCategories.length) {
//       for (const item of subCategories) {
//         await fetchCategoryById(item.id);
//       }
//     } else {
//       console.log("No subcategories");
//     }
//   };

//   return (
//     <>
//       <div className="categories__tabs">
//         <ul>
//           {categories.map((category) => (
//             <li key={category.id} onClick={() => handleCategoryClick(category)}>
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="parent_box">
//         <img className="gradient_big" src={assets.gradientBig} alt="" />
//         <div className="main_container">
//           {selectedCategory ? (
//             <div className="container">
//               <div className="category_details">
//                 {selectedCategory.data && (
//                   <ProductCard selectedCategory={selectedCategory} />
//                 )}
//               </div>
//             </div>
//           ) : (
//             <span className="no_data">No data</span>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";

export const CategoriesTab = () => {
  const API_URL = "https://api.futoji.ru";
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      setError(`Error fetching categories: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/categories/getById?q=${id}`);
      return response.data;
    } catch (error) {
      setError(`Error fetching category by ID: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(null);
    const subCategories = category.subCategories;
    if (subCategories.length) {
      const subCategoriesData = [];
      for (const item of subCategories) {
        const data = await fetchCategoryById(item.id);
        if (data) {
          subCategoriesData.push(data);
        }
      }
      setSelectedCategory({ ...category, subCategories: subCategoriesData });
    } else {
      setSelectedCategory({ ...category, subCategories: [] });
    }
  };

  return (
    <>
      <div className="categories__tabs">
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
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
          ) : selectedCategory ? (
            selectedCategory.subCategories.length ? (
              <div className="container">
                <div className="category_details">
                  {selectedCategory.subCategories.map((subCategory) => (
                    <ProductCard
                      key={subCategory.id}
                      selectedCategory={subCategory}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <span className="no_data">No data</span>
            )
          ) : (
            <span className="no_data">No data</span>
          )}
        </div>
      </div>
    </>
  );
};
