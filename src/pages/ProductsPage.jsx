import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 將 "收藏" 儲存在 localStorage 並取用
  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : {};

    return initWishList;
  });

  const toggleWishListItem = (product_id) => {
    const newWishList = {
      ...wishList,
      [product_id]: !wishList[product_id],
    };

    localStorage.setItem("wishList", JSON.stringify(newWishList));
    setWishList(newWishList);
  };

  // 取得全部產品列表
  useEffect(() => {
    const getAllProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
        // console.log(res.data.products);
        setAllProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
        // console.log(error.response.data.message);
      } finally {
        setIsScreenLoading(false);
      }
    };
    getAllProducts();
  }, []);
  // 取得篩選後的產品列表
  useEffect(() => {
    getProducts();
  }, [selectedCategory]);
  const getProducts = async (page) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/products?page=${page}&category=${
          selectedCategory === "全部" ? "" : selectedCategory
        }`
      );
      // console.log(res.data);
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗");
      // console.log(error.response.data.message);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 篩選分類
  const categories = [
    "全部",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory === "全部") return product;

    return product.category === selectedCategory;
  });

  // 頁面處理
  const [pageInfo, setPageInfo] = useState({});
  const handlePageChange = (page) => {    
    console.log("頁面: ", page);
    getProducts(page);
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
              "url(https://images.unsplash.com/photo-1573435567032-ff5982925350?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center 20%",
            opacity: 0.2,
          }}
        ></div>
        <h2 className="fw-bold">吃好、用好、開心玩</h2>
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
                    <h4 className="mb-0">分類</h4>
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
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            type="button"
                            className="btn border-none py-2 d-block text-muted"
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
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
                    <button
                      type="button"
                      className="btn border-none text-dark"
                      onClick={() => toggleWishListItem(product.id)}
                    >
                      <i
                        className={`${
                          wishList[product.id] ? "fas" : "far"
                        } fa-heart position-absolute`}
                        style={{ right: "16px", top: "16px" }}
                      ></i>
                    </button>

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
                <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
                  <a
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => handlePageChange(pageInfo.current_page - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({ length: pageInfo.total_pages }).map(
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        pageInfo.current_page === index + 1 && "active"
                      }`}
                    >
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
                <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
                  <a
                    className="page-link"
                    aria-label="Next"
                    onClick={() => handlePageChange(pageInfo.current_page + 1)}
                  >
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