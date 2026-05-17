import { useThemeContext } from "../../../02_context/context.index.js";

const Packaging_Icon = () => {
  const { strokeColor, isDarkMode } = useThemeContext();
  const borderColor = isDarkMode ? "#222222" : "#ffffff";
  const insideColor = isDarkMode ? "#cca000" : "#a95ace";
  const svgString = `





<svg width="64px" height="64px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>



<g id="SVGRepo_iconCarrier"> <path style="fill:${strokeColor};stroke::${borderColor}" d="M 92,25 92,82 59,99 9,82 10,25 59,36 z"/> 


<path style="fill:${insideColor} ;stroke:${borderColor};stroke-width:1" d="M 10,25 1,10 38,4 47,18 53,3 98,8 92,25 59,36 z"/> 
<path style="fill:${insideColor} ;stroke:${borderColor};stroke-width:1" d="M 10,25 47,18 92,25 59,36 z"/> 
<path style="fill:#ff0101;stroke:${borderColor};stroke-width:1.5" d="m 59,38 0,59"/> 
<path style="fill:${insideColor} ;stroke:none;" d="M 1,41 10,25 59,36 92,25 99,42 66,55 59,36 51,56 z"/> </g>

</svg>




















`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Packaging_Icon;
