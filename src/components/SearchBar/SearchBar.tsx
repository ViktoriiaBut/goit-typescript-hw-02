import { useState, FC } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  disabled: boolean;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit, disabled }) => {
    const [query, setQuery] = useState<string>("")
    function handlChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()
        const trQuery = query.trim()
        if (trQuery === "") {
            toast.error("Waiting your query")
            return
        }

        onSubmit(trQuery)
        setQuery("")
    }
    
    return (
        <form onSubmit={handleSubmit}>
          <div className={s.searchContainer}>
            <div className={s.searcWrapper}>
            <input
              className={`${s.searchInput} ${disabled ? s.disabledInput : ""}`}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Enter your query"
              value={query}
              disabled={disabled}
              onChange={handlChange}
            />
            <button
              className={`${s.searchBtn} ${disabled ? s.disabledBtn : ""}`}
              type="submit"
              disabled={disabled}
            >
              <IoSearch />
            </button>
            </div>
          </div>
        </form>
      );
    };
    
    export default SearchBar;