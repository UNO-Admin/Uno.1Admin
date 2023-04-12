import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { SelectedCity } from "../SelectedCities/SelectedCities";

export const InputDataSelect = ({ setForm, label, availableCities, city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }
  const handleChange = (e) => {
    const newValue = city.concat(e);
    setForm(newValue);
  };

  function deleteCity(item) {
    const newCityValue = city.filter((el) => el !== item);
    setForm(newCityValue);
  }

  const onClickOutsideHandler = (e) => {
    if (!ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler);
    return () => window.removeEventListener("click", onClickOutsideHandler);
  }, []);

  return (
    <div className={styles.input_container} ref={ref}>
      <div
        onClick={() => toggleIsOpen()}
        onChange={handleChange}
        className={styles.form_input}
      >
        {city.map((id) => (
          <SelectedCity id={id} key={nanoid()} onclick={deleteCity} />
        ))}
      </div>
      {isOpen && (
        <ul id={label} className={styles.optionContainer}>
          {availableCities?.map((el) => {
            return (
              <li
                key={nanoid()}
                onClick={() => handleChange(el)}
                className={styles.option}
              >
                {el}
              </li>
            );
          })}
        </ul>
      )}{" "}
      <label htmlFor={label} className={styles.form_label__select}>
        {label}
      </label>
    </div>
  );
};
