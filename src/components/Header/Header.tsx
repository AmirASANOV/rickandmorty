import React, { ChangeEvent, useState } from "react";
import s from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { inputValue, removePost } from "../../store/PostsSlice";

interface IHeaderProps {
  api: string;
  setApi: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<IHeaderProps> = ({ api, setApi }) => {
  const dispatch = useDispatch();

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setApi(event.target.value);
  }

  const selectedPosts = useSelector(
    (post: RootState) => post.posts.selectedPostIds
  );

  const removePosts = () => {
    selectedPosts.forEach((post) => dispatch(removePost(post)));
  };

  const value = useSelector((post: RootState) => post.posts.inputValue);
  console.log(value + "123");

  const handleInputValue = (e: any) => {
    dispatch(inputValue(e.target.value));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {selectedPosts.length ? (
          <button className={s.filter} onClick={() => removePosts()}>
            <img src="/header/trash.svg" alt="" />
          </button>
        ) : (
          <button className={s.filter}>
            <img src="/header/filter.svg" alt="logo" />
          </button>
        )}

        <input
          type="text"
          value={value}
          onChange={(e) => handleInputValue(e)}
        />

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
