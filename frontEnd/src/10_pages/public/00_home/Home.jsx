import React from "react";
import {
  Bio,
  Journey,
  Projects,
  Skills,
  Achievements,
  Education,
  Vision,
  Values,
} from "../public.index.js";
import "./styles/home.css";

const variant = "short";

const Home = () => {
  const Bio_classname = `Home ${variant === "full" ? "full" : "short"}`;
  return (
    <div className={Bio_classname}>
      <Bio variant={variant} />
      <Journey variant={variant} />
      <Projects variant={variant} />
      <Skills variant={variant} />
      <Achievements variant={variant} />
      <Education variant={variant} />
      <Vision variant={variant} />
      <Values variant={variant} />
    </div>
  );
};

export default Home;
