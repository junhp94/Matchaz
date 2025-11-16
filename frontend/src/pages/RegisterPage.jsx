import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { setUser } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await api.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", res.data.token);
            setUser({
                _id: res.data._id,
                username: res.data.username,
                email: res.data.email,
                avatarUrl: res.data.avatarUrl,
            });
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Register</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border p-3 rounded-lg"
                    required
                    minLength={3}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-3 rounded-lg"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-3 rounded-lg"
                    required
                    minLength={6}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="border p-3 rounded-lg"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <button
                    onClick={() => navigate("/login")}
                    className="text-green-600 hover:text-green-700 font-semibold"
                >
                    Login
                </button>
            </p>
        </div>
    );
}
