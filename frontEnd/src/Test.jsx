import React from "react";
import BTNTest from "./Test/BTNTest";
import INPUT_TEST from "./Test/INPUT_TEST";
import "./09_styles/test.css";

const Test = () => {
  return (
    <div className="test">
      <header className="test__header">
        <h1>🧪 Component Test Suite</h1>
        <p>Testing all components, states, and configurations</p>
      </header>

      <div className="test__section">
        <BTNTest />
      </div>
      <div className="test__section">
        <INPUT_TEST />
      </div>
      {/* Future component tests can be added here */}
      {/* 
      <div className="test__section">
        <InputTest />
      </div>
      
      <div className="test__section">
        <TextAreaTest />
      </div>
      */}

      <div className="test__info">
        <h3>📊 Test Suite Info</h3>
        <p>
          This is the main testing area for all components. Each component has
          its own dedicated test section to keep things organized and
          maintainable.
        </p>
        <ul>
          <li>
            ✅ <strong>ButtonGlobal</strong> - Complete testing suite
          </li>
          <li>
            🚧 <strong>InputGlobal</strong> - Coming soon
          </li>
          <li>
            🚧 <strong>TextAreaGlobal</strong> - Coming soon
          </li>
          <li>
            🚧 <strong>SelectGlobal</strong> - Coming soon
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
