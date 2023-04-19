import { cityFranshisesSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";
import { normolizeEntities } from "../../helpers/normalizeEntites";

export const getCityFransheses =
  ({ userId }) =>
  (dispatch) => {
    const apiURL = URL.concat("getcityfran");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };
    dispatch(cityFranshisesSliceActions.startLoading());

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        dispatch(
          cityFranshisesSliceActions.successLoading(
            normolizeEntities(data.result, "NAME")
          )
        );
      })
      .catch((err) => {
        dispatch(cityFranshisesSliceActions.failLoading(err));
      });
  };
