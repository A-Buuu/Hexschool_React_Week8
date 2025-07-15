import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-4">
      {cart.carts?.length > 0 && (
        <>
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
        </>
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
