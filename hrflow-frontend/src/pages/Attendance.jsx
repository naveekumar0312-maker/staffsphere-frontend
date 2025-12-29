import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const loadAttendance = async () => {
    try {
      const res = await api.get("attendance/");
      setRows(res.data);
    } catch (err) {
      console.error("Attendance load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  /* ✅ MARK PRESENT */
  const markPresent = async () => {
    setMsg("");
    try {
      const res = await api.post("attendance/");
      setMsg(res.data.message || "Attendance updated");
      loadAttendance();
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to mark attendance");
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
            Attendance
          </h2>
          <p className="text-secondary mb-0">
            Daily attendance records
          </p>
        </div>

        {/* MESSAGE */}
        {msg && (
          <div className="mb-4 fw-semibold text-success">
            {msg}
          </div>
        )}

        {/* ACTION CARD */}
        <div
          className="card border-0 p-4 mb-4"
          style={{
            borderRadius: "22px",
            background: "rgba(255,255,255,.05)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,.6)",
          }}
        >
          <button
            onClick={markPresent}
            className="btn fw-semibold text-white"
            style={{
              background:
                "linear-gradient(135deg,#22c55e,#16a34a)",
              borderRadius: "30px",
              padding: "10px 26px",
              boxShadow:
                "0 15px 40px rgba(34,197,94,.45)",
              width: "fit-content",
            }}
          >
            Mark Present Today
          </button>
        </div>

        {/* TABLE CARD */}
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
          {loading ? (
            <p className="text-secondary text-center py-5">
              Loading attendance...
            </p>
          ) : rows.length === 0 ? (
            <p className="text-secondary text-center py-5">
              No attendance records
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
                    <th className="ps-4 text-secondary">
                      Username
                    </th>
                    <th className="text-secondary">
                      Date
                    </th>
                    <th className="text-secondary">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      style={{
                        borderColor:
                          "rgba(255,255,255,.06)",
                      }}
                    >
                      <td className="ps-4 fw-semibold">
                        {r.username}
                      </td>
                      <td>{r.date}</td>
                      <td>
                        <span
                          className="badge px-3 py-2"
                          style={{
                            background: r.present
                              ? "linear-gradient(135deg,#22c55e,#16a34a)"
                              : "linear-gradient(135deg,#ef4444,#dc2626)",
                            borderRadius: "14px",
                          }}
                        >
                          {r.present
                            ? "Present"
                            : "Absent"}
                        </span>
                      </td>
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
