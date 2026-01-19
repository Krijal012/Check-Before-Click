import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

function Dashboard() {
  // Hardcoded Wikipedia demo links
  const wikiLinks = [
    { url: "https://en.wikipedia.org/wiki/JavaScript", type: "safe", risk_percentage: 5 },
    { url: "https://en.wikipedia.org/wiki/React_(web_framework)", type: "safe", risk_percentage: 10 },
    { url: "https://en.wikipedia.org/wiki/Node.js", type: "safe", risk_percentage: 15 },

    { url: "https://en.wikipedia.org/wiki/Phishing", type: "risky", risk_percentage: 60 },
    { url: "https://en.wikipedia.org/wiki/Malware", type: "risky", risk_percentage: 55 },
    { url: "https://en.wikipedia.org/wiki/Social_engineering_(security)", type: "risky", risk_percentage: 50 },

    { url: "https://en.wikipedia.org/wiki/Virus", type: "blocked", risk_percentage: 95 },
    { url: "https://en.wikipedia.org/wiki/Hacking", type: "blocked", risk_percentage: 90 },
    { url: "https://en.wikipedia.org/wiki/Ransomware", type: "blocked", risk_percentage: 100 },
  ];

  // Initialize stats based on demo links
  const [stats, setStats] = useState(() => {
    const safeLinks = wikiLinks.filter(l => l.type === "safe");
    const riskyLinks = wikiLinks.filter(l => l.type === "risky");
    const blockedLinks = wikiLinks.filter(l => l.type === "blocked");

    return {
      total: wikiLinks.length,
      safeLinks: safeLinks.length,
      riskyLinks: riskyLinks.length,
      blockedLinks: blockedLinks.length,
      links: wikiLinks,
    };
  });

  // Optional: fetch real stats from backend if available
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
                  <span className="float-end">{link.risk_percentage}%</span>
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
                  <span className="float-end">{link.risk_percentage}%</span>
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
                  <span className="float-end">{link.risk_percentage}%</span>
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
