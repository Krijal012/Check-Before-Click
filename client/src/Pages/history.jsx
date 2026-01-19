import { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";

function History() {
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    safe: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 container mt-4">
        <h2>History</h2>
        <p className="text-muted">Overview of past scans.</p>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Links Checked</h5>
                <h3>{stats.total}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>High Risk</h5>
                <h3 className="text-danger">{stats.highRisk}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Safe Links</h5>
                <h3 className="text-success">{stats.safe}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
