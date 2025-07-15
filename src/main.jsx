import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 引入 css / JS
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js";
import { RouterProvider } from "react-router-dom";

import router from './router'
import "./assets/styles/all.scss";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
