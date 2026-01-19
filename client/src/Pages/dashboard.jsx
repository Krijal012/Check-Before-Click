import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Dashboard</h2>
        <p className="text-muted">
          Overview of analyzed links and risk levels.
        </p>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Links Checked</h5>
                <h3>42</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>High Risk</h5>
                <h3 className="text-danger">7</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Safe Links</h5>
                <h3 className="text-success">35</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
