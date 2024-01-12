import { ChangeEvent, useEffect, useState } from "react";
import s from "./TableList.module.scss";
import TableItem from "../TableItem/TableItem";
import { ITable, LoadingStatus } from "../../types/types";

import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deselectPost, removePost } from "../../store/PostsSlice";

interface ITableListProps {
  api: string;
  setApi: React.Dispatch<React.SetStateAction<string>>;
}

const TableList: React.FC<ITableListProps> = ({ api, setApi }) => {
  const data = useSelector<RootState, ITable[]>((store) => store.posts.posts);

  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastPageIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastPageIndex - itemsPerPage;
  const [currentItem, setCurrentItem] = useState<ITable[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [value, setValue] = useState<string>("");

  const selectedPosts = useSelector(
    (state: RootState) => state.posts.selectedPostIds
  );

  const dispatch = useDispatch();

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

  const removeSelect = () => {
    selectedPosts.forEach((post) => dispatch(deselectPost(post)));
  };

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setApi(event.target.value);
  }

  const removePosts = () => {
    selectedPosts.forEach((post) => dispatch(removePost(post)));
  };

  const filterPosts = (searchPosts: string, listOfPosts: ITable[]) => {
    if (!value) {
      return data;
    }
    return currentItem.filter((post) =>
      post.name.toLowerCase().includes(searchPosts.toLowerCase())
    );
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredPosts = filterPosts(value, data);
      setCurrentItem(filteredPosts);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [data, filterPosts, value]);

  return (
    <div>
      <div className={s.container}>
        <div className={s.filterSection}>
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
            onChange={(e) => setValue(e.target.value)}
          />

          <select value={api} onChange={handleSelectChange}>
            <option value="Location">Location</option>
            <option value="Character">Character</option>
          </select>
        </div>
        <button className={s.custom}>add customers</button>
      </div>

      <div>
        <table className={s.template}>
          <thead>
            <tr className={s.row}>
              <td>
                {selectedPosts.length ? (
                  <img
                    className={s.checkboxMin}
                    onClick={() => removeSelect()}
                    src="/template/checkboxMinus.svg"
                    alt=""
                  />
                ) : (
                  <input className={s.checkbox} type="checkbox" />
                )}
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
      </div>
    </div>
  );
};

export default TableList;
