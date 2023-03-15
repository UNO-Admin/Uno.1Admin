import { URL } from "../../../assets/constants/Fixtires";
import { loadUsers } from "./loadUsers";

export const editUser =
  ({ id, name, phone, email, idAccess }) =>
  (dispatch) => {
    const apiURL = URL.concat("editUser");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id,
        name,
        phone,
        email,
        idAccess,
      }),
    };

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error("Ошибка запроса на сервер");
        }
        dispatch(loadUsers({ userId: localStorage.userId / 1 }));
      })
      .catch((err) => console.log(err));
  };
