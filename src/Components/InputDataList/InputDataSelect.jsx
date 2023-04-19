import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { SelectedCity } from "../SelectedCities/SelectedCities";
import classNames from "classnames";

export const InputDataSelect = ({ setForm, label, availableCities, city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  function toggleIsOpen() {
    setTimeout(() => setIsOpen(!isOpen), 0);
  }
  const [value, setValue] = useState("");
  const setNewCity = (e) => {
    const newValue = [e].concat(city);
    setForm(newValue);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const filteredCities = availableCities?.filter((el) =>
    el.toLowerCase().includes(value.toLowerCase())
  );

  function deleteCity(item) {
    const newCityValue = city.filter((el) => el !== item);
    setForm(newCityValue);
  }

  const onClickOutsideHandler = (e) => {
    if (isOpen && e.target.className !== styles.option) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutsideHandler);
    return () => document.removeEventListener("click", onClickOutsideHandler);
  }, [onClickOutsideHandler]);

  return (
    <div className={styles.input_container} ref={ref}>
      <input
        onClick={() => toggleIsOpen()}
        onChange={handleChange}
        className={styles.form_input}
        value={value}
        name={label}
      ></input>
      {isOpen && (
        <ul id={label} className={styles.optionContainer}>
          {filteredCities.length > 0 ? (
            filteredCities.map((el) => (
              <li
                key={nanoid()}
                onClick={() => setNewCity(el)}
                className={styles.option}
              >
                {el}
              </li>
            ))
          ) : (
            <li
              key={nanoid()}
              className={classNames(styles.optionDefault, styles.option)}
            >
              Ничего не найдено...
            </li>
          )}
        </ul>
      )}{" "}
      <label htmlFor={label} className={styles.form_label__select}>
        {label}
      </label>
      <div className={styles.cityesContainer}>
        {city.map((id) => (
          <SelectedCity id={id} key={nanoid()} onclick={deleteCity} />
        ))}
      </div>
    </div>
  );
};
