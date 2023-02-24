import Main from "./components/Main";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  setClientId,
  setEmail,
  setUserName,
} from "./components/features/clients/clientsSlice";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  // const baseUrl = "https://zomato06.onrender.com";
  const getData = async () => {
    setLoading(true);
    await axios
      .post(`/api/clients/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === false) {
        } else {
          dispatch(setClientId(res.data._doc._id));
          dispatch(setUserName(res.data._doc.username));
          dispatch(setEmail(res.data._doc.email));
        }
      })
      .catch((err) => console.log(err));
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
