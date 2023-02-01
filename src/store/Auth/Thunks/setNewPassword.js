import { authSliceActions } from "..";

export const setNewPassword =
  ({ pass, id, newPass }) =>
  (dispatch) => {
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

    fetch("http://wsuno.xyz:8111/setNewPassword", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data.OK) {
          throw Error('Неверный текущий пароль')
        }
        dispatch(authSliceActions.successChangePass('Пароль изменен успешно'))
      })
      .catch((err) => {
        dispatch(
          authSliceActions.setErrorChangePass('Неверный текущий пароль')
        );
      });
  };