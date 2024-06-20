// import { useContext, useEffect, useRef, useState } from "react";
// import { ProductCard } from "./ProductCard";
// import assets from "../assets";
// import { Loader } from "./Loader";
// import { getCategories, getCategoryById } from "../services/api";
// import { useNavigate, useParams } from "react-router-dom";
// import { BasketContext } from "../context/BasketContext";
// import { toast } from "react-toastify";
// import { CustomSelect } from "./CustomSelect";

// export const CategoriesTab = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedNoodle, setSelectedNoodle] = useState(null);
//   const [selectedSauce, setSelectedSauce] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const { productName } = useParams();

//   const prevCategoryName = useRef(productName);

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

//   useEffect(() => {
//     if (prevCategoryName.current !== productName && productName === "WOK") {
//       setSelectedProduct(null);
//       setSelectedNoodle(null);
//       setSelectedSauce(null);
//     }
//     prevCategoryName.current = productName;
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
//       setSelectedProduct(null);
//       setSelectedNoodle(null);
//       setSelectedSauce(null);
//     } catch (error) {
//       console.error("Error fetching category details:", error);
//     }
//   };

//   const handleProductChange = (productId) => {
//     const product = selectedCategory.products.find(
//       (prod) => prod.id === parseInt(productId),
//     );
//     setSelectedProduct(product);
//     setSelectedNoodle(null);
//     setSelectedSauce(null);
//   };

//   const handleNoodleChange = (event) => {
//     const noodleId = event.target.value;
//     const noodle = selectedProduct.mods.find(
//       (mod) => mod.id === parseInt(noodleId),
//     );
//     setSelectedNoodle(noodle);
//   };

//   const handleSauceChange = (event) => {
//     const sauceId = event.target.value;
//     const sauce = selectedProduct.mods.find(
//       (mod) => mod.id === parseInt(sauceId),
//     );
//     setSelectedSauce(sauce);
//   };

//   const { addToBasket, basket } = useContext(BasketContext);
//   const handleAddToBasket = (product, noodle, sauce) => {
//     if (product && noodle && sauce) {
//       const productWithMods = {
//         ...product,
//         mods: [noodle, sauce],
//       };
//       const isProductWithModsInBasket = basket.some(
//         (item) =>
//           item.id === productWithMods.id &&
//           item.mods.every(
//             (mod, index) => mod.id === productWithMods.mods[index].id,
//           ),
//       );

//       if (!isProductWithModsInBasket) {
//         addToBasket(productWithMods);
//         toast.success("Продукт был добавлен в корзину");
//       } else {
//         toast.info("Продукт уже находится в корзине");
//       }
//     } else {
//       toast.error("Произошла ошибка, попробуйте еще раз");
//     }
//   };

//   return (
//     <>
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

//       {selectedCategory && (
//         <div className="parent_box">
//           <img className="gradient_big" src={assets.gradientBig} alt="" />
//           <div className="main_container" style={{ textAlign: "center" }}>
//             {isLoading ? (
//               <Loader />
//             ) : selectedCategory.name === "WOK" ? (
//               <div className="parent__select">
//                 <div className="all__filter-select">
//                   <CustomSelect
//                     options={selectedCategory.products}
//                     onChange={handleProductChange}
//                     placeholder="Выберите продукт"
//                     value={selectedProduct ? selectedProduct.id : ""}
//                   />

//                   {selectedProduct && (
//                     <CustomSelect
//                       options={selectedProduct.mods.filter((mod) =>
//                         mod.name.includes("Лапша"),
//                       )}
//                       onChange={handleNoodleChange}
//                       placeholder="Выберите лапшу"
//                       value={selectedNoodle ? selectedNoodle.id : ""}
//                     />
//                   )}

//                   {selectedNoodle && (
//                     <CustomSelect
//                       options={selectedProduct.mods.filter((mod) =>
//                         mod.name.includes("Соус"),
//                       )}
//                       onChange={handleSauceChange}
//                       placeholder="Выберите соус"
//                       value={selectedSauce ? selectedSauce.id : ""}
//                     />
//                   )}

//                   {selectedSauce && (
//                     <button
//                       className="add__cart-btn"
//                       onClick={() =>
//                         handleAddToBasket(
//                           selectedProduct,
//                           selectedNoodle,
//                           selectedSauce,
//                         )
//                       }
//                       disabled={
//                         !selectedProduct || !selectedNoodle || !selectedSauce
//                       }
//                     >
//                       Добавить в корзину
//                     </button>
//                   )}
//                 </div>

//                 <div className="category_details no-stretch">
//                   {selectedProduct && <ProductCard product={selectedProduct} />}
//                   {selectedNoodle && <ProductCard product={selectedNoodle} />}
//                   {selectedSauce && <ProductCard product={selectedSauce} />}
//                 </div>
//               </div>
//             ) : (
//               <ProductCard selectedCategory={selectedCategory.products} />
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

import { useContext, useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import assets from "../assets";
import { Loader } from "./Loader";
import { getCategories, getCategoryById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import { toast } from "react-toastify";
import { CustomSelect } from "./CustomSelect";

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

  const handleProductChange = (productId) => {
    const product = selectedCategory.products.find(
      (prod) => prod.id === parseInt(productId),
    );
    setSelectedProduct(product);
    setSelectedNoodle(null);
    setSelectedSauce(null);
  };

  const handleNoodleChange = (noodleId) => {
    const noodle = selectedProduct.mods.find(
      (mod) => mod.id === parseInt(noodleId),
    );
    setSelectedNoodle(noodle);
  };

  const handleSauceChange = (sauceId) => {
    const sauce = selectedProduct.mods.find(
      (mod) => mod.id === parseInt(sauceId),
    );
    setSelectedSauce(sauce);
  };

  const { addToBasket, basket } = useContext(BasketContext);
  const handleAddToBasket = (product, noodle, sauce) => {
    if (product && noodle && sauce) {
      const productWithMods = {
        ...product,
        mods: [noodle, sauce],
      };
      const isProductWithModsInBasket = basket.some(
        (item) =>
          item.id === productWithMods.id &&
          item.mods.every(
            (mod, index) => mod.id === productWithMods.mods[index].id,
          ),
      );

      if (!isProductWithModsInBasket) {
        addToBasket(productWithMods);
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
                  <CustomSelect
                    options={selectedCategory.products}
                    onChange={handleProductChange}
                    placeholder="Выберите продукт"
                    value={selectedProduct ? selectedProduct.id : ""}
                  />

                  {selectedProduct && (
                    <CustomSelect
                      options={selectedProduct.mods.filter((mod) =>
                        mod.name.includes("Лапша"),
                      )}
                      onChange={handleNoodleChange}
                      placeholder="Выберите лапшу"
                      value={selectedNoodle ? selectedNoodle.id : ""}
                    />
                  )}

                  {selectedNoodle && (
                    <CustomSelect
                      options={selectedProduct.mods.filter((mod) =>
                        mod.name.includes("Соус"),
                      )}
                      onChange={handleSauceChange}
                      placeholder="Выберите соус"
                      value={selectedSauce ? selectedSauce.id : ""}
                    />
                  )}

                  {selectedSauce && (
                    <button
                      className="add__cart-btn"
                      onClick={() =>
                        handleAddToBasket(
                          selectedProduct,
                          selectedNoodle,
                          selectedSauce,
                        )
                      }
                      disabled={
                        !selectedProduct || !selectedNoodle || !selectedSauce
                      }
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
