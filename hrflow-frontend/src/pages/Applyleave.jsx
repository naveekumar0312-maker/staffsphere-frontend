import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ApplyLeave() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await api.post("leaves/", {
        from_date: fromDate,
        to_date: toDate,
        reason,
      });
      setMsg("Leave request submitted successfully ✅");
      setFromDate("");
      setToDate("");
      setReason("");
    } catch {
      setMsg("Failed to submit leave ❌");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-4">
          <h2
            className="fw-bold"
            style={{
              background:
                "linear-gradient(90deg,#a5b4fc,#22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Apply Leave
          </h2>
          <p className="text-secondary">
            Submit your leave request for approval
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className="card border-0 p-4"
          style={{
            maxWidth: 520,
            borderRadius: "22px",
            background: "rgba(255,255,255,.05)",
            backdropFilter: "blur(14px)",
            color: "#e5e7eb",
            boxShadow:
              "0 30px 90px rgba(0,0,0,.7)",
          }}
        >
          {msg && (
            <div
              className={`text-center fw-semibold mb-3 ${
                msg.includes("success")
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {msg}
            </div>
          )}

          <form onSubmit={submitLeave}>

            {/* FROM DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                From Date
              </label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* TO DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">
                To Date
              </label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* REASON */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary">
                Leave Reason
              </label>
              <select
                className="form-select"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">-- Select Reason --</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Earned Leave</option>
                <option>Work From Home</option>
                <option>Personal Leave</option>
                <option>Emergency Leave</option>
                <option>Other</option>
              </select>
            </div>

            {/* SUBMIT */}
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
              {loading ? "Submitting..." : "Apply Leave"}
            </button>
          </form>
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
};
