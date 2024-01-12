import React from "react";
import s from "./TableItem.module.scss";
import { ITable } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { deselectPost, selectPost } from "../../store/PostsSlice";
import { RootState } from "../../store/store";

interface ITableProps {
  post: ITable;
}

const TableItem: React.FC<ITableProps> = ({ post }) => {
  const dispatch = useDispatch();

  const selectedPostIds = useSelector(
    (state: RootState) => state.posts.selectedPostIds
  );

  const handleCheckboxChange = (postId: number) => {
    if (selectedPostIds.includes(postId)) {
      dispatch(deselectPost(postId));
    } else {
      dispatch(selectPost(postId));
    }
  };

  return (
    <tr className={`${s.wrapper} ${post.id % 2 === 0 ? s.bgblue : ""}`}>
      <td className={s.checkbox}>
        <input
          type="checkbox"
          checked={selectedPostIds.includes(post.id)}
          onChange={() => handleCheckboxChange(post.id)}
        />
      </td>

      <td className={s.id}>
        <p>{post.id}</p>
      </td>

      <td className={s.name}>
        <p>{post.name}</p>
        <p>{post.dimension}</p>
      </td>

      <td className={s.description}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...</p>
      </td>

      <td className={s.status}>
        <p>Open</p>
      </td>

      <td className={s.rate}>
        <p>$70.00</p>
        <p>CAD</p>
      </td>

      <td className={s.balance}>
        <p>balance</p>
      </td>

      <td className={s.deposit}>
        <p>deposit</p>
      </td>
    </tr>
  );
};

export default TableItem;
