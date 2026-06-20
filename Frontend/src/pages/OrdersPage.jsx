import { useState, useEffect } from "react";
import api from "../api";

export default function OrdersPage() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [form, setForm] = useState({
        userId: "",
        productId: "",
        quantity: 1,
    });

    const fetchUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };

    const fetchProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const fetchOrders = async () => {
        const res = await api.get("/orders");
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Moved selectProduct back to the component level so it can be used in the JSX below
    const selectProduct = products.find(
        (product) => product._id === form.productId
    );

    const createOrder = async () => {
        if (!form.userId || !form.productId) {
            alert("Select user and product");
            return;
        }

        const selectUser = users.find(
            (user) => user._id === form.userId
        );

        if (!selectUser) {
            alert("User not found");
            return;
        }

        const totalAmount = selectProduct.price * Number(form.quantity);

        // Save ONLY the relational IDs in MongoDB, just like a standard database.
        // We will fetch the "real-time names" dynamically when we render the page!
        const payload = {
            userId: form.userId,
            productId: form.productId,
            quantity: Number(form.quantity),
            price: selectProduct.price,
            total: totalAmount,
        };

        await api.post("/orders", payload);
        alert("Order created successfully");
        fetchOrders();

        setForm({
            userId: "",
            productId: "",
            quantity: 1,
        });
    };

    const deleteOrder = async (id) => {
        await api.delete(`/orders/${id}`);
        fetchOrders();
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h1 className="form-title">Create Order</h1>
                <div className="input-group">
                    <select name="userId" value={form.userId} onChange={handleChange}>
                        <option value="">Select user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>

                    <select name="productId" value={form.productId} onChange={handleChange}>
                        <option value="">Select product</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </select>

                    <input type="number" name="quantity" value={form.quantity} placeholder="Quantity" onChange={handleChange} min="1" />
                </div>

                {selectProduct && (
                    <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "8px", border: "1px dashed var(--border)" }}>
                        <p style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <strong style={{ color: "var(--text-muted)" }}>Unit Price:</strong>
                            <span>Rs.{selectProduct.price}/-</span>
                        </p>
                        <p style={{ display: "flex", justifyContent: "space-between", fontWeight: "600", fontSize: "1.1rem", color: "var(--primary)" }}>
                            <strong>Total Amount:</strong>
                            <span>Rs.{selectProduct.price * Number(form.quantity)}/-</span>
                        </p>
                    </div>
                )}

                <button className="btn-primary" onClick={createOrder}>Complete Order</button>
            </div>

            <div>
                <h2>Recent Orders</h2>
                <div className="data-grid">
                    {orders.map((order) => {
                        // Dynamically grab the real-time name from our loaded Users & Products state
                        // This handles both the new format (IDs) and the old format (nested objects)
                        const realTimeUser = users.find(u => u._id === order.userId) || order.user;
                        const realTimeProduct = products.find(p => p._id === order.productId) || order.product;

                        return (
                            <div className="data-card" key={order._id}>
                                <p><strong>User</strong> <span>{realTimeUser ? realTimeUser.name : "Unknown"}</span></p>
                                <p><strong>Product</strong> <span>{realTimeProduct ? realTimeProduct.name : "Unknown"}</span></p>
                                <p><strong>Quantity</strong> <span>{order.quantity}</span></p>
                                <p><strong>Unit Price</strong> <span>Rs.{order.price}/-</span></p>
                                <div style={{ margin: "1rem 0", height: "1px", background: "var(--border)" }}></div>
                                <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: "600", display: "flex", justifyContent: "space-between" }}>
                                    <strong>Total</strong> <span>Rs.{order.total}/-</span>
                                </p>
                                <button className="btn-danger" onClick={() => deleteOrder(order._id)}>Cancel Order</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}