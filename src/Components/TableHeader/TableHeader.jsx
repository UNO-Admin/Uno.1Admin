import classNames from "classnames";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";

export const TableHeader = ({ headers }) => {
  return (
    <tr className={styles.table_row}>
      {headers.map((el) => (
        <th
          key={nanoid()}
          className={classNames(styles.table_cell, styles.table_cell__header)}
        >
          {el}
        </th>
      ))}
    </tr>
  );
};
