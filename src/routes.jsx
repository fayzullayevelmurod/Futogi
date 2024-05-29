import { Route, Routes } from "react-router-dom";
import { Cart, Home, Information, MakingOrder, Products } from "./pages";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  { path: "/making-an-order", element: <MakingOrder /> },
  { path: "/information", element: <Information /> },
];

export const AppRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);
