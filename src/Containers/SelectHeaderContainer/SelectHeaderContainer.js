import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onjectFilterSliceActions } from "../../store/ObjectFilter";
import InputSelectTable from "../../UI/InputSelectTable/InputSelectTable";

export const SelectHeaderContainer = ({ availableValues, label, name }) => {
  const mock =
    typeof availableValues[0] === "object" ? [{ value: "", label: "" }] : [""];
  const mapValues = mock.concat(availableValues);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const setFilter = useCallback(
    (value) => dispatch(onjectFilterSliceActions.setFilter([value, name]))[name]
  );

  useEffect(() => {
    setFilter(value);
  }, [value]);

  if (typeof mapValues[0] === "object") {
    return (
      <InputSelectTable.Colorable
        mapValues={mapValues}
        label={label}
        value={value}
        setForm={setValue}
      />
    );
  } else
    return (
      <InputSelectTable.Default
        mapValues={mapValues}
        label={label}
        value={value}
        setForm={setValue}
      />
    );
};
