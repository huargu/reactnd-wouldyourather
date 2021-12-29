import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container">
      <div className="result-div">
        <h1>404</h1>
        <p>Sorry, the page you're looking for does not exist.</p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </div>
  );
}