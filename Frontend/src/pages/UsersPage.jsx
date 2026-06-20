import { useEffect, useState } from "react";
import api from "../api";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            // Only update if it's a valid array, otherwise keep the local users
            if (Array.isArray(res.data)) {
                setUsers(res.data);
            }
        } catch (error) {
            console.warn("Backend not connected, running in frontend-only mode.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createUser = async () => {
        try {
            await api.post("/users", form);
            setForm({
                name: "",
                email: "",
                address: "",
                phone: ""
            });
            fetchUsers(); // Fetch updated list from MongoDB
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <>
            <div>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <button onClick={createUser}>Add User</button>
                {users.map((user) => (
                    <div key={user._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <button onClick={() => deleteUser(user._id)}>Delete User</button>
                    </div>
                ))}
            </div>
        </>
    )
};
