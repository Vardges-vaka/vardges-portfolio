import {
  Tooltip_11,
  Loader_1,
  Loader_2,
  Loader_3,
  Loader_4,
  Loader_5,
  Loader_6,
  Loader_7,
  Loader_8,
  Loader_9,
  Loader_10,
  Loader_11,
} from "../../../../../01_components/components.index.js";
import "./testing.css";

const EmailEngines = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        gap: "3rem",
        flexWrap: "wrap",
      }}>
      <h1 style={{ width: "100%" }}>Testing Tooltips</h1>
      <Loader_1 />
      {/* <Loader_2 /> */}
      {/* <Loader_3 /> */}
      {/* <Loader_4 />/ */}
      {/* <Loader_5 /> */}
      {/* <Loader_6 /> */}
      {/* <Loader_7 /> */}
      {/* <Loader_8 /> */}
      {/* <Loader_9 /> */}
      {/* <Loader_10 /> */}
      {/* <Loader_11 /> */}

      {/* <Tooltip_11
        toggleContent={3}
        toggleAriaLabel="Toggle test menu, 3 items"
        items={[
          {
            content: "👾",
            ariaLabel: "Alien",
            gradient: "linear-gradient(45deg, #62daca, #10d4a9)",
          },
          {
            content: "🤖",
            ariaLabel: "Robot",
            gradient: "linear-gradient(45deg, #f97d98, #d41f46)",
          },
          {
            content: "🪼",
            ariaLabel: "Jellyfish",
            gradient: "linear-gradient(45deg, aliceblue, #d169d1)",
          },
        ]}
      /> */}
    </div>
  );
};

export default EmailEngines;
