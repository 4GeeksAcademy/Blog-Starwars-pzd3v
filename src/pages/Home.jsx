import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getPeople = async () => {
    const response = await fetch("https://www.swapi.tech/api/people");
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "SET_PEOPLE", payload: data.results });
    }
  };

  const getPlanets = async () => {
    const response = await fetch("https://www.swapi.tech/api/planets");
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "SET_PLANETS", payload: data.results });
    }
  };

  const getVehicles = async () => {
    const response = await fetch("https://www.swapi.tech/api/vehicles");
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "SET_VEHICLES", payload: data.results });
    }
  };

  useEffect(() => {
    // Solo hace el fetch si el store está vacío para evitar el bloqueo 429
    if (store.people.length === 0) getPeople();
    if (store.planets.length === 0) getPlanets();
    if (store.vehicles.length === 0) getVehicles();
  }, []);

  return (
    <div className="container-fluid p-5">
      <h1 className="text-danger mb-4 font-weight-bold">Characters</h1>
      <div className="d-flex flex-row overflow-auto pb-3 mb-5">
        {store.people.map((person) => (
          <Card key={person.uid} item={person} type="people" />
        ))}
      </div>

      <h1 className="text-danger mb-4">Planets</h1>
      <div className="d-flex flex-row overflow-auto pb-3 mb-5">
        {store.planets.map((planet) => (
          <Card key={planet.uid} item={planet} type="planets" />
        ))}
      </div>

      <h1 className="text-danger mb-4">Vehicles</h1>
      <div className="d-flex flex-row overflow-auto pb-3 mb-5">
        {store.vehicles.map((vehicle) => (
          <Card key={vehicle.uid} item={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};
