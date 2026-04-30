import { useThemeContext } from "../../../02_context/context.index.js";

const ListView_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `



<svg width="64px" 
height="64px" 
viewBox="0 0 24 24" 
fill="none" 
xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" 
stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" 
stroke-linecap="round" 
stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> 
<path d="M4 17H11" 
stroke="${strokeColor}" 
stroke-width="1.5" 
stroke-linecap="round"/> 
<path 
d="M4 12L11 12" 
stroke="${strokeColor}" 
stroke-width="1.5" 
stroke-linecap="round"/> 
<path d="M4 7L11 7" 
stroke="${strokeColor}" 
stroke-width="1.5" 
stroke-linecap="round"/> 
<path d="M17 4L17 20M17 4L14 8M17 4L20 8M17 20L20 16M17 20L14 16" 
stroke="${strokeColor}" 
stroke-width="1.5" 
stroke-linecap="round" 
stroke-linejoin="round"/> 
</g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default ListView_Icon;
