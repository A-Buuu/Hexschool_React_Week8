import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <div className="container-fluid">
      <div className="position-relative d-flex">
        {/* 左側標語 */}
        <div
          className="container d-flex flex-column"
          style={{ minHeight: "100vh" }}
        >
          <div className="row my-auto pb-7">
            <div className="col-md-4 d-flex flex-column">
              <div className="my-auto">
                <h2>付款成功</h2>
                <p>
                  訂單已成立，將盡速幫您安排出貨！
                  <br />
                  感謝您的購買！
                </p>
                <Link to="/" className="btn btn-dark mt-4 px-5">
                  回到首頁
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* 右側背景圖 */}
        <div
          className="w-md-50 w-100 position-absolute opacity-1"
          style={{
            zIndex: -1,
            minHeight: "100vh",
            right: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
    </div>
  );
}