import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const syncBasketWithCounts = (counts) => {
    const updatedBasket = basket.map((item) => {
      const key = `${item.id}-${item.mods ? item.mods.map((mod) => mod.id).join("-") : ""}`;
      const count = counts[key] || item.count;
      const pricePerItem = item.price / item.count;
      return { ...item, count, price: pricePerItem * count };
    });

    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  useEffect(() => {
    const productCounts =
      JSON.parse(localStorage.getItem("productCounts")) || {};
    syncBasketWithCounts(productCounts);
  }, []);

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
          item.mods.every(
            (mod, index) => mod.id === productWithMods.mods[index].id,
          )
        );
      });

      if (!isProductWithModsInBasket) {
        return [...prevBasket, { ...productWithMods, count: 1 }];
      } else {
        return prevBasket.map((item) =>
          item.id === productWithMods.id &&
          item.mods &&
          productWithMods.mods &&
          item.mods.every(
            (mod, index) => mod.id === productWithMods.mods[index].id,
          )
            ? { ...item, count: item.count + 1 }
            : item,
        );
      }
    });
  };

  const updateProductCount = (productId, mods = [], count) => {
    setBasket((prevBasket) =>
      prevBasket
        .map((product) =>
          product.id === productId &&
          product.mods &&
          mods &&
          product.mods.every((mod, index) => mod.id === mods[index].id)
            ? count === 0
              ? null
              : { ...product, count }
            : product,
        )
        .filter(Boolean),
    );

    const productCounts =
      JSON.parse(localStorage.getItem("productCounts")) || {};
    const key = `${productId}-${mods ? mods.map((mod) => mod.id).join("-") : ""}`;
    if (count === 0) {
      delete productCounts[key];
    } else {
      productCounts[key] = count;
    }
    localStorage.setItem("productCounts", JSON.stringify(productCounts));
    syncBasketWithCounts(productCounts);
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem("basket");
    localStorage.removeItem("productCounts");
  };

  const removeProduct = (productId, mods = []) => {
    setBasket((prevBasket) =>
      prevBasket.filter(
        (item) =>
          item.id !== productId ||
          !item.mods ||
          !mods ||
          !item.mods.every((mod, index) => mod.id === mods[index].id),
      ),
    );

    const productCounts =
      JSON.parse(localStorage.getItem("productCounts")) || {};
    const key = `${productId}-${mods ? mods.map((mod) => mod.id).join("-") : ""}`;
    delete productCounts[key];
    localStorage.setItem("productCounts", JSON.stringify(productCounts));
    syncBasketWithCounts(productCounts);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        updateProductCount,
        clearBasket,
        removeProduct,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
