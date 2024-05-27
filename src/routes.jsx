import { Route, Routes } from "react-router-dom";
import { Cart, Home, Products } from "./pages";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <Cart /> },
];

export const AppRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);
