import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 取得產品列表
  useEffect(() => {
    const getProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        // console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
        // console.log(error.response.data.message);
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  // 加入購物車
  const addCart = async (product_id, qty) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty,
        },
      });
      // console.log(res);
      alert(res.data.message);
    } catch (error) {
      // console.log(error.response.data.message);
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <table className="mt-4 table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ width: "200px" }}>
                <img
                  className="img-fluid"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </td>
              <td>{product.title}</td>
              <td>
                <del className="h6">原價 {product.origin_price} 元</del>
                <div className="h5">特價 {product.price} 元</div>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-secondary"
                  >
                    <i className="fas fa-spinner fa-pulse"></i>
                    查看更多
                  </Link>
                  <button
                    disabled={isLoading}
                    type="button"
                    className="btn btn-danger d-flex align-items-center gap-1"
                    onClick={() => {
                      addCart(product.id, 1);
                    }}
                  >
                    加到購物車
                    {isLoading && (
                      <ClipLoader
                        color="black"
                        size={15}
                        aria-label="Loading Spinner"
                      />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 滿版 Loading */}
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 999,
          }}
        >
          <ClipLoader
            color="black"
            size={50}
            aria-label="Loading Spinner"
            cssOverride={{ borderWidth: "5px" }}
          />
        </div>
      )}
    </div>
  );
}