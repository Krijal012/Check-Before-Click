// src/pages/Dashboard.jsx
import Sidebar from "../Components/sidebar";
import DashboardContent from "../Components/DashboardContent";

function Dashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <DashboardContent />
      </div>
    </div>
  );
}

export default Dashboard;
