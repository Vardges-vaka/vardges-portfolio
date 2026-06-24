const Payment_statuses_paid = () => {
  const svgString = `
<svg width="64px" height="64px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#000000">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <defs> <mask id="mask_circle"> <circle cx="50" cy="50" r="50" fill="white"/> <circle cx="50" cy="50" r="12" fill="#000000"/> </mask> <linearGradient x1="20" y1="60" x2="60" y2="40" id="Gradient" gradientUnits="userSpaceOnUse"> <stop style="stop-color:#0F650E;stop-opacity:1" offset="0"/> <stop style="stop-color:#399238;stop-opacity:1" offset="1"/> </linearGradient> </defs> <circle cx="50" cy="50" r="48" style="fill:#0F650E"/> <circle cx="50" cy="50" r="43" style="fill:url(#Gradient);stroke:#eeeeee;stroke-width:3"/> <path style="fill:#ffffff" d="M 26,41 C 28,45 43,73 45,86 47,78 50,57 80,24 68,30 55,44 44,55 40,52 35,48 26,41"/> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default Payment_statuses_paid;
