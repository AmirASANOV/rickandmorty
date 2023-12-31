import React from "react";
import s from "./PostOptions.module.scss";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/PostsSlice";

interface IPostOptionProps {
  id: number;
}

const PostOptions: React.FC<IPostOptionProps> = (props) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (postId: number) => {
    dispatch(deletePost(postId));
    console.log(dispatch(deletePost(postId)));
  };

  return (
    <div className={s.wrapper}>
      <button className={s.btn}>
        View <img src="/postOption/info.svg" alt="" />
      </button>
      <button className={s.btn}>
        Edit <img src="/postOption/edit.svg" alt="" />
      </button>

      <button onClick={() => handleDeleteClick(props.id)} className={s.btn}>
        Delete <img src="/postOption/trash.svg" alt="" />
      </button>
    </div>
  );
};

export default PostOptions;
