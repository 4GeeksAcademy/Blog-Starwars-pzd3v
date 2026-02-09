export const initialState = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: [],
};

const starWarsReducer = (store, action) => {
  switch (action.type) {
    case "SET_PEOPLE":
      return { ...store, people: action.payload };
    case "SET_PLANETS":
      return { ...store, planets: action.payload };
    case "SET_VEHICLES":
      return { ...store, vehicles: action.payload };
    case "ADD_FAVORITE":
      // Buscamos por nombre para evitar colisiones de IDs entre categorías
      const isFav = store.favorites.some(
        (fav) => fav.name === action.payload.name,
      );

      if (isFav) {
        // Si ya existe, lo filtramos por nombre para eliminarlo
        return {
          ...store,
          favorites: store.favorites.filter(
            (fav) => fav.name !== action.payload.name,
          ),
        };
      }
      // Si no existe, lo añadimos
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    default:
      return store;
  }
};

// IMPORTANTE: Exportación por defecto para evitar el error de tu captura
export default starWarsReducer;
