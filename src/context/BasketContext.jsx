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

  const addToBasket = (productWithMods) => {
    setBasket((prevBasket) => {
      const isProductWithModsInBasket = prevBasket.some((item) => {
        return (
          item.id === productWithMods.id &&
          item.mods &&
          productWithMods.mods &&
          item.mods.every((mod, index) => mod.id === productWithMods.mods[index].id)
        );
      });

      if (!isProductWithModsInBasket) {
        return [...prevBasket, { ...productWithMods, count: 1 }];
      } else {
        return prevBasket;
      }
    });
  };

  const updateProductCount = (productId, mods = [], count) => {
    setBasket((prevBasket) =>
      prevBasket.map((product) =>
        product.id === productId &&
          product.mods &&
          mods &&
          product.mods.every((mod, index) => mod.id === mods[index].id)
          ? { ...product, count }
          : product
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem("basket");
  };

  const removeProduct = (productId, mods = []) => {
    setBasket((prevBasket) =>
      prevBasket.filter(
        (item) =>
          item.id !== productId || !item.mods || !mods || !item.mods.every((mod, index) => mod.id === mods[index].id)
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, updateProductCount, clearBasket, removeProduct }}
    >
      {children}
    </BasketContext.Provider>
  );
};
