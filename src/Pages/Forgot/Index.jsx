import { useState } from "react";
import { FormElem } from "../../Components/FormElem/FormElem";
import { InputText } from "../../UI/InputText/InputText.tsx";
import { Logo } from "../../UI/Logo/Logo";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { sendRecoveryRequest } from "../../store/Recover/Thunks/sendRecoveryRequest";

export function Forgot() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // const [validate, setValidate] = useState({
  //   isValid: true,
  //   errorMessage: " ",
  // });

  // function handleValidate() {
  //   if (isEmpty(email)) {
  //     setValidate({
  //       isValid: false,
  //       errorMessage: "Введите логин для восстановления пароля",
  //     });
  //   } else if (!isEmail(email)) {
  //     setValidate({
  //       isValid: false,
  //       errorMessage: "Неверный формат электронной почты",
  //     });
  //   } else {
  //     setValidate({ isValid: true, errorMessage: " " });
  //   }
  // }
  function onSubmit(e) {
    e.preventDefault();
    sendRecoveryRequest({ email }).then((res) => {
      if (res.OK) {
        setIsSuccess(true);
      }
    });
  }
  return (
    <section className={styles.forgot}>
      <div className={styles.forgot_wrapper}>
        <Logo />
        <FormElem onSubmit={onSubmit}>
          <InputText
            label={"Логин"}
            value={email}
            setValue={({ target }) => setEmail(target.value)}
            name={"email"}
          />
          <button
            type="submit"
            className={styles.form_submit}
            onClick={onSubmit}
            disabled={email.length === 0}
          >
            Восстановить пароль
          </button>

          <div className={styles.alert}>
            {isSuccess &&
              "Запрос на сброс пароля отправлен. Если почта существует, Вам придет письмо с инструкцией по восстановлению доступа"}
          </div>
          <Link to="/" className={styles.back}>
            Назад
          </Link>
        </FormElem>
      </div>
    </section>
  );
}
