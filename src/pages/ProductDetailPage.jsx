import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCartData } from "../redux/cartSlice";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function ProductDetailPage() {
  const [product, setProduct] = useState({});
  // 從 useParams 解構出路由的 id 並重新命名為 product_id
  const { id: product_id } = useParams();
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 取得購物車列表
  useEffect(() => {
    getCart();

    // 初始化時建立 swiper 實例
    new Swiper(swiperRef.current, {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }, []);
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      // console.log(res);
      dispatch(updateCartData(res.data.data))
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得購物車列表失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

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
      getCart();
    } catch (error) {
      // console.log(error.response.data.message);
      alert("加入購物車失敗");
    } finally {
      setQtySelect(1);
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          {/* 左側輪播圖片 */}
          <div className="col-md-7">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={product.imageUrl}
                    className="d-block w-100"
                    alt={product.title}
                  />
                </div>
              </div>
              {/* <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a> */}
            </div>
          </div>
          {/* 右側說明欄位 */}
          <div className="col-md-5">
            {/* tag 標籤 */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/">
                    首頁
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/products">
                    產品列表
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  詳細資訊
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <p className="mb-0 text-muted text-end">
              <del>NT${product.origin_price?.toLocaleString()}</del>
            </p>
            <p className="h4 fw-bold text-end">
              NT${product.price?.toLocaleString()}
            </p>
            <div className="row align-items-center">
              {/* 數量 */}
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <div className="input-group-prepend">
                    <button
                      onClick={() => setQtySelect(qtySelect - 1)}
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon1"
                      disabled={qtySelect === 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 text-center my-auto shadow-none bg-light"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    value={qtySelect}
                    readOnly
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => setQtySelect(qtySelect + 1)}
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon2"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* 加入購物車 */}
              <div className="col-6">
                <button
                  onClick={() => addCart(product.id, qtySelect)}
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 圖片下方敘述 */}
        <div className="row my-5">
          <div className="col-md-3">
            <p>{product.description}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted">{product.content}</p>
          </div>
        </div>

        {/* 輪播圖片 */}
        <h3 className="fw-bold">其他圖片</h3>
        <div ref={swiperRef} className="swiper mt-4 mb-5">
          <div className="swiper-wrapper">
            {product.imagesUrl?.map((imgUrl) => (
              <div key={imgUrl} className="swiper-slide">
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={imgUrl}
                    className="card-img-top rounded-5"
                    alt="..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="container mt-4">
  //     {Object.keys(product).length !== 0 && (
  //       <div className="row">
  //         <div className="col-6">
  //           <img
  //             className="img-fluid"
  //             src={product.imageUrl}
  //             alt={product.title}
  //           />
  //         </div>
  //         <div className="col-6">
  //           <div className="d-flex align-items-center gap-2">
  //             <h2>{product.title}</h2>
  //             <span className="badge text-bg-success">{product.category}</span>
  //           </div>
  //           <p className="mb-3">{product.description}</p>
  //           <p className="mb-3">{product.content}</p>
  //           <h5 className="mb-3">NT$ {product.price}</h5>
  //           <div className="input-group align-items-center w-75">
  //             <select
  //               value={qtySelect}
  //               onChange={(e) => setQtySelect(Number(e.target.value))}
  //               id="qtySelect"
  //               className="form-select"
  //             >
  //               {Array.from({ length: 10 }).map((_, index) => (
  //                 <option key={index} value={index + 1}>
  //                   {index + 1}
  //                 </option>
  //               ))}
  //             </select>
  //             <button
  //               disabled={isLoading}
  //               type="button"
  //               className="btn btn-primary d-flex align-items-center gap-1"
  //               onClick={() => addCart(product.id, qtySelect)}
  //             >
  //               加入購物車
  //               {isLoading && (
  //                 <ClipLoader
  //                   color="black"
  //                   size={15}
  //                   aria-label="Loading Spinner"
  //                 />
  //               )}
  //             </button>
  //           </div>
  //           <Link to="/products" className="btn btn-secondary mt-5">
  //             回到產品列表
  //           </Link>
  //         </div>
  //       </div>
  //     )}

  //     {/* 滿版 Loading */}
  //     {isScreenLoading && (
  //       <div
  //         className="d-flex justify-content-center align-items-center"
  //         style={{
  //           position: "fixed",
  //           inset: 0,
  //           backgroundColor: "rgba(255, 255, 255, 0.7)",
  //           zIndex: 999,
  //         }}
  //       >
  //         <ClipLoader
  //           color="black"
  //           size={50}
  //           aria-label="Loading Spinner"
  //           cssOverride={{ borderWidth: "5px" }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
}
