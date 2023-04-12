import { URL } from "../../../assets/constants/Fixtires";

export const sendRecoveredPassword = async ({ password, secretkey }) => {
  const apiIUL = URL.concat("dorecover");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password,
      secretkey,
    }),
  };

  try {
    const response = await fetch(apiIUL, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
