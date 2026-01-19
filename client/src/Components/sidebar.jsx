import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: 220, minHeight: "100vh" }}>
      <h5 className="mb-4">Check-Before-Click</h5>
      <NavLink to="/dashboard" className={({ isActive }) => `btn w-100 mb-2 text-start ${isActive ? "btn-light text-dark":"btn-outline-light"}`}>📊 Dashboard</NavLink>
      <NavLink to="/history" className={({ isActive }) => `btn w-100 text-start ${isActive ? "btn-light text-dark":"btn-outline-light"}`}>📜 History</NavLink>
    </div>
  );
}

export default Sidebar;
