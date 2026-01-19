import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

function History() {
  // Function to generate random numbers for dummy stats
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Initialize stats with random numbers
  const [stats, setStats] = useState({
    total: getRandomNumber(50, 200),
    highRisk: getRandomNumber(10, 50),
    safe: getRandomNumber(20, 150)
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 container mt-4">
        <h2>History</h2>
        <p className="text-muted">Overview of past scans.</p>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Total Links Checked</h5>
                <h3>{stats.total}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>High Risk</h5>
                <h3 className="text-danger">{stats.highRisk}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
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
