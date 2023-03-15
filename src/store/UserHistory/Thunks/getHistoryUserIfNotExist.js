import { normolizeEntities } from "../../helpers/normalizeEntites";
import { userHistorySliceActions } from "..";
import { selectUserHistory } from "../selectors";
import { URL } from "../../../assets/constants/Fixtires";

export const getHistoryUserIfNotExist =
  ({ id }) =>
  (dispatch, getState) => {
    const apiURL = URL.concat("gethistoryusr");
    if (selectUserHistory(getState())[id]) {
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id,
      }),
    };
    dispatch(userHistorySliceActions.startLoading());

    fetch(apiURL, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.OK) {
          throw Error(data.error);
        }
        const { entities } = normolizeEntities(data.result, "IDORG");
        dispatch(userHistorySliceActions.successLoading({ entities, id }));
      })
      .catch((err) => {
        dispatch(userHistorySliceActions.failLoading(err));
      });
  };
