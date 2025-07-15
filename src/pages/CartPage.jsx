import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function CartPage() {
  const [cart, setCart] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(cart.carts?.length === 0) {
      alert('購物車為空，請先加入產品');
      navigate("/products");
    }
  }, [cart])

  // 取得購物車列表
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      // console.log(res);
      setCart(res.data.data);
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得購物車列表失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

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

  // 從 useForm 解構出需要的函式、狀態
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 表單相關處理
  const onSubmit = handleSubmit((userInfo) => {
    // console.log(userInfo);
    checkout(userInfo);
  });

  const checkout = async ({ message, ...user }) => {
    setIsScreenLoading(true);
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user,
          message,
        },
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
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="mt-3">
          <h3 className="mt-3 mb-4">購物車列表</h3>
          <div className="row">
            {/* 購物車詳情 */}
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 ps-0">
                      品項
                    </th>
                    <th scope="col" className="border-0">
                      數量
                    </th>
                    <th scope="col" className="border-0">
                      小計
                    </th>
                    <th scope="col" className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.carts?.map((item) => (
                    <tr key={item.id} className="border-bottom border-top">
                      <th
                        scope="row"
                        className="border-0 px-0 font-weight-normal py-4"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          style={{
                            width: "72px",
                            height: "72px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="mb-0 fw-bold ms-3 d-inline-block">
                          {item.product.title}
                        </p>
                      </th>
                      <td
                        className="border-0 align-middle"
                        style={{ maxWidth: "160px" }}
                      >
                        <div className="input-group pe-5">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon1"
                              disabled={item.qty === 1}
                              onClick={() =>
                                updateCartItem(
                                  item.id,
                                  item.product_id,
                                  item.qty - 1
                                )
                              }
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control border-0 text-center my-auto shadow-none"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={item.qty}
                            readOnly
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon2"
                              onClick={() =>
                                updateCartItem(
                                  item.id,
                                  item.product_id,
                                  item.qty + 1
                                )
                              }
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 align-middle">
                        <p className="mb-0 ms-auto">
                          NT${item.final_total?.toLocaleString()}
                        </p>
                      </td>
                      <td className="border-0 align-middle">
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="btn btn-outline-dark border-0 py-2"
                          type="button"
                          id="button-addon2"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="input-group w-50 mb-3">
                <input
                  type="text"
                  className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                  placeholder="Coupon Code"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* 訂單資訊 */}
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單資訊</h4>
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        小計
                      </th>
                      <td className="text-end border-0 px-0 pt-4">
                        NT${cart.final_total?.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        Payment
                      </th>
                      <td className="text-end border-0 px-0 pt-0 pb-4">
                        ApplePay
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總計</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${cart.final_total?.toLocaleString()}
                  </p>
                </div>
                <Link to="/checkout-form" className="btn btn-dark w-100 mt-4">
                  結帳
                </Link>
              </div>
            </div>
          </div>

          <div className="my-5">
            <h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
            <div className="swiper-container mt-4 mb-5">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <a href="#" className="text-dark"></a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="#">Lorem ipsum</a>
                      </h4>
                      <p className="card-text mb-0">
                        NT$1,080
                        <span className="text-muted ">
                          <del>NT$1,200</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <a href="#" className="text-dark"></a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="#">Lorem ipsum</a>
                      </h4>
                      <p className="card-text mb-0">
                        NT$1,080
                        <span className="text-muted ">
                          <del>NT$1,200</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <a href="#" className="text-dark"></a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="#">Lorem ipsum</a>
                      </h4>
                      <p className="card-text mb-0">
                        NT$1,080
                        <span className="text-muted ">
                          <del>NT$1,200</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <a href="#" className="text-dark"></a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="#">Lorem ipsum</a>
                      </h4>
                      <p className="card-text mb-0">
                        NT$1,080
                        <span className="text-muted ">
                          <del>NT$1,200</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      className="card-img-top rounded-0"
                      alt="..."
                    />
                    <a href="#" className="text-dark"></a>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a href="#">Lorem ipsum</a>
                      </h4>
                      <p className="card-text mb-0">
                        NT$1,080
                        <span className="text-muted ">
                          <del>NT$1,200</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );

  // return (
  //   <div className="container mt-4">
  //     {cart.carts?.length > 0 && (
  //       <>
  //         <div>
  //           <div className="text-end">
  //             <button
  //               className="btn btn-outline-danger"
  //               type="button"
  //               onClick={removeCart}
  //             >
  //               清空購物車
  //             </button>
  //           </div>

  //           <table className="table align-middle">
  //             <thead>
  //               <tr>
  //                 <th></th>
  //                 <th>品名</th>
  //                 <th style={{ width: "150px" }}>數量/單位</th>
  //                 <th className="text-end">合計</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {cart.carts?.map((cartItem) => (
  //                 <tr key={cartItem.id}>
  //                   <td>
  //                     <button
  //                       type="button"
  //                       className="btn btn-outline-danger btn-sm"
  //                       onClick={() => removeCartItem(cartItem.id)}
  //                     >
  //                       x
  //                     </button>
  //                   </td>
  //                   <td>{cartItem.product.title}</td>
  //                   <td style={{ width: "150px" }}>
  //                     <div className="d-flex align-items-center">
  //                       <div className="btn-group me-2" role="group">
  //                         <button
  //                           type="button"
  //                           className="btn btn-outline-dark btn-sm"
  //                           disabled={cartItem.qty === 1}
  //                           onClick={() =>
  //                             updateCartItem(
  //                               cartItem.id,
  //                               cartItem.product_id,
  //                               cartItem.qty - 1
  //                             )
  //                           }
  //                         >
  //                           -
  //                         </button>
  //                         <span
  //                           className="btn border border-dark"
  //                           style={{ width: "50px", cursor: "auto" }}
  //                         >
  //                           {cartItem.qty}
  //                         </span>
  //                         <button
  //                           type="button"
  //                           className="btn btn-outline-dark btn-sm"
  //                           onClick={() =>
  //                             updateCartItem(
  //                               cartItem.id,
  //                               cartItem.product.id,
  //                               cartItem.qty + 1
  //                             )
  //                           }
  //                         >
  //                           +
  //                         </button>
  //                       </div>
  //                       <span className="input-group-text bg-transparent border-0">
  //                         {cartItem.product.unit}
  //                       </span>
  //                     </div>
  //                   </td>
  //                   <td className="text-end">{cartItem.total}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //             <tfoot>
  //               <tr>
  //                 <td colSpan="3" className="text-end fw-bold">
  //                   總價
  //                 </td>
  //                 <td className="text-end" style={{ width: "130px" }}>
  //                   {cart.final_total}
  //                 </td>
  //               </tr>
  //               {/*
  //                 <tr>
  //                   <td colSpan="3" className="text-end text-success">
  //                     折扣價
  //                   </td>
  //                   <td
  //                     className="text-end text-success"
  //                     style={{ width: "130px" }}
  //                   ></td>
  //                 </tr>
  //                 */}
  //             </tfoot>
  //           </table>
  //         </div>

  //         {/* 訂購資訊 */}
  //         <div className="my-5 row justify-content-center">
  //           <form className="col-md-6" onSubmit={onSubmit}>
  //             <div className="mb-3">
  //               <label htmlFor="email" className="form-label">
  //                 Email
  //               </label>
  //               <input
  //                 {...register("email", {
  //                   required: "Email 欄位必填",
  //                   pattern: {
  //                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
  //                     message: "Email 格式錯誤",
  //                   },
  //                 })}
  //                 id="email"
  //                 type="email"
  //                 className={`form-control ${errors.email && "is-invalid"}`}
  //                 placeholder="請輸入 Email"
  //               />

  //               {errors.email && (
  //                 <p className="text-danger my-2">{errors.email.message}</p>
  //               )}
  //             </div>

  //             <div className="mb-3">
  //               <label htmlFor="name" className="form-label">
  //                 收件人姓名
  //               </label>
  //               <input
  //                 {...register("name", {
  //                   required: "姓名 欄位必填",
  //                 })}
  //                 id="name"
  //                 type="text"
  //                 className={`form-control ${errors.name && "is-invalid"}`}
  //                 placeholder="請輸入姓名"
  //               />

  //               {errors.name && (
  //                 <p className="text-danger my-2">{errors.name.message}</p>
  //               )}
  //             </div>

  //             <div className="mb-3">
  //               <label htmlFor="tel" className="form-label">
  //                 收件人電話
  //               </label>
  //               <input
  //                 {...register("tel", {
  //                   required: "電話 欄位必填",
  //                   pattern: {
  //                     value: /^(0[2-8]\d{7}|09\d{8})$/,
  //                     message: "電話 格式錯誤",
  //                   },
  //                 })}
  //                 id="tel"
  //                 type="text"
  //                 className={`form-control ${errors.tel && "is-invalid"}`}
  //                 placeholder="請輸入電話"
  //               />

  //               {errors.tel && (
  //                 <p className="text-danger my-2">{errors.tel.message}</p>
  //               )}
  //             </div>

  //             <div className="mb-3">
  //               <label htmlFor="address" className="form-label">
  //                 收件人地址
  //               </label>
  //               <input
  //                 {...register("address", {
  //                   required: "地址 欄位必填",
  //                 })}
  //                 id="address"
  //                 type="text"
  //                 className={`form-control ${errors.address && "is-invalid"}`}
  //                 placeholder="請輸入地址"
  //               />

  //               {errors.address && (
  //                 <p className="text-danger my-2">{errors.address.message}</p>
  //               )}
  //             </div>

  //             <div className="mb-3">
  //               <label htmlFor="message" className="form-label">
  //                 留言
  //               </label>
  //               <textarea
  //                 {...register("message")}
  //                 id="message"
  //                 className="form-control"
  //                 cols="30"
  //                 rows="10"
  //               ></textarea>
  //             </div>

  //             <div className="text-end">
  //               <button
  //                 disabled={cart.carts?.length <= 0}
  //                 type="submit"
  //                 className="btn btn-danger"
  //               >
  //                 送出訂單
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </>
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
