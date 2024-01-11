import React from "react";
import s from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.ldsdefault}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
