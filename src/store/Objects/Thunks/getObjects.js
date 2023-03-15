import { objectsSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const getObjects =
  ({ userId }) =>
  (dispatch) => {
    const apiURL = URL.concat("getObjects");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };
    dispatch(objectsSliceActions.startLoading());

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(
          objectsSliceActions.successLoading(
            normolizeEntities(data.result, "ID")
          )
        );
      })
      .catch((err) => {
        dispatch(objectsSliceActions.failLoading(err));
      });
  };
