import React, { ChangeEvent } from "react";
import s from "./Header.module.scss";

interface IHeaderProps {
  api: string;
  setApi: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<IHeaderProps> = ({ api, setApi }) => {
  
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setApi(event.target.value);
    console.log(api);
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <button className={s.filter}>
          <img src="/header/filter.svg" alt="logo" />
        </button>

        <select value={api} onChange={handleSelectChange}>
          <option value="Location">Location</option>
          <option value="Character">Character</option>
        </select>
      </div>
      <button className={s.custom}>add customers</button>
    </div>
  );
};

export default Header;
