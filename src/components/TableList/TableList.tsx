import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./TableList.module.scss";
import TableItem from "../TableItem/TableItem";
import { ITable } from "../../types/types";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deselectPost, removePost } from "../../store/PostsSlice";
import Modal from "../Modal/Modal";

interface ITableListProps {
  api: string;
  setApi: React.Dispatch<React.SetStateAction<string>>;
}

const TableList: React.FC<ITableListProps> = ({ api, setApi }) => {
  const posts = useSelector<RootState, ITable[]>((store) => store.posts.posts);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagePosts, setPagePosts] = useState<ITable[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredPosts, setFilteredPosts] = useState<ITable[]>(posts);
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpenAutoComplete, setIsOpenAutComplete] = useState<boolean>(true);

  const addNewPost = (object: ITable) => {
    const newPost = {
      id: object.id,
      name: object.name,
    };
    setFilteredPosts([...filteredPosts, newPost]);
  };

  const filterPosts = (value: string, dataPosts: ITable[]) => {
    if (!value.length) {
      return dataPosts;
    }
    return dataPosts.filter((post: ITable) =>
      post.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredPosts = filterPosts(value, posts);
      setFilteredPosts(filteredPosts);
    }, 300);
    return () => clearTimeout(Debounce);
  }, [posts, value]);

  const selectedPosts = useSelector(
    (state: RootState) => state.posts.selectedPostIds
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const lastPageIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastPageIndex - itemsPerPage;
    setPagePosts(filteredPosts.slice(firstItemIndex, lastPageIndex));
  }, [filteredPosts, currentPage, itemsPerPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sortId = () => {
    const sortedItems = [...pagePosts];
    sortedItems.sort((a: ITable, b: ITable) => {
      return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
    });
    setPagePosts(sortedItems);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortAlphabetically = () => {
    const sortedItems = [...pagePosts];
    sortedItems.sort((a: ITable, b: ITable) => {
      const comparison = a.name.localeCompare(b.name, "en", {
        sensitivity: "base",
      });
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setPagePosts(sortedItems);
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

  const switchVisible = () => {
    setIsVisible(!isVisible);
  };

  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const clickedElement = e.currentTarget as HTMLLIElement;
    setValue(clickedElement.textContent || "");
    setIsOpenAutComplete(!isOpenAutoComplete);
  };

  const inputClickHandler = () => {
    setIsOpenAutComplete(true);
  };

  return (
    <div className={s.wrapper}>
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

          <div className={s.inputSection}>
            <input
              className={s.input}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onClick={inputClickHandler}
            />

            <ul className={s.autoComplete}>
              {value && isOpenAutoComplete
                ? pagePosts.map((post: ITable, i: number) => (
                    <li
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        itemClickHandler(e)
                      }
                      className={s.item}
                      key={i}
                    >
                      {post.name}
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <select value={api} onChange={handleSelectChange}>
            <option value="Location">Location</option>
            <option value="Character">Character</option>
          </select>
        </div>
        <button onClick={() => setIsVisible(!isVisible)} className={s.custom}>
          add Universe!
        </button>
      </div>

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
          {pagePosts.map((post: ITable, i: number) => (
            <TableItem key={i} post={post} />
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredPosts.length}
        paginate={paginate}
      />

      {isVisible && (
        <Modal
          switchVisible={switchVisible}
          addNewPost={addNewPost}
          filteredPosts={filteredPosts}
        />
      )}
    </div>
  );
};

export default TableList;
