export const initialState = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: [], // Aqui guardaremos lo que el usuario eligio
};
export default function starWarsReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_FAVORITE":
      //Buscamos si ya está en la lista
      const isFavorite = store.favorites.find(
        (fav) => fav.id === action.payload.id,
      );

      if (isFavorite) {
        //Si ya está, lo eliminamos para que no se repita
        return {
          ...store,
          favorites: store.favorites.filter(
            (fav) => fav.id !== action.payload.id,
          ),
          //El método .filter() crea una lista nueva SIN el elemento que ya estaba.
        };
      } else {
        //Si no está, lo agregamos

        return {
          ...store,
          favorites: [...store.favorites, action.payload],
        };
      }

      case "SET_PEOPLE":
        return {
          ...store,
          people: action.payload,
        };

    default:
      return store;
  }
}
