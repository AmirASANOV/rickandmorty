import React, { useEffect, useState } from "react";
import s from "./TableList.module.scss";
import TableItem from "../TableItem/TableItem";
import axios from "axios";
import { ITable } from "../../types/types";

const TableList = () => {
  const [data, setData] = useState<ITable[]>([]);

  useEffect(() => {
    const api = "https://rickandmortyapi.com/api/location";
    axios.get(api).then((response) => setData(response.data.results));
  }, []);

  return (
    <table className={s.template}>
      <thead>
        <tr className={s.row}>
          <td>
            <input type="checkbox" />
          </td>

          <td className={s.id}>
            <p>#</p>
            <img className={s.img} src="/template/column-sorting.svg" alt="" />
          </td>

          <td className={s.name}>
            <p>name</p>
            <img src="/template/sort-white.svg" alt="" />
          </td>

          <td className={s.description}>
            <p>description</p>
          </td>

          <td className={s.status}>
            <p>status</p>
            <img src="/template/sort-white.svg" alt="" />
          </td>

          <td className={s.rate}>
            <p>rate</p>
          </td>

          <td className={s.balance}>
            <p>balance</p>
          </td>

          <td className={s.deposit}>
            <p>deposit</p>
          </td>
        </tr>
      </thead>
      <tbody>
        {data.map((post: ITable, i: number) => (
          <TableItem key={i} post={post} />
        ))}
      </tbody>
    </table>
  );
};

export default TableList;
