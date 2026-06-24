import { useThemeContext } from "../../../../02_context/context.index.js";

const Socials_multicolor_icon = () => {
  const { strokeColor } = useThemeContext();
  const svgString = `

`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Socials_multicolor_icon;
