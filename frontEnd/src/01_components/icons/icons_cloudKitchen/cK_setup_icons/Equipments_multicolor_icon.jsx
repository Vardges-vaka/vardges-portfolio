import { useThemeContext } from "../../../../02_context/context.index.js";

const Equipments_multicolor_icon = () => {
  const { strokeColor } = useThemeContext();
  const svgString = `

`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Equipments_multicolor_icon;
