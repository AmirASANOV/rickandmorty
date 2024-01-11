import Header from "./components/Header/Header";
import s from "./App.module.scss";
import TableList from "./components/TableList/TableList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts, switchLoadingStatus } from "./store/PostsSlice";
import { LoadingStatus } from "./types/types";

function App() {
  const [api, setApi] = useState<string>("Location");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchLoadingStatus(LoadingStatus.pending));
    const apiLoad =
      api === "Location"
        ? "https://rickandmortyapi.com/api/location"
        : "https://rickandmortyapi.com/api/character";

    axios.get(apiLoad).then((response) => {
      dispatch(setPosts(response.data.results));
      dispatch(switchLoadingStatus(LoadingStatus.fulfilled));
    });
  }, [api]);

  return (
    <div className={s.wrapper}>
      <Header api={api} setApi={setApi} />
      <TableList api={api} />
    </div>
  );
}

export default App;
