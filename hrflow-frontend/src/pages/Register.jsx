import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("accounts/register/", {
        username: username.trim().toLowerCase(), // ✅ important
        password,
        role,
      });

      navigate("/"); // go to login
    } catch (err) {
      // ✅ REAL BACKEND ERRORS
      if (err.response?.data?.username) {
        setError(err.response.data.username[0]);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Username already exists");
      }
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
          width: 440,
          borderRadius: "24px",
          background: "rgba(255,255,255,.05)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,.8)",
          color: "#e5e7eb",
        }}
      >
        <div className="card-body p-5">

          {/* LOGO */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#6366f1,#2563eb)",
                boxShadow:
                  "0 10px 30px rgba(99,102,241,.5)",
                fontWeight: 900,
                fontSize: 22,
                color: "#020617",
              }}
            >
              R
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
              Create Account
            </h4>
            <p className="text-secondary small mb-0">
              Register to access HRFLOW
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
          <form onSubmit={register}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
              <small className="text-secondary">
                Username will be saved in lowercase
              </small>
            </div>

            <div className="mb-3">
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

            <div className="mb-4">
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager (HR)</option>
              </select>
              <small className="text-secondary">
                Manager role has HR-level permissions
              </small>
            </div>

            <button
              disabled={loading}
              className="btn w-100 fw-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#22c55e,#16a34a)",
                borderRadius: "30px",
                padding: "12px",
                boxShadow:
                  "0 15px 40px rgba(34,197,94,.45)",
              }}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center mt-4 mb-0 small text-secondary">
            Already have an account?{" "}
            <Link
              to="/"
              className="fw-semibold text-decoration-none"
              style={{ color: "#22c55e" }}
            >
              Login
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
