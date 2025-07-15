import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function CheckoutFormPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  // 取得購物車列表
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    // setIsScreenLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      // console.log(res);
      setCart(res.data.data);
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得購物車列表失敗");
    } finally {
      // setIsScreenLoading(false);
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
    // setIsScreenLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user,
          message,
        },
      });
      // console.log(res.data.orderId);
      // 清空表單資訊
      // reset();
      navigate(`/checkout-payment/${res.data.orderId}`);
    } catch (error) {
      console.log(error.response.data.message);
      // alert(error.response.data.message);
    } finally {
      // setIsScreenLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-2 pt-3">填寫結帳資訊</h3>
        </div>
      </div>
      {/* 結帳進度條 */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-10">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">確認訂單</span>
              </li>
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">填寫表單</span>
              </li>
              <li>
                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">付款方式</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="row flex-row-reverse justify-content-center pb-5">
        {/* 右側訂單資訊 */}
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {cart.carts?.map((cartItem) => (
              <div key={cartItem.id} className="d-flex mt-2">
                <img
                  src={cartItem.product.imageUrl}
                  alt=""
                  className="me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 fw-bold">{cartItem.product.title}</p>
                    <p className="mb-0">NT${cartItem.total}</p>
                  </div>
                  <p className="mb-0 fw-bold">x{cartItem.qty}</p>
                </div>
              </div>
            ))}
            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    小計
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    NT${cart.total?.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    付款方式
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">Apple Pay</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總計</p>
              <p className="mb-0 h4 fw-bold">
                NT${cart.final_total?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* 左側結帳資訊 */}
        <div className="col-md-6">
          <form>
            <p>訂購資訊</p>
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
          </form>
          <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <Link to="/products" className="text-dark mt-md-0 mt-3">
              <i className="fas fa-chevron-left me-2"></i> 返回產品列表
            </Link>
            <button
              onClick={onSubmit}
              type="button"
              className="btn btn-dark py-3 px-7"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}