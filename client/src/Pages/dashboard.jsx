import Sidebar from "../Components/Sidebar.jsx";
import DashboardContent from "../Components/dashboardContent.jsx";

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
