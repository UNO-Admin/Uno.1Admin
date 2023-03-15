import { franshisesSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const getFransheses =
  ({ userId }) =>
  (dispatch) => {
    const apiURL = URL.concat("getFransheses");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };
    dispatch(franshisesSliceActions.startLoading());

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(
          franshisesSliceActions.successLoading(normolizeEntities(data.result))
        );
      })
      .catch((err) => {
        dispatch(franshisesSliceActions.failLoading(err));
      });
  };
