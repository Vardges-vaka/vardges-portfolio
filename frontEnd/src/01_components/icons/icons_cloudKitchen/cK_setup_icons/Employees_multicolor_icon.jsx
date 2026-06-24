import { useThemeContext } from "../../../../02_context/context.index.js";
const Employees_multicolor_icon = () => {
  const { strokeColor } = useThemeContext();
  const svgString = `

`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Employees_multicolor_icon;
