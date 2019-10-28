import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Plural Administration</h1>
      <p>React, Flux, react Routing for ultra-responsove web apps</p>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}

export default HomePage;
