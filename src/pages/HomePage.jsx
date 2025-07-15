import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container-fluid">
      {/* 背景圖與標語 */}
      <div
        className="position-absolute"
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1573435567032-ff5982925350?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center center",
          opacity: 0.1,
          zIndex: -1,
        }}
      ></div>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <div className="row justify-content-center my-auto">
          <div className="col-md-4 text-center">
            <h2>毛孩開心日常 從這裡開始</h2>
            <p className="text-muted mb-0">
              毛孩柑仔店用心挑選每一項商品，從零食到玩具、從舒適用品到日常呵護，讓每位毛孩都能享受安心、快樂又健康的生活。陪伴毛孩長大的每一天，都值得被用最好的對待。
            </p>
            <Link to="/products" className="btn btn-dark rounded-0 mt-6">
              開始選購
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1666122958791-c9c534ab67ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top rounded-4"
                alt="..."
              />
              <div className="card-body text-center">
                <h4>玩出樂趣 動出健康</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                    從貓抓玩具到狗狗咬咬球，陪毛孩釋放能量、消除無聊，讓牠們在遊戲中更快樂、更有安全感。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1609075689223-58f5120b3d96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top rounded-4"
                alt="..."
              />
              <div className="card-body text-center">
                <h4>美味獎勵 健康加分</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                    嚴選天然食材製成，不只好吃，更兼顧營養與安心，無論訓練或日常犒賞都完美適用。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4">
            <div className="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1642394185618-ca23561709d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top rounded-4"
                alt="..."
              />
              <div className="card-body text-center">
                <h4>貼心好物 照顧日常</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-muted mb-0">
                    飲食器皿到清潔用品，幫你打造更方便舒適的毛孩生活環境，照顧牠的每一個日常細節。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 中間語 */}
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-6 text-center">
                    <h3>因為愛 所以開始</h3>
                    <p className="my-5">
                      「我只是想讓每一隻毛孩都過得更好，
                      <br />
                      無論是吃的、用的、還是陪伴他們長大的每個小日常，都值得被好好對待。」
                    </p>
                    <p>
                      <small>—毛孩柑仔店闆娘—</small>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-6 text-center">
                    <h3>Lorem ipsum.</h3>
                    <p className="my-5">
                      “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat.”
                    </p>
                    <p>
                      <small>—Lorem ipsum dolor sit amet.—</small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-6 text-center">
                    <h3>Lorem ipsum.</h3>
                    <p className="my-5">
                      “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat.”
                    </p>
                    <p>
                      <small>—Lorem ipsum dolor sit amet.—</small>
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <a
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
            </a>
          </div>
        </div>
      </div>

      <div className="container my-7">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1680927426379-6290f8dcafb8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4">陪伴毛孩 活力每一天</h4>
            <p className="text-muted">
              狗狗需要的不只是玩樂，還有營養均衡與安心日常。從咬咬玩具、潔牙零食到外出用品，我們精選每一項產品，幫助狗狗釋放精力、維持健康，也讓毛爸毛媽的照顧更輕鬆。讓每一天的陪伴都充滿歡笑與尾巴搖不停的幸福感。
            </p>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-between mt-4">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1684216973164-9dfca5daf047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-4 m-auto text-center">
            <h4 className="mt-4">細膩呵護 優雅小宇宙</h4>
            <p className="text-muted">
              貓咪天性敏感、挑剔，對生活品質的要求可是一點都不馬虎！我們挑選符合貓咪喜好的點心、玩具與舒適用品，從口感到質地都用心把關，只為了讓主子自在放鬆、優雅生活。滿足牠們，也療癒你我的每一天。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}