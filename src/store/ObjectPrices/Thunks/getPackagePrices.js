import { normolizeEntities } from "../../helpers/normalizeEntites";
import { objectPricesSliceActions } from "..";
import { URL } from "../../../assets/constants/Fixtires";

export const getPackagePrices = (dispatch) => {
  const apiURL = URL.concat("getObjectsPrices");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  dispatch(objectPricesSliceActions.startLoading());

  fetch(apiURL, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.OK) {
        throw Error(data.error);
      }
      dispatch(
        objectPricesSliceActions.successLoading(
          normolizeEntities(data.result, "ID")
        )
      );
    })
    .catch((err) => {
      dispatch(objectPricesSliceActions.failLoading(err));
    });
};
