import { isEmpty, isEmail } from "validator";
import { isValidPhone } from "../../../helpers/isValidPhone";

const handleValidate = (form, setValidate) => {
  const { email, name, phone, pass } = form;

  if (isEmpty(email) || isEmpty(phone) || isEmpty(pass) || isEmpty(name)) {
    setValidate({
      isValid: false,
      errorMessage: "Пожалуйста, заполните все поля",
    });
  } else if (!isEmail(email)) {
    setValidate({
      isValid: false,
      errorMessage: "Неверный формат почты",
    });
  } else if (phone.length < 10 || phone.length > 14 || !isValidPhone(phone)) {
    setValidate({
      isValid: false,
      errorMessage: "Неверный номер телефона",
    });
  } else setValidate({ isValid: true, errorMessage: "   " });
};

export const onSubmit = (event, setValidate, form) => {
  event.preventDefault();
  handleValidate(form, setValidate);
};
