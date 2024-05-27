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
    setBasket((prevBasket) => [...prevBasket, product]);
  };
  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem("basket");
  };
  return (
    <BasketContext.Provider value={{ basket, addToBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
