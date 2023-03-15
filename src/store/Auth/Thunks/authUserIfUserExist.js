import { authSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";

export const authUserIfUserExist = (userData) => (dispatch) => {
  const { email, password } = userData;
  const apiURL = URL.concat("authUser");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  dispatch(authSliceActions.startLoadingUser());

  fetch(apiURL, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.OK) {
        throw Error("Ошибка запроса на сервер");
      } else if (data.result.length === 0) {
        dispatch(
          authSliceActions.errorLoading({ err: "Пользователя не существует" })
        );
      } else {
        dispatch(authSliceActions.login(data.result[0]));
      }
    })
    .catch((err) => {
      dispatch(authSliceActions.errorLoading({ err }));
    });
};
