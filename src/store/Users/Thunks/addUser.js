import { URL } from "../../../assets/constants/Fixtires";
import { loadUsers } from "./loadUsers";

export const addUser =
  ({ userId, email, role, name, phone, pass, cities }) =>
  (dispatch) => {
    const apiURL = URL.concat("addUser");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        name,
        email,
        phone,
        pas: pass,
        role,
        cities,
      }),
    };

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error("Ошибка запроса на сервер");
        }
        dispatch(loadUsers({ userId }));
      })
      .catch((err) => console.log(err));
  };
