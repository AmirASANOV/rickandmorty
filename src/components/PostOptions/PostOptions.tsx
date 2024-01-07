import React, { useRef } from "react";
import s from "./PostOptions.module.scss";

const PostOptions: React.FC = (props) => {
  return (
    <div className={s.wrapper}>
      <button className={s.btn}>
        View <img src="/postOption/info.svg" alt="" />
      </button>
      <button className={s.btn}>
        Edit <img src="/postOption/edit.svg" alt="" />
      </button>

      <button className={s.btn}>
        Delete <img src="/postOption/trash.svg" alt="" />
      </button>
    </div>
  );
};

export default PostOptions;
