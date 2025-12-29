import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get("leaves/");
        setLeaves(res.data);
      } catch (e) {
        console.error("Load failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const pending = leaves.filter(l => l.status === "PENDING").length;
  const approved = leaves.filter(l => l.status === "APPROVED").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#020617)",
      }}
    >
      {/* ✅ NAVBAR ONLY */}
      <Navbar />

      <div className="container-fluid px-4 py-5">

        {/* HEADER */}
        <div className="mb-5">
          <h2
            className="fw-bold mb-1"
            style={{
              background:
                "linear-gradient(90deg,#fde68a,#f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Manager Dashboard
          </h2>
          <p className="text-secondary mb-0">
            Team overview & approval control
          </p>
        </div>

        {/* KPI SECTION */}
        <div className="row g-4 mb-5">
          <KPI
            title="Pending Requests"
            value={pending}
            loading={loading}
            gradient="linear-gradient(135deg,#f59e0b,#d97706)"
            glow="rgba(245,158,11,.45)"
          />
          <KPI
            title="Total Requests"
            value={leaves.length}
            loading={loading}
            gradient="linear-gradient(135deg,#6366f1,#2563eb)"
            glow="rgba(99,102,241,.45)"
          />
          <KPI
            title="Approved Leaves"
            value={approved}
            loading={loading}
            gradient="linear-gradient(135deg,#22c55e,#16a34a)"
            glow="rgba(34,197,94,.45)"
          />
        </div>

        {/* ACTIONS */}
        <div className="row g-4">
          <Action
            title="Approve Leaves"
            desc="Review & approve employee leave requests"
            to="/leaves"
            gradient="linear-gradient(135deg,#f59e0b,#d97706)"
          />
          <Action
            title="Team Attendance"
            desc="Monitor attendance for your team"
            to="/attendance"
            gradient="linear-gradient(135deg,#6366f1,#2563eb)"
          />
          <Action
            title="Reports"
            desc="Monthly leave & attendance analytics"
            to="/reports"
            gradient="linear-gradient(135deg,#0f766e,#14b8a6)"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= PREMIUM KPI CARD ================= */
function KPI({ title, value, loading, gradient, glow }) {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 p-4"
        style={{
          borderRadius: "22px",
          color: "#fff",
          background: gradient,
          boxShadow: `0 30px 80px ${glow}`,
        }}
      >
        {loading ? (
          <div className="opacity-75">Loading...</div>
        ) : (
          <>
            <small className="text-uppercase opacity-75">
              {title}
            </small>
            <h1 className="fw-bold mt-2 mb-0">
              {value}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= PREMIUM ACTION CARD ================= */
function Action({ title, desc, to, gradient }) {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 p-4 d-flex flex-column"
        style={{
          borderRadius: "22px",
          background: "rgba(255,255,255,.04)",
          backdropFilter: "blur(14px)",
          color: "#e5e7eb",
          boxShadow: "0 20px 60px rgba(0,0,0,.6)",
        }}
      >
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-secondary mb-4">{desc}</p>

        <Link
          to={to}
          className="btn mt-auto text-white fw-semibold"
          style={{
            background: gradient,
            borderRadius: "30px",
            padding: "10px 24px",
          }}
        >
          Open
        </Link>
      </div>
    </div>
  );
}
