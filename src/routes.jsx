import { Route, Routes } from "react-router-dom";
import { Cart, Home, Rolls } from "./pages";

export const AppRoutes = () => (
  <Routes>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
);
const routes = [
  { path: "/", element: <Home /> },
  { path: "/rolls", element: <Rolls /> },
  { path: "/cart", element: <Cart /> },
];
