import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";

export const routes = [
  { path: "/", name: "Home", component: <Home /> },
  { path: "/calculator", name: "Calculator", component: <p>brak</p> },
  // Dodaj tutaj inne trasy
];

export const IndexRouter: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((e) => (
          <Route path={e.path} element={e.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
