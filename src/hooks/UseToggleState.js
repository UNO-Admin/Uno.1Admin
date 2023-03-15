import { useState } from "react";

export function useToggleState(initialState) {
  const [state, setState] = useState(initialState);

  const toggleFunction = (updatedState = !state) => {
    setState(updatedState);
  };

  return [state, toggleFunction];
}
