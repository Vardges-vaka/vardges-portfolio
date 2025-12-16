import React from "react";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useValues } from "./valuesHooks/_valuesHooks.index.js";
import {
  ValueCard,
  CoreDriversSection,
  BalanceSection,
} from "./valuesComps/_valuesComps.index.js";
import "./styles/values.css";

const Values = ({ variant = "full" }) => {
  const { profile } = useProfileContext();
  const { valuesContent, loading } = useValues(profile);

  const valuesClassName = `values ${
    variant === "full" ? "values--full" : "values--short"
  }`;

  if (loading) {
    return (
      <div className={valuesClassName}>
        <div className="values__loading">Loading values...</div>
      </div>
    );
  }

  if (!valuesContent) {
    return (
      <div className={valuesClassName}>
        <div className="values__empty">No values data available.</div>
      </div>
    );
  }

  const isShort = variant === "short";
  const displayValues = isShort
    ? valuesContent.coreValues?.slice(0, 3)
    : valuesContent.coreValues;

  return (
    <div className={valuesClassName}>
      {!isShort && (
        <header className="values__header">
          <h1 className="values__title">Values & Personality</h1>
          <p className="values__subtitle">
            Core principles, communication style, and what drives my work.
          </p>
        </header>
      )}

      <div className="values__content">
        {displayValues && displayValues.length > 0 && (
          <div className="values__cards">
            {displayValues.map((value, index) => (
              <ValueCard
                key={value.id}
                value={value}
                index={index}
                variant={variant}
              />
            ))}
          </div>
        )}

        {!isShort && valuesContent.coreDrivers && (
          <CoreDriversSection coreDrivers={valuesContent.coreDrivers} />
        )}

        {!isShort && valuesContent.balance && (
          <BalanceSection balance={valuesContent.balance} />
        )}
      </div>
    </div>
  );
};

export default Values;
