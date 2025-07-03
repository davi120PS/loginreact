import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./src/App";
import { RouterProvider } from "react-router-dom";
import { router } from "./src/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
        <h1 className="text-center pt-4">Inicio hhaha</h1>
    </>
    <RouterProvider router={router} />
  </StrictMode>
);