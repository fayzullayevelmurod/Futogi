// import { useEffect, useState } from "react";
// import { ProductCard } from "./ProductCard";
// import assets from "../assets";
// import { Loader } from "./Loader";
// import { TitleBox } from "./TitleBox";
// import { getCategories, getCategoryById } from "../services/api";
// import { useNavigate, useParams } from "react-router-dom";

// export const CategoriesTab = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const { productName } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getCategories();
//         const categoriesData = response.data.data;
//         setCategories(categoriesData);

//         if (categoriesData.length > 0) {
//           const initialCategory = productName
//             ? categoriesData.find((cat) => cat.name === productName)
//             : categoriesData[0];

//           if (initialCategory) {
//             const categoryDetails = await getCategoryById(initialCategory.id);
//             setSelectedCategory({
//               name: initialCategory.name,
//               products: categoryDetails.data.data,
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [productName]);

//   const handleCategoryClick = async (category) => {
//     if (category.name === productName) {
//       return;
//     }
//     navigate(`/products/${category.name}`);
//     try {
//       const categoryDetails = await getCategoryById(category.id);
//       setSelectedCategory({
//         name: category.name,
//         products: categoryDetails.data.data,
//       });
//     } catch (error) {
//       console.error("Error fetching category details:", error);
//     }
//   };

//   return (
//     <>
//       {selectedCategory && (
//         <TitleBox name={selectedCategory.name} />
//       )}
//       <div className="categories__tabs">
//         <ul>
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               onClick={() => handleCategoryClick(category)}
//               className={productName === category.name ? "active" : ""}
//             >
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="parent_box">
//         <img className="gradient_big" src={assets.gradientBig} alt="" />
//         <div className="main_container" style={{ textAlign: "center" }}>
//           {isLoading ? (
//             <Loader />
//           ) : (
//             <ProductCard selectedCategory={selectedCategory?.products || []} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };


// CategoriesTab.jsx
// import { useEffect, useState } from "react";
// import assets from "../assets";
// import { Loader } from "./Loader";
// import { getCategories, getCategoryById } from "../services/api";
// import { useNavigate, useParams } from "react-router-dom";
// import { ProductCard } from "./ProductCard";

// export const CategoriesTab = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedNoodle, setSelectedNoodle] = useState(null);
//   const [selectedSauce, setSelectedSauce] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const { productName } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getCategories();
//         const categoriesData = response.data.data;
//         setCategories(categoriesData);

//         if (categoriesData.length > 0) {
//           const initialCategory = productName
//             ? categoriesData.find((cat) => cat.name === productName)
//             : categoriesData[0];

//           if (initialCategory) {
//             const categoryDetails = await getCategoryById(initialCategory.id);
//             setSelectedCategory({
//               name: initialCategory.name,
//               products: categoryDetails.data.data,
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [productName]);

//   const handleCategoryChange = async (event) => {
//     const categoryName = event.target.value;
//     const category = categories.find((cat) => cat.name === categoryName);
//     navigate(`/products/${category.name}`);
//     try {
//       const categoryDetails = await getCategoryById(category.id);
//       setSelectedCategory({
//         name: category.name,
//         products: categoryDetails.data.data,
//       });
//       setSelectedProduct(null);
//       setSelectedNoodle(null);
//       setSelectedSauce(null);
//     } catch (error) {
//       console.error("Error fetching category details:", error);
//     }
//   };

//   const handleProductChange = (event) => {
//     const productId = event.target.value;
//     const product = selectedCategory.products.find((prod) => prod.id === parseInt(productId));
//     setSelectedProduct(product);
//     setSelectedNoodle(null);
//     setSelectedSauce(null);
//   };

//   const handleNoodleChange = (event) => {
//     const noodleId = event.target.value;
//     const noodle = selectedProduct.mods.find((mod) => mod.id === parseInt(noodleId));
//     setSelectedNoodle(noodle);
//   };

//   const handleSauceChange = (event) => {
//     const sauceId = event.target.value;
//     const sauce = selectedProduct.mods.find((mod) => mod.id === parseInt(sauceId));
//     setSelectedSauce(sauce);
//   };

//   return (
//     <>
//       <div className="categories__tabs">
//         <select onChange={handleCategoryChange}>
//           <option value="">Выберите категорию</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCategory && (
//         <div className="parent_box">
//           <img className="gradient_big" src={assets.gradientBig} alt="" />
//           <div className="main_container" style={{ textAlign: "center" }}>
//             {isLoading ? (
//               <Loader />
//             ) : (
//               <div>
//                 <select onChange={handleProductChange}>
//                   <option value="">Выберите продукт</option>
//                   {selectedCategory.products.map((product) => (
//                     <option key={product.id} value={product.id}>
//                       {product.name}
//                     </option>
//                   ))}
//                 </select>

//                 {selectedProduct && (
//                   <>
//                     <ProductCard product={selectedProduct} />
//                     <select onChange={handleNoodleChange}>
//                       <option value="">Выберите лапшу</option>
//                       {selectedProduct.mods
//                         .filter((mod) => mod.name.includes("Лапша"))
//                         .map((noodle) => (
//                           <option key={noodle.id} value={noodle.id}>
//                             {noodle.name}
//                           </option>
//                         ))}
//                     </select>
//                   </>
//                 )}

//                 {selectedNoodle && (
//                   <>
//                     <ProductCard product={selectedNoodle} />
//                     <select onChange={handleSauceChange}>
//                       <option value="">Выберите соус</option>
//                       {selectedProduct.mods
//                         .filter((mod) => mod.name.includes("Соус"))
//                         .map((sauce) => (
//                           <option key={sauce.id} value={sauce.id}>
//                             {sauce.name}
//                           </option>
//                         ))}
//                     </select>
//                   </>
//                 )}

//                 {selectedSauce && (
//                   <>
//                     <ProductCard product={selectedSauce} />
//                     <button
//                       className="add__cart-btn"
//                       onClick={() =>
//                         handleAddToBasket({
//                           ...selectedProduct,
//                           mods: [selectedNoodle, selectedSauce],
//                         })
//                       }
//                     >
//                       Добавить в корзину
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// 3
// CategoriesTab.jsx
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNoodle, setSelectedNoodle] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
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
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
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
              <div>
                <select onChange={handleProductChange}>
                  <option value="">Выберите продукт</option>
                  {selectedCategory.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>

                {selectedProduct && (
                  <>
                    <ProductCard product={selectedProduct} />
                    <select onChange={handleNoodleChange}>
                      <option value="">Выберите лапшу</option>
                      {selectedProduct.mods
                        .filter((mod) => mod.name.includes("Лапша"))
                        .map((noodle) => (
                          <option key={noodle.id} value={noodle.id}>
                            {noodle.name}
                          </option>
                        ))}
                    </select>
                  </>
                )}

                {selectedNoodle && (
                  <>
                    <ProductCard product={selectedNoodle} />
                    <select onChange={handleSauceChange}>
                      <option value="">Выберите соус</option>
                      {selectedProduct.mods
                        .filter((mod) => mod.name.includes("Соус"))
                        .map((sauce) => (
                          <option key={sauce.id} value={sauce.id}>
                            {sauce.name}
                          </option>
                        ))}
                    </select>
                  </>
                )}

                {selectedSauce && (
                  <>
                    <ProductCard product={selectedSauce} />
                    <button
                      className="add__cart-btn"
                      onClick={() =>
                        handleAddToBasket({
                          ...selectedProduct,
                          mods: [selectedNoodle, selectedSauce],
                        })
                      }
                    >
                      Добавить в корзину
                    </button>
                  </>
                )}
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