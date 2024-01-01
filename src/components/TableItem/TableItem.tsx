import React from "react";
import s from "./TableItem.module.scss";
import { ITable } from "../../types/types";

interface ITableProps {
  post: ITable;
}

const TableItem: React.FC<ITableProps> = (props) => {
  return (
    <tr className={s.wrapper}>
      <td>
        <input type="checkbox" />
      </td>

      <td className={s.id}>
        <p>{props.post.id}</p>
      </td>

      <td className={s.name}>
        <p>{props.post.name}</p>
        <p>{props.post.dimension}</p>
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
