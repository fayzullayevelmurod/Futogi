import { Route, Routes } from "react-router-dom";
import { Home, Rolls } from "./pages";

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
];
