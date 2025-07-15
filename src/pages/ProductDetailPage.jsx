import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function ProductDetailPage() {
  const [product, setProduct] = useState({});
  // 從 useParams 解構出路由的 id 並重新命名為 product_id
  const { id: product_id } = useParams();
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 取得單一產品
  useEffect(() => {
    const getProduct = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${product_id}`
        );
        // console.log(res.data.product);
        setProduct(res.data.product);
      } catch (error) {
        alert("取得產品失敗");
        // console.log(error.response.data.message);
        navigate("/products");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProduct();
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
    <div className="container mt-4">
      {Object.keys(product).length !== 0 && (
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid"
              src={product.imageUrl}
              alt={product.title}
            />
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center gap-2">
              <h2>{product.title}</h2>
              <span className="badge text-bg-success">{product.category}</span>
            </div>
            <p className="mb-3">{product.description}</p>
            <p className="mb-3">{product.content}</p>
            <h5 className="mb-3">NT$ {product.price}</h5>
            <div className="input-group align-items-center w-75">
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(Number(e.target.value))}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button
                disabled={isLoading}
                type="button"
                className="btn btn-primary d-flex align-items-center gap-1"
                onClick={() => addCart(product.id, qtySelect)}
              >
                加入購物車
                {isLoading && (
                  <ClipLoader
                    color="black"
                    size={15}
                    aria-label="Loading Spinner"
                  />
                )}
              </button>
            </div>            
            <Link to="/products" className="btn btn-secondary mt-5">
              回到產品列表
            </Link>
          </div>
        </div>
      )}

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
