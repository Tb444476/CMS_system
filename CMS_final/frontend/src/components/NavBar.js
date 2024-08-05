import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ pages }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/admin">MyWebsite</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {pages.map((page, index) => (
            <li className="nav-item" key={index}>
              <Link className="nav-link" to={`/${page.title.toLowerCase()}`}>{page.title}</Link>
            </li>
          ))}
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin Panel</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default NavBar;
