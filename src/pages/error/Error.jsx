import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Error() {
  return (
    <div className="error-page">
      <h3 className="error-title">
        Error 500. We have some problems with the server 😅
      </h3>
      <Link to="/">
        <Button
          variant="primary"
          className="custom-button"
          style={{ margin: "20px" }}
        >
          Go to Home
        </Button>
      </Link>
    </div>
  );
}

export default Error;
