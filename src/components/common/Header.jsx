import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateCartData } from "../../redux/cartSlice";
import { useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

// 導覽列 NavLink
const routes = [
  {
    path: "/",
    name: "首頁",
  },
  {
    path: "/products",
    name: "產品列表",
  },
  {
    path: "/cart",
    name: "購物車",
  },
];

export default function Header() {
  //store 裡面的 cart 的 carts
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  // 取得購物車列表
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    // setIsScreenLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      // console.log(res);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得購物車列表失敗");
    } finally {
      // setIsScreenLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="./index.html">
          毛孩柑仔店
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                className="nav-item nav-link me-4"
                to={route.path}
              >
                {route.name === "購物車" ? (
                  <div className="position-relative">
                    <i className="fas fa-shopping-cart"></i>
                    <span
                      className="position-absolute badge text-bg-success rounded-circle"
                      style={{
                        bottom: "12px",
                        left: "12px",
                      }}
                    >
                      {carts?.length}
                    </span>
                  </div>
                ) : (
                  route.name
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}