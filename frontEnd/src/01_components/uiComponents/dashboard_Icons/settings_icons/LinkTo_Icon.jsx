import { useThemeContext } from "../../../../02_context/context.index.js";

const LinkTo_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `


<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M13.5 10.5L21 3" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M16 3L21 3L21 8" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M21 14V19C21 20.1046 20.1046 21 19 21H12H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H10" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default LinkTo_Icon;
