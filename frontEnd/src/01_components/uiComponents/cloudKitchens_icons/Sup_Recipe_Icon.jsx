import { useThemeContext } from "../../../02_context/context.index.js";

const Sup_Recipe_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `


<svg height="64px" width="64px" version="1.1" id="_x32_" 
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="${strokeColor}">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:${strokeColor};} </style> <g> <path class="st0" d="M512,212.638l-0.567-8.278c-0.917-13.359-12.457-23.472-25.824-22.618H26.399 c-13.367-0.853-24.916,9.26-25.833,22.618L0,212.638c10.456,94.541,72.09,173.602,156.558,209.005l-3.597,27.603 c-2.863,19.077-5.726,31.479,25.761,31.479h149.092c31.479,0,28.617-12.402,25.761-31.479l-3.317-25.442 C437.398,389.526,501.328,309.109,512,212.638z"/> <path class="st0" d="M458.948,87.536c8.23-17.282,0.9-37.955-16.382-46.186l-14.076-6.699c-17.275-8.23-37.939-0.894-46.17,16.381 l-54.082,113.539h94.022L458.948,87.536z"/> </g> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Sup_Recipe_Icon;
