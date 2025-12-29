import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Leaves() {
  const role = localStorage.getItem("role");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // APPLY LEAVE (EMPLOYEE)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState("");

  const loadLeaves = async () => {
    const res = await api.get("leaves/");
    setRows(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  /* APPLY LEAVE */
  const applyLeave = async (e) => {
    e.preventDefault();
    try {
      await api.post("leaves/", {
        from_date: fromDate,
        to_date: toDate,
        reason,
      });
      setMsg("✅ Leave applied successfully");
      setFromDate("");
      setToDate("");
      setReason("");
      loadLeaves();
    } catch {
      setMsg("❌ Failed to apply leave");
    }
  };

  /* MANAGER ACTION */
  const act = async (id, status) => {
    await api.patch(`leaves/${id}/`, { status });
    loadLeaves();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#020617)",
      }}
    >
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
            Leave Management
          </h2>
          <p className="text-secondary mb-0">
            Apply, track & approve leave requests
          </p>
        </div>

        {/* ================= APPLY LEAVE (EMPLOYEE) ================= */}
        {role === "EMPLOYEE" && (
          <div
            className="card border-0 p-4 mb-5"
            style={{
              maxWidth: 540,
              borderRadius: "22px",
              background: "rgba(255,255,255,.05)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 30px 90px rgba(0,0,0,.7)",
            }}
          >
            <h5 className="fw-bold mb-3 text-white">
              Apply Leave
            </h5>

            {msg && (
              <p
                className={`fw-semibold ${
                  msg.includes("success")
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {msg}
              </p>
            )}

            <form onSubmit={applyLeave}>
              <div className="mb-3">
                <label className="form-label text-secondary fw-semibold">
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

              <div className="mb-3">
                <label className="form-label text-secondary fw-semibold">
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

              <div className="mb-4">
                <label className="form-label text-secondary fw-semibold">
                  Reason
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

              <button
                className="btn w-100 fw-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#22c55e,#16a34a)",
                  borderRadius: "30px",
                  padding: "12px",
                }}
              >
                Apply Leave
              </button>
            </form>
          </div>
        )}

        {/* ================= LEAVE TABLE ================= */}
        <div
          className="card border-0 overflow-hidden"
          style={{
            borderRadius: "22px",
            background: "rgba(255,255,255,.04)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 25px 80px rgba(0,0,0,.7)",
          }}
        >
          <div className="card-header bg-transparent fw-bold text-white">
            {role === "MANAGER"
              ? "Pending Approvals"
              : "My Leave Requests"}
          </div>

          {loading ? (
            <p className="text-secondary text-center py-5">
              Loading...
            </p>
          ) : rows.length === 0 ? (
            <p className="text-secondary text-center py-5">
              No leave records found
            </p>
          ) : (
            <div className="table-responsive">
              <table
                className="table mb-0 align-middle"
                style={{ color: "#e5e7eb" }}
              >
                <thead
                  style={{
                    background:
                      "linear-gradient(90deg,#020617,#0f172a)",
                  }}
                >
                  <tr>
                    {role === "MANAGER" && (
                      <th className="ps-4 text-secondary">
                        User
                      </th>
                    )}
                    <th className="text-secondary">From</th>
                    <th className="text-secondary">To</th>
                    <th className="text-secondary">Reason</th>
                    <th className="text-secondary">Status</th>
                    {role === "MANAGER" && (
                      <th className="text-end pe-4 text-secondary">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((l) => (
                    <tr key={l.id}>
                      {role === "MANAGER" && (
                        <td className="ps-4 fw-semibold">
                          {l.username}
                        </td>
                      )}
                      <td>{l.from_date}</td>
                      <td>{l.to_date}</td>
                      <td>{l.reason}</td>
                      <td>
                        <StatusBadge status={l.status} />
                      </td>

                      {role === "MANAGER" && (
                        <td className="text-end pe-4">
                          {l.status === "PENDING" ? (
                            <>
                              <button
                                className="btn btn-sm me-2 text-white"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#22c55e,#16a34a)",
                                  borderRadius: "20px",
                                }}
                                onClick={() =>
                                  act(l.id, "APPROVED")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm text-white"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#ef4444,#dc2626)",
                                  borderRadius: "20px",
                                }}
                                onClick={() =>
                                  act(l.id, "REJECTED")
                                }
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-secondary small">
                              Done
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */
function StatusBadge({ status }) {
  let gradient = "linear-gradient(135deg,#f59e0b,#d97706)";
  if (status === "APPROVED")
    gradient = "linear-gradient(135deg,#22c55e,#16a34a)";
  if (status === "REJECTED")
    gradient = "linear-gradient(135deg,#ef4444,#dc2626)";

  return (
    <span
      className="badge px-3 py-2"
      style={{
        background: gradient,
        borderRadius: "14px",
      }}
    >
      {status}
    </span>
  );
}

/* ================= INPUT STYLE ================= */
const inputStyle = {
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.15)",
  color: "#fff",
  borderRadius: "14px",
};
