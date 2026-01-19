import { Routes, Route } from "react-router-dom";
import Popup from "./Components/popup";
import Dashboard from "./Pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Popup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
