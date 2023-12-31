import Header from "./components/Header/Header";
import s from "./App.module.scss";
import TableList from "./components/TableList/TableList";

function App() {
  return (
    <div className={s.wrapper}>
      <Header />
      <TableList />
    </div>
  );
}

export default App;
