import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

function Dashboard() {
  // Function to generate random numbers
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Dummy links generator
  const generateLinks = (count, type) => {
    const prefixes = ["https://example", "https://site", "http://mysite", "https://link"];
    const suffixes = [".com", ".org", ".net", ".io"];
    return Array.from({ length: count }, (_, i) => ({
      url: `${prefixes[getRandomNumber(0, prefixes.length - 1)]}${getRandomNumber(1, 100)}${suffixes[getRandomNumber(0, suffixes.length - 1)]}`,
      type
    }));
  };

  // Initialize stats with random numbers and links
  const [stats, setStats] = useState(() => {
    const safeCount = getRandomNumber(10, 20);
    const riskyCount = getRandomNumber(5, 15);
    const blockedCount = getRandomNumber(3, 10);
    return {
      total: safeCount + riskyCount + blockedCount,
      safeLinks: safeCount,
      riskyLinks: riskyCount,
      blockedLinks: blockedCount,
      links: [
        ...generateLinks(safeCount, "safe"),
        ...generateLinks(riskyCount, "risky"),
        ...generateLinks(blockedCount, "blocked"),
      ]
    };
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="d-flex">
      
      <div className="flex-grow-1 container mt-4">
        <h2>Dashboard</h2>
        <p className="text-muted">Overview of link scans and risks.</p>

        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Total Links Checked</h5>
                <h3>{stats.total}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Safe Links</h5>
                <h3 className="text-success">{stats.safeLinks}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Risky Links</h5>
                <h3 className="text-warning">{stats.riskyLinks}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Blocked Links</h5>
                <h3 className="text-danger">{stats.blockedLinks}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="row mt-5">
          <div className="col-md-4">
            <h5 className="text-success">Safe Links</h5>
            <ul className="list-group">
              {stats.links.filter(l => l.type === "safe").map((link, idx) => (
                <li key={idx} className="list-group-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-warning">Risky Links</h5>
            <ul className="list-group">
              {stats.links.filter(l => l.type === "risky").map((link, idx) => (
                <li key={idx} className="list-group-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-danger">Blocked Links</h5>
            <ul className="list-group">
              {stats.links.filter(l => l.type === "blocked").map((link, idx) => (
                <li key={idx} className="list-group-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
