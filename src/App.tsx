import Header from "./components/Header/Header";
import s from "./App.module.scss";
import TableList from "./components/TableList/TableList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, switchLoadingStatus } from "./store/PostsSlice";
import { LoadingStatus } from "./types/types";
import { RootState } from "./store/store";
import Loader from "./components/Loader/Loader";

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

  const isLoading = useSelector<RootState, LoadingStatus>(
    (store) => store.posts.loadingStatus
  );

  return (
    <div className={s.wrapper}>
      {isLoading === LoadingStatus.pending ? (
        <Loader />
      ) : (
        <>
          {/* <Header api={api} setApi={setApi} /> */}
          <TableList api={api} setApi={setApi} />
        </>
      )}
    </div>
  );
}

export default App;
