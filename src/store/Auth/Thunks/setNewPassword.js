import { authSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";

export const setNewPassword =
  ({ pass, id, newPass }) =>
  (dispatch) => {
    const apiURL = URL.concat("setNewPassword");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: pass,
        newpass: newPass,
        id,
      }),
    };

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error("Неверный текущий пароль");
        }
        dispatch(authSliceActions.successChangePass("Пароль изменен успешно"));
      })
      .catch(() => {
        dispatch(
          authSliceActions.setErrorChangePass("Неверный текущий пароль")
        );
      });
  };
