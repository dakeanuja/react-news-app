// NavBar.js
import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "./theme/ThemeContext";

export default function NavBar({ onSearch, clearSearch }) {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const{theme,toggleTheme}=useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search);
      setSearch("");  
    }
  };

  const showSearchBar = location.pathname === "/"; // show only on homepage

  // helper: highlight dropdown item if it matches route
  const getActiveClass = (path) =>
    location.pathname === path ? "dropdown-item active fw-bold" : "dropdown-item";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={clearSearch}>
          NewsApp
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={clearSearch}>
                Home
              </NavLink>
            </li>

            {/* About */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={clearSearch}>
                About
              </NavLink>
            </li>

            {/* Dropdown for Categories */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className={getActiveClass("/business")} to="/business" onClick={clearSearch}>Business</NavLink></li>
                <li><NavLink className={getActiveClass("/entertainment")} to="/entertainment" onClick={clearSearch}>Entertainment</NavLink></li>
                <li><NavLink className={getActiveClass("/sports")} to="/sports" onClick={clearSearch}>Sports</NavLink></li>
                <li><NavLink className={getActiveClass("/health")} to="/health" onClick={clearSearch}>Health</NavLink></li>
                <li><NavLink className={getActiveClass("/science")} to="/science" onClick={clearSearch}>Science</NavLink></li>
                <li><NavLink className={getActiveClass("/technology")} to="/technology" onClick={clearSearch}>Technology</NavLink></li>
              </ul>
            </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/favourites" onClick={clearSearch}>
                 ⭐ Favorites
              </NavLink>
            </li>
        <button onClick={toggleTheme} className="btn btn-outline-secondary ms-auto">{theme==="light"?"Dark":"Light"}</button>

          </ul>

          {/* Search Form */}
          {showSearchBar && (
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
