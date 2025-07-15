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
    <div className="container-fluid">
      {/* 背景圖與標語 */}
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
            backgroundPosition: "center center",
            opacity: 0.1,
          }}
        ></div>
        <h2 className="fw-bold">Lorem ipsum.</h2>
      </div>

      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 左側篩選列表 */}
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                {/* 下拉選單標題 */}
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                {/* 下拉選單列表 */}
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingTwo"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingThree"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">Lorem ipsum</h4>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 d-block text-muted">
                          Lorem ipsum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 右側產品列表 */}
          <div className="col-md-8">
            <div className="row">
              {products.map((product) => (
                <div className="col-md-6" key={product.id}>
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-0"
                      alt={product.title}
                    />
                    {/* 收藏 icon */}
                    <a href="#" className="text-dark">
                      <i
                        className="far fa-heart position-absolute"
                        style={{ right: "16px", top: "16px" }}
                      ></i>
                    </a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <Link to={`/products/${product.id}`}>
                          {product.title}
                        </Link>
                      </h4>
                      <p className="card-text mb-0">
                        NT${product.price?.toLocaleString()}
                        <span className="ms-2 text-muted ">
                          <del>NT${product.origin_price?.toLocaleString()}</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 頁碼元件 */}
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
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

  // return (
  //   <div className="container">
  //     <table className="mt-4 table align-middle">
  //       <thead>
  //         <tr>
  //           <th>圖片</th>
  //           <th>商品名稱</th>
  //           <th>價格</th>
  //           <th></th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {products.map((product) => (
  //           <tr key={product.id}>
  //             <td style={{ width: "200px" }}>
  //               <img
  //                 className="img-fluid"
  //                 src={product.imageUrl}
  //                 alt={product.title}
  //               />
  //             </td>
  //             <td>{product.title}</td>
  //             <td>
  //               <del className="h6">原價 {product.origin_price} 元</del>
  //               <div className="h5">特價 {product.price} 元</div>
  //             </td>
  //             <td>
  //               <div className="btn-group btn-group-sm">
  //                 <Link
  //                   to={`/products/${product.id}`}
  //                   className="btn btn-outline-secondary"
  //                 >
  //                   <i className="fas fa-spinner fa-pulse"></i>
  //                   查看更多
  //                 </Link>
  //                 <button
  //                   disabled={isLoading}
  //                   type="button"
  //                   className="btn btn-danger d-flex align-items-center gap-1"
  //                   onClick={() => {
  //                     addCart(product.id, 1);
  //                   }}
  //                 >
  //                   加到購物車
  //                   {isLoading && (
  //                     <ClipLoader
  //                       color="black"
  //                       size={15}
  //                       aria-label="Loading Spinner"
  //                     />
  //                   )}
  //                 </button>
  //               </div>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

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