import classNames from "classnames";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormElem } from "../../Components/FormElem/FormElem";
import { InputPassWithHide } from "../../UI/InputPassWithHide/InputPassWithHide";
import { Logo } from "../../UI/Logo/Logo";
import styles from "./styles.module.css";
import { sendRecoveredPassword } from "../../store/Recover/Thunks/sendRecoveredPassword";

export function Recover() {
  const navigate = useNavigate();
  const { secretkey } = useParams();
  const [form, setForm] = useState({
    password: "",
    repeatPass: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password === form.repeatPass) {
      sendRecoveredPassword({ password: form.password, secretkey }).then(
        (res) => {
          if (res.OK) {
            navigate("/");
          } else {
            alert("Упс... Что-то пошло не так..");
          }
        }
      );
    } else {
      setError("Пароли не совпадают");
    }
  };

  return (
    <section className={styles.forgot}>
      <div className={styles.forgot_wrapper}>
        <Logo />
        <FormElem onSubmit={onSubmit}>
          <InputPassWithHide
            name={"password"}
            label={"Новый пароль"}
            value={form.pass}
            setValue={handleChange}
          />
          <InputPassWithHide
            name={"repeatPass"}
            label={"Повторите новый пароль"}
            value={form.repeatPass}
            setValue={handleChange}
          />
          <div className={styles.errorMessage}>{error}</div>
          <button
            type="submit"
            className={classNames(styles.button, styles.form_submit)}
          >
            Восстановить пароль
          </button>
        </FormElem>
      </div>
    </section>
  );
}
