import { useState } from "react";
import { PERIOD_VALUES } from "../../../assets/constants/Fixtires";

export const useEditFormState = ({ minDate }) => {
  return useState({
    station: { klv: 1, ID: 1 },
    storage: {
      ID: 2,
      klv: 0,
    },
    calculation: {
      ID: 3,
      klv: 0,
    },
    tarifiation: {
      ID: 5,
      klv: 0,
    },
    waiter: {
      klv: 0,
      period: 1,
      ID: 4,
    },
    qr: {
      klv: 0,
      ID: 6,
    },
    period: PERIOD_VALUES[0].value,
    date: minDate,
  });
};
