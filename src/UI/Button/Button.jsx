import classNames from "classnames";
import styles from "./styles.module.css";

export const Button = ({
  label,
  type = "button",
  onclick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(styles.button, styles.form_submit)}
      onClick={onclick}
    >
      {label}
    </button>
  );
};
