import { URL } from "../../../assets/constants/Fixtires";

export const sendRecoveryRequest = async ({ email }) => {
  const apiIUL = URL.concat("recover");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
    }),
  };

  try {
    const response = await fetch(apiIUL, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
