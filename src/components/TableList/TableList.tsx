import { useEffect, useState } from "react";
import s from "./TableList.module.scss";
import TableItem from "../TableItem/TableItem";
import { ITable, LoadingStatus } from "../../types/types";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ITableListProps {
  api: string;
}

const TableList: React.FC<ITableListProps> = ({ api }) => {
  const data = useSelector<RootState, ITable[]>((store) => store.posts.posts);
  console.log(data);

  const isLoading = useSelector<RootState, LoadingStatus>(
    (store) => store.posts.loadingStatus
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastPageIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastPageIndex - itemsPerPage;
  const [currentItem, setCurrentItem] = useState<ITable[]>([]);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurrentItem(data.slice(firstItemIndex, lastPageIndex));
  }, [data, firstItemIndex, lastPageIndex]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sortId = () => {
    const sortedItems = [...currentItem];
    sortedItems.sort((a: ITable, b: ITable) => {
      return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
    });
    setCurrentItem(sortedItems);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortAlphabetically = () => {
    const sortedItems = [...currentItem];
    sortedItems.sort((a: ITable, b: ITable) => {
      const comparison = a.name.localeCompare(b.name, "en", {
        sensitivity: "base",
      });
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setCurrentItem(sortedItems);
  };

  return (
    <div>
      {isLoading === LoadingStatus.pending ? (
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
                    onClick={sortId}
                    className={s.img}
                    src="/template/column-sorting.svg"
                    alt=""
                  />
                </td>

                <td className={s.name}>
                  <p>name</p>
                  <img
                    className={s.img}
                    onClick={sortAlphabetically}
                    src="/template/sort-white.svg"
                    alt=""
                  />
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
