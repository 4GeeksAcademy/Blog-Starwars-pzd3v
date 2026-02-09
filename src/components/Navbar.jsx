import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark mb-3 px-5 sticky-top">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG5.png"
          alt="Star Wars Logo"
          style={{ width: "80px" }}
        />
      </Link>

      <div className="ml-auto">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites{" "}
            <span className="badge bg-secondary ms-2">
              {store.favorites.length}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-center text-secondary">
                No favorites yet
              </li>
            ) : (
              store.favorites.map((fav, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/single/${fav.uid}`}
                    className="text-white text-decoration-none pe-4"
                  >
                    {fav.name}
                  </Link>
                  <button
                    className="btn btn-sm text-danger"
                    onClick={() =>
                      dispatch({ type: "ADD_FAVORITE", payload: fav })
                    }
                  >
                    🗑️
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
