import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const getPeople = async () => {
	const response = await fetch("https://www.swapi.tech/api/people")
	if (response.ok) {
		const data = await response.json();
		console.log(data);
	}
  }

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getPeople();
  }, []);


  return (
    <div>
		Hola mundo
	</div>
  );
};
