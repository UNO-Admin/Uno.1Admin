import { URL } from "../../../assets/constants/Fixtires";
import { getObjects } from "./getObjects";

export const updateLicense =
  ({ id }) =>
  (dispatch) => {
    const apiURL = URL.concat("updatecode");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: id / 1,
      }),
    };
    console.log(options.body);

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(getObjects({ userId: localStorage.userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
