import { useEffect, useState } from "react";
import s from "./TableList.module.scss";
import TableItem from "../TableItem/TableItem";
import axios from "axios";
import { ITable } from "../../types/types";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const TableList = () => {
  const [data, setData] = useState<ITable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastPageIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastPageIndex - itemsPerPage;
  const [currentItem, setCurrentItem] = useState<ITable[]>([]);

  useEffect(() => {
    const api = "https://rickandmortyapi.com/api/location";

    axios.get(api).then((response) => {
      setData(response.data.results);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentItem(data.slice(firstItemIndex, lastPageIndex));
  }, [data, firstItemIndex, lastPageIndex]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading ? (
        <div className={s.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <table className={s.template}>
            <thead>
              <tr className={s.row}>
                <td>
                  <input type="checkbox" />
                </td>

                <td className={s.id}>
                  <p>#</p>
                  <img
                    className={s.img}
                    src="/template/column-sorting.svg"
                    alt=""
                  />
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
              {currentItem.map((post: ITable, i: number) => (
                <TableItem key={i} post={post} />
              ))}
            </tbody>
          </table>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default TableList;
