import Main from "./components/Main";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  setIsClientLoggedIn,
  setEmail,
  setUserName,
  setClientToken,
  resetUser,
} from "./components/features/clients/clientsSlice";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const baseUrl = process.env.BASE_URL;
  const localToken = window.localStorage.getItem("clientToken");

  const getData = async () => {
    setLoading(true);
    if (localToken) {
      const config = { headers: { Authorization: `Bearer ${localToken}` } };
      await axios
        .post(`${baseUrl}/api/clients/auth`, {}, config)
        .then((res) => {
          if (res.data.success) {
            dispatch(setClientToken(localToken));
            dispatch(setUserName(res.data.username));
            dispatch(setEmail(res.data.email));
          } else {
            dispatch(resetUser());
          }
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading && <Main />}
      {loading && <Loading />}
    </>
  );
};

export default App;
