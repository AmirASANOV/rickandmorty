import Header from "./components/Header/Header";
import s from "./App.module.scss";
import TableList from "./components/TableList/TableList";
import { useState } from "react";

function App() {
  const [api, setApi] = useState<string>("Location");

  return (
    <div className={s.wrapper}>
      <Header api={api} setApi={setApi} />
      <TableList api={api} />
    </div>
  );
}

export default App;
