import { useThemeContext } from "../../../02_context/context.index.js";

const CK_other_icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `
<svg fill="white" width="64px" height="64px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" stroke="${strokeColor}" stroke-width="40">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path d="M244 416q-35 0-59.5 24.5T160 500t24.5 59.5T244 584t59.5-24.5T328 500t-24.5-59.5T244 416zm256 0q-35 0-59.5 24.5T416 500t24.5 59.5 59 24.5 59.5-24.5 25-59.5-25-59.5-60-24.5h1zm256 0q-35 0-59.5 24.5T672 500t24.5 59.5T756 584t59.5-24.5T840 500t-24.5-59.5T756 416z"/>

</g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default CK_other_icon;
