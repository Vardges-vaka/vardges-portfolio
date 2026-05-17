import { useThemeContext } from "../../../02_context/context.index.js";

const Street_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `


<svg width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
fill="${strokeColor}" stroke="${strokeColor}" stroke-width="0.00032">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <title/> <g id="Crossroad"> <polygon points="24.203 7.797 24.203 2.35 21.603 2.35 21.603 10.397 29.65 10.397 29.65 7.797 24.203 7.797" style="fill:#444"/> 
<polygon points="2.35 24.203 7.797 24.203 7.797 29.65 10.397 29.65 10.397 21.603 2.35 21.603 2.35 24.203" style="fill:#444"/>
 <polygon points="10.397 2.35 7.797 2.35 7.797 7.797 2.35 7.797 2.35 10.397 10.397 10.397 10.397 2.35" style="fill:#444"/>
  <polygon points="21.603 29.65 24.203 29.65 24.203 24.203 29.65 24.203 29.65 21.603 21.603 21.603 21.603 29.65" style="fill:#444"/>
   <path d="M28.35,11.697H20.303V3.65H11.697v8.047H3.65v8.606h8.047V28.35h8.606V20.303H28.35ZM13.01,17.586H5.99V14.414h7.02Zm4.576,8.424H14.414V18.99h3.172Zm0-13H14.414V5.99h3.172Zm8.424,4.576H18.99V14.414h7.02Z" 
   style="fill:#444"/> <rect height="0.572" style="fill:#444" width="4.42" x="20.29" y="15.714"/> 
   <rect height="0.572" style="fill:#444" width="4.42" x="7.29" y="15.714"/> 
   <rect height="4.42" style="fill:#444" width="0.572" x="15.714" y="7.29"/> <rect height="4.42" style="fill:#444" width="0.572" x="15.714" y="20.29"/> </g> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Street_Icon;
