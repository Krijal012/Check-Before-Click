import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand">Check-Before-Click</span>

      <Link to="/" className="btn btn-light btn-sm">
        Back to Popup
      </Link>
    </nav>
  );
}

export default Navbar;
