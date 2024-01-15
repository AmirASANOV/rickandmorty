import React, { useState } from "react";
import s from "./Modal.module.scss";
import { ITable } from "../../types/types";

interface IModalProps {
  switchVisible: () => void;
  addNewPost: (name: ITable) => void;
  filteredPosts: ITable[];
}

const Modal: React.FC<IModalProps> = (props) => {
  const [value, setValue] = useState<string>("");

  const handleValue = () => {
    if (value.length) {
      let lastIndex =
        props.filteredPosts[props.filteredPosts.length - 1].id + 1;
      let newPost = { id: lastIndex, name: value };
      props.addNewPost(newPost);
      setValue("");
      props.switchVisible();
    }
  };

  return (
    <div className={s.wrapper} onClick={() => props.switchVisible()}>
      <div className={s.window} onClick={(e) => e.stopPropagation()}>
        <img
          className={s.closeButton}
          onClick={() => props.switchVisible()}
          src="/modal/close.svg"
          alt="close"
        />
        <p>Create Your Universe!</p>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={s.input}
          type="text"
          placeholder="enter a name your Universe!"
        />
        <button onClick={handleValue} className={s.button}>
          Add Universe
        </button>
      </div>
    </div>
  );
};

export default Modal;
