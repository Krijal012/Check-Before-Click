import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/dashboard.jsx";
import History from "./Pages/history.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
