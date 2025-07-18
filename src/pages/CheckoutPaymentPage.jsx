import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BATH;

export default function CheckoutPaymentPage() {
  // const [cart, setCart] = useState({});
  const { order_id } = useParams();
  const [lastOrderTotalPrice, setLastOrderTotalPrice] = useState(0);

  // 取得購物車列表
  useEffect(() => {
    getLastOrder();
  }, []);
  const getLastOrder = async () => {
    // setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/order/${order_id}`
      );
      setLastOrderTotalPrice(res.data.order.total);
      // setCart(res.data.data);
    } catch (error) {
      // console.log(error.response.data.message);
      alert("取得訂單失敗");
    } finally {
      // setIsScreenLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-2 pt-3">選擇付款方式</h3>
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
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
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
            {/* {cart.carts?.map((cartItem) => (
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
            ))} */}
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
                    NT${lastOrderTotalPrice.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    付款方式
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">
                    Apple Pay
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總計</p>
              <p className="mb-0 h4 fw-bold">
                NT${lastOrderTotalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* 左側付款方式 */}
        <div className="col-md-6">
          <div className="accordion" id="accordionExample">
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3 collapsed"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  現金付款
                </p>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              ></div>
            </div>
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  Apple Pay
                </p>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              ></div>
            </div>
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3 collapsed"
                id="headingThree"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  信用卡付款
                </p>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body bg-light ps-5 py-4">
                  <div className="mb-2">
                    <label htmlFor="Lorem ipsum1" className="text-muted mb-0">
                      信用卡號
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lorem ipsum1"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                  </div>
                  <div className="mb-0">
                    <label htmlFor="Lorem ipsum2" className="text-muted mb-0">
                      有效期限
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lorem ipsum2"
                      placeholder="MM/YY"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <Link to="/checkout-form" className="text-dark mt-md-0 mt-3">
              <i className="fas fa-chevron-left me-2"></i> 上一步
            </Link>
            <Link to="/checkout-success" className="btn btn-dark py-3 px-7">
              確認付款
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
