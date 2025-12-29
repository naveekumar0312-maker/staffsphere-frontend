import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(
          "reports/monthly/?month=1&year=2025"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#020617,#020617)",
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
                "linear-gradient(90deg,#a5b4fc,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Employee Dashboard
          </h2>
          <p className="text-secondary mb-0">
            Attendance & Leave Overview
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="row g-4 mb-5">
          <StatCard
            title="Present Days"
            value={stats?.present_days}
            loading={loading}
            gradient="linear-gradient(135deg,#22c55e,#16a34a)"
            glow="rgba(34,197,94,.45)"
          />
          <StatCard
            title="Approved Leaves"
            value={stats?.approved_leaves}
            loading={loading}
            gradient="linear-gradient(135deg,#f59e0b,#d97706)"
            glow="rgba(245,158,11,.45)"
          />
          <StatCard
            title="Attendance %"
            value={
              stats
                ? `${stats.attendance_percentage}%`
                : "-"
            }
            loading={loading}
            gradient="linear-gradient(135deg,#6366f1,#2563eb)"
            glow="rgba(99,102,241,.45)"
          />
        </div>

        {/* QUICK ACTIONS */}
        <div className="row g-4">
          <ActionCard
            title="Leave Management"
            desc="Apply, track & manage your leave requests"
            link="/leaves"
            btn="Manage Leaves"
            gradient="linear-gradient(135deg,#22c55e,#16a34a)"
          />
          <ActionCard
            title="Attendance"
            desc="Mark attendance and view daily history"
            link="/attendance"
            btn="View Attendance"
            gradient="linear-gradient(135deg,#6366f1,#2563eb)"
          />
          <ActionCard
            title="Reports"
            desc="Monthly leave & attendance analytics"
            link="/reports"
            btn="View Reports"
            gradient="linear-gradient(135deg,#0f766e,#14b8a6)"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= PREMIUM STAT CARD ================= */
function StatCard({ title, value, loading, gradient, glow }) {
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
function ActionCard({ title, desc, link, btn, gradient }) {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 p-4 d-flex flex-column"
        style={{
          borderRadius: "22px",
          background: "rgba(255,255,255,.04)",
          backdropFilter: "blur(14px)",
          color: "#e5e7eb",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.6)",
        }}
      >
        <h5 className="fw-bold mb-2">
          {title}
        </h5>
        <p className="text-secondary mb-4">
          {desc}
        </p>

        <Link
          to={link}
          className="btn mt-auto text-white fw-semibold"
          style={{
            background: gradient,
            borderRadius: "30px",
            padding: "10px 24px",
          }}
        >
          {btn}
        </Link>
      </div>
    </div>
  );
}
