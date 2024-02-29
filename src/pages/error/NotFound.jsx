import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function NotFound() {
  return (
    <div className="error-page">
      <h3 className="error-title">Error 404. Page not found</h3>
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

export default NotFound;
