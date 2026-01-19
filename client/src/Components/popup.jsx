import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/react.svg";

function Popup() {
  return (
    <div className="popup-body">
      <div className="popup-container container">

        <header className="d-flex align-items-center mb-3">
          <img src={logo} alt="Icon" className="logo me-2" />
          <h1 className="title m-0">Check-Before-Click.</h1>
        </header>

        <h3 className="mb-2">Link Safety Analysis</h3>

        <p id="url" className="text-break">
          https://example.com
        </p>

        <p>
          Risk Level:{" "}
          <strong id="riskLevel" className="medium">
            Analyzing...
          </strong>
        </p>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success btn-sm">Proceed</button>
          <button className="btn btn-primary btn-sm">Dash</button>
          <button className="btn btn-danger btn-sm">Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default Popup;
