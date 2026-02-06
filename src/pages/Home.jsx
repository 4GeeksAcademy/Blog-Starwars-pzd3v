import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const getApi = async () => {
	const response = fetch("https://www.swapi.tech/api/people")
  }
  
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
};
