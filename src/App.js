import Main from "./components/Main";
import Loading from "./components/Loading";
import { useCheckLoginStatus } from "./hooks/useCheckLoginStatus";

const App = () => {
  const localToken = window.localStorage.getItem("clientToken");
  const { isFetched } = useCheckLoginStatus(localToken);

  !isFetched && <Loading />;
  return <>{isFetched && <Main />}</>;
  // if above return doesnot have a condition , react will throw an error
};

export default App;
