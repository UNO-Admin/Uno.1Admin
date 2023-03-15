import { usersSliceActions } from "..";
import { normolizeEntities } from "../../helpers/normalizeEntites";
import { URL } from "../../../assets/constants/Fixtires";

export const loadUsers =
  ({ userId }) =>
  (dispatch) => {
    const apiIRL = URL.concat("getUsers");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: userId,
      }),
    };

    dispatch(usersSliceActions.startLoading());

    fetch(apiIRL, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.OK) {
          dispatch(
            usersSliceActions.successLoading(normolizeEntities(data.result))
          );
        } else throw Error(data.error);
      })
      .catch((err) => {
        dispatch(usersSliceActions.failLoading(err));
      });
  };
