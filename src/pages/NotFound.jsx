import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // 轉回首頁
      navigate("/");
    }, 2000)
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-danger fw-bold">404 不存在的頁面</h1>
        <h3 className="text-danger"> 2 秒後將轉回首頁</h3>
      </div>
    </div>
  );
}