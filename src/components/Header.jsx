import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <p className="navbar-logo">React Application</p>
        <p><Link to="/greet">Greet</Link></p>
      </nav>
    </header>
  );
};

export default Header;
