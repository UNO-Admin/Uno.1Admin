import { URL } from "../../../assets/constants/Fixtires";

export const editLicence = ({ params }) => {
  const { id, items } = params;
  const apiURL = URL.concat("editlicense");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id,
      items,
    }),
  };

  fetch(apiURL, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.OK) {
        throw Error(data.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
