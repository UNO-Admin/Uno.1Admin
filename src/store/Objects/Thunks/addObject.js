import { URL } from "../../../assets/constants/Fixtires";
import { getObjects } from "./getObjects";

export const addObject =
  ({ userId, idFran, name, worker, phone, orgOwner, dt }) =>
  (dispatch) => {
    const apiURL = URL.concat("addObject");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        idFran,
        name,
        worker,
        phone,
        orgOwner,
        dt,
      }),
    };

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(getObjects({ userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
