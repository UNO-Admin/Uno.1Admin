import classNames from "classnames";
import { nanoid } from "nanoid";
import { Option } from "../Option/Option";
import styles from "./styles.module.css";

function InputSelectTable() {}

InputSelectTable.Default = function Default({
  mapValues,
  setForm,
  size = 1,
  label,
  value,
}) {
  if (mapValues.length === 1) {
    return <div>{label}</div>;
  }
  return (
    <div className={styles.input_container}>
      <label className={styles.label}>{value.length == 0 && label}</label>
      <select
        size={size}
        id={label}
        className={styles.form_input}
        value={value}
        onChange={(e) => setForm(e.target.value)}
      >
        {mapValues?.map((el) => (
          <Option key={nanoid()} label={el} value={el} />
        ))}
      </select>
    </div>
  );
};

InputSelectTable.Colorable = function Colorable({
  mapValues,
  setForm,
  size = 1,
  label,
  value,
}) {
  if (mapValues.length === 1) {
    return <div>{label}</div>;
  }
  return (
    <div className={classNames(styles.input_container, styles.colorable)}>
      <label className={styles.label}>{value.length == 0 && label}</label>
      <select
        size={size}
        id={label}
        className={styles.form_input}
        value={value}
        onChange={(e) => setForm(e.target.value)}
      >
        {mapValues?.map((el) => (
          <Option key={nanoid()} label={el.label} value={el.value} />
        ))}
      </select>
    </div>
  );
};

export default InputSelectTable;
