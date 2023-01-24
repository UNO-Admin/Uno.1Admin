import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './styles.module.css'

export const SearchBar = ({ handleSearch, filter, placeholder }) => {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  } , [filter])

  return (
    <input
    ref={ref}
      type="text"
      value={filter}
      placeholder={placeholder}
      onChange={handleSearch}
      className={styles.search_input}
    ></input>
  );
};
