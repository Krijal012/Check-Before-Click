import { useEffect, useState } from "react";
import axios from "axios";

function DashboardContent() {
  const [activeURL, setActiveURL] = useState("");
  const [links, setLinks] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/dashboard/latest");
      setActiveURL(data.url || "");
      setLinks(data.Links || []);
      setRiskScore(data.riskScore || 0);
    } catch(err){ console.error(err); }
  };

  useEffect(() => { fetchDashboard(); const interval = setInterval(fetchDashboard, 2000); return () => clearInterval(interval); }, []);

  const safeLinks = links.filter(l => l.status==="safe");
  const riskyLinks = links.filter(l => l.status==="risky");
  const blockedLinks = links.filter(l => l.status==="blocked");

  const renderLinks = (items, color) => items.length===0 ? <p>None</p> : <ul>{items.map((l,i)=><li key={i}><a href={l.url} target="_blank" rel="noreferrer" style={{color}}>{l.url}</a></li>)}</ul>;
  const columnStyle = { flex:1, margin:"0 10px", padding:"10px", border:"1px solid #ddd", borderRadius:"8px", backgroundColor:"#f9f9f9" };

  return (
    <div style={{padding:"20px", fontFamily:"Poppins, sans-serif"}}>
      <h1>Check-Before-Click Dashboard</h1>
      <p><strong>Current Website:</strong> {activeURL || "No active scan"}</p>
      <p><strong>Risk Score:</strong> <span style={{color:riskScore>70?"red":riskScore>40?"orange":"green", fontWeight:"bold"}}>{riskScore}%</span></p>
      <div style={{display:"flex", marginTop:"20px"}}>
        <div style={columnStyle}><h2 style={{color:"green"}}>Safe Links</h2>{renderLinks(safeLinks,"green")}</div>
        <div style={columnStyle}><h2 style={{color:"orange"}}>Risky Links</h2>{renderLinks(riskyLinks,"orange")}</div>
        <div style={columnStyle}><h2 style={{color:"red"}}>Blocked Links</h2>{renderLinks(blockedLinks,"red")}</div>
      </div>
    </div>
  );
}

export default DashboardContent;
