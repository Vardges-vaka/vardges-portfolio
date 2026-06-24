const Integration_statuses_paused = () => {
  const svgString = `
<svg fill="#fff700" width="64px" height="64px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#fff700" stroke-width="0.00016">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g> <path d="M13,3.05A7,7,0,1,0,13,13,7,7,0,0,0,13,3.05ZM7,11H5.6V5H7Zm3.4,0H9V5h1.4Z"/> </g> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Integration_statuses_paused;
