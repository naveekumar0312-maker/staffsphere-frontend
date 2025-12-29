import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isLight = theme === "light";

  const isActive = (path) =>
    pathname.startsWith(path);

  return (
    <nav
      className="navbar navbar-expand-lg px-3 px-md-4"
      style={{
        height: 72,
        background: isLight
          ? "rgba(255,255,255,.95)"
          : "rgba(2,6,23,.9)",
        backdropFilter: "blur(14px)",
        borderBottom: isLight
          ? "1px solid #e5e7eb"
          : "1px solid rgba(255,255,255,.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* BRAND */}
      <Link
        to={role === "MANAGER" ? "/manager" : "/employee"}
        className="navbar-brand d-flex align-items-center gap-2 fw-bold"
        style={{
          color: isLight ? "#020617" : "#f8fafc",
          letterSpacing: ".5px",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "#020617",
            boxShadow:
              "0 8px 24px rgba(34,197,94,.45)",
          }}
        >
          A
        </div>
        Attendify
      </Link>

      {/* TOGGLER */}
      <button
        className={`navbar-toggler ${
          isLight
            ? "navbar-light"
            : "navbar-dark"
        }`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAV ITEMS */}
      <div
        className="collapse navbar-collapse"
        id="mainNavbar"
      >
        <ul className="navbar-nav mx-auto gap-lg-2">
          <NavItem
            to={role === "MANAGER" ? "/manager" : "/employee"}
            label="Dashboard"
            icon="bi-speedometer2"
            active={isActive}
            isLight={isLight}
          />
          <NavItem
            to="/attendance"
            label="Attendance"
            icon="bi-calendar-check"
            active={isActive}
            isLight={isLight}
          />
          <NavItem
            to="/leaves"
            label={role === "MANAGER" ? "Approvals" : "Leaves"}
            icon="bi-journal-text"
            active={isActive}
            isLight={isLight}
          />
          <NavItem
            to="/reports"
            label="Reports"
            icon="bi-graph-up"
            active={isActive}
            isLight={isLight}
          />
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {/* THEME */}
          <button
            className={`btn btn-sm ${
              isLight
                ? "btn-outline-primary"
                : "btn-outline-warning"
            }`}
            style={{ borderRadius: 20 }}
            onClick={toggleTheme}
          >
            <i
              className={`bi ${
                isLight
                  ? "bi-moon-stars"
                  : "bi-sun"
              }`}
            ></i>
          </button>

          {/* LOGOUT */}
          <button
            className="btn btn-sm btn-outline-danger"
            style={{ borderRadius: 20 }}
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ================= NAV ITEM ================= */
function NavItem({ to, label, icon, active, isLight }) {
  const isActive = active(to);

  return (
    <li className="nav-item">
      <Link
        to={to}
        className="nav-link d-flex align-items-center gap-2 px-3"
        style={{
          borderRadius: 20,
          color: isActive
            ? "#22c55e"
            : isLight
            ? "#020617"
            : "#e5e7eb",
          background: isActive
            ? "rgba(34,197,94,.15)"
            : "transparent",
          fontWeight: isActive ? 600 : 500,
          transition: "all .25s ease",
        }}
      >
        <i className={`bi ${icon}`}></i>
        {label}
      </Link>
    </li>
  );
}
