import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  // Ajuste de nombres: SWAPI usa 'people', pero la web de imágenes usa 'characters'
  const resourceType = type === "people" ? "characters" : type;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${resourceType}/${item.uid}.jpg`;

  // Comprobar si el item ya está en favoritos
  const isFavorite = store.favorites.some((fav) => fav.name === item.name);

  return (
    <div
      className="card m-2"
      style={{
        minWidth: "18rem",
        backgroundColor: "#212529",
        color: "white",
        border: "1px solid #444",
      }}
    >
      <img
        src={imageUrl}
        className="card-img-top"
        alt={item.name}
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400";
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning">{item.name}</h5>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link
            to={`/single/${type}/${item.uid}`}
            className="btn btn-outline-primary"
          >
            Learn more!
          </Link>

          <button
            className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => dispatch({ type: "ADD_FAVORITE", payload: item })}
          >
            {/* El corazón cambiará solo si isFavorite es true para ESTE componente */}
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};
