import { useThemeContext } from "../../../02_context/context.index.js";

const DineIn_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `
<svg fill="${strokeColor}" 
version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 128 128" xml:space="preserve" width="64px" height="64px">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g id="_x31_"> </g> <g id="Layer_1"> <g> <circle cx="25.3" cy="45.2" r="8.2"/> 
<path 
d="M36.9,86.7H23.2V76.5l-7.1-12.1c-0.3-0.5-0.1-1.1,0.3-1.4c0.5-0.3,1.1-0.1,1.4,0.3l8.2,14c0.6,1,1.7,1.8,3,1.8h14 c2,0,3.6-1.7,3.6-3.6c0-2-1.7-3.6-3.6-3.6l-11.8,0.1L22,56.4c-0.7-1.2-2.1-1.9-3.7-1.9c-0.2,0-0.8,0.1-1,0.1s-0.6,0.1-0.8,0.2 C9.7,57.1,4.3,67.9,4.3,79.1c-0.1,3.4,0,6.2,0.2,8.9c-0.3,3.2,1.7,6.4,4.8,7.6c0.8,0.3,1.7,0.5,2.5,0.5h20.5v19.2 c0,2.6,2.1,4.6,4.6,4.6c2.6,0,4.6-2.1,4.6-4.6V91.4c0-1.2-0.5-2.4-1.4-3.3C39.2,87.2,38,86.7,36.9,86.7z"/> 
<path d="M78.5,78.2h0.2v-2.6h-0.2h-2.7c-1.7-5.5-5.9-9.6-11.1-10.2c0.2-0.3,0.4-0.6,0.4-1c0-0.8-0.7-1.5-1.5-1.5c0,0,0,0,0,0 c0,0,0,0,0,0c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.1,0.7,0.4,1c-5.2,0.6-9.4,4.7-11.1,10.2h-2.7h-0.2v2.6h0.2H78.5z"/> 
<rect x="28.7" y="80.9" width="69.4" height="3.7"/> 
<circle cx="101.5" cy="46" r="8.2"/> 
<path d="M122.6,79.1c0-11.2-5.4-22.1-12.2-24.3c-0.2-0.1-0.6-0.1-0.8-0.2c-0.2-0.1-0.8-0.1-1-0.1c-1.7,0-3,0.7-3.7,1.9l-9.3,15.8 L83.8,72c-1.9,0-3.6,1.6-3.6,3.6c0,1.9,1.6,3.6,3.6,3.6h14c1.3,0,2.4-0.8,3-1.8l8.2-14c0.3-0.4,0.9-0.6,1.4-0.3 c0.4,0.3,0.6,0.9,0.3,1.4l-7.1,12.1v10.2H90c-1.1,0-2.3,0.5-3.3,1.5c-0.9,0.8-1.4,2.1-1.4,3.3v23.9c0,2.6,2,4.6,4.6,4.6 c2.6,0,4.6-2,4.6-4.6V96.1h20.5c0.8,0,1.7-0.2,2.5-0.5c3.2-1.2,5.1-4.4,4.8-7.6C122.6,85.3,122.7,82.5,122.6,79.1z"/> 
</g> </g> </g>

</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default DineIn_Icon;
/*


,Budget_Icon
,Area_Icon
,City_Icon
,Country_Icon
,DineIn_Icon
,
,Emirate_Icon
,Ingredients_Icon
,IsDelivery_Icon
,Medium_Icon
,Operations_Icon
,Packaging_1_Icon
,Polygon
,Premium_Icon
,PriceRange_Icon
,Radius_Icon
,Recipe_Icon
,Street_Icon
,Sup_Recipe_Icon
,Supplier_Icon
,Tags_Icon
,Text_Icon
,Update_Icon

Budget_Icon
Category_backUp_Icon

Chicco_Icon
City_Icon
Country_Icon
DineIn_Icon
Dish_Icon
Emirate_Icon
Ingredients_Icon
IsDelivery_Icon
Medium_Good_Icon
Medium_Icon
Modifiers_Icon
Operations_Icon
Packaging_1_Icon
Packaging_2_Icon
Polygon
Premium_Icon
PriceRange_Icon
Radius_Icon
Recipe_Icon
Street_Icon
Sup_Recipe_Icon
Supplier_Icon
Tags_Icon
Text_Icon
Update_Icon



*/
