import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("accounts/login/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.user.role);

      navigate(
        res.data.user.role === "MANAGER"
          ? "/manager"
          : "/employee"
      );
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#020617,#0f172a,#020617)",
      }}
    >
      <div
        className="card border-0"
        style={{
          width: 420,
          borderRadius: "24px",
          background: "rgba(255,255,255,.05)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,.8)",
          color: "#e5e7eb",
        }}
      >
        <div className="card-body p-5">

          {/* LOGO / TITLE */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#22c55e,#16a34a)",
                boxShadow:
                  "0 10px 30px rgba(34,197,94,.5)",
                fontWeight: 900,
                fontSize: 22,
                color: "#020617",
              }}
            >
              H
            </div>

            <h4
              className="fw-bold mb-1"
              style={{
                background:
                  "linear-gradient(90deg,#a5b4fc,#22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HRFLOW
            </h4>
            <p className="text-secondary small mb-0">
              Sign in to continue
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="text-center small mb-3"
              style={{
                color: "#f87171",
                background: "rgba(239,68,68,.15)",
                borderRadius: 12,
                padding: "8px",
              }}
            >
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={login}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <button
              className="btn w-100 fw-semibold text-white"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg,#22c55e,#16a34a)",
                borderRadius: "30px",
                padding: "12px",
                boxShadow:
                  "0 15px 40px rgba(34,197,94,.45)",
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center mt-4 mb-0 small text-secondary">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="fw-semibold text-decoration-none"
              style={{ color: "#22c55e" }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= INPUT STYLE ================= */
const inputStyle = {
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.15)",
  color: "#fff",
  borderRadius: "14px",
  padding: "12px 14px",
};
