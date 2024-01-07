import React, { useState } from "react";
import s from "./TableItem.module.scss";
import { ITable } from "../../types/types";
import PostOptions from "../PostOptions/PostOptions";

interface ITableProps {
  post: ITable;
}

const TableItem: React.FC<ITableProps> = ({ post }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <tr className={s.wrapper}>
      <td>
        <input type="checkbox" />
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

      <td className={s.options}>
        <img
          className={s.threePoints}
          onClick={() => setIsVisible(!isVisible)}
          src="/item/threePoints.svg"
          alt=""
        />

        {isVisible && (
          <div className={s.postOptionWindow}>
            <PostOptions id={post.id} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableItem;
