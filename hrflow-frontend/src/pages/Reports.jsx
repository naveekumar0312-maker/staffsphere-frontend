import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [monthly, setMonthly] = useState(null);
  const [today, setToday] = useState(null);
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [m, t, w] = await Promise.all([
          api.get("reports/monthly/?month=1&year=2025"),
          api.get("reports/today/"),
          api.get("reports/last-7-days/"),
        ]);
        setMonthly(m.data);
        setToday(t.data);
        setWeek(w.data);
      } catch (err) {
        console.error("Reports load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

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
                "linear-gradient(90deg,#a5b4fc,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Reports
          </h2>
          <p className="text-secondary mb-0">
            Attendance & leave analytics
          </p>
        </div>

        {/* TODAY */}
        <Section title="Today">
          {loading ? (
            <Loading />
          ) : (
            <div className="row g-4">
              <ReportCard
                title="Total Records"
                value={today?.total_records}
                gradient="linear-gradient(135deg,#0f766e,#14b8a6)"
              />
              <ReportCard
                title="Present Count"
                value={today?.present_count}
                gradient="linear-gradient(135deg,#22c55e,#16a34a)"
              />
            </div>
          )}
        </Section>

        {/* LAST 7 DAYS */}
        <Section title="Last 7 Days">
          {loading ? (
            <Loading />
          ) : (
            <div className="row g-4">
              <ReportCard
                title="Present Days"
                value={week?.present_days}
                gradient="linear-gradient(135deg,#22c55e,#16a34a)"
              />
              <ReportCard
                title="Total Records"
                value={week?.total_records}
                gradient="linear-gradient(135deg,#f59e0b,#d97706)"
              />
              <ReportCard
                title="Attendance %"
                value={
                  week?.attendance_percentage !== undefined
                    ? `${week.attendance_percentage}%`
                    : "-"
                }
                gradient="linear-gradient(135deg,#6366f1,#2563eb)"
              />
            </div>
          )}
        </Section>

        {/* MONTHLY */}
        <Section title="Monthly Summary">
          {loading ? (
            <Loading />
          ) : (
            <div className="row g-4">
              <ReportCard
                title="Present Days"
                value={monthly?.present_days}
                gradient="linear-gradient(135deg,#22c55e,#16a34a)"
              />
              <ReportCard
                title="Approved Leaves"
                value={monthly?.approved_leaves}
                gradient="linear-gradient(135deg,#f59e0b,#d97706)"
              />
              <ReportCard
                title="Attendance %"
                value={
                  monthly?.attendance_percentage !== undefined
                    ? `${monthly.attendance_percentage}%`
                    : "-"
                }
                gradient="linear-gradient(135deg,#6366f1,#2563eb)"
              />
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h5
        className="fw-bold mb-3"
        style={{ color: "#e5e7eb" }}
      >
        {title}
      </h5>
      {children}
    </div>
  );
}

function ReportCard({ title, value, gradient }) {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 border-0 p-4"
        style={{
          borderRadius: "22px",
          background: gradient,
          color: "#fff",
          boxShadow:
            "0 25px 80px rgba(0,0,0,.6)",
        }}
      >
        <small className="opacity-75 text-uppercase">
          {title}
        </small>
        <h1 className="fw-bold mt-2 mb-0">
          {value ?? "-"}
        </h1>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <p className="text-secondary">
      Loading reports...
    </p>
  );
}
