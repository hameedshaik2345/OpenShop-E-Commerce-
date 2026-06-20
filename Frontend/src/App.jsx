import { useState } from "react";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  const [page, setPage] = useState("users");

  return (
    <div className="app-container">
      <nav className="navbar">
        <button className={`nav-btn ${page === "users" ? "active" : ""}`} onClick={() => setPage("users")}>Users</button>
        <button className={`nav-btn ${page === "products" ? "active" : ""}`} onClick={() => setPage("products")}>Products</button>
        <button className={`nav-btn ${page === "orders" ? "active" : ""}`} onClick={() => setPage("orders")}>Orders</button>
      </nav>
      
      <main>
        {page === "users" && <UsersPage />}
        {page === "products" && <ProductsPage />}
        {page === "orders" && <OrdersPage />}
      </main>
    </div>
  )
}