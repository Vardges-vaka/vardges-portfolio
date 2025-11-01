import { useThemeContext } from "../../../02_context/context.index.js";

const Projects_icon = () => {
  const { strokeColor, theme } = useThemeContext();

  let lineColor = "";
  if (theme === "dark") {
    lineColor = "white";
  } else {
    lineColor = "black";
  }

  const svgString = `
 <svg fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" id="roadmap-3" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<line id="secondary" x1="12" y1="7" x2="12" y2="11" style="fill: none; stroke: ${strokeColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>

<polyline id="secondary-2" data-name="secondary" points="15 14 19 14 19 17" style="fill: none; stroke: ${strokeColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>

<polyline id="secondary-3" data-name="secondary" points="5 17 5 14 9 14" style="fill: none; stroke: ${strokeColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>

<path id="primary" d="M15,7V3H9V7Zm6,14V17H17v4ZM3,21H7V17H3Zm9-4.17L14.83,14,12,11.17,9.17,14Z" style="fill: none; stroke: ${lineColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;"/>

</g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Projects_icon;
