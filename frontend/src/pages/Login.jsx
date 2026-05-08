import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", form);
      login(data.token, { name: data.name, email: data.email });
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#d6d3d1] p-6 sm:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1c1917] tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-[#57534e] mt-1">
            Welcome back. Enter your credentials to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1c1917] mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-[#d6d3d1] bg-white text-[#1c1917] placeholder-[#a8a29e] text-sm focus:outline-none focus:ring-2 focus:ring-[#292524] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c1917] mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-[#d6d3d1] bg-white text-[#1c1917] placeholder-[#a8a29e] text-sm focus:outline-none focus:ring-2 focus:ring-[#292524] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#292524] hover:bg-black text-white text-sm font-medium py-2.5 rounded-xl transition disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-[#57534e] text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#1c1917] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
