import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 引入 css / JS
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from './router'
import "./assets/styles/all.scss";
import store from './redux/store';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
