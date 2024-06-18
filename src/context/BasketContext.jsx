import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const isProductInBasket = prevBasket.some((item) => item.id === product.id);
      if (!isProductInBasket) {
        return [...prevBasket, { ...product, count: 1 }];
      } else {
        return prevBasket;
      }
    });
  };


  const updateProductCount = (productId, count) => {
    setBasket((prevBasket) =>
      prevBasket.map((product) =>
        product.id === productId ? { ...product, count } : product
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem("basket");
    localStorage.removeItem("productCounts");
  };

  const removeProduct = (productId) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== productId));
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, updateProductCount, clearBasket, removeProduct }}
    >
      {children}
    </BasketContext.Provider>
  );
};