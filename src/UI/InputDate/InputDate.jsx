import { Calendar } from "react-calendar";
import { useToggleState } from "../../hooks/UseToggleState";
import styles from "./styles.module.css";
import { formatDate } from "../../helpers/formatDate.ts";
import { useEffect, useRef } from "react";

export function InputDate({ date, setDate, selectRange = false, label }) {
  const [isOpen, setIsOpen] = useToggleState(false);
  const ref = useRef(null);

  const onClickOutsideHandler = (e) => {
    if (isOpen && !ref.current.contains(e.target)) {
      setIsOpen();
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
    return () => window.removeEventListener("click", onClickOutsideHandler);
  }, [date]);

  return (
    <div className={styles.input_container} ref={ref}>
      <button
        onClick={() => setIsOpen()}
        type="button"
        className={styles.form_input}
      >
        {formatDate(date)}
      </button>
      {isOpen && (
        <div className={styles.calendar_wrapper}>
          <Calendar
            onChange={setDate}
            value={date || null}
            selectRange={selectRange}
          />
        </div>
      )}
      <div className={styles.form_label}>{label}</div>
    </div>
  );
}
