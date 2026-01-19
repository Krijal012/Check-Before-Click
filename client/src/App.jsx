import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import History from "./Pages/history";

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
