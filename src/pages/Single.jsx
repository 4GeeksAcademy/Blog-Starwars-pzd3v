import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
  const { type, uid } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(
          `https://www.swapi.tech/api/${type}/${uid}`,
        );
        if (response.ok) {
          const data = await response.json();
          // IMPORTANTE: Guardamos 'properties' que es donde están los datos reales
          setDetails(data.result.properties);
        }
      } catch (error) {
        console.error("Error cargando la galaxia:", error);
      }
    };
    getDetails();
  }, [type, uid]);

  if (!details)
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-warning" role="status"></div>
        <h2 className="text-white mt-3">Consultando los archivos Jedi...</h2>
      </div>
    );

  return (
    <div className="container text-white mt-5">
      <div className="row bg-dark p-4 rounded shadow-lg border border-secondary">
        <div className="col-md-6 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`}
            className="img-fluid rounded border border-warning"
            style={{ maxHeight: "500px" }}
            alt={details.name}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400";
            }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-warning display-3 fw-bold">{details.name}</h1>
          <p className="fs-5 text-secondary">
            A fascinating part of the Star Wars universe, located in the {type}{" "}
            registry.
          </p>
          <hr className="border-warning opacity-50" />

          {/* Sección de detalles técnicos */}
          <div className="row text-center mt-4">
            {Object.entries(details).map(([key, value]) => {
              // Filtramos cosas que no queremos mostrar como URLs o fechas de edición
              const keysToIgnore = [
                "url",
                "homeworld",
                "created",
                "edited",
                "name",
              ];
              if (keysToIgnore.includes(key) || typeof value === "object")
                return null;

              return (
                <div key={key} className="col-4 mb-4">
                  <div className="border-bottom border-danger pb-2">
                    <span
                      className="text-danger fw-bold text-uppercase d-block mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {key.replace("_", " ")}
                    </span>
                    <span className="fs-5 text-light">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <Link to="/" className="btn btn-outline-warning btn-lg px-5">
          <i className="fas fa-arrow-left me-2"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};
