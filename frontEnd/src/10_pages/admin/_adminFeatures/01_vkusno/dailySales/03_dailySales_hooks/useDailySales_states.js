
import { useState } from "react";

export const useDailySales_states = () => {
  // Declare all states for this page here.
  // Each useState call should have a descriptive name.
  const [sampleState, setSampleState] = useState(null);
  const [otherState, setOtherState] = useState(null);

  return {
    states: { sampleState, otherState },
    setters: { setSampleState, setOtherState },
  };
};
