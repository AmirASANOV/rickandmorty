import React from "react";
import s from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <button className={s.filter}>
          <img src="/header/filter.svg" alt="logo" />
        </button>
        <input className={s.input} type="text" />
      </div>
      <button className={s.custom}>add customers</button>
    </div>
  );
};

export default Header;
