import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 引入 css
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from "react-router-dom";

import router from './router'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
