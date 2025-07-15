import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

function App() {
  // 產品列表
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
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
    getCart();
  }, []);

  // Modal 相關
  const productModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
  }, []);

  const openModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
    setIsOpen(true);
  };

  const closeModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
    setQtySelect(1);
    setIsOpen(false);
  };

  const handleSeeMore = (product) => {
    setTempProduct(product);
    openModal();
  };
  /* 產品數量 */
  const [qtySelect, setQtySelect] = useState(1);

  // 購物車 API
  /* 取得購物車列表 */
  const [cart, setCart] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      // console.log(res);
      setCart(res.data.data);
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得購物車列表失敗");
    }
  };
  /* 加入購物車 */
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
      // 重新取得購物車列表
      getCart();
      // 當 Modal 有開啟則關閉
      if (isOpen) closeModal();
    } catch (error) {
      // console.log(error.response.data.message);
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };
  /* 清空購物車 */
  const removeCart = async () => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      alert("購物車已清空");
      // 重新渲染購物車列表
      getCart();
    } catch (error) {
      // console.log(error.response.data.message);
      alert("清空購物車失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  /* 刪除單一購物車品項 */
  const removeCartItem = async (id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      alert("產品已刪除");
      // 重新渲染購物車列表
      getCart();
    } catch (error) {
      // console.log(error.response.data.message);
      alert("刪除產品失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  /* 調整購物車產品數量 */
  const updateCartItem = async (cart_id, product_id, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cart_id}`, {
        data: {
          product_id,
          qty,
        },
      });
      // 重新渲染購物車列表
      getCart();
    } catch (error) {
      // console.log(error.response.data.message);
      alert("更新產品數量失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 表單相關處理
  /* 從 useForm 解構出需要的函式、狀態 */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = handleSubmit((userInfo) => {
    // console.log(userInfo);
    checkout(userInfo);
  });

  const checkout = async ({ message, ...user}) => {
    setIsScreenLoading(true);
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user,
          message
        }
      });

      alert("訂單送出成功");
      // 重新渲染購物車列表
      getCart();
      // 清空表單資訊
      reset();
    } catch (error) {
      // console.log(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsScreenLoading(false);
    }
  }

  // Loading 處理
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isScreenLoading) document.body.style.overflow = "hidden"; // 停止滾動
    else document.body.style.overflow = "auto"; // 恢復滾動

    // 清理副作用 (防止副作用殘留)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isScreenLoading]);

  return (
    <div className="container">
      <div className="mt-4">
        {/* 產品列表 */}
        <table className="table align-middle">
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
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleSeeMore(product)}
                    >
                      <i className="fas fa-spinner fa-pulse"></i>
                      查看更多
                    </button>
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

        {/* 產品 Modal */}
        <div
          ref={productModalRef}
          className="modal fade"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">
                  產品名稱：{tempProduct.title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={tempProduct.imageUrl}
                  alt={tempProduct.title}
                  className="img-fluid"
                />
                <p>內容：{tempProduct.content}</p>
                <p>描述：{tempProduct.description}</p>
                <p>
                  價錢：{tempProduct.price}{" "}
                  <del>{tempProduct.origin_price}</del> 元
                </p>
                <div className="input-group align-items-center">
                  <label htmlFor="qtySelect">數量：</label>
                  <select
                    id="qtySelect"
                    className="form-select"
                    value={qtySelect}
                    onChange={(e) => setQtySelect(Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  disabled={isLoading}
                  type="button"
                  className="btn btn-primary d-flex align-items-center gap-1"
                  onClick={() => {
                    addCart(tempProduct.id, qtySelect);
                  }}
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
            </div>
          </div>
        </div>

        {/* 購物車 */}
        {cart.carts?.length > 0 && (
          <div>
            <div className="text-end">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={removeCart}
              >
                清空購物車
              </button>
            </div>

            <table className="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>品名</th>
                  <th style={{ width: "150px" }}>數量/單位</th>
                  <th className="text-end">合計</th>
                </tr>
              </thead>
              <tbody>
                {cart.carts?.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeCartItem(cartItem.id)}
                      >
                        x
                      </button>
                    </td>
                    <td>{cartItem.product.title}</td>
                    <td style={{ width: "150px" }}>
                      <div className="d-flex align-items-center">
                        <div className="btn-group me-2" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            disabled={cartItem.qty === 1}
                            onClick={() =>
                              updateCartItem(
                                cartItem.id,
                                cartItem.product_id,
                                cartItem.qty - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span
                            className="btn border border-dark"
                            style={{ width: "50px", cursor: "auto" }}
                          >
                            {cartItem.qty}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              updateCartItem(
                                cartItem.id,
                                cartItem.product.id,
                                cartItem.qty + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className="input-group-text bg-transparent border-0">
                          {cartItem.product.unit}
                        </span>
                      </div>
                    </td>
                    <td className="text-end">{cartItem.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">
                    總價
                  </td>
                  <td className="text-end" style={{ width: "130px" }}>
                    {cart.final_total}
                  </td>
                </tr>
                {/*
                <tr>
                  <td colSpan="3" className="text-end text-success">
                    折扣價
                  </td>
                  <td
                    className="text-end text-success"
                    style={{ width: "130px" }}
                  ></td>
                </tr>
                */}
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* 訂購資訊 */}
      <div className="my-5 row justify-content-center">
        <form className="col-md-6" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email 欄位必填",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "Email 格式錯誤",
                },
              })}
              id="email"
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              placeholder="請輸入 Email"
            />

            {errors.email && (
              <p className="text-danger my-2">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              收件人姓名
            </label>
            <input
              {...register("name", {
                required: "姓名 欄位必填",
              })}
              id="name"
              type="text"
              className={`form-control ${errors.name && "is-invalid"}`}
              placeholder="請輸入姓名"
            />

            {errors.name && (
              <p className="text-danger my-2">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              收件人電話
            </label>
            <input
              {...register("tel", {
                required: "電話 欄位必填",
                pattern: {
                  value: /^(0[2-8]\d{7}|09\d{8})$/,
                  message: "電話 格式錯誤",
                },
              })}
              id="tel"
              type="text"
              className={`form-control ${errors.tel && "is-invalid"}`}
              placeholder="請輸入電話"
            />

            {errors.tel && (
              <p className="text-danger my-2">{errors.tel.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              收件人地址
            </label>
            <input
              {...register("address", {
                required: "地址 欄位必填",
              })}
              id="address"
              type="text"
              className={`form-control ${errors.address && "is-invalid"}`}
              placeholder="請輸入地址"
            />

            {errors.address && (
              <p className="text-danger my-2">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              留言
            </label>
            <textarea
              {...register("message")}
              id="message"
              className="form-control"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="text-end">
            <button
              disabled={cart.carts?.length <= 0}
              type="submit"
              className="btn btn-danger"
            >
              送出訂單
            </button>
          </div>
        </form>
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
}

export default App
