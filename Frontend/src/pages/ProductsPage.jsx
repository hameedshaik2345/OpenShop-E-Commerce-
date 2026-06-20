import { useEffect, useState } from "react";
import api from "../api";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
    });

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            if (Array.isArray(res.data)) {
                setProducts(res.data);
            }
        } catch (error) {
            console.error("Backend not connected, running in frontend-only mode.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createProduct = async () => {
        try {
            const payload = {
                name: form.name,
                price: Number(form.price),
                description: form.description
            };
            await api.post("/products", payload);
            setForm({
                name: "",
                price: "",
                description: "",
            });
            fetchProducts();
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h1 className="form-title">Add New Product</h1>
                <div className="input-group">
                    <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
                    <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                    <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                </div>
                <button className="btn-primary" onClick={createProduct}>Add Product</button>
            </div>

            <div>
                <h2>All Products</h2>
                <div className="data-grid">
                    {products.map((product) => (
                        <div className="data-card" key={product._id}>
                            <p><strong>Name</strong> <span>{product.name}</span></p>
                            <p><strong>Price</strong> <span>Rs.{product.price}/-</span></p>
                            <p><strong>Description</strong> <span>{product.description}</span></p>
                            <button className="btn-danger" onClick={() => deleteProduct(product._id)}>Delete Product</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}