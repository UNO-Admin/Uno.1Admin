import styles from "./styles.module.css";

export const InputPhone = ({label, value, setValue }) => {
  return (
    <div className={styles.input_container}>
      <input
        autoComplete="new-password"
        id={label}
        type="number"
        className={styles.form_input}
        placeholder=" "
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <label
        htmlFor={label}
        className={styles.form_label}>
        {label}
      </label>
    </div>
  );
};